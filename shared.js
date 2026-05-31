// ── CHART DEFAULTS ──
if (typeof Chart !== 'undefined') {
  Chart.defaults.font.family = "'Mulish', sans-serif";
  Chart.defaults.font.size   = 12;
  Chart.defaults.plugins.legend.labels.boxWidth = 12;
  Chart.defaults.plugins.legend.labels.padding  = 16;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
}

const COLORS = {
  teal:'#0D9488', teal2:'#14B8A6', teala:'rgba(13,148,136,0.15)',
  coral:'#F97316', corala:'rgba(249,115,22,0.15)',
  green:'#16A34A', greena:'rgba(22,163,74,0.15)',
  violet:'#7C3AED', red:'#DC2626', gold:'#D97706'
};

let charts = {};
function destroyChart(id){ if(charts[id]){ charts[id].destroy(); delete charts[id]; } }
const fmt = n => { if(n>=10000000)return'₹'+(n/10000000).toFixed(2)+' Cr'; if(n>=100000)return'₹'+(n/100000).toFixed(2)+' L'; if(n>=1000)return'₹'+(n/1000).toFixed(1)+'K'; return'₹'+Math.round(n).toLocaleString('en-IN'); };
const fmtFull = n => '₹'+Math.round(n).toLocaleString('en-IN');
const el = id => document.getElementById(id);

function syncRange(inp,rng,dsp,fn){
  const i=el(inp),r=el(rng),d=el(dsp);
  if(!i||!r||!d)return;
  const u=()=>{d.textContent=fn(parseFloat(i.value)||0);r.value=i.value};
  i.addEventListener('input',u); r.addEventListener('input',()=>{i.value=r.value;u()}); u();
}

function makeDonut(id,labels,data,colors){
  destroyChart(id);
  const c = el(id); if(!c) return;
  charts[id]=new Chart(c.getContext('2d'),{
    type:'doughnut',
    data:{labels,datasets:[{data,backgroundColor:colors,borderWidth:0,hoverOffset:6}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'68%',
      plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>` ${c.label}: ${fmtFull(c.raw)}`}}},
      animation:{animateRotate:true,duration:800}}
  });
}

function makeBar(id,labels,datasets){
  destroyChart(id);
  const c=el(id); if(!c) return;
  charts[id]=new Chart(c.getContext('2d'),{
    type:'bar',data:{labels,datasets},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>` ${c.dataset.label}: ${fmtFull(c.raw)}`}}},
      scales:{x:{grid:{display:false},ticks:{font:{family:"'Mulish',sans-serif",weight:'600'}}},
              y:{grid:{color:'rgba(0,0,0,0.05)'},ticks:{callback:v=>fmt(v),font:{family:"'Mulish',sans-serif"}}}},
      animation:{duration:700}}
  });
}

function makeLine(id,labels,datasets){
  destroyChart(id);
  const c=el(id); if(!c) return;
  charts[id]=new Chart(c.getContext('2d'),{
    type:'line',data:{labels,datasets},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:'bottom'},tooltip:{mode:'index',intersect:false,callbacks:{label:c=>` ${c.dataset.label}: ${fmt(c.raw)}`}}},
      scales:{x:{grid:{display:false},ticks:{font:{family:"'Mulish',sans-serif",weight:'600'},maxTicksLimit:8}},
              y:{grid:{color:'rgba(0,0,0,0.05)'},ticks:{callback:v=>fmt(v),font:{family:"'Mulish',sans-serif"}}}},
      elements:{line:{tension:0.4},point:{radius:3,hoverRadius:6}},
      animation:{duration:900}}
  });
}

// FAQ toggle
function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.querySelector('.faq-q').addEventListener('click',()=>item.classList.toggle('open'));
  });
}

// Amortization toggle
function initAmortToggle(){
  document.querySelectorAll('.amort-toggle button').forEach(btn=>{
    btn.addEventListener('click',function(){
      const parent = this.closest('.amort-toggle');
      parent.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
      const wrap = this.closest('.amortization-section').querySelector('[data-amort-render]');
      if(wrap && wrap.dataset.amortRender){ window[wrap.dataset.amortRender](this.dataset.view); }
    });
  });
}
