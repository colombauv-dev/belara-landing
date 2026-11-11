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

/* ===== Diagnóstico de respuesta (2 minutos) ===== */
(function(){
  // Configuración: reemplaza estos valores cuando estén listos.
  var CONFIG={
    webhook:'URL_WEBHOOK',   // Webhook de entrada de GHL que recibe cada contacto
    agenda:'URL_AGENDA',     // Enlace del calendario de reuniones (GHL)
    agente:'URL_AGENTE'      // Enlace de WhatsApp del agente de Belara
  };
  function set(u){ return u && u.indexOf('URL_')!==0; }

  var root=document.querySelector('.belara-lp'); if(!root) return;
  var modal=root.querySelector('#bl-diag'); if(!modal) return;
  var body=modal.querySelector('.bl-diag-body');

  // Preguntas. "k" identifica la respuesta; "p" son los puntos (0 a 3) cuando la pregunta puntúa.
  var Q=[
    {id:'profesionales',t:'¿Cuántas profesionales atienden en tu clínica?',h:'Médicas, enfermeras, cosmetólogas.',o:['1','2 o 3','4 o 5','6 o más']},
    {id:'consultas',t:'¿Cuántas consultas nuevas reciben al mes por WhatsApp e Instagram?',h:'Una estimación basta.',o:['Menos de 50','Entre 50 y 150','Entre 150 y 300','Más de 300'],v:[30,100,225,400]},
    {id:'ticket',t:'¿Cuánto vale en promedio un tratamiento en tu clínica?',h:'Por sesión o procedimiento, en pesos chilenos.',o:['Menos de $80.000','Entre $80.000 y $150.000','Entre $150.000 y $300.000','Más de $300.000'],v:[60000,115000,225000,350000]},
    {id:'quien',t:'¿Quién responde hoy los mensajes de pacientes?',o:['Una recepcionista dedicada','La profesional, entre paciente y paciente','Quien pueda, cuando puede','Un asistente automático'],p:[3,1,0,2]},
    {id:'tiempo',t:'En horario de atención, ¿cuánto tardan normalmente en responder?',o:['Menos de 5 minutos','Entre 5 y 30 minutos','Entre 30 minutos y 2 horas','Más de 2 horas'],p:[3,2,1,0]},
    {id:'noche',t:'Un mensaje llega un viernes a las 22:00. ¿Cuándo se responde?',o:['Esa misma noche','El sábado','El lunes','Depende de la semana'],p:[3,2,0,1]},
    {id:'precio',t:'Cuando preguntan un precio, ¿qué suelen responder?',o:['El valor o un rango, y proponemos un horario','El valor, sin proponer horario','Que venga a una evaluación, sin dar valor','Depende de quién responda'],p:[3,1,1,0]},
    {id:'seguimiento',t:'Si alguien pregunta y no agenda, ¿le vuelven a escribir?',o:['Siempre, en uno o dos días','A veces, si hay tiempo','No'],p:[3,1,0]},
    {id:'recordatorio',t:'¿Envían recordatorio de la cita el día antes?',o:['Sí, automático','Sí, a mano','A veces','No'],p:[3,2,1,0]},
    {id:'retoques',t:'¿Avisan a cada paciente cuando le toca su retoque?',h:'Por ejemplo, la toxina cada 4 a 6 meses.',o:['Sí, de forma automática','A veces, a mano','No'],p:[3,1,0]}
  ];
  var FUGAS={
    noche:['Las consultas de noche y fin de semana esperan','Es cuando más escriben las pacientes, y la respuesta llega horas después.'],
    tiempo:['Respuestas que tardan en horario de atención','Quien compara clínicas suele quedarse con la que responde primero.'],
    quien:['Tu equipo responde entre paciente y paciente','Cuando la profesional está en box, los mensajes esperan.'],
    seguimiento:['Quien no agenda en el primer mensaje se olvida','Un mensaje a las 48 horas recupera parte de esas consultas.'],
    precio:['La conversación no avanza hacia la cita','Dar el valor sin proponer un horario deja la decisión en el aire.'],
    retoques:['Retoques que nadie recuerda','Si nadie avisa, el retoque se hace en otra clínica.'],
    recordatorio:['Citas sin recordatorio','Sin aviso el día antes aumentan las inasistencias y los huecos en la agenda.']
  };
  var ORDEN=['noche','tiempo','quien','seguimiento','precio','retoques','recordatorio'];

  var st, lastFocus;
  function reset(){ st={i:-1,a:{},lead:null,sent:false}; }
  function esc(x){ return String(x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function clp(n){
    if(n>=1e6){ return '$'+(Math.round(n/1e5)/10).toLocaleString('es-CL')+' millones'; }
    return '$'+(Math.round(n/1e3)*1e3).toLocaleString('es-CL');
  }

  function rango(b,a){
    if(b>=1e6) return 'Entre $'+(Math.round(b/1e5)/10).toLocaleString('es-CL')+' y $'+(Math.round(a/1e5)/10).toLocaleString('es-CL')+' millones';
    return 'Entre '+clp(b)+' y '+clp(a);
  }
  function calc(){
    var a=st.a, sum=0, max=0, pts={};
    Q.forEach(function(q){ if(q.p){ var s=q.p[a[q.id]]; pts[q.id]=s; sum+=s; max+=3; } });
    var score=Math.round(sum/max*100);
    var fugas=ORDEN.filter(function(k){return pts[k]<3;})
      .sort(function(x,y){return pts[x]-pts[y] || ORDEN.indexOf(x)-ORDEN.indexOf(y);}).slice(0,3);
    var vel=(pts.quien+pts.tiempo+pts.noche)/9;
    var riesgo=Math.min(0.8,Math.max(0.1,1-vel));
    var cons=Q[1].v[a.consultas], tick=Q[2].v[a.ticket];
    var bajo=cons*riesgo*0.2*tick*12, alto=cons*riesgo*0.4*tick*12;
    return {score:score,fugas:fugas,bajo:bajo,alto:alto};
  }

  function render(){
    var h='';
    if(st.i<0){
      h='<p class="bl-eb">Diagnóstico de respuesta · gratis</p>'+
        '<h3>¿Tu clínica responde a tiempo?</h3>'+
        '<p>10 preguntas sobre cómo atiendes hoy los mensajes de tus pacientes. Toma 2 minutos y al final recibes:</p>'+
        '<ul class="bl-diag-list">'+
        '<li><span class="bl-diag-tag">0–100</span>Tu índice de respuesta</li>'+
        '<li><span class="bl-diag-tag">Top 3</span>Dónde se enfrían tus consultas</li>'+
        '<li><span class="bl-diag-tag">$</span>Cuánto podría estar en juego al año</li>'+
        '<li><span class="bl-diag-tag">Gratis</span>Una reunión para revisarlo con tu equipo</li></ul>'+
        '<div class="bl-diag-row"><span></span><button type="button" class="bl-btn" data-act="start">Empezar diagnóstico</button></div>';
    } else if(st.i<Q.length){
      var q=Q[st.i], sel=st.a[q.id];
      h='<div class="bl-diag-bar" aria-hidden="true"><span style="width:'+Math.round((st.i)/Q.length*100)+'%"></span></div>'+
        '<p class="bl-eb">Pregunta '+(st.i+1)+' de '+Q.length+'</p>'+
        '<h3 id="bl-diag-q">'+esc(q.t)+'</h3>'+(q.h?'<p class="bl-help">'+esc(q.h)+'</p>':'')+
        '<div class="bl-diag-opts" role="group" aria-labelledby="bl-diag-q">'+
        q.o.map(function(o,j){return '<button type="button" class="bl-diag-opt" data-opt="'+j+'" aria-pressed="'+(sel===j)+'">'+esc(o)+'</button>';}).join('')+
        '</div><div class="bl-diag-row"><button type="button" class="bl-link" data-act="back">'+(st.i?'Atrás':'Volver al inicio')+'</button>'+
        (sel!==undefined?'<button type="button" class="bl-btn" data-act="next">'+(st.i===Q.length-1?'Ver resultado':'Siguiente')+'</button>':'')+'</div>';
    } else {
      var r=calc(), titulo=r.score>=80?'Tu clínica responde a tiempo.':r.score>=50?'Respondes, pero se te escapan consultas.':'Muchas consultas se enfrían antes de la cita.';
      h='<p class="bl-eb">Tu resultado</p><h3>'+titulo+'</h3>'+
        '<div class="bl-diag-score"><b>'+r.score+'</b><span>/ 100 · índice de respuesta</span></div>'+
        '<div class="bl-diag-meter" aria-hidden="true"><span style="width:'+r.score+'%"></span></div>';
      if(r.fugas.length){
        h+='<p class="bl-diag-h">Dónde se enfrían tus consultas</p>'+r.fugas.map(function(k){return '<div class="bl-diag-fuga"><strong>'+FUGAS[k][0]+'</strong><p>'+FUGAS[k][1]+'</p></div>';}).join('');
      } else {
        h+='<p style="margin-top:16px">No vemos fugas importantes en tus respuestas. El test de respuesta gratis lo confirma con consultas reales.</p>';
      }
      h+='<div class="bl-diag-box'+(st.lead?'':' bl-diag-locked')+'"><p class="bl-eb">Ingreso que podría estar en juego al año</p>'+
         '<p class="bl-diag-money">'+(st.lead?rango(r.bajo,r.alto):'Entre $00,0 y $00,0 millones')+'</p>'+
         '<p style="font-size:13px">Estimación orientativa según tus respuestas: consultas que se responden tarde, de las que entre un 20 y un 40 % no llega a agendar.</p></div>';
      if(!st.lead){
        h+='<p class="bl-diag-h">Recibe tu estimación y revisémosla juntas</p>'+
          '<form class="bl-diag-form" novalidate>'+
          '<label>Tu nombre<input name="nombre" autocomplete="name" required></label>'+
          '<label>Clínica<input name="clinica" autocomplete="organization" required></label>'+
          '<label>WhatsApp<input name="whatsapp" type="tel" autocomplete="tel" placeholder="+56 9" required></label>'+
          '<label>Correo<input name="email" type="email" autocomplete="email"></label>'+
          '<label class="bl-full">¿Qué agenda usan hoy?<select name="agenda"><option value="">Elige una opción</option><option>Google Calendar</option><option>AgendaPro</option><option>Reservo</option><option>Otra</option><option>Cuaderno o WhatsApp</option></select></label>'+
          '<label class="bl-check bl-full"><input type="checkbox" name="ok" required>Acepto que Belara use estos datos para enviarme el resultado y contactarme sobre este diagnóstico.</label>'+
          '<p class="bl-diag-err bl-full" role="alert"></p>'+
          '<div class="bl-full"><button type="submit" class="bl-btn">Ver mi estimación</button></div></form>';
      } else {
        h+='<p class="bl-diag-h">Gracias, '+esc(st.lead.nombre.split(' ')[0])+'.</p><p>Te escribiremos para revisar el resultado contigo. Si prefieres, elige ya un horario o pide el test con consultas reales:</p>'+
          '<div class="bl-diag-row" style="justify-content:flex-start">'+
          (set(CONFIG.agenda)?'<a class="bl-btn" href="'+CONFIG.agenda+'" target="_blank" rel="noopener">Agenda una reunión de 20 min</a>':'')+
          (set(CONFIG.agente)?'<a class="bl-btn bl-btn2" href="'+CONFIG.agente+'" target="_blank" rel="noopener">Pide tu test de respuesta gratis</a>':'')+
          '</div>';
      }
      h+='<p class="bl-diag-note">Resultado orientativo, basado en tus respuestas. El test de respuesta gratis lo mide con consultas reales.</p>'+
         '<div class="bl-diag-row"><button type="button" class="bl-link" data-act="restart">Repetir diagnóstico</button></div>';
    }
    body.innerHTML=h;
    var f=body.querySelector('.bl-diag-opt[aria-pressed="true"]')||body.querySelector('button.bl-btn, .bl-diag-opt, input');
    if(f) f.focus({preventScroll:true});
    modal.querySelector('.bl-diag-panel').scrollTop=0;
  }

  function send(lead){
    var r=calc(), data={
      fuente:'diagnostico-web', fecha:new Date().toISOString(),
      nombre:lead.nombre, clinica:lead.clinica, telefono:lead.whatsapp, email:lead.email, agenda:lead.agenda,
      puntaje:r.score, fugas:r.fugas.map(function(k){return FUGAS[k][0];}).join(' | '),
      estimacion_baja:Math.round(r.bajo), estimacion_alta:Math.round(r.alto)
    };
    Q.forEach(function(q){ data['r_'+q.id]=q.o[st.a[q.id]]; });
    if(!set(CONFIG.webhook)) return;
    try{
      fetch(CONFIG.webhook,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString(),keepalive:true});
    }catch(e){}
  }

  function open(){ lastFocus=document.activeElement; reset(); modal.hidden=false; document.documentElement.style.overflow='hidden'; render(); }
  function close(){ modal.hidden=true; document.documentElement.style.overflow=''; if(lastFocus&&lastFocus.focus) lastFocus.focus(); }

  root.addEventListener('click',function(e){
    var t=e.target.closest('[data-diag]'); if(t){ e.preventDefault(); open(); return; }
    if(e.target.closest('[data-diag-close]')){ close(); return; }
    var o=e.target.closest('.bl-diag-opt');
    if(o){ var q=Q[st.i]; st.a[q.id]=+o.getAttribute('data-opt'); render();
      setTimeout(function(){ if(st.i<Q.length && st.a[Q[st.i].id]!==undefined && Q[st.i].id===q.id){ st.i++; render(); } },260); return; }
    var a=e.target.closest('[data-act]'); if(!a) return;
    var act=a.getAttribute('data-act');
    if(act==='start'||act==='next'){ st.i++; render(); }
    else if(act==='back'){ st.i--; render(); }
    else if(act==='restart'){ reset(); st.i=0; render(); }
  });
  root.addEventListener('submit',function(e){
    var f=e.target.closest('.bl-diag-form'); if(!f) return; e.preventDefault();
    var g=function(n){ return (f.elements[n].value||'').trim(); }, err=f.querySelector('.bl-diag-err');
    var tel=g('whatsapp').replace(/[^\d+]/g,'');
    if(!g('nombre')||!g('clinica')){ err.textContent='Completa tu nombre y el de tu clínica.'; return; }
    if(tel.replace(/\D/g,'').length<8){ err.textContent='Revisa tu número de WhatsApp.'; return; }
    if(g('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g('email'))){ err.textContent='Revisa tu correo.'; return; }
    if(!f.elements.ok.checked){ err.textContent='Necesitamos tu autorización para contactarte.'; return; }
    st.lead={nombre:g('nombre'),clinica:g('clinica'),whatsapp:tel,email:g('email'),agenda:g('agenda')};
    send(st.lead); render();
  });
  document.addEventListener('keydown',function(e){
    if(modal.hidden) return;
    if(e.key==='Escape'){ close(); return; }
    if(e.key==='Tab'){
      var els=[].slice.call(modal.querySelectorAll('button, a[href], input, select')).filter(function(x){return x.offsetParent!==null;});
      if(!els.length) return; var first=els[0], last=els[els.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });
  if(location.hash==='#diagnostico') open();
})();
