const fs = require('fs');
let f = fs.readFileSync('index.html', 'utf8');
const i = f.indexOf('sec.style.backgroundImage=r.img?');
const e = f.indexOf(';', i) + 1;
const oldPart = f.substring(i, e);
console.log('Old:', JSON.stringify(oldPart));

const newPart = "    sec.style.background=r.img?'url(\"images/城邦/"+r.img+"\") center/cover no-repeat var(--bg-deep)':'none';";
console.log('New:', newPart);

f = f.replace(oldPart, newPart);
fs.writeFileSync('index.html', f, 'utf8');
console.log('Done');
