class VariationToggle extends HTMLElement {
  connectedCallback() {
    this.themes = [
      { id: 'default', label: 'Classic' },
      { id: 'cyberpunk', label: 'Cyberpunk' },
      { id: 'vaporwave', label: 'Vaporwave' },
      { id: 'terminal', label: 'Terminal' },
    ];

    const savedTheme = 'default';
    this.currentIndex = this.themes.findIndex((t) => t.id === savedTheme);
    if (this.currentIndex === -1) this.currentIndex = 0;

    this.render();
    this.applyTheme(this.themes[this.currentIndex].id);
  }

  render() {
    const theme = this.themes[this.currentIndex];
    this.innerHTML = `
      <button
        class="flex items-center justify-center text-center gap-2 px-4 py-2 rounded w-8 h-8
          bg-main-text text-main-bg
          "
        title="Current theme: ${theme.label}"
        aria-label="Switch variation"
      >
        <i class="fa-solid fa-paintbrush"></i>
        </button>
        `;

    this.querySelector('button').addEventListener('click', () => this.cycle());
  }

  cycle() {
    this.currentIndex = (this.currentIndex + 1) % this.themes.length;
    const newTheme = this.themes[this.currentIndex];

    this.applyTheme(newTheme.id);
    this.render();
  }

  applyTheme(themeId) {
    if (themeId === 'default') {
      document.documentElement.removeAttribute('data-layout-theme');
    } else {
      document.documentElement.setAttribute('data-layout-theme', themeId);
    }
    // localStorage.setItem('layout-theme', themeId);
  }
}

customElements.define('variation-toggle', VariationToggle);
