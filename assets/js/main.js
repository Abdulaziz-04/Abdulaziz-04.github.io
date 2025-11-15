document.addEventListener('DOMContentLoaded', () => {
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

  setYear();
  initDropdowns();

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
