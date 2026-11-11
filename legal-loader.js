/* Belara · cargador de las páginas legales para GHL. No hace falta tocar este archivo.
   Uso en GHL (elemento de Código personalizado):
   <div id="belara-legal" data-doc="privacidad"></div>   (o data-doc="terminos")
   <script src="https://colombauv-dev.github.io/belara-landing/legal-loader.js"></script> */
(function(){
  var BASE='https://colombauv-dev.github.io/belara-landing/';
  var LOGO='https://assets.cdn.filesafe.space/LvhyaT8Bnb5KncPj1vys/media/6ae76f9b36aa4a07e8bf9ff5.png';
  var box=document.getElementById('belara-legal'); if(!box) return;
  var doc=box.getAttribute('data-doc')==='terminos'?'terminos':'privacidad';
  var KEY='belara-prefs';

  function prefs(){ try{ return JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ return {}; } }
  function pais(){
    try{ var q=(new URLSearchParams(location.search).get('pais')||'').toLowerCase(); if(q==='cl'||q==='es') return q; }catch(e){}
    var p=prefs(); if(p.cur==='EUR') return 'es'; if(p.cur==='CLP') return 'cl';
    try{ if((Intl.DateTimeFormat().resolvedOptions().timeZone||'').indexOf('Europe/')===0) return 'es'; }catch(e){}
    return 'cl';
  }

  if(!document.getElementById('bl-legal-fonts')){
    var l=document.createElement('link'); l.id='bl-legal-fonts'; l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(l);
  }
  var css='\
.belara-legal{position:relative;width:100vw;max-width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;box-sizing:border-box;background:#F2EEEB;color:#40372F;font-family:Inter,system-ui,sans-serif}\
.belara-legal *{box-sizing:border-box}\
.belara-legal .bl-lh{background:#40372F;padding:16px 24px}\
.belara-legal .bl-lh-in{max-width:880px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 20px}\
.belara-legal .bl-lh img{height:22px;width:auto;display:block}\
.belara-legal .bl-lh-r{display:flex;align-items:center;gap:16px;flex-wrap:wrap}\
.belara-legal .bl-back{color:#F2EEEB;font-size:14px;font-weight:500;text-decoration:none;border-bottom:1px solid #F7E08F;padding-bottom:2px}\
.belara-legal .bl-seg{display:inline-flex;border:1px solid #D9D2CC;border-radius:999px;padding:2px}\
.belara-legal .bl-seg button{appearance:none;-webkit-appearance:none;background:transparent;border:0;border-radius:999px;color:#F2EEEB;font:600 12px/1 Inter,system-ui,sans-serif;letter-spacing:.04em;padding:0 12px;min-height:30px;cursor:pointer}\
.belara-legal .bl-seg button[aria-pressed="true"]{background:#F2EEEB;color:#40372F}\
.belara-legal .bl-seg button:focus-visible{outline:2px solid #F7E08F;outline-offset:2px}\
.belara-legal main{padding:64px 24px 80px}\
.belara-legal .bl-doc{max-width:760px;margin:0 auto;font-size:16px;line-height:1.65;color:#40372F}\
.belara-legal .bl-doc-eb{margin:0 0 12px;font-weight:500;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#736558}\
.belara-legal h1{margin:0 0 12px;font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:clamp(36px,5vw,52px);line-height:1.08}\
.belara-legal h2{margin:44px 0 12px;font-family:Inter,system-ui,sans-serif;font-weight:600;font-size:21px;line-height:1.3;scroll-margin-top:24px}\
.belara-legal p{margin:0 0 14px;color:#40372F}\
.belara-legal ul{margin:0 0 14px;padding-left:20px}\
.belara-legal li{margin:0 0 8px}\
.belara-legal a{color:#40372F;text-decoration:underline;text-decoration-color:#F7E08F;text-decoration-thickness:2px;text-underline-offset:3px}\
.belara-legal .bl-doc-meta{font-size:14px;color:#736558}\
.belara-legal .bl-doc-pais-note{background:#FBF9F7;border:1px solid #D9D2CC;border-radius:12px;padding:12px 16px;font-size:15px}\
.belara-legal table{width:100%;border-collapse:collapse;margin:0 0 16px;font-size:15px}\
.belara-legal th,.belara-legal td{text-align:left;vertical-align:top;padding:10px 12px;border-bottom:1px solid #D9D2CC}\
.belara-legal th{font-weight:600;background:#FBF9F7}\
.belara-legal .bl-pend{background:#F7E08F;padding:0 4px;border-radius:4px}\
.belara-legal.bl-pais-cl [data-pais="es"],.belara-legal.bl-pais-es [data-pais="cl"]{display:none !important}\
.belara-legal .bl-lf{background:#40372F;color:#D9D2CC;padding:40px 24px;font-size:14px}\
.belara-legal .bl-lf-in{max-width:880px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px}\
.belara-legal .bl-lf a{color:#D9D2CC;text-decoration-color:#A69B8D}\
.belara-legal .bl-lf nav{display:flex;flex-wrap:wrap;gap:20px}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var wrap=document.createElement('div'); wrap.className='belara-legal'; wrap.setAttribute('lang','es');
  wrap.innerHTML='<header class="bl-lh"><div class="bl-lh-in">'+
    '<a href="/" aria-label="Belara, inicio"><img src="'+LOGO+'" alt="Belara"></a>'+
    '<div class="bl-lh-r"><div class="bl-seg" role="group" aria-label="País"><button type="button" data-p="cl">Chile</button><button type="button" data-p="es">España</button></div>'+
    '<a class="bl-back" href="/">Volver a la web</a></div></div></header>'+
    '<main><p style="text-align:center;color:#736558">Cargando…</p></main>'+
    '<footer class="bl-lf"><div class="bl-lf-in"><span>© 2026 Belara · Agentes de IA para clínicas estéticas</span>'+
    '<nav aria-label="Legal"><a href="/politica-de-privacidad">Privacidad</a><a href="/terminos-y-condiciones">Términos</a><a href="/terminos-y-condiciones#aviso-legal">Aviso legal</a><a href="mailto:contacto@belaralab.com">contacto@belaralab.com</a></nav></div></footer>';
  box.innerHTML=''; box.appendChild(wrap);

  function setPais(p,save){
    wrap.classList.remove('bl-pais-cl','bl-pais-es'); wrap.classList.add('bl-pais-'+p);
    wrap.setAttribute('lang',p==='es'?'es-ES':'es-CL');
    wrap.querySelectorAll('[data-p]').forEach(function(b){ b.setAttribute('aria-pressed',String(b.getAttribute('data-p')===p)); });
    if(save){ try{ var x=prefs(); x.cur=(p==='es'?'EUR':'CLP'); localStorage.setItem(KEY,JSON.stringify(x)); }catch(e){} }
  }
  wrap.addEventListener('click',function(e){ var b=e.target.closest('[data-p]'); if(b) setPais(b.getAttribute('data-p'),true); });
  setPais(pais(),false);

  fetch(BASE+'legal/'+doc+'.html?v='+Date.now(),{cache:'no-store'}).then(function(r){ if(!r.ok) throw 0; return r.text(); }).then(function(html){
    wrap.querySelector('main').innerHTML=html;
    if(location.hash){ var t=document.getElementById(location.hash.slice(1)); if(t) setTimeout(function(){ t.scrollIntoView(); },50); }
  }).catch(function(){
    wrap.querySelector('main').innerHTML='<p style="text-align:center">No se pudo cargar el documento. Recarga en unos segundos o escríbenos a contacto@belaralab.com.</p>';
  });
})();
