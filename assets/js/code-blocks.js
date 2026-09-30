/* Enhance Rouge output without replacing syntax tokens or source text. */
(() => {
  'use strict';
  const names = {
    c: 'C', cpp: 'C++', 'c++': 'C++', cxx: 'C++',
    python: 'Python', py: 'Python', javascript: 'JavaScript', js: 'JavaScript',
    typescript: 'TypeScript', ts: 'TypeScript', bash: 'Bash', sh: 'Shell',
    shell: 'Shell', zsh: 'Zsh', console: 'Console', plaintext: 'Text',
    text: 'Text', txt: 'Text', html: 'HTML', css: 'CSS', json: 'JSON',
    yaml: 'YAML', yml: 'YAML', ruby: 'Ruby', rust: 'Rust', go: 'Go',
    java: 'Java', php: 'PHP', sql: 'SQL', asm: 'Assembly', nasm: 'Assembly'
  };
  document.querySelectorAll('.content pre').forEach(pre => {
    if (pre.closest('.code-panel, .post-mermaid, .mermaid') ||
        pre.querySelector('table, .lineno')) return;
    const code = pre.querySelector(':scope > code');
    if (!code) return;
    let language = '';
    let element = code;
    while (element && !element.classList.contains('content')) {
      const match = [...element.classList].find(name => name.startsWith('language-'));
      if (match && !language) language = match.slice(9).toLowerCase();
      if (element.classList.contains('language-mermaid')) return;
      element = element.parentElement;
    }
    if (language === 'mermaid') return;
    const label = names[language] || language || 'Text';
    let source = pre;
    const rouge = pre.closest('div.highlighter-rouge');
    const highlight = pre.closest('div.highlight');
    if (rouge && rouge.querySelectorAll('pre').length === 1) source = rouge;
    else if (highlight && highlight.children.length === 1) source = highlight;
    const panel = document.createElement('div');
    panel.className = 'code-panel';
    const header = document.createElement('div');
    header.className = 'code-panel-header';
    const badge = document.createElement('span');
    badge.className = 'code-language';
    badge.textContent = label;
    header.append(badge);
    const body = document.createElement('div');
    body.className = 'code-panel-body';
    const gutter = document.createElement('div');
    gutter.className = 'code-line-numbers';
    gutter.setAttribute('aria-hidden', 'true');
    const text = code.textContent.replace(/\r\n?/g, '\n');
    const count = Math.max(1, text.split('\n').length - (text.endsWith('\n') ? 1 : 0));
    const numbers = document.createDocumentFragment();
    for (let i = 1; i <= count; i++) {
      const line = document.createElement('span');
      line.textContent = String(i);
      numbers.append(line);
    }
    gutter.append(numbers);
    source.before(panel);
    body.append(gutter, pre);
    panel.append(header, body);
    if (source !== pre) source.remove();
    pre.tabIndex = 0;
    pre.setAttribute('aria-label', label + ' 코드');
  });
})();
