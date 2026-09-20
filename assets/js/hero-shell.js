(function () {
    'use strict';
    document.querySelectorAll('[data-hero-shell]').forEach(function (shell) {
        var button = shell.querySelector('.hero-shell-pause');
        var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        function syncMotion() {
            shell.classList.toggle('is-animated', !motion.matches);
            button.hidden = motion.matches;
        }
        button.addEventListener('click', function () {
            var paused = shell.classList.toggle('is-paused');
            button.setAttribute('aria-pressed', String(paused));
            button.setAttribute('aria-label', paused ? '터미널 애니메이션 재생' : '터미널 애니메이션 일시정지');
            button.textContent = paused ? '재생' : '일시정지';
        });
        if (motion.addEventListener) motion.addEventListener('change', syncMotion);
        syncMotion();
    });
})();