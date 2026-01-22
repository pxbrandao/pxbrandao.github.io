class ThemeToggle extends HTMLElement {
  connectedCallback() {
    // Prevent double render
    if (this._rendered) return;
    this._rendered = true;

    this.innerHTML = `
      <button
        class="flex items-center justify-center gap-2 px-4 py-2 rounded
               bg-gray-200 text-gray-800
               dark:bg-gray-800 dark:text-gray-200
               focus:outline-none"
        aria-label="Toggle theme"
      >
        <i class="fa-solid fa-sun"></i>
      </button>
    `;

    this.button = this.querySelector('button');
    this.icon = this.querySelector('i');

    // Determine initial theme
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
    this.updateIcon(isDark);

    // Toggle theme
    this.button.addEventListener('click', () => {
      const darkMode = document.documentElement.classList.toggle('dark');
      localStorage.theme = darkMode ? 'dark' : 'light';
      this.updateIcon(darkMode);
    });
  }

  updateIcon(isDark) {
    this.icon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

customElements.define('theme-toggle', ThemeToggle);
