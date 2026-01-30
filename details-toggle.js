class DetailsToggle extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return;
    this._rendered = true;

    this.innerHTML = `
      <button type="button"
              class="flex items-center justify-center gap-2 p-2 text-sm font-medium rounded-full h-8 w-8
                    bg-main-text text-main-bg
                    "
              aria-label="Toggle details"
              aria-expanded="false">
        <i class="fa-solid fa-plus fa-xs"></i>
      </button>
    `;

    this.button = this.querySelector('button');
    this.icon = this.querySelector('i');
    this.label = this.querySelector('span');

    const targetId = this.getAttribute('target-id');
    if (!targetId) return console.warn('details-toggle missing target-id');

    this.target = document.getElementById(targetId);
    if (!this.target)
      return console.warn(`No element found with id="${targetId}"`);

    this.target.classList.add('hidden');
    this.syncState(false);

    this.button.addEventListener('click', () => {
      const isVisible = this.target.classList.toggle('hidden') === false;
      this.syncState(isVisible);
    });
  }

  syncState(isVisible) {
    this.button.setAttribute('aria-expanded', String(isVisible));
    // this.label.textContent = isVisible ? 'Hide details' : 'Show details';
    this.icon.className = isVisible ? 'fa-solid fa-minus' : 'fa-solid fa-plus';
  }
}

customElements.define('details-toggle', DetailsToggle);
