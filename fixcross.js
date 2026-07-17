const fs = require('fs');
let f = fs.readFileSync('index.html', 'utf8');

// CSS: add transition to #reg and crossfade layers
f = f.replace(
  "#reg{padding:0;position:relative;overflow:hidden;background:var(--bg-deep)}",
  "#reg{padding:0;position:relative;overflow:hidden;background:var(--bg-deep)}\n.reg-bg{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;transition:opacity 1.2s ease;z-index:1}\n.reg-bg.active{opacity:1}\n.reg-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(10,10,18,0) 0%,rgba(10,10,18,0) 30%,rgba(10,10,18,.9) 100%)}"
);

// Update the HTML to add bg elements
f = f.replace(
  '<section class="sec" id="reg"><div class="reg-overlay" id="regOverlay">',
  '<section class="sec" id="reg"><div class="reg-bg" id="regBg"></div><div class="reg-bg" id="regBgNext"></div><div class="reg-overlay" id="regOverlay">'
);

// Update rreg function to use crossfade
const oldShowReg = "sec.style.background=r.img?'url(\"images/城邦/"+r.img+"\") center/cover no-repeat var(--bg-deep)':'none';";
const newShowReg = "var a=document.getElementById('regBg'),b=document.getElementById('regBgNext');if(r.img){b.style.backgroundImage='url(\"images/城邦/"+r.img+"\")';b.classList.add('active');setTimeout(function(){a.style.backgroundImage=b.style.backgroundImage;a.classList.add('active');b.classList.remove('active')},1200)}else{a.style.backgroundImage='';a.classList.remove('active')}";

f = f.replace(oldShowReg, newShowReg);

// Fix: the +r.img+ needs proper escaping in the replacement
// Actually let me redo this more carefully

fs.writeFileSync('index.html', f, 'utf8');

const m = f.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS OK'); }
catch(ex) { console.log('ERROR:', ex.message); }
