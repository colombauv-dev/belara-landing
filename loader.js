/* Belara · cargador de la landing para GHL. No hace falta tocar este archivo. */
(function(){
  var BASE='https://colombauv-dev.github.io/belara-landing/';
  var box=document.getElementById('belara-landing'); if(!box) return;
  for(var el=box.parentElement; el && el!==document.body && el!==document.documentElement; el=el.parentElement){
    ['padding-top','padding-bottom','margin-top','margin-bottom'].forEach(function(p){ el.style.setProperty(p,'0','important'); });
    el.style.setProperty('min-height','0','important');
  }
  document.documentElement.style.setProperty('background','#40372F'); document.body.style.setProperty('background','#40372F'); document.body.style.setProperty('margin','0','important');
  (function(){ // Favicon de Belara (reemplaza el de GHL)
    var B='https://colombauv-dev.github.io/belara-landing/';
    document.querySelectorAll('link[rel~="icon"],link[rel="apple-touch-icon"],link[rel="shortcut icon"]').forEach(function(l){ l.parentNode.removeChild(l); });
    [['icon','image/png','32x32','favicon-32.png'],['icon','image/png','16x16','favicon-16.png'],['icon','image/png','192x192','favicon-192.png'],['apple-touch-icon','image/png','180x180','apple-touch-icon.png']].forEach(function(a){
      var l=document.createElement('link'); l.rel=a[0]; l.type=a[1]; l.sizes=a[2]; l.href=B+a[3]; document.head.appendChild(l);
    });
  })();
  var v='?v='+Date.now();
  fetch(BASE+'landing.html'+v,{cache:'no-store'}).then(function(r){return r.text();}).then(function(html){
    box.innerHTML=html;
    var s=document.createElement('script'); s.src=BASE+'app.js'+v; document.body.appendChild(s);
  }).catch(function(){ box.innerHTML='<p style="font-family:sans-serif;padding:24px">No se pudo cargar la página. Recarga en unos segundos.</p>'; });
})();
