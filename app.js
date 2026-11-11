/* Quita los márgenes y rellenos que GHL pone alrededor del bloque de código (espacio en blanco arriba) */
(function(){
  var box=document.getElementById('belara-landing'); if(!box) return;
  for(var el=box.parentElement; el && el!==document.body && el!==document.documentElement; el=el.parentElement){
    el.style.setProperty('padding-top','0','important'); el.style.setProperty('padding-bottom','0','important');
    el.style.setProperty('margin-top','0','important'); el.style.setProperty('margin-bottom','0','important');
    el.style.setProperty('min-height','0','important');
  }
  document.documentElement.style.setProperty('background','#40372F'); document.body.style.setProperty('background','#40372F');
  document.body.style.setProperty('margin','0','important');
})();
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

/* ===== Idioma (ES / EN) y moneda (CLP / EUR) ===== */
(function(){
  var root=document.querySelector('.belara-lp'); if(!root) return;
  // Textos de la página. Clave = texto original en español de Chile.
  var DICT={"en": {"Belara, inicio": "Belara, home", "Principal": "Main", "El problema": "The problem", "Nuestros Agentes": "Our agents", "Cómo funciona": "How it works", "Implementación": "Setup", "Preguntas": "FAQ", "Agenda tu demo": "Book your demo", "Agentes de IA para clínicas estéticas": "AI agents for aesthetic clinics", "Quien escribe de noche no espera hasta mañana.": "Someone who writes at night won't wait until morning.", "Agenda con la clínica que le responde primero.": "They book with the clinic that replies first.", "Sistema Belara responde en segundos en todos tus canales, agenda en tu calendario y avisa a cada paciente cuando le toca su retoque. Solo con información aprobada por tu clínica.": "Sistema Belara replies in seconds on all your channels, books into your calendar and reminds each patient when their touch-up is due. Only with information your clinic has approved.", "Diagnóstico en 2 minutos": "2-minute check-up", "Gratis: tu índice de respuesta, dónde se enfrían tus consultas y cuánto podría estar en juego al año.": "Free: your response score, where your enquiries go cold and how much could be at stake each year.", "Sin criterio médico": "No medical judgement", "Respuestas aprobadas por tu clínica": "Replies approved by your clinic", "Funciona con tu agenda actual": "Works with your current calendar", "Tu clínica": "Your clinic", "Belara en línea": "Belara online", "VIERNES · 23:14": "FRIDAY · 23:14", "Hola, ¿cuánto cuesta la toxina para la frente?": "Hi, how much is botox for the forehead?", "¡Hola! Te cuento el valor y lo que incluye la evaluación. ¿Te acomoda mañana a las 10:30 o 12:00?": "Hi! Here's the price and what the consultation includes. Does tomorrow at 10:30 or 12:00 work for you?", "10:30 porfa": "10:30 please", "Listo, quedó agendada mañana a las 10:30. Te recordaré el día antes.": "Done, you're booked for tomorrow at 10:30. I'll remind you the day before.", "Cita agendada en tu calendario · respondido en 8 s": "Appointment booked in your calendar · replied in 8 s", "La primera respuesta también es parte del cuidado": "The first reply is part of the care too", "Quien compara tratamientos le escribe a más de una clínica.": "People comparing treatments write to more than one clinic.", "Y suele quedarse con la que responde primero, con claridad y sin hacerla esperar.": "And they usually choose the one that replies first, clearly and without keeping them waiting.", "Consulta recibida fuera de horario.": "Enquiry received after hours.", "Belara responde en segundos.": "Belara replies in seconds.", "Tratamiento de interés identificado.": "Treatment of interest identified.", "Horario elegido por la persona.": "Time slot chosen by the patient.", "Cita agendada en el calendario de la clínica.": "Appointment booked in the clinic's calendar.", "5 meses después": "5 months later", "Aviso de retoque y nueva cita.": "Touch-up reminder and new appointment.", "Secuencia ilustrativa. Los tiempos dependen de la configuración de cada clínica.": "Illustrative sequence. Timings depend on each clinic's setup.", "El problema no es generar consultas": "Getting enquiries isn't the problem", "Muchas oportunidades se enfrían entre el primer mensaje y la cita.": "Many opportunities go cold between the first message and the appointment.", "Respuesta tardía": "Late replies", "Escriben de noche o el fin de semana y reciben respuesta horas o días después.": "They write at night or at the weekend and get a reply hours or days later.", "Tu equipo, entre el box y el celular": "Your team, torn between the treatment room and the phone", "La profesional responde entre paciente y paciente, o la recepción no da abasto.": "The practitioner replies between patients, or reception can't keep up.", "Seguimiento ausente": "No follow-up", "Quien no agenda en el primer mensaje queda olvidado en un chat.": "Anyone who doesn't book in the first message is forgotten in a chat.", "Retoques que se pierden": "Lost touch-ups", "Nadie avisa a tiempo a quien le toca su control o nueva sesión, y ese ingreso se va a otra clínica.": "Nobody reminds patients in time about their check-up or next session, and that revenue goes to another clinic.", "Sistema Belara": "Sistema Belara", "Dos agentes. Un solo recorrido, de la primera consulta al retoque.": "Two agents. One journey, from the first enquiry to the touch-up.", "Atención y agendamiento": "Replies and booking", "Responde en segundos en todos tus canales, resuelve las dudas habituales con la información que tu clínica aprobó y deja la cita en tu calendario.": "Replies in seconds on all your channels, answers common questions with the information your clinic approved and books the appointment into your calendar.", "Seguimiento": "Follow-up", "Recuerda la cita el día antes, retoma a quien no terminó de agendar y avisa a cada paciente cuando le toca su retoque, según el tratamiento que se hizo.": "Sends a reminder the day before, gets back to anyone who didn't finish booking and tells each patient when their touch-up is due, based on the treatment they had.", "Respondido por Belara": "Answered by Belara", "Hola, quisiera información sobre tratamientos para manchas en el rostro. Solo puedo después del trabajo.": "Hi, I'd like some information about treatments for dark spots on my face. I can only come after work.", "¡Hola! Con gusto te ayudo. ¿Sería tu primera valoración en la clínica?": "Hi! Happy to help. Would this be your first consultation with us?", "Sí, la primera.": "Yes, the first one.", "¡Perfecto! Para manchas trabajamos con distintas opciones, como peelings y láser. Cuál es la indicada para ti lo define la profesional en tu valoración. Tenemos horas después de las 18:00: ¿te acomoda más entre semana o el sábado?": "Great! For dark spots we offer different options, such as peels and laser. Which one is right for you is decided by the practitioner at your consultation. We have slots after 18:00: would a weekday or Saturday suit you better?", "Belara no recomienda tratamientos ni determina idoneidad clínica. Las preguntas médicas pasan a tu equipo.": "Belara doesn't recommend treatments or assess clinical suitability. Medical questions go to your team.", "Las conversaciones que más tiempo le quitan a tu equipo": "The conversations that take up most of your team's time", "Cada conversación avanza hacia una próxima acción clara.": "Every conversation moves towards a clear next step.", "Nuevas consultas": "New enquiries", "Atiende cada mensaje en todos tus canales, también de noche y el fin de semana.": "Handles every message on all your channels, including at night and at weekends.", "Preguntas frecuentes": "Frequently asked questions", "Responde sobre tratamientos, duración, preparación y valores aprobados por tu clínica.": "Answers questions about treatments, duration, preparation and prices approved by your clinic.", "Agendamiento": "Booking", "Propone horarios de tu calendario y deja la cita agendada.": "Offers times from your calendar and books the appointment.", "Resumen para tu equipo": "Summary for your team", "Deja anotado el tratamiento de interés, el horario preferido y el próximo paso.": "Notes the treatment of interest, preferred time and next step.", "Recuerda las citas y retoma a quien no terminó de agendar.": "Sends appointment reminders and gets back to anyone who didn't finish booking.", "Retoques": "Touch-ups", "Avisa a cada paciente cuando le toca volver, según su tratamiento.": "Tells each patient when it's time to come back, based on their treatment.", "No entregamos un chatbot genérico. Diseñamos un flujo para tu clínica.": "We don't hand over a generic chatbot. We design a flow for your clinic.", "De tu parte solo necesitamos tu tarifario y dos reuniones de 45 minutos. El resto lo hacemos nosotras.": "All we need from you is your price list and two 45-minute meetings. We do the rest.", "Información y accesos": "Information and access", "Reunimos los tratamientos, valores, horarios y accesos que tu clínica aprueba.": "We gather the treatments, prices, opening hours and access your clinic approves.", "Configuración y conexión": "Setup and connection", "Configuramos los agentes y los conectamos a tu calendario (Google Calendar o AgendaPro) y a tus canales.": "We set up the agents and connect them to your calendar (Google Calendar or AgendaPro) and your channels.", "Marcha blanca y activación": "Trial run and go-live", "Pruebas el agente, apruebas sus respuestas y recién ahí lo activamos.": "You test the agent, approve its replies, and only then do we switch it on.", "Mesón con agenda digital, celular y cuaderno": "Front desk with a digital calendar, phone and notebook", "Planes": "Plans", "Dos planes, según lo que necesita tu clínica.": "Two plans, depending on what your clinic needs.", "Esencial": "Essential", "Para responder y agendar al instante.": "To reply and book instantly.", "Atención y agendamiento en todos tus canales": "Replies and booking on all your channels", "Recordatorio de cita y seguimiento de consultas": "Appointment reminders and enquiry follow-up", "Protocolo clínico y derivación a tu equipo": "Clinical protocol and handover to your team", "Google Calendar": "Google Calendar", "2.000 mensajes enviados al mes": "2,000 messages sent per month", "Empieza con el test gratis": "Start with the free test", "Más completo": "Most complete", "Clínica": "Clinic", "Además, para que tus pacientes vuelvan a tiempo.": "Plus, so your patients come back on time.", "Todo lo del plan Esencial": "Everything in the Essential plan", "Retoques por ciclo de tratamiento": "Touch-ups by treatment cycle", "Reactivación de pacientes antiguos": "Reactivation of past patients", "Integración con AgendaPro (plan Pro)": "AgendaPro integration (Pro plan)", "Informe mensual y reunión de 30 minutos": "Monthly report and 30-minute meeting", "Box de tratamiento con luz natural": "Treatment room with natural light", "Reputación clínica": "Clinical reputation", "Cómo cuidamos la reputación de tu clínica.": "How we protect your clinic's reputation.", "Solo información aprobada": "Approved information only", "El agente responde únicamente con lo que tu clínica validó.": "The agent only replies with what your clinic has approved.", "Sin diagnósticos ni promesas": "No diagnoses or promises", "No da indicaciones médicas ni promete resultados.": "It gives no medical advice and promises no results.", "Derivación humana": "Human handover", "Si el caso requiere criterio clínico, o la persona lo pide, pasa a tu equipo.": "If a case needs clinical judgement, or the person asks, it goes to your team.", "Contacto con límites": "Contact with limits", "El seguimiento se detiene cuando la persona agenda o pide no ser contactada.": "Follow-up stops when the person books or asks not to be contacted.", "Lo importante antes de automatizar la atención.": "What matters before automating your patient replies.", "¿Por qué lo necesitamos si recepción ya responde?": "Why do we need this if reception already replies?", "Porque recepción no está de noche, el fin de semana ni cuando atiende a alguien en persona. El agente cubre esos momentos y deja a tu equipo un resumen de cada conversación.": "Because reception isn't there at night, at weekends or while they're with someone in person. The agent covers those moments and leaves your team a summary of each conversation.", "¿Puede recomendar tratamientos?": "Can it recommend treatments?", "No. Informa lo que tu clínica aprobó (tratamientos, duración, preparación y valores) y deja la indicación a la profesional en la valoración.": "No. It shares what your clinic has approved (treatments, duration, preparation and prices) and leaves the recommendation to the practitioner at the consultation.", "¿Puede analizar fotografías?": "Can it analyse photos?", "No. Si alguien envía una foto, el agente la deriva a tu equipo sin opinar sobre ella.": "No. If someone sends a photo, the agent passes it to your team without commenting on it.", "¿Cuánto tiempo toma implementarlo?": "How long does setup take?", "Depende de tus canales y de tu agenda: lo definimos contigo en la llamada. De tu parte, solo tu tarifario y dos reuniones de 45 minutos.": "It depends on your channels and your calendar: we agree it with you on the call. From you, just your price list and two 45-minute meetings.", "¿Funciona con mi agenda actual?": "Does it work with my current calendar?", "Sí, con Google Calendar y con AgendaPro (plan Pro). Si usas otra, lo revisamos en el test.": "Yes, with Google Calendar and AgendaPro (Pro plan). If you use another one, we'll check it in the test.", "¿Qué es el Test de Respuesta?": "What is the Response Test?", "Te escribimos como pacientes en tres momentos (día hábil, noche y fin de semana) y en 72 horas te mostramos cuánto tardó tu clínica y qué respondió. Es gratis y sin compromiso.": "We message your clinic as patients at three different times (a weekday, at night and at the weekend), and within 72 hours we show you how long your clinic took and what it replied. It's free and there's no commitment.", "¿Qué pasa con la privacidad?": "What about privacy?", "Las conversaciones ocurren en los canales de tu clínica y en la agenda solo queda lo necesario para la cita. Cómo se manejan los datos queda definido por escrito antes de empezar.": "Conversations happen on your clinic's channels, and only what's needed for the appointment is saved in the calendar. How data is handled is set out in writing before we start.", "Primero medimos": "First, we measure", "¿Cuánto tarda hoy tu clínica en responder?": "How long does your clinic take to reply today?", "Te escribimos como pacientes y en 72 horas te mostramos el resultado. Si tu clínica todavía no está lista para automatizar, también te lo diremos.": "We message you as patients and show you the result within 72 hours. If your clinic isn't ready to automate yet, we'll tell you that too.", "Compromiso de proceso": "Our process commitment", "Si avanzamos, definimos por escrito los canales, los tratamientos, la información aprobada, el calendario, los límites clínicos y los momentos de derivación a tu equipo.": "If we go ahead, we set out in writing the channels, treatments, approved information, calendar, clinical limits and when conversations are handed over to your team.", "Agente Belara": "Belara agent", "En línea · responde en segundos": "Online · replies in seconds", "Pídeselo a nuestro agente. Así ves cómo atendería a tus pacientes.": "Ask our agent for it. That way you see how it would look after your patients.", "Escríbenos. Te responde nuestro agente en segundos.": "Message us. Our agent replies in seconds.", "Te pide los datos de tu clínica: nombre, canales de contacto y cómo agendan hoy.": "It asks for your clinic's details: name, contact channels and how you book appointments today.", "En 72 horas recibes tu informe con los tiempos de respuesta de tu clínica.": "Within 72 hours you get your report with your clinic's response times.", "Recibe tu test gratis": "Get your free test", "Sin costo y sin compromiso. Es el mismo tipo de agente que tendría tu clínica.": "Free and with no commitment. It's the same kind of agent your clinic would have.", "¿Prefieres empezar por el diagnóstico de 2 minutos?": "Would you rather start with the 2-minute check-up?", "Belara": "Belara", "Pide tu test gratis": "Ask for your free test", "Haz el diagnóstico de respuesta gratis": "Take the free response check-up", "Belara automatiza la comunicación administrativa, no el criterio médico. El agente no diagnostica, no recomienda tratamientos ni determina candidaturas. Las preguntas médicas pasan a una persona del equipo.": "Belara automates administrative communication, not medical judgement. The agent doesn't diagnose, recommend treatments or decide who is a candidate. Medical questions go to a person on the team.", "© 2026 Belara · Santiago, Chile": "© 2026 Belara · Santiago, Chile", "Privacidad": "Privacy", "Términos": "Terms", "Aviso legal": "Legal notice", "¿Tu clínica responde a tiempo?": "Does your clinic reply on time?", "Diagnóstico de respuesta": "Response check-up", "Cerrar": "Close", "Idioma y moneda": "Language and currency", "Idioma": "Language", "Moneda": "Currency", "Agentes de IA para clínicas estéticas. Responden en segundos, agendan en tu calendario y avisan cada retoque, 24/7.": "AI agents for aesthetic clinics. They reply in seconds, book into your calendar and send every touch-up reminder, 24/7.", "Contacto": "Contact", "Legal": "Legal", "Términos y condiciones": "Terms and conditions", "Política de privacidad": "Privacy policy", "Agenda una reunión": "Book a meeting", "Solo información aprobada por tu clínica. Sin diagnósticos ni promesas de resultados.": "Only information approved by your clinic. No diagnoses or promised results."}, "esES": {"Agenda tu demo": "Reserva tu demo", "Agenda con la clínica que le responde primero.": "Pide cita en la clínica que le responde primero.", "Sistema Belara responde en segundos en todos tus canales, agenda en tu calendario y avisa a cada paciente cuando le toca su retoque. Solo con información aprobada por tu clínica.": "Sistema Belara responde en segundos en todos tus canales, reserva la cita en tu agenda y avisa a cada paciente cuando le toca su retoque. Solo con información aprobada por tu clínica.", "¡Hola! Te cuento el valor y lo que incluye la evaluación. ¿Te acomoda mañana a las 10:30 o 12:00?": "¡Hola! Te cuento el precio y lo que incluye la valoración. ¿Te va bien mañana a las 10:30 o a las 12:00?", "Listo, quedó agendada mañana a las 10:30. Te recordaré el día antes.": "Perfecto, te he reservado mañana a las 10:30. Te lo recuerdo el día antes.", "Cita agendada en tu calendario · respondido en 8 s": "Cita reservada en tu agenda · respondido en 8 s", "Cita agendada en el calendario de la clínica.": "Cita reservada en la agenda de la clínica.", "Tu equipo, entre el box y el celular": "Tu equipo, entre la cabina y el móvil", "Quien no agenda en el primer mensaje queda olvidado en un chat.": "Quien no pide cita en el primer mensaje se queda olvidado en un chat.", "Atención y agendamiento": "Atención y reservas", "Responde en segundos en todos tus canales, resuelve las dudas habituales con la información que tu clínica aprobó y deja la cita en tu calendario.": "Responde en segundos en todos tus canales, resuelve las dudas habituales con la información que tu clínica aprobó y deja la cita en tu agenda.", "Recuerda la cita el día antes, retoma a quien no terminó de agendar y avisa a cada paciente cuando le toca su retoque, según el tratamiento que se hizo.": "Recuerda la cita el día antes, vuelve a escribir a quien no llegó a reservar y avisa a cada paciente cuando le toca su retoque, según el tratamiento que se hizo.", "¡Perfecto! Para manchas trabajamos con distintas opciones, como peelings y láser. Cuál es la indicada para ti lo define la profesional en tu valoración. Tenemos horas después de las 18:00: ¿te acomoda más entre semana o el sábado?": "¡Perfecto! Para manchas trabajamos con distintas opciones, como peelings y láser. Cuál es la indicada para ti lo decide la profesional en tu valoración. Tenemos horas después de las 18:00: ¿te va mejor entre semana o el sábado?", "Responde sobre tratamientos, duración, preparación y valores aprobados por tu clínica.": "Responde sobre tratamientos, duración, preparación y precios aprobados por tu clínica.", "Agendamiento": "Reservas", "Propone horarios de tu calendario y deja la cita agendada.": "Propone horarios de tu agenda y deja la cita reservada.", "Recuerda las citas y retoma a quien no terminó de agendar.": "Recuerda las citas y vuelve a escribir a quien no llegó a reservar.", "Reunimos los tratamientos, valores, horarios y accesos que tu clínica aprueba.": "Reunimos los tratamientos, precios, horarios y accesos que tu clínica aprueba.", "Configuramos los agentes y los conectamos a tu calendario (Google Calendar o AgendaPro) y a tus canales.": "Configuramos los agentes y los conectamos a tu agenda y a tus canales.", "Marcha blanca y activación": "Periodo de prueba y activación", "Pruebas el agente, apruebas sus respuestas y recién ahí lo activamos.": "Pruebas el agente, apruebas sus respuestas y solo entonces lo activamos.", "Mesón con agenda digital, celular y cuaderno": "Mostrador con agenda digital, móvil y libreta", "Para responder y agendar al instante.": "Para responder y dar cita al instante.", "Integración con AgendaPro (plan Pro)": "Integración con tu programa de gestión (según el programa)", "Box de tratamiento con luz natural": "Cabina de tratamiento con luz natural", "El seguimiento se detiene cuando la persona agenda o pide no ser contactada.": "El seguimiento se detiene cuando la persona reserva o pide que no la contactemos.", "No. Informa lo que tu clínica aprobó (tratamientos, duración, preparación y valores) y deja la indicación a la profesional en la valoración.": "No. Informa de lo que tu clínica aprobó (tratamientos, duración, preparación y precios) y deja la indicación a la profesional en la valoración.", "¿Cuánto tiempo toma implementarlo?": "¿Cuánto se tarda en ponerlo en marcha?", "Sí, con Google Calendar y con AgendaPro (plan Pro). Si usas otra, lo revisamos en el test.": "Sí, con Google Calendar. Si usas otro programa, lo revisamos en el test.", "Te escribimos como pacientes en tres momentos (día hábil, noche y fin de semana) y en 72 horas te mostramos cuánto tardó tu clínica y qué respondió. Es gratis y sin compromiso.": "Te escribimos como pacientes en tres momentos (día laborable, noche y fin de semana) y en 72 horas te mostramos cuánto tardó tu clínica y qué respondió. Es gratis y sin compromiso.", "Te pide los datos de tu clínica: nombre, canales de contacto y cómo agendan hoy.": "Te pide los datos de tu clínica: nombre, canales de contacto y cómo gestionáis hoy las citas.", "© 2026 Belara · Santiago, Chile": "© 2026 Belara · Barcelona, España", "Agentes de IA para clínicas estéticas. Responden en segundos, agendan en tu calendario y avisan cada retoque, 24/7.": "Agentes de IA para clínicas estéticas. Responden en segundos, reservan citas en tu agenda y avisan de cada retoque, 24/7.", "Agenda una reunión": "Reserva una reunión"}, "enEur": {"Configuramos los agentes y los conectamos a tu calendario (Google Calendar o AgendaPro) y a tus canales.": "We set up the agents and connect them to your calendar and your channels.", "Integración con AgendaPro (plan Pro)": "Integration with your practice management software (depending on the software)", "Sí, con Google Calendar y con AgendaPro (plan Pro). Si usas otra, lo revisamos en el test.": "Yes, with Google Calendar. If you use other software, we'll check it in the test.", "© 2026 Belara · Santiago, Chile": "© 2026 Belara · Barcelona, Spain"}};
  var KEY='belara-prefs';
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ return {}; } }
  function save(p){ try{ localStorage.setItem(KEY,JSON.stringify(p)); }catch(e){} }
  function detect(){
    var lang='es', cur='CLP';
    try{
      var l=((navigator.languages&&navigator.languages[0])||navigator.language||'es').toLowerCase();
      if(l.indexOf('en')===0) lang='en';
      var tz=(Intl.DateTimeFormat().resolvedOptions().timeZone)||'';
      if(tz.indexOf('Europe/')===0) cur='EUR';
    }catch(e){}
    return {lang:lang,cur:cur};
  }
  var P=detect(), saved=load(), q;
  if(saved.lang==='es'||saved.lang==='en') P.lang=saved.lang;
  if(saved.cur==='CLP'||saved.cur==='EUR') P.cur=saved.cur;
  try{ q=new URLSearchParams(location.search);
    var ql=(q.get('lang')||'').toLowerCase(), qc=(q.get('cur')||'').toUpperCase();
    if(ql==='es'||ql==='en') P.lang=ql; if(qc==='CLP'||qc==='EUR') P.cur=qc;
  }catch(e){}

  var subs=[];
  var BLP=window.BLP={
    get lang(){ return P.lang; }, get cur(){ return P.cur; },
    // Variante de texto: es-CL (español Chile), es-ES (español España), en, en-EUR
    variant:function(){ return P.lang==='en'?(P.cur==='EUR'?'en-EUR':'en'):(P.cur==='EUR'?'es-ES':'es-CL'); },
    on:function(fn){ subs.push(fn); },
    set:function(k,v){ P[k]=v; save({lang:P.lang,cur:P.cur}); apply(); subs.forEach(function(f){ try{f();}catch(e){} }); },
    agendaUrl:function(){ return 'https://colombauv-dev.github.io/belara-landing/agenda.html?lang='+P.lang+'&cur='+P.cur; }
  };

  function tr(t){
    var v=BLP.variant(), d=DICT;
    if(v==='en-EUR') return (d.enEur[t]!==undefined?d.enEur[t]:d.en[t]);
    if(v==='en') return d.en[t];
    if(v==='es-ES') return d.esES[t];
    return undefined;
  }
  var orig=new WeakMap(), attrs=['alt','aria-label','placeholder','title'];
  function skip(el){ return el.closest && el.closest('.bl-diag-body, .bl-price, script, style'); }
  function apply(){
    root.setAttribute('lang',P.lang==='en'?'en':(P.cur==='EUR'?'es-ES':'es-CL'));
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null), n;
    while((n=w.nextNode())){
      if(!n.parentElement || skip(n.parentElement)) continue;
      if(!orig.has(n)){ if(!n.nodeValue.trim()) continue; orig.set(n,n.nodeValue); }
      var o=orig.get(n), k=o.replace(/\s+/g,' ').trim(), t=tr(k);
      var lead=o.match(/^\s*/)[0], tail=o.match(/\s*$/)[0];
      n.nodeValue=(t!==undefined)?lead+t+tail:o;
    }
    root.querySelectorAll('[alt],[aria-label],[placeholder],[title]').forEach(function(el){
      if(skip(el)) return;
      var store=orig.get(el); if(!store){ store={}; attrs.forEach(function(a){ if(el.hasAttribute(a)) store[a]=el.getAttribute(a); }); orig.set(el,store); }
      Object.keys(store).forEach(function(a){ var t=tr(store[a].trim()); el.setAttribute(a,t!==undefined?t:store[a]); });
    });
    root.querySelectorAll('a[href*="belara-landing/agenda.html"]').forEach(function(a){ a.href=BLP.agendaUrl(); });
    var PR={esencial:{CLP:200000,EUR:250},clinica:{CLP:290000,EUR:350},impl:{CLP:500000,EUR:500}};
    function fmt(n){ if(P.cur==='EUR'){ var x=n.toLocaleString(P.lang==='en'?'en-US':'es-ES'); return P.lang==='en'?'€'+x:x+' €'; }
      return '$'+n.toLocaleString(P.lang==='en'?'en-US':'es-CL')+(P.lang==='en'?' CLP':''); }
    var tax=P.lang==='en'?'VAT':'IVA';
    root.querySelectorAll('.bl-price').forEach(function(el){
      var p=PR[el.getAttribute('data-plan')]; if(!p) return;
      el.querySelector('[data-amt]').textContent=fmt(p[P.cur]);
      el.querySelector('[data-per]').textContent='+ '+tax+(P.lang==='en'?' / month':' / mes');
      el.querySelector('[data-impl]').textContent=(P.lang==='en'?'One-off setup: ':'Implementación única: ')+fmt(PR.impl[P.cur])+' + '+tax;
    });
    root.querySelectorAll('[data-lang]').forEach(function(b){ b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===P.lang)); });
    root.querySelectorAll('[data-cur]').forEach(function(b){ b.setAttribute('aria-pressed',String(b.getAttribute('data-cur')===P.cur)); });
  }
  root.addEventListener('click',function(e){
    var b=e.target.closest('[data-lang],[data-cur]'); if(!b) return; e.preventDefault();
    if(b.hasAttribute('data-lang')) BLP.set('lang',b.getAttribute('data-lang'));
    else BLP.set('cur',b.getAttribute('data-cur'));
  });
  apply();
})();

