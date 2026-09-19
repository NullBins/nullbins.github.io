(function () {
    'use strict';
    var toc = document.getElementById('post-toc');
    var content = document.querySelector('main .content');
    if (!toc || !content) return;
    var headings = Array.prototype.filter.call(
        content.querySelectorAll('h2, h3'),
        function (heading) { return heading.textContent.trim().length > 0; }
    );
    // Short posts do not need an empty or single-entry table of contents.
    if (headings.length < 2) return;
    var list = toc.querySelector('.post-toc-list');
    var parentItem = null;
    var sublist = null;
    headings.forEach(function (heading, index) {
        // Preserve Jekyll's existing anchors and incoming links.
        if (!heading.id) {
            var id = 'post-section-' + (index + 1);
            while (document.getElementById(id)) id += '-toc';
            heading.id = id;
        }
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.textContent = heading.textContent.trim();
        link.setAttribute('href', '#' + encodeURIComponent(heading.id));
        item.appendChild(link);
        if (heading.tagName === 'H3' && parentItem) {
            if (!sublist) {
                sublist = document.createElement('ul');
                parentItem.appendChild(sublist);
            }
            sublist.appendChild(item);
        } else {
            list.appendChild(item);
            parentItem = heading.tagName === 'H2' ? item : null;
            sublist = null;
        }
    });
    // Native details remains keyboard accessible and user-controllable.
    toc.open = window.matchMedia('(min-width: 761px)').matches;
    toc.hidden = false;
})();