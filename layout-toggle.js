function toggleFlexLayout(enable) {
  const main = document.querySelector('main');
  const left = document.getElementById('left-col');
  const right = document.getElementById('right-col');

  if (!left || !right) return; // safety check

  if (enable) {
    main.classList.add('flex', 'flex-row', 'flex-wrap', 'max-w-6xl');
    left.classList.add('flex-[1]');
    right.classList.add('flex-[2]');
  } else {
    main.classList.remove('flex', 'flex-row', 'flex-wrap', 'max-w-6xl');
    left.classList.remove('flex-[1]');
    right.classList.remove('flex-[2]');
  }
}

class LayoutToggle extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return;
    this._rendered = true;

    this.innerHTML = `
      <button
        class="flex items-center justify-center gap-2 px-4 py-2 rounded w-8 h-8
               bg-black text-white
               dark:bg-white dark:text-black
               focus:outline-none"
        aria-label="Toggle layout"
      >
        <i class="fa-solid fa-table-cells-large"></i>
      </button>
    `;

    this.button = this.querySelector('button');
    this.icon = this.querySelector('i');

    // Initial state: flex layout enabled by default
    const isFlex =
      localStorage.layout === 'flex' || (!('layout' in localStorage) && true);

    toggleFlexLayout(isFlex);
    this.updateIcon(isFlex);

    // Toggle on click
    this.button.addEventListener('click', () => {
      const enabled = !this.isFlexEnabled();
      toggleFlexLayout(enabled);
      localStorage.layout = enabled ? 'flex' : 'single-column';
      this.updateIcon(enabled);
    });
  }

  isFlexEnabled() {
    return document.querySelector('main').classList.contains('flex-row');
  }

  updateIcon(isFlex) {
    this.icon.className = isFlex
      ? 'fa-solid fa-table-cells-large'
      : 'fa-solid fa-bars';
  }
}

customElements.define('layout-toggle', LayoutToggle);