/* ===== Diagnóstico de respuesta (2 minutos) ===== */
(function(){
  // Configuración: reemplaza estos valores cuando estén listos.
  var CONFIG={
    webhook:'URL_WEBHOOK',   // Webhook de entrada de GHL que recibe cada contacto
    agente:'URL_AGENTE'      // Enlace de WhatsApp del agente de Belara
  };
  function set(u){ return u && u.indexOf('URL_')!==0; }

  var root=document.querySelector('.belara-lp'); if(!root) return;
  var modal=root.querySelector('#bl-diag'); if(!modal) return;
  var body=modal.querySelector('.bl-diag-body');
  var BLP=window.BLP||{lang:'es',cur:'CLP',variant:function(){return 'es-CL';},on:function(){},agendaUrl:function(){return '';}};

  // Puntos (0 a 3) y valores; no dependen del idioma.
  var QD=[
    {id:'profesionales'},
    {id:'consultas',v:[30,100,225,400]},
    {id:'ticket',v:{CLP:[60000,115000,225000,350000],EUR:[60,115,225,350]}},
    {id:'quien',p:[3,1,0,2]},
    {id:'tiempo',p:[3,2,1,0]},
    {id:'noche',p:[3,2,0,1]},
    {id:'precio',p:[3,1,1,0]},
    {id:'seguimiento',p:[3,1,0]},
    {id:'recordatorio',p:[3,2,1,0]},
    {id:'retoques',p:[3,1,0]}
  ];
  // Textos. "es" = español de Chile; "esES" solo cambia lo necesario para España; "en" = inglés.
  var TX={
    es:{
      q:{
        profesionales:['¿Cuántas profesionales atienden en tu clínica?','Médicas, enfermeras, cosmetólogas.',['1','2 o 3','4 o 5','6 o más']],
        consultas:['¿Cuántas consultas nuevas reciben al mes por WhatsApp e Instagram?','Una estimación basta.',['Menos de 50','Entre 50 y 150','Entre 150 y 300','Más de 300']],
        ticketCLP:['¿Cuánto vale en promedio un tratamiento en tu clínica?','Por sesión o procedimiento, en pesos chilenos.',['Menos de $80.000','Entre $80.000 y $150.000','Entre $150.000 y $300.000','Más de $300.000']],
        ticketEUR:['¿Cuánto cuesta de media un tratamiento en tu clínica?','Por sesión o procedimiento, en euros.',['Menos de 80 €','Entre 80 y 150 €','Entre 150 y 300 €','Más de 300 €']],
        quien:['¿Quién responde hoy los mensajes de pacientes?','',['Una recepcionista dedicada','La profesional, entre paciente y paciente','Quien pueda, cuando puede','Un asistente automático']],
        tiempo:['En horario de atención, ¿cuánto tardan normalmente en responder?','',['Menos de 5 minutos','Entre 5 y 30 minutos','Entre 30 minutos y 2 horas','Más de 2 horas']],
        noche:['Un mensaje llega un viernes a las 22:00. ¿Cuándo se responde?','',['Esa misma noche','El sábado','El lunes','Depende de la semana']],
        precio:['Cuando preguntan un precio, ¿qué suelen responder?','',['El valor o un rango, y proponemos un horario','El valor, sin proponer horario','Que venga a una evaluación, sin dar valor','Depende de quién responda']],
        seguimiento:['Si alguien pregunta y no agenda, ¿le vuelven a escribir?','',['Siempre, en uno o dos días','A veces, si hay tiempo','No']],
        recordatorio:['¿Envían recordatorio de la cita el día antes?','',['Sí, automático','Sí, a mano','A veces','No']],
        retoques:['¿Avisan a cada paciente cuando le toca su retoque?','Por ejemplo, la toxina cada 4 a 6 meses.',['Sí, de forma automática','A veces, a mano','No']]
      },
      fugas:{
        noche:['Las consultas de noche y fin de semana esperan','Es cuando más escriben las pacientes, y la respuesta llega horas después.'],
        tiempo:['Respuestas que tardan en horario de atención','Quien compara clínicas suele quedarse con la que responde primero.'],
        quien:['Tu equipo responde entre paciente y paciente','Cuando la profesional está en box, los mensajes esperan.'],
        seguimiento:['Quien no agenda en el primer mensaje se olvida','Un mensaje a las 48 horas recupera parte de esas consultas.'],
        precio:['La conversación no avanza hacia la cita','Dar el valor sin proponer un horario deja la decisión en el aire.'],
        retoques:['Retoques que nadie recuerda','Si nadie avisa, el retoque se hace en otra clínica.'],
        recordatorio:['Citas sin recordatorio','Sin aviso el día antes aumentan las inasistencias y los huecos en la agenda.']
      },
      eb:'Diagnóstico de respuesta · gratis', h:'¿Tu clínica responde a tiempo?',
      intro:'10 preguntas sobre cómo atiendes hoy los mensajes de tus pacientes. Toma 2 minutos y al final recibes:',
      li:['Tu índice de respuesta','Dónde se enfrían tus consultas','Cuánto podría estar en juego al año','Una reunión para revisarlo con tu equipo'], free:'Gratis',
      start:'Empezar diagnóstico', qOf:function(i,n){return 'Pregunta '+i+' de '+n;}, back:'Atrás', home:'Volver al inicio', next:'Siguiente', see:'Ver resultado',
      res:'Tu resultado', t1:'Tu clínica responde a tiempo.', t2:'Respondes, pero se te escapan consultas.', t3:'Muchas consultas se enfrían antes de la cita.',
      idx:'/ 100 · índice de respuesta', where:'Dónde se enfrían tus consultas',
      none:'No vemos fugas importantes en tus respuestas. El test de respuesta gratis lo confirma con consultas reales.',
      money:'Ingreso que podría estar en juego al año', est:'Estimación orientativa según tus respuestas: consultas que se responden tarde, de las que entre un 20 y un 40 % no llega a agendar.',
      formH:'Recibe tu estimación y revisémosla juntas', fName:'Tu nombre', fClinic:'Clínica', fMail:'Correo', telPh:'+56 9',
      fAg:'¿Qué agenda usan hoy?', choose:'Elige una opción', ags:['Google Calendar','AgendaPro','Reservo','Otra','Cuaderno o WhatsApp'],
      ok:'Acepto que Belara use estos datos para enviarme el resultado y contactarme sobre este diagnóstico, según su <a href="/politica-de-privacidad" target="_blank" rel="noopener">Política de privacidad</a>.', submit:'Ver mi estimación',
      thanks:function(n){return 'Gracias, '+n+'.';}, after:'Te escribiremos para revisar el resultado contigo. Si prefieres, elige ya un horario o pide el test con consultas reales:',
      bookBtn:'Agenda tu demo', testBtn:'Pide tu test de respuesta gratis',
      note:'Resultado orientativo, basado en tus respuestas. El test de respuesta gratis lo mide con consultas reales.', again:'Repetir diagnóstico',
      eName:'Completa tu nombre y el de tu clínica.', eTel:'Revisa tu número de WhatsApp.', eMail:'Revisa tu correo.', eOk:'Necesitamos tu autorización para contactarte.',
      between:'Entre', and:'y', mill:'millones'
    },
    esES:{
      q:{
        consultas:['¿Cuántas consultas nuevas recibís al mes por WhatsApp e Instagram?','Con una estimación basta.',null],
        tiempo:['En horario de atención, ¿cuánto tardáis normalmente en responder?','',null],
        precio:['Cuando preguntan un precio, ¿qué soléis responder?','',['El precio o un rango, y proponemos un horario','El precio, sin proponer horario','Que venga a una valoración, sin dar precio','Depende de quién responda']],
        seguimiento:['Si alguien pregunta y no pide cita, ¿le volvéis a escribir?','',null],
        recordatorio:['¿Enviáis recordatorio de la cita el día antes?','',null],
        retoques:['¿Avisáis a cada paciente cuando le toca su retoque?','Por ejemplo, el bótox cada 4 a 6 meses.',null]
      },
      fugas:{
        quien:['Tu equipo responde entre paciente y paciente','Cuando la profesional está en cabina, los mensajes esperan.'],
        seguimiento:['Quien no pide cita en el primer mensaje se olvida','Un mensaje a las 48 horas recupera parte de esas consultas.'],
        precio:['La conversación no avanza hacia la cita','Dar el precio sin proponer un horario deja la decisión en el aire.'],
        recordatorio:['Citas sin recordatorio','Sin aviso el día antes aumentan las ausencias y los huecos en la agenda.']
      },
      est:'Estimación orientativa según tus respuestas: consultas que se responden tarde, de las que entre un 20 y un 40 % no llega a pedir cita.',
      telPh:'+34', fAg:'¿Qué agenda usáis hoy?', ags:['Google Calendar','Otro programa de gestión','Libreta o WhatsApp','Otra'],
      bookBtn:'Reserva tu demo', mill:'millones'
    },
    en:{
      q:{
        profesionales:['How many practitioners work at your clinic?','Doctors, nurses, aestheticians.',['1','2 or 3','4 or 5','6 or more']],
        consultas:['How many new enquiries do you get each month on WhatsApp and Instagram?','An estimate is fine.',['Fewer than 50','50 to 150','150 to 300','More than 300']],
        ticketCLP:['What does a treatment cost on average at your clinic?','Per session or procedure, in Chilean pesos.',['Under $80,000','$80,000 to $150,000','$150,000 to $300,000','Over $300,000']],
        ticketEUR:['What does a treatment cost on average at your clinic?','Per session or procedure, in euros.',['Under €80','€80 to €150','€150 to €300','Over €300']],
        quien:['Who replies to patient messages today?','',['A dedicated receptionist','The practitioner, between patients','Whoever can, when they can','An automated assistant']],
        tiempo:['During opening hours, how long do you usually take to reply?','',['Under 5 minutes','5 to 30 minutes','30 minutes to 2 hours','Over 2 hours']],
        noche:['A message comes in on a Friday at 22:00. When does it get a reply?','',['That same night','On Saturday','On Monday','It depends on the week']],
        precio:['When someone asks for a price, what do you usually reply?','',['The price or a range, and we offer a time slot','The price, without offering a time','Come in for a consultation, without giving a price','It depends who replies']],
        seguimiento:['If someone asks but doesn\'t book, do you message them again?','',['Always, within a day or two','Sometimes, if there\'s time','No']],
        recordatorio:['Do you send an appointment reminder the day before?','',['Yes, automatically','Yes, by hand','Sometimes','No']],
        retoques:['Do you tell each patient when their touch-up is due?','For example, botox every 4 to 6 months.',['Yes, automatically','Sometimes, by hand','No']]
      },
      fugas:{
        noche:['Night and weekend enquiries are left waiting','That\'s when patients write most, and the reply comes hours later.'],
        tiempo:['Slow replies during opening hours','People comparing clinics usually choose the one that replies first.'],
        quien:['Your team replies between patients','While the practitioner is in the treatment room, messages wait.'],
        seguimiento:['People who don\'t book in the first message are forgotten','A message after 48 hours wins back some of those enquiries.'],
        precio:['The conversation doesn\'t move towards an appointment','Giving the price without offering a time leaves the decision hanging.'],
        retoques:['Touch-ups nobody remembers','If nobody reminds them, the touch-up happens at another clinic.'],
        recordatorio:['Appointments without reminders','Without a reminder the day before, no-shows and gaps in the calendar go up.']
      },
      eb:'Response check-up · free', h:'Does your clinic reply on time?',
      intro:'10 questions about how you handle patient messages today. It takes 2 minutes, and at the end you get:',
      li:['Your response score','Where your enquiries go cold','How much could be at stake each year','A meeting to go through it with your team'], free:'Free',
      start:'Start the check-up', qOf:function(i,n){return 'Question '+i+' of '+n;}, back:'Back', home:'Back to start', next:'Next', see:'See my result',
      res:'Your result', t1:'Your clinic replies on time.', t2:'You reply, but some enquiries slip away.', t3:'Many enquiries go cold before the appointment.',
      idx:'/ 100 · response score', where:'Where your enquiries go cold',
      none:'We don\'t see any major leaks in your answers. The free response test confirms it with real enquiries.',
      money:'Revenue that could be at stake each year', est:'Rough estimate based on your answers: enquiries that get a late reply, of which 20 to 40% never book.',
      formH:'Get your estimate and let\'s go through it together', fName:'Your name', fClinic:'Clinic', fMail:'Email', telPh:'+56 9',
      fAg:'Which calendar do you use today?', choose:'Choose an option', ags:['Google Calendar','AgendaPro','Reservo','Other','Notebook or WhatsApp'],
      ok:'I agree that Belara may use these details to send me the result and contact me about this check-up, as described in its <a href="/politica-de-privacidad" target="_blank" rel="noopener">Privacy Policy</a> (in Spanish).', submit:'See my estimate',
      thanks:function(n){return 'Thank you, '+n+'.';}, after:'We\'ll get in touch to go through the result with you. If you prefer, pick a time now or ask for the test with real enquiries:',
      bookBtn:'Book your demo', testBtn:'Ask for your free response test',
      note:'Rough result based on your answers. The free response test measures it with real enquiries.', again:'Retake the check-up',
      eName:'Please enter your name and your clinic\'s name.', eTel:'Please check your WhatsApp number.', eMail:'Please check your email.', eOk:'We need your permission to contact you.',
      between:'Between', and:'and', mill:'million'
    },
    enEUR:{ telPh:'+34', ags:['Google Calendar','Other practice software','Notebook or WhatsApp','Other'] }
  };
  function L(){
    var v=BLP.variant(), base=v.indexOf('en')===0?TX.en:TX.es, over=v==='es-ES'?TX.esES:v==='en-EUR'?TX.enEUR:null, o={};
    Object.keys(base).forEach(function(k){ o[k]=base[k]; });
    if(over) Object.keys(over).forEach(function(k){
      if(k==='q'||k==='fugas'){ o[k]={}; Object.keys(base[k]).forEach(function(i){ o[k][i]=base[k][i]; });
        Object.keys(over[k]).forEach(function(i){ var b=base[k][i], n=over[k][i]; o[k][i]=n.map(function(x,j){ return x===null?b[j]:x; }); }); }
      else o[k]=over[k];
    });
    return o;
  }
  function qtext(q){ var t=L().q; return q.id==='ticket'?t['ticket'+BLP.cur]:t[q.id]; }

  var st, lastFocus;
  function reset(){ st={i:-1,a:{},lead:null,sent:false}; }
  function esc(x){ return String(x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function nf(){ return BLP.lang==='en'?'en-US':(BLP.cur==='EUR'?'es-ES':'es-CL'); }
  function money(n){
    var t=L(), loc=nf();
    if(BLP.cur==='EUR'){
      var r=n>=1e5?Math.round(n/1e4)*1e4:n>=1e4?Math.round(n/1e3)*1e3:Math.round(n/100)*100;
      var s=r.toLocaleString(loc,{useGrouping:true}); return BLP.lang==='en'?'€'+s:s+' €';
    }
    if(n>=1e6){ return '$'+(Math.round(n/1e5)/10).toLocaleString(loc)+' '+t.mill; }
    return '$'+(Math.round(n/1e3)*1e3).toLocaleString(loc);
  }
  function rango(b,a){
    var t=L(), loc=nf();
    if(BLP.cur==='CLP' && b>=1e6) return t.between+' $'+(Math.round(b/1e5)/10).toLocaleString(loc)+' '+t.and+' $'+(Math.round(a/1e5)/10).toLocaleString(loc)+' '+t.mill;
    return t.between+' '+money(b)+' '+t.and+' '+money(a);
  }
  function calc(){
    var a=st.a, sum=0, max=0, pts={};
    QD.forEach(function(q){ if(q.p){ var s=q.p[a[q.id]]; pts[q.id]=s; sum+=s; max+=3; } });
    var score=Math.round(sum/max*100);
    var ORDEN=['noche','tiempo','quien','seguimiento','precio','retoques','recordatorio'];
    var fugas=ORDEN.filter(function(k){return pts[k]<3;})
      .sort(function(x,y){return pts[x]-pts[y] || ORDEN.indexOf(x)-ORDEN.indexOf(y);}).slice(0,3);
    var vel=(pts.quien+pts.tiempo+pts.noche)/9;
    var riesgo=Math.min(0.8,Math.max(0.1,1-vel));
    var cons=QD[1].v[a.consultas], tick=QD[2].v[BLP.cur][a.ticket];
    var bajo=cons*riesgo*0.2*tick*12, alto=cons*riesgo*0.4*tick*12;
    return {score:score,fugas:fugas,bajo:bajo,alto:alto};
  }

  function render(){
    var t=L(), h='';
    modal.setAttribute('aria-label',t.eb.split(' · ')[0]);
    if(st.i<0){
      h='<p class="bl-eb">'+t.eb+'</p>'+
        '<h3>'+t.h+'</h3>'+
        '<p>'+t.intro+'</p>'+
        '<ul class="bl-diag-list">'+
        '<li><span class="bl-diag-tag">0–100</span>'+t.li[0]+'</li>'+
        '<li><span class="bl-diag-tag">Top 3</span>'+t.li[1]+'</li>'+
        '<li><span class="bl-diag-tag">'+(BLP.cur==='EUR'?'€':'$')+'</span>'+t.li[2]+'</li>'+
        '<li><span class="bl-diag-tag">'+t.free+'</span>'+t.li[3]+'</li></ul>'+
        '<div class="bl-diag-row"><span></span><button type="button" class="bl-btn" data-act="start">'+t.start+'</button></div>';
    } else if(st.i<QD.length){
      var q=QD[st.i], qt=qtext(q), sel=st.a[q.id];
      h='<div class="bl-diag-bar" aria-hidden="true"><span style="width:'+Math.round((st.i)/QD.length*100)+'%"></span></div>'+
        '<p class="bl-eb">'+t.qOf(st.i+1,QD.length)+'</p>'+
        '<h3 id="bl-diag-q">'+esc(qt[0])+'</h3>'+(qt[1]?'<p class="bl-help">'+esc(qt[1])+'</p>':'')+
        '<div class="bl-diag-opts" role="group" aria-labelledby="bl-diag-q">'+
        qt[2].map(function(o,j){return '<button type="button" class="bl-diag-opt" data-opt="'+j+'" aria-pressed="'+(sel===j)+'">'+esc(o)+'</button>';}).join('')+
        '</div><div class="bl-diag-row"><button type="button" class="bl-link" data-act="back">'+(st.i?t.back:t.home)+'</button>'+
        (sel!==undefined?'<button type="button" class="bl-btn" data-act="next">'+(st.i===QD.length-1?t.see:t.next)+'</button>':'')+'</div>';
    } else {
      var r=calc(), titulo=r.score>=80?t.t1:r.score>=50?t.t2:t.t3;
      h='<p class="bl-eb">'+t.res+'</p><h3>'+titulo+'</h3>'+
        '<div class="bl-diag-score"><b>'+r.score+'</b><span>'+t.idx+'</span></div>'+
        '<div class="bl-diag-meter" aria-hidden="true"><span style="width:'+r.score+'%"></span></div>';
      if(r.fugas.length){
        h+='<p class="bl-diag-h">'+t.where+'</p>'+r.fugas.map(function(k){return '<div class="bl-diag-fuga"><strong>'+t.fugas[k][0]+'</strong><p>'+t.fugas[k][1]+'</p></div>';}).join('');
      } else {
        h+='<p style="margin-top:16px">'+t.none+'</p>';
      }
      var blur=BLP.cur==='EUR'?(t.between+' '+(BLP.lang==='en'?'€00,000':'00.000 €')+' '+t.and+' '+(BLP.lang==='en'?'€00,000':'00.000 €')):(t.between+' $00,0 '+t.and+' $00,0 '+t.mill);
      h+='<div class="bl-diag-box'+(st.lead?'':' bl-diag-locked')+'"><p class="bl-eb">'+t.money+'</p>'+
         '<p class="bl-diag-money">'+(st.lead?rango(r.bajo,r.alto):blur)+'</p>'+
         '<p style="font-size:13px">'+t.est+'</p></div>';
      if(!st.lead){
        h+='<p class="bl-diag-h">'+t.formH+'</p>'+
          '<form class="bl-diag-form" novalidate>'+
          '<label>'+t.fName+'<input name="nombre" autocomplete="name" required></label>'+
          '<label>'+t.fClinic+'<input name="clinica" autocomplete="organization" required></label>'+
          '<label>WhatsApp<input name="whatsapp" type="tel" autocomplete="tel" placeholder="'+t.telPh+'" required></label>'+
          '<label>'+t.fMail+'<input name="email" type="email" autocomplete="email"></label>'+
          '<label class="bl-full">'+t.fAg+'<select name="agenda"><option value="">'+t.choose+'</option>'+t.ags.map(function(x){return '<option>'+esc(x)+'</option>';}).join('')+'</select></label>'+
          '<label class="bl-check bl-full"><input type="checkbox" name="ok" required>'+t.ok+'</label>'+
          '<p class="bl-diag-err bl-full" role="alert"></p>'+
          '<div class="bl-full"><button type="submit" class="bl-btn">'+t.submit+'</button></div></form>';
      } else {
        h+='<p class="bl-diag-h">'+t.thanks(esc(st.lead.nombre.split(' ')[0]))+'</p><p>'+t.after+'</p>'+
          '<div class="bl-diag-row" style="justify-content:flex-start">'+
          '<a class="bl-btn" href="'+BLP.agendaUrl()+'" target="_blank" rel="noopener">'+t.bookBtn+'</a>'+
          (set(CONFIG.agente)?'<a class="bl-btn bl-btn2" href="'+CONFIG.agente+'" target="_blank" rel="noopener">'+t.testBtn+'</a>':'')+
          '</div>';
      }
      h+='<p class="bl-diag-note">'+t.note+'</p>'+
         '<div class="bl-diag-row"><button type="button" class="bl-link" data-act="restart">'+t.again+'</button></div>';
    }
    body.innerHTML=h;
    var f=body.querySelector('.bl-diag-opt[aria-pressed="true"]')||body.querySelector('button.bl-btn, .bl-diag-opt, input');
    if(f) f.focus({preventScroll:true});
    modal.querySelector('.bl-diag-panel').scrollTop=0;
  }
  BLP.on(function(){ if(!modal.hidden && !body.querySelector('form')) render(); });

  function send(lead){
    var r=calc(), data={
      fuente:'diagnostico-web', fecha:new Date().toISOString(), idioma:BLP.lang, moneda:BLP.cur,
      nombre:lead.nombre, clinica:lead.clinica, telefono:lead.whatsapp, email:lead.email, agenda:lead.agenda,
      puntaje:r.score, fugas:r.fugas.map(function(k){return TX.es.fugas[k][0];}).join(' | '),
      estimacion_baja:Math.round(r.bajo), estimacion_alta:Math.round(r.alto)
    };
    QD.forEach(function(q){ var o=q.id==='ticket'?TX.es.q['ticket'+BLP.cur]:TX.es.q[q.id]; data['r_'+q.id]=o[2][st.a[q.id]]; });
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
    if(o){ var q=QD[st.i]; st.a[q.id]=+o.getAttribute('data-opt'); render();
      setTimeout(function(){ if(st.i<QD.length && st.a[QD[st.i].id]!==undefined && QD[st.i].id===q.id){ st.i++; render(); } },260); return; }
    var a=e.target.closest('[data-act]'); if(!a) return;
    var act=a.getAttribute('data-act');
    if(act==='start'||act==='next'){ st.i++; render(); }
    else if(act==='back'){ st.i--; render(); }
    else if(act==='restart'){ reset(); st.i=0; render(); }
  });
  root.addEventListener('submit',function(e){
    var f=e.target.closest('.bl-diag-form'); if(!f) return; e.preventDefault();
    var t=L(), g=function(n){ return (f.elements[n].value||'').trim(); }, err=f.querySelector('.bl-diag-err');
    var tel=g('whatsapp').replace(/[^\d+]/g,'');
    if(!g('nombre')||!g('clinica')){ err.textContent=t.eName; return; }
    if(tel.replace(/\D/g,'').length<8){ err.textContent=t.eTel; return; }
    if(g('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g('email'))){ err.textContent=t.eMail; return; }
    if(!f.elements.ok.checked){ err.textContent=t.eOk; return; }
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
