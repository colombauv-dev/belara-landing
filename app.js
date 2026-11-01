(function(){
  var root=document.querySelector('.belara-lp'); if(!root) return;
  // Aparición con scroll (difuminado)
  var rm=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !rm){
    root.classList.add('bl-js');
    var groups=new Map();
    root.querySelectorAll('.bl-reveal').forEach(function(el){
      if(el.hasAttribute('data-tl')) return;
      var p=el.parentElement, k=groups.get(p)||0; groups.set(p,k+1);
      if(k) el.style.transitionDelay=(Math.min(k,6)*0.12)+'s';
    });
    var io=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('bl-in'); io.unobserve(e.target);} });},{threshold:0.15, rootMargin:'0px 0px -8% 0px'});
    root.querySelectorAll('.bl-reveal').forEach(function(el){ io.observe(el); });
  }
  // Chats animados
  var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var n=0;
  function flags(n){
    var h=n%14, a=n%13;
    return {h1:h>=1,hT1:h>=2&&h<3,h2:h>=3,h3:h>=5,hT2:h>=6&&h<7,h4:h>=7,h5:h>=8,
            a1:a>=1,aT1:a>=2&&a<3,a2:a>=3,a3:a>=5,aT2:a>=6&&a<7,a4:a>=7};
  }
  var nodes=root.querySelectorAll('[data-show]');
  function tick(){
    var f=reduce?flags(20):flags(n);
    if(reduce){f.hT1=f.hT2=f.aT1=f.aT2=false; f.h1=f.h2=f.h3=f.h4=f.h5=f.a1=f.a2=f.a3=f.a4=true;}
    nodes.forEach(function(el){ var on=!!f[el.getAttribute('data-show')]; var want=on?'contents':'none'; if(el.style.display!==want) el.style.display=want; });
    n++;
  }
  tick(); if(!reduce) setInterval(tick,1000);
})();
