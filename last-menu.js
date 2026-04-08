/**
 * LastMenu - Configurable floating mobile menu
 * Renders a menu from JSON config with theme support, submenus, and extensible item types.
 */
(function () {
  'use strict';

  const ITEM_RENDERERS = {
    link: renderLinkItem,
  };

  const DEFAULT_CONFIG = {
    title: 'Menu',
    columns: 2,
    scrollable: false,
    theme: 'minimal',
    position: 'bottom-right',
    items: [],
  };

  let _config = {};
  let _root = null;
  let _isOpen = false;
  let _submenuStack = [];
  let _currentItems = [];
  let _currentTitle = '';

  // ── Public API ──

  window.LastMenu = {
    init,
    open,
    close,
    toggle,
    registerItemType,
  };

  function init(jsonOrUrl, mountEl) {
    if (typeof jsonOrUrl === 'string') {
      fetch(jsonOrUrl)
        .then((r) => r.json())
        .then((cfg) => _bootstrap(cfg, mountEl));
    } else {
      _bootstrap(jsonOrUrl, mountEl);
    }
  }

  function open() {
    _setOpen(true);
  }
  function close() {
    _setOpen(false);
  }
  function toggle() {
    _setOpen(!_isOpen);
  }

  function registerItemType(type, renderer) {
    ITEM_RENDERERS[type] = renderer;
  }

  // ── Bootstrap ──

  function _bootstrap(cfg, mountEl) {
    _config = Object.assign({}, DEFAULT_CONFIG, cfg);
    _submenuStack = [];

    const mount = mountEl || document.body;
    _root = _el('div', 'lm-root');
    _root.setAttribute('data-theme', _config.theme);
    _root.setAttribute('data-pos', _config.position);

    // Load theme CSS
    _loadTheme(_config.theme);

    // Overlay
    const overlay = _el('div', 'lm-overlay');
    overlay.addEventListener('click', close);
    _root.appendChild(overlay);

    // Panel
    const panel = _el('nav', 'lm-panel');
    panel.setAttribute('aria-label', _config.title);
    if (_config.scrollable) panel.classList.add('lm-scrollable');
    _root.appendChild(panel);

    // Render root items
    _currentItems = _config.items;
    _currentTitle = _config.title;
    _renderPanel(_config.items, _config.title, false);

    // FAB
    const fab = _el('button', 'lm-fab');
    fab.setAttribute('aria-label', 'Toggle menu');
    fab.innerHTML = `
      <svg class="lm-icon-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
      <svg class="lm-icon-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>`;
    fab.addEventListener('click', toggle);
    _root.appendChild(fab);

    mount.appendChild(_root);
  }

  // ── Rendering ──

  function _renderPanel(items, title, isSubmenu) {
    const panel = _root.querySelector('.lm-panel');
    panel.innerHTML = '';

    // Header
    const head = _el('div', 'lm-panel-head');

    if (isSubmenu) {
      const back = _el('button', 'lm-back');
      back.setAttribute('aria-label', 'Back');
      back.innerHTML = `<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>`;
      back.addEventListener('click', _goBack);
      head.appendChild(back);
    }

    const titleEl = _el('span', 'lm-panel-title');
    titleEl.textContent = title;
    head.appendChild(titleEl);

    const closeBtn = _el('button', 'lm-close');
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>`;
    closeBtn.addEventListener('click', close);
    head.appendChild(closeBtn);

    panel.appendChild(head);

    // Items grid
    const grid = _el('div', 'lm-items');
    grid.style.gridTemplateColumns = `repeat(${_config.columns}, minmax(0, 1fr))`;

    items.forEach((item) => {
      const renderer = ITEM_RENDERERS[item.type || 'link'];
      if (!renderer) return;

      const el = renderer(item);
      if (el) grid.appendChild(el);
    });

    panel.appendChild(grid);
  }

  function renderLinkItem(item) {
    // If has children → render as submenu trigger button
    if (item.children && item.children.length) {
      const btn = _el('button', 'lm-item lm-item-sub');
      btn.innerHTML = _itemInner(item, true);
      btn.addEventListener('click', () => _openSubmenu(item));
      return btn;
    }

    const a = _el('a', 'lm-item');
    a.href = item.url || '#';
    if (item.target) a.target = item.target;
    a.innerHTML = _itemInner(item, false);
    a.addEventListener('click', () => close());
    return a;
  }

  function _itemInner(item, hasArrow) {
    let html = '';
    if (item.icon) {
      html += `<span class="lm-item-icon">${item.icon}</span>`;
    }
    html += `<span class="lm-item-label">${_esc(item.label)}</span>`;
    if (hasArrow) {
      html += `<svg class="lm-arrow" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"></path></svg>`;
    }
    return html;
  }

  // ── Submenu navigation ──

  function _openSubmenu(item) {
    _submenuStack.push({
      items: _currentItems,
      title: _currentTitle,
    });
    _currentItems = item.children;
    _currentTitle = item.label;
    _renderPanel(item.children, item.label, true);
  }

  function _goBack() {
    const prev = _submenuStack.pop();
    if (prev) {
      _currentItems = prev.items;
      _currentTitle = prev.title;
      _renderPanel(prev.items, prev.title, _submenuStack.length > 0);
    }
  }

  // ── State ──

  function _setOpen(open) {
    _isOpen = open;
    _root.classList.toggle('lm-open', open);
    if (!open) {
      // Reset to root after closing
      setTimeout(() => {
        _submenuStack = [];
        _currentItems = _config.items;
        _currentTitle = _config.title;
        _renderPanel(_config.items, _config.title, false);
      }, 250);
    }
  }

  // ── Theme loader ──

  function _loadTheme(name) {
    const existingLinks = document.querySelectorAll('link[data-last-menu-theme]');
    existingLinks.forEach((link) => link.remove());

    const scripts = document.querySelectorAll('script[src]');
    let base = '';
    scripts.forEach((s) => {
      if (s.src.includes('last-menu')) {
        base = s.src.substring(0, s.src.lastIndexOf('/') + 1);
      }
    });

    const link = document.createElement('link');
    link.id = 'lm-theme';
    link.setAttribute('data-last-menu-theme', name);
    link.rel = 'stylesheet';
    link.href = base + 'themes/' + name + '.css';
    document.head.appendChild(link);
  }

  // ── Helpers ──

  function _el(tag, cls) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function _esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }
})();
