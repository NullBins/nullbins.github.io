(function () {
    'use strict';
    var key = 'nullbins-theme';
    var root = document.documentElement;
    var theme = 'light';
    // Apply before the body renders. Storage may be unavailable in private views.
    try {
        if (window.localStorage.getItem(key) === 'dark') theme = 'dark';
    } catch (error) { /* Keep the existing light theme. */ }
    root.setAttribute('data-theme', theme);
    function updateButton() {
        var dark = root.getAttribute('data-theme') === 'dark';
        document.querySelectorAll('applause-button').forEach(function (applause) {
            if (!applause.hasAttribute('data-light-color')) {
                applause.setAttribute('data-light-color', applause.getAttribute('color') || '#54665a');
            }
            applause.setAttribute('color', dark ? '#a9c9b3' : applause.getAttribute('data-light-color'));
        });
        var button = document.getElementById('theme-toggle');
        if (!button) return;
        button.setAttribute('aria-pressed', String(dark));
        button.title = dark ? '화이트 모드로 전환' : '블랙 모드로 전환';
        button.querySelector('[data-theme-icon]').textContent = dark ? '☾' : '☀';
        button.querySelector('[data-theme-label]').textContent = dark ? 'Dark' : 'Light';
    }
    document.addEventListener('DOMContentLoaded', function () {
        var button = document.getElementById('theme-toggle');
        if (!button) return;
        button.hidden = false;
        updateButton();
        button.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { window.localStorage.setItem(key, next); } catch (error) { /* Toggle still works. */ }
            updateButton();
        });
    });
    // Keep other open blog tabs consistent with the most recent selection.
    window.addEventListener('storage', function (event) {
        if (event.key !== key && event.key !== null) return;
        root.setAttribute('data-theme', event.newValue === 'dark' ? 'dark' : 'light');
        updateButton();
    });
})();