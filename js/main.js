document.documentElement.classList.add('js-ready');
const navWrap=document.querySelector('.nav-wrap');
const toggle=document.querySelector('.menu-toggle');
if(toggle&&navWrap){
  toggle.addEventListener('click',()=>{
    const open=navWrap.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    document.body.classList.toggle('no-scroll',open);
  });
  document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{
    navWrap.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation');
    document.body.classList.remove('no-scroll');
  }));
}
const header=document.querySelector('.site-header');
const onScroll=()=>header&&header.classList.toggle('scrolled',window.scrollY>12);
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});
  btn.classList.add('active');btn.setAttribute('aria-selected','true');
  const f=btn.dataset.filter;
  const cards=[...document.querySelectorAll('.gallery-item')];
  cards.forEach(x=>x.classList.add('is-filtering'));
  window.setTimeout(()=>{
    cards.forEach(x=>{
      const visible=f==='all'||x.dataset.category===f;
      x.hidden=!visible;
      if(visible) requestAnimationFrame(()=>x.classList.remove('is-filtering'));
    });
  },180);
}));

function demoForm(id,msg){
  const f=document.getElementById(id),m=document.getElementById(msg);
  if(f)f.addEventListener('submit',e=>{
    e.preventDefault();
    if(m)m.textContent='Thanks — your submission has been received. Connect this form to your email/CRM before launch.';
    f.reset();
  });
}
demoForm('careerForm','careerMessage');demoForm('contactForm','contactMessage');
const rf=document.getElementById('reviewForm');
if(rf)rf.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(rf),name=d.get('name'),company=d.get('company'),review=d.get('review'),rating=Number(d.get('rating'));
  const card=document.createElement('article');card.className='review reveal';
  const safe=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  card.innerHTML=`<div class="stars" aria-label="${rating} out of 5 stars">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</div><p>“${safe(review)}”</p><strong>${safe(name)}</strong><span>${safe(company||'Customer')}</span>`;
  document.getElementById('reviewsList').prepend(card);
  requestAnimationFrame(()=>card.classList.add('is-visible'));
  const rm=document.getElementById('reviewMessage');if(rm)rm.textContent='Thank you for your review. It is now visible in this browser preview.';
  rf.reset();
});

const revealItems=document.querySelectorAll('.reveal');
if(revealItems.length){
  const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  revealItems.forEach(item=>observer.observe(item));
}
