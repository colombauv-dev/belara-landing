/* Belara · página "Agenda tu demo" para GHL (belaralab.com/agenda). No hace falta tocar este archivo.
   Uso en GHL (elemento de Código personalizado):
   <div id="belara-agenda"></div>
   <script src="https://colombauv-dev.github.io/belara-landing/agenda-loader.js"></script> */
(function(){
  var BASE='https://colombauv-dev.github.io/belara-landing/';
  var LOGO='https://assets.cdn.filesafe.space/LvhyaT8Bnb5KncPj1vys/media/6ae76f9b36aa4a07e8bf9ff5.png';
  var CAL='gnVh8oI6EpucDt9Msj8Q';
  var box=document.getElementById('belara-agenda'); if(!box) return;

  // Quita los márgenes que GHL pone alrededor del bloque de código
  for(var el=box.parentElement; el && el!==document.body && el!==document.documentElement; el=el.parentElement){
    ['padding-top','padding-bottom','margin-top','margin-bottom'].forEach(function(p){ el.style.setProperty(p,'0','important'); });
    el.style.setProperty('min-height','0','important');
  }
  document.documentElement.style.setProperty('background','#40372F'); document.body.style.setProperty('background','#40372F'); document.body.style.setProperty('margin','0','important');

  // Favicon de Belara
  document.querySelectorAll('link[rel~="icon"],link[rel="apple-touch-icon"]').forEach(function(l){ l.parentNode.removeChild(l); });
  [['icon','32x32','favicon-32.png'],['icon','16x16','favicon-16.png'],['icon','192x192','favicon-192.png'],['apple-touch-icon','180x180','apple-touch-icon.png']].forEach(function(a){
    var l=document.createElement('link'); l.rel=a[0]; l.type='image/png'; l.sizes=a[1]; l.href=BASE+a[2]; document.head.appendChild(l);
  });

  // Idioma y variante: ?lang= / ?cur=, si no las preferencias guardadas en la web, si no el navegador
  var P={lang:'es',cur:'CLP'};
  try{ var s=JSON.parse(localStorage.getItem('belara-prefs'))||{}; if(s.lang) P.lang=s.lang; if(s.cur) P.cur=s.cur; else if((Intl.DateTimeFormat().resolvedOptions().timeZone||'').indexOf('Europe/')===0) P.cur='EUR';
    if(!s.lang && ((navigator.languages&&navigator.languages[0])||navigator.language||'').toLowerCase().indexOf('en')===0) P.lang='en'; }catch(e){}
  try{ var q=new URLSearchParams(location.search), ql=(q.get('lang')||'').toLowerCase(), qc=(q.get('cur')||'').toUpperCase();
    if(ql==='es'||ql==='en') P.lang=ql; if(qc==='CLP'||qc==='EUR') P.cur=qc; }catch(e){}

  var T={
    es:{eb:'Demo gratuita',h1:'Agenda tu demo con Belara.',lead:'Te mostramos cómo funciona Sistema Belara con los tratamientos y la agenda de tu clínica, y resolvemos tus dudas. Elige el horario que te acomode.',p1:'Sin compromiso',p2:'Por videollamada',p3:'Con ejemplos de tu clínica',note:'Los horarios se muestran en tu zona horaria.',back:'Volver a la web',foot:'Belara · Agentes de IA para clínicas estéticas',priv:'Privacidad',terms:'Términos',title:'Agenda tu demo · Belara',lang:'es-CL'},
    en:{eb:'Free demo',h1:'Book your demo with Belara.',lead:'We show you how Sistema Belara works with your clinic\'s treatments and calendar, and answer your questions. Pick a time that suits you.',p1:'No commitment',p2:'By video call',p3:'With examples from your clinic',note:'Times are shown in your time zone.',back:'Back to the website',foot:'Belara · AI agents for aesthetic clinics',priv:'Privacy',terms:'Terms',title:'Book your demo · Belara',lang:'en'}
  };
  var t=P.lang==='en'?T.en:T.es;
  if(P.lang!=='en' && P.cur==='EUR'){ t=Object.assign({},T.es,{h1:'Reserva tu demo con Belara.',lead:'Te enseñamos cómo funciona Sistema Belara con los tratamientos y la agenda de tu clínica, y resolvemos tus dudas. Elige el horario que mejor te vaya.',title:'Reserva tu demo · Belara',lang:'es-ES'}); }
  document.title=t.title;

  if(!document.getElementById('bl-agenda-fonts')){
    var f=document.createElement('link'); f.id='bl-agenda-fonts'; f.rel='stylesheet';
    f.href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(f);
  }
  var css='\
.belara-agenda{position:relative;width:100vw;max-width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;box-sizing:border-box;background:#F2EEEB;color:#40372F;font-family:Inter,system-ui,sans-serif}\
.belara-agenda *{box-sizing:border-box}\
.belara-agenda .ba-wrap{max-width:1000px;margin:0 auto}\
.belara-agenda .ba-h{background:#40372F;padding:18px 24px}\
.belara-agenda .ba-h .ba-wrap{display:flex;align-items:center;justify-content:space-between;gap:16px}\
.belara-agenda .ba-h img{height:22px;width:auto;display:block}\
.belara-agenda .ba-back{color:#F2EEEB;font-size:14px;font-weight:500;text-decoration:none;border-bottom:1px solid #F7E08F;padding-bottom:2px}\
.belara-agenda main{padding:64px 24px 80px}\
.belara-agenda .ba-eb{margin:0 0 16px;font-weight:500;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#736558}\
.belara-agenda h1{margin:0 0 16px;font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:clamp(34px,5vw,52px);line-height:1.08;color:#40372F}\
.belara-agenda .ba-lead{margin:0 0 28px;font-size:17px;line-height:1.6;color:#736558;max-width:640px}\
.belara-agenda ul{margin:0 0 40px;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:10px 28px}\
.belara-agenda li{display:flex;gap:10px;align-items:center;font-size:15px}\
.belara-agenda .ba-cal{background:#fff;border:1px solid #D9D2CC;border-radius:16px;padding:8px;overflow:hidden}\
.belara-agenda .ba-cal iframe{width:100%;min-height:720px;border:none;overflow:hidden;display:block}\
.belara-agenda .ba-note{margin:16px 0 0;font-size:13px;color:#736558}\
.belara-agenda .ba-f{background:#40372F;color:#D9D2CC;padding:32px 24px;font-size:14px}\
.belara-agenda .ba-f .ba-wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px}\
.belara-agenda .ba-f nav{display:flex;flex-wrap:wrap;gap:8px 20px}\
.belara-agenda .ba-f a{color:#D9D2CC}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var tick='<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#40372F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';
  var w=document.createElement('div'); w.className='belara-agenda'; w.setAttribute('lang',t.lang);
  w.innerHTML='<header class="ba-h"><div class="ba-wrap"><a href="/" aria-label="Belara"><img src="'+LOGO+'" alt="Belara"></a><a class="ba-back" href="/">'+t.back+'</a></div></header>'+
    '<main><div class="ba-wrap"><p class="ba-eb">'+t.eb+'</p><h1>'+t.h1+'</h1><p class="ba-lead">'+t.lead+'</p>'+
    '<ul><li>'+tick+t.p1+'</li><li>'+tick+t.p2+'</li><li>'+tick+t.p3+'</li></ul>'+
    '<div class="ba-cal"><iframe src="https://api.leadconnectorhq.com/widget/booking/'+CAL+'" scrolling="no" id="'+CAL+'_booking" title="Calendario de Belara"></iframe></div>'+
    '<p class="ba-note">'+t.note+'</p></div></main>'+
    '<footer class="ba-f"><div class="ba-wrap"><span>'+t.foot+'</span><nav><a href="/politica-de-privacidad">'+t.priv+'</a><a href="/terminos-y-condiciones">'+t.terms+'</a><a href="mailto:contacto@belaralab.com">contacto@belaralab.com</a></nav></div></footer>';
  box.innerHTML=''; box.appendChild(w);

  var s2=document.createElement('script'); s2.src='https://link.msgsndr.com/js/form_embed.js'; s2.type='text/javascript'; document.body.appendChild(s2);
})();
