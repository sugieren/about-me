// 追加インタラクティブ要素: スクロール進捗バー, テーマトグル, 小さな泡エフェクト, セクション内の見出しアニメ

// スクロール進捗バー生成
(function(){
  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  Object.assign(bar.style, {
    position:'fixed', top:'0', left:'0', height:'4px', width:'0%', zIndex:9999,
    background:'linear-gradient(90deg,#4facfe,#00f2fe)', boxShadow:'0 0 8px rgba(0,200,255,0.6)', transition:'width 0.15s ease'
  });
  document.body.appendChild(bar);
  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const p = h>0 ? (scrollTop / h) * 100 : 0;
    bar.style.width = p + '%';
  };
  window.addEventListener('scroll', update, {passive:true});
  update();
})();

// テーマトグル (ライト/ディープブルー)
(function(){
  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.setAttribute('aria-label','テーマ切替');
  btn.innerHTML = '🌙';
  Object.assign(btn.style, {
    position:'fixed', right:'16px', bottom:'16px', zIndex:9999, border:'none',
    background:'rgba(0,0,30,0.55)', color:'#fff', padding:'12px 16px', cursor:'pointer',
    fontSize:'20px', borderRadius:'14px', backdropFilter:'blur(8px)',
    boxShadow:'0 4px 14px rgba(0,0,0,0.4)', transition:'transform .3s ease, background .3s'
  });
  btn.addEventListener('mouseenter',()=> btn.style.transform='scale(1.12)');
  btn.addEventListener('mouseleave',()=> btn.style.transform='scale(1)');
  document.body.appendChild(btn);
  const root = document.documentElement;
  const apply = mode => {
    if(mode==='light') {
      root.style.setProperty('--bg-main','linear-gradient(to bottom,#e2f5ff,#b8dcff,#89b8ff)');
      root.style.setProperty('--panel-bg','rgba(255,255,255,0.55)');
      root.style.setProperty('--panel-border','rgba(0,40,80,0.25)');
      root.style.setProperty('--text-main','#0f2540');
      root.style.setProperty('--text-sub','#274968');
  root.style.setProperty('--accent','#0077ff');
  root.style.setProperty('--accent-alt','#3399ff');
  root.style.setProperty('--accent-soft','rgba(0,119,255,0.18)');
  root.style.setProperty('--accent-soft2','rgba(0,119,255,0.05)');
  root.style.setProperty('--accent-border','rgba(0,119,255,0.25)');
  root.style.setProperty('--persona-bg','rgba(255,255,255,0.55)');
  root.style.setProperty('--persona-border','rgba(0,40,80,0.2)');
  root.style.setProperty('--persona-card-top','rgba(255,255,255,0.9)');
  root.style.setProperty('--persona-card-bottom','rgba(255,255,255,0.55)');
  root.style.setProperty('--persona-card-border','rgba(0,40,80,0.2)');
  root.style.setProperty('--persona-card-border-hover','rgba(0,40,80,0.4)');
  root.style.setProperty('--persona-badge-bg','#ff5a85');
  root.style.setProperty('--persona-badge-text','#0f2540');
  root.style.setProperty('--persona-short','#203a57');
  root.style.setProperty('--persona-features','#2d4d6a');
  root.style.setProperty('--persona-feature-bullet','#ff5a85');
  root.style.setProperty('--persona-detail-bg','rgba(255,255,255,0.65)');
  root.style.setProperty('--persona-detail-border','rgba(0,40,80,0.25)');
      btn.innerHTML='🌙';
    } else {
      root.style.setProperty('--bg-main','');
      root.style.setProperty('--panel-bg','rgba(0,0,40,0.42)');
      root.style.setProperty('--panel-border','rgba(255,255,255,0.28)');
      root.style.setProperty('--text-main','#f5f8fc');
      root.style.setProperty('--text-sub','#f0f4f8');
  root.style.setProperty('--accent','#87CEEB');
  root.style.setProperty('--accent-alt','#5faad0');
  root.style.setProperty('--accent-soft','rgba(135,206,235,0.18)');
  root.style.setProperty('--accent-soft2','rgba(135,206,235,0.05)');
  root.style.setProperty('--accent-border','rgba(135,206,235,0.25)');
  root.style.setProperty('--persona-bg','rgba(0,0,0,0.35)');
  root.style.setProperty('--persona-border','rgba(255,255,255,0.25)');
  root.style.setProperty('--persona-card-top','rgba(255,255,255,0.12)');
  root.style.setProperty('--persona-card-bottom','rgba(255,255,255,0.05)');
  root.style.setProperty('--persona-card-border','rgba(255,255,255,0.25)');
  root.style.setProperty('--persona-card-border-hover','rgba(255,255,255,0.45)');
  root.style.setProperty('--persona-badge-bg','#ff3366');
  root.style.setProperty('--persona-badge-text','#ffffff');
  root.style.setProperty('--persona-short','#f2f6fa');
  root.style.setProperty('--persona-features','#eaf2f9');
  root.style.setProperty('--persona-feature-bullet','#ff91c1');
  root.style.setProperty('--persona-detail-bg','rgba(0,0,0,0.4)');
  root.style.setProperty('--persona-detail-border','rgba(255,255,255,0.25)');
      btn.innerHTML='☀️';
    }
    localStorage.setItem('site-theme', mode);
  };
  let mode = localStorage.getItem('site-theme') || 'dark';
  apply(mode);
  btn.addEventListener('click',()=>{
    mode = (mode==='dark') ? 'light' : 'dark';
    apply(mode);
  });
})();

// 泡 (小) をマウス移動で生成
(function(){
  const area = document.body;
  let lastT = 0;
  area.addEventListener('pointermove', e => {
    const now = performance.now();
    if(now - lastT < 50) return; // 制限
    lastT = now;
    const b = document.createElement('span');
    b.className = 'cursor-bubble';
    const s = Math.random()*12 + 8;
    b.style.width = s+'px';
    b.style.height = s+'px';
    b.style.left = (e.pageX - s/2)+'px';
    b.style.top = (e.pageY - s/2)+'px';
    document.body.appendChild(b);
    setTimeout(()=> b.remove(), 1800);
  });
})();

// セクション見出しが表示域に入ったらフェードアップ
(function(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        ent.target.classList.add('in-view');
        observer.unobserve(ent.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('section h2').forEach(h => {
    h.classList.add('pre-animate');
    observer.observe(h);
  });
})();
