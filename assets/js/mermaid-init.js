// Only Mermaid blocks are processed; ordinary code blocks stay untouched.
(async function () {
  const codes = [...document.querySelectorAll(
    '.content pre > code.language-mermaid, .content .language-mermaid pre > code'
  )];
  if (!codes.length) return;
  const entries = codes.map(code => {
    const pre = code.parentElement;
    const wrapper = pre.closest('.highlighter-rouge');
    const original = wrapper && wrapper.querySelectorAll('pre').length === 1
      ? wrapper : pre;
    const output = document.createElement('div');
    output.className = 'post-mermaid';
    output.tabIndex = 0;
    output.setAttribute('role', 'region');
    output.setAttribute('aria-label', '다이어그램 — 넓은 그림은 좌우로 스크롤할 수 있습니다');
    output.hidden = true;
    const message = document.createElement('p');
    message.className = 'post-mermaid-status';
    message.setAttribute('role', 'status');
    message.textContent = '다이어그램을 불러오는 중입니다…';
    original.after(output, message);
    return { source: code.textContent, original, output, message };
  });
  try {
    const { default: mermaid } = await import(
      'https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.esm.min.mjs'
    );
    const root = document.documentElement;
    let busy = false;
    let pending = false;
    let serial = 0;
    async function render() {
      pending = true;
      if (busy) return;
      busy = true;
      try {
        while (pending) {
          pending = false;
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'strict',
            suppressErrorRendering: true,
            theme: root.dataset.theme === 'dark' ? 'dark' : 'default',
            fontFamily: '"Malgun Gothic", "Apple SD Gothic Neo", sans-serif',
            flowchart: { htmlLabels: false }
          });
          await document.fonts.ready;
          for (const entry of entries) {
            try {
              const { svg } = await mermaid.render(
                'nullbins-mermaid-' + (++serial), entry.source
              );
              entry.output.innerHTML = svg;
              const graphic = entry.output.querySelector('svg');
              // Preserve readable text; wide diagrams scroll inside their region.
              const width = graphic?.viewBox.baseVal.width;
              if (width) {
                graphic.style.width = Math.ceil(width) + 'px';
                graphic.style.maxWidth = 'none';
              }
              entry.original.hidden = true;
              entry.output.hidden = false;
              entry.message.hidden = true;
            } catch (error) {
              entry.original.hidden = false;
              entry.output.hidden = true;
              entry.message.hidden = false;
              entry.message.textContent = '다이어그램 문법을 확인해 주세요. 원본 코드를 표시합니다.';
              console.error('Mermaid:', error);
            }
          }
        }
      } finally { busy = false; }
    }
    new MutationObserver(render).observe(root, {
      attributes: true, attributeFilter: ['data-theme']
    });
    await render();
  } catch (error) {
    entries.forEach(entry => {
      entry.message.textContent = '다이어그램을 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.';
    });
    console.error('Mermaid loading:', error);
  }
})();