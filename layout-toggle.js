class LayoutToggle extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return;
    this._rendered = true;

    this.innerHTML = `
      <button
        class="flex items-center justify-center gap-2 px-4 py-2 rounded
               bg-gray-200 text-gray-800
               dark:bg-gray-800 dark:text-gray-200
               focus:outline-none"
        aria-label="Toggle layout"
      >
        <i class="fa-solid fa-arrows-left-right"></i>
      </button>
    `;

    this.button = this.querySelector('button');
    this.icon = this.querySelector('i');

    this.main = document.querySelector('main.prose');
    if (!this.main) return;

    this.sections = Array.from(this.main.querySelectorAll('section'));

    // Save original prose max-width classes
    this.proseMaxClasses = Array.from(this.main.classList).filter(c => c.startsWith('max-w-'));

    // Initialize layout
    const isVertical = localStorage.layout !== 'horizontal';
    this.applyLayout(isVertical);

    this.button.addEventListener('click', () => {
      const isCurrentlyVertical = this.main.classList.contains('mx-auto');
      this.applyLayout(!isCurrentlyVertical);
      localStorage.layout = !isCurrentlyVertical ? 'vertical' : 'horizontal';
    });
  }

  applyLayout(isVertical) {
    if (isVertical) {
      // Vertical layout
      this.main.classList.remove('flex', 'flex-wrap', 'w-full', 'max-w-none');
      this.main.classList.add('mx-auto', ...this.proseMaxClasses);

      // Reset section styles
      this.sections.forEach(sec => {
        sec.style.width = '';
        sec.style.flex = '';
        sec.style.marginRight = '';
      });

      this.icon.className = 'fa-solid fa-arrows-left-right';
    } else {
      // Horizontal layout
      this.main.classList.remove('mx-auto', ...this.proseMaxClasses);
      this.main.classList.add('flex', 'flex-wrap', 'w-full', 'max-w-none');

      if (this.sections.length > 1) {
        const remaining = this.sections.slice(1);
        const width = 100 / remaining.length;

        // First section full width
        this.sections[0].style.flex = '0 0 100%';
        this.sections[0].style.width = '100%';

        // Remaining sections share the row
        remaining.forEach(sec => {
          sec.style.flex = `0 0 ${width}%`;
          sec.style.width = `${width}%`;
        });
      } else {
        // Only one section, full width
        this.sections[0].style.flex = '0 0 100%';
        this.sections[0].style.width = '100%';
      }

      this.icon.className = 'fa-solid fa-expand';
    }
  }
}

customElements.define('layout-toggle', LayoutToggle);
