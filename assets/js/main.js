document.addEventListener('DOMContentLoaded', () => {
  const navLinkMap = new Map();
  let sectionObserver;
  let hireModal;
  const trackedSections = new Set();
  let scrollSpyBound = false;
  let navHeightListenerBound = false;
  let posthogClient = null;
  const seenSections = new Set();
  const pageLoader = document.querySelector('[data-page-loader]');
  const LOADER_MIN_DELAY_MS = 500;
  let loaderHideTimeout = null;

  // PostHog analytics loader and click tracking
  const initPosthog = () => {
    if (window.posthog && typeof window.posthog.init === 'function') {
      return Promise.resolve(window.posthog);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://us.i.posthog.com/static/array.js';
      script.onload = () => {
        try {
          window.posthog.init('phc_JAYewhUaFiR9Bl5mY1B77xUOx0ZGnDsAeMCbrHtNUZf', {
            api_host: 'https://us.i.posthog.com',
            person_profiles: 'identified_only'
          });
          resolve(window.posthog);
        } catch (error) {
          reject(error);
        }
      };
      script.onerror = () => reject(new Error('PostHog failed to load'));
      document.head.appendChild(script);
    });
  };

  initPosthog()
    .then((ph) => {
      posthogClient = ph;
      ph.capture('$pageview');
      document.addEventListener('click', (event) => {
        const target = event.target.closest('[data-track]');
        if (!target) return;
        ph.capture('cta_click', {
          label: target.getAttribute('data-track'),
          href: target.getAttribute('href') || ''
        });
      });
    })
    .catch((error) => {
      console.error('PostHog init error', error);
    });

  const updateNavHeightVar = () => {
    const nav = document.querySelector('.top-nav');
    if (!nav) return;
    document.documentElement.style.setProperty('--top-nav-height', `${nav.offsetHeight}px`);
  };

  const setYear = () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  const initDropdowns = (root = document) => {
    const dropdowns = root.querySelectorAll('[data-dropdown]');
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.course-toggle');
      const panel = dropdown.querySelector('.course-panel');
      if (!toggle || !panel || toggle.dataset.bound === 'true') return;

      toggle.dataset.bound = 'true';
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', (!expanded).toString());
        panel.hidden = expanded;
        dropdown.classList.toggle('is-open', !expanded);
      });
    });
  };

  const sectionAlias = new Map([['academic', 'experience']]);

  const resolveSectionId = (sectionId) => {
    if (!sectionId) return '';
    return sectionAlias.get(sectionId) || sectionId;
  };

  const hidePageLoader = () => {
    if (!pageLoader || pageLoader.classList.contains('is-hidden')) return;
    if (loaderHideTimeout) return;
    loaderHideTimeout = window.setTimeout(() => {
      pageLoader.classList.add('is-hidden');
    }, LOADER_MIN_DELAY_MS);
  };

  const closeMobileNav = (nav) => {
    if (!nav) return;
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    const toggle = nav.querySelector('[data-nav-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  };

  const openMobileNav = (nav) => {
    if (!nav) return;
    nav.classList.add('is-open');
    document.body.classList.add('nav-open');
    const toggle = nav.querySelector('[data-nav-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }
  };

  const updateModalOpenClass = () => {
    const hireOpen = hireModal && !hireModal.hasAttribute('hidden');
    if (hireOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  };

  const syncActiveNav = (sectionId) => {
    const resolved = resolveSectionId(sectionId);
    if (!sectionId) return;
    navLinkMap.forEach((target, link) => {
      if (target === resolved) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const updateActiveSectionFromScroll = () => {
    if (!trackedSections.size || !navLinkMap.size) return;
    const topOffset = window.scrollY + 120;
    let activeId = '';
    trackedSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (topOffset >= sectionTop && topOffset < sectionBottom) {
        activeId = section.id;
      }
    });
    if (!activeId) {
      const firstSection = trackedSections.values().next().value;
      if (firstSection) {
        activeId = firstSection.id;
      }
    }
    syncActiveNav(activeId);
  };

  const ensureScrollSpy = () => {
    if (scrollSpyBound) return;
    scrollSpyBound = true;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveSectionFromScroll();
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
  };

  const ensureSectionObserver = () => {
    if (sectionObserver) return;
    sectionObserver = new IntersectionObserver(
      (entries) => {
        let bestEntry = null;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute('id') || '';
          const resolved = resolveSectionId(sectionId);
          if (resolved && posthogClient && !seenSections.has(resolved)) {
            seenSections.add(resolved);
            posthogClient.capture('section_view', { section: resolved });
          }

          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        });
        if (bestEntry) {
          const sectionId = bestEntry.target.getAttribute('id');
          syncActiveNav(sectionId || '');
        }
      },
      { threshold: 0.2, rootMargin: '-25% 0px -25% 0px' }
    );
  };

  const registerSections = (root = document) => {
    ensureSectionObserver();
    const sections = root.querySelectorAll('section[id]');
    sections.forEach((section) => {
      trackedSections.add(section);
      sectionObserver.observe(section);
    });
    updateActiveSectionFromScroll();
  };

  const resetSectionObserver = () => {
    if (!sectionObserver) return;
    sectionObserver.disconnect();
    sectionObserver = null;
    trackedSections.clear();
  };

  const closeHireModal = () => {
    if (!hireModal) {
      hireModal = document.querySelector('[data-hire-modal]');
    }
    if (!hireModal) return;
    hireModal.setAttribute('hidden', '');
    updateModalOpenClass();
  };

  const ensureHireModal = () => {
    if (hireModal) return hireModal;
    hireModal = document.querySelector('[data-hire-modal]');
    if (hireModal && !hireModal.dataset.bound) {
      hireModal.dataset.bound = 'true';
      hireModal.addEventListener('click', (event) => {
        if (
          event.target === hireModal ||
          event.target.hasAttribute('data-hire-close')
        ) {
          closeHireModal();
        }
      });
    }
    return hireModal;
  };

  const openHireModal = () => {
    const modal = ensureHireModal();
    if (!modal) return;
    modal.removeAttribute('hidden');
    updateModalOpenClass();
  };

  const initHireTriggers = (root = document) => {
    const triggers = root.querySelectorAll('[data-hire-trigger]');
    triggers.forEach((trigger) => {
      if (trigger.dataset.hireBound === 'true') return;
      trigger.dataset.hireBound = 'true';
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openHireModal();
      });
    });
  };

  const initTopNav = (root = document) => {
    const nav = root.querySelector('.top-nav');
    if (!nav || nav.dataset.bound === 'true') return;
    nav.dataset.bound = 'true';

    const navToggle = nav.querySelector('[data-nav-toggle]');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('is-open');
        if (isOpen) {
          closeMobileNav(nav);
        } else {
          openMobileNav(nav);
        }
      });
    }

    nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => closeMobileNav(nav));
    });

    updateNavHeightVar();
    if (!navHeightListenerBound) {
      navHeightListenerBound = true;
      window.addEventListener('resize', () => requestAnimationFrame(updateNavHeightVar));
      window.addEventListener('orientationchange', updateNavHeightVar);
    }

    const handleViewportChange = () => {
      if (window.innerWidth > 768) {
        closeMobileNav(nav);
      }
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);

    navLinkMap.clear();
    nav.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        navLinkMap.set(link, href.slice(1));
      }
    });
    ensureScrollSpy();

    ensureHireModal();
    resetSectionObserver();
    registerSections(document);
    updateActiveSectionFromScroll();
  };

  const initGlobalKeys = () => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeHireModal();
        const openNav = document.querySelector('.top-nav.is-open');
        if (openNav) {
          closeMobileNav(openNav);
        }
      }
    });
  };

  const scrollToHashTarget = () => {
    if (!window.location.hash) return;
    const id = resolveSectionId(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  setYear();
  initDropdowns();
  initHireTriggers();
  initGlobalKeys();
  initTopNav(document);
  registerSections(document);

  const templateContainers = document.querySelectorAll('[data-template]');
  let pendingTemplates = templateContainers.length;

  if (!pendingTemplates) {
    hidePageLoader();
  }

  templateContainers.forEach((container) => {
    const url = container.getAttribute('data-template');
    if (!url) return;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${url}`);
        }
        return response.text();
      })
      .then((html) => {
        container.innerHTML = html;
        setYear();
        initDropdowns(container);
        initHireTriggers(container);
        initTopNav(container);
        registerSections(container);
        scrollToHashTarget();
      })
      .catch((error) => {
        console.error(`Template load failed for ${url}`, error);
        if (window.location.protocol === 'file:') {
          container.innerHTML =
            '<p class="loading-error">Templates require running via a local server or GitHub Pages.</p>';
        } else {
          container.innerHTML =
            '<p class="loading-error">Unable to load this section.</p>';
        }
      })
      .finally(() => {
        pendingTemplates -= 1;
        if (pendingTemplates <= 0) {
          hidePageLoader();
        }
      });
  });
});
