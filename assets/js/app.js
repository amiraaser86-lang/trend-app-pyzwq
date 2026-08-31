/* و ادخل الوصف تضبيق  وم — منطق التطبيق (مولّد آليًا) */
(function(){
  var D = window.__DATA || {};
  var reveal = document.querySelectorAll('.reveal:not(.in)');
  var io = new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.15});
  reveal.forEach(function(el){io.observe(el);});

  var toastEl = document.getElementById('toast'), tt;
  function toast(m){ toastEl.textContent=m; toastEl.classList.add('on'); clearTimeout(tt); tt=setTimeout(function(){toastEl.classList.remove('on');},2200); }

  var cartN = 0, cartEl = document.getElementById('cartCount');
  document.querySelectorAll('.add').forEach(function(b){
    b.addEventListener('click', function(){ cartN++; cartEl.textContent = cartN;
      cartEl.animate([{transform:'scale(1)'},{transform:'scale(1.5)'},{transform:'scale(1)'}],{duration:380,easing:'cubic-bezier(.2,.9,.25,1)'});
      toast('تمت الإضافة إلى السلة'); });
  });
  document.querySelectorAll('.order').forEach(function(b){ b.addEventListener('click', function(){ toast('تم تسجيل طلبك — سنتواصل معك قريبًا'); }); });

  var cta = ['ctaTop','ctaHero'].map(function(id){return document.getElementById(id);}).filter(Boolean);
  cta.forEach(function(b){ b.addEventListener('click', function(){ var t=document.querySelector('.grid3')||document.querySelector('.panel'); if(t) t.scrollIntoView({behavior:'smooth'}); }); });

  var todo = document.getElementById('todo');
  if(todo){
    var bar=document.getElementById('todoBar'), cnt=document.getElementById('todoCount');
    function refresh(){ var all=todo.querySelectorAll('li'), d=todo.querySelectorAll('li.done').length;
      bar.style.width = (all.length? d/all.length*100 : 0)+'%'; cnt.textContent = d+' / '+all.length; }
    todo.addEventListener('click', function(e){
      var c=e.target.closest('.check'); if(!c) return;
      c.parentElement.classList.toggle('done'); refresh(); });
    var form=document.getElementById('addForm'), input=document.getElementById('addInput');
    form.addEventListener('submit', function(e){ e.preventDefault(); var v=input.value.trim(); if(!v) return;
      var li=document.createElement('li'); li.className='reveal';
      li.innerHTML='<button class="check" aria-label="إنجاز"></button><div class="t-body"><strong></strong><span>أُضيفت الآن · متوسطة</span></div><span class="pill info">جديدة</span>';
      li.querySelector('strong').textContent=v; todo.appendChild(li); requestAnimationFrame(function(){li.classList.add('in')}); input.value=''; refresh(); });
    refresh();
  }
  var bf=document.getElementById('bookForm');
  if(bf) bf.addEventListener('submit',function(e){e.preventDefault();toast('تم حجز طاولتك بنجاح ✓');bf.reset();});

  document.querySelectorAll('.links a').forEach(function(a){a.addEventListener('click',function(){document.querySelectorAll('.links a').forEach(function(x){x.classList.remove('on')});a.classList.add('on');});});
})();