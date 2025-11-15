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
