/* Belara · cargador de la landing para GHL. No hace falta tocar este archivo. */
(function(){
  var BASE='https://colombauv-dev.github.io/belara-landing/';
  var box=document.getElementById('belara-landing'); if(!box) return;
  for(var el=box.parentElement; el && el!==document.body && el!==document.documentElement; el=el.parentElement){
    ['padding-top','padding-bottom','margin-top','margin-bottom'].forEach(function(p){ el.style.setProperty(p,'0','important'); });
    el.style.setProperty('min-height','0','important');
  }
  document.documentElement.style.setProperty('background','#40372F'); document.body.style.setProperty('background','#40372F'); document.body.style.setProperty('margin','0','important');
  var v='?v='+Date.now();
  fetch(BASE+'landing.html'+v,{cache:'no-store'}).then(function(r){return r.text();}).then(function(html){
    box.innerHTML=html;
    var s=document.createElement('script'); s.src=BASE+'app.js'+v; document.body.appendChild(s);
  }).catch(function(){ box.innerHTML='<p style="font-family:sans-serif;padding:24px">No se pudo cargar la página. Recarga en unos segundos.</p>'; });
})();
