class LayoutToggle extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return;
    this._rendered = true;

    this.innerHTML = `
      <button
        class="flex items-center justify-center gap-2 px-4 py-2 rounded w-8 h-8
          bg-main-text text-main-bg
          "
        aria-label="Toggle layout"
      >
        <i class="fa-solid fa-table-cells-large"></i>
      </button>
    `;

    this.button = this.querySelector('button');
    this.icon = this.querySelector('i');
    this.main = document.querySelector('main');

    this.button.addEventListener('click', () => {
      this.main.classList.toggle('md:flex-row');
      this.main.classList.toggle('md:max-w-6xl');
      this.updateIcon();
    });

    this.updateIcon();
  }

  updateIcon() {
    const isRow = this.main.classList.contains('md:flex-row');
    this.icon.className = isRow
      ? 'fa-solid fa-table-cells-large'
      : 'fa-solid fa-bars';
  }
}

customElements.define('layout-toggle', LayoutToggle);
