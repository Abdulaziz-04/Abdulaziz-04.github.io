document.addEventListener('DOMContentLoaded', () => {
  const navLinkMap = new Map();
  let sectionObserver;
  let hireModal;
  const trackedSections = new Set();
  let scrollSpyBound = false;

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
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        });
        if (bestEntry) {
          const sectionId = bestEntry.target.getAttribute('id');
          syncActiveNav(sectionId || '');
        }
      },
      { threshold: 0.4, rootMargin: '-20% 0px -40% 0px' }
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
    document.body.classList.remove('modal-open');
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
    document.body.classList.add('modal-open');
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

  const templateContainers = document.querySelectorAll('[data-template]');
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
      });
  });
});
