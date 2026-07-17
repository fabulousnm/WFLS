const f = require('fs').readFileSync('index.html', 'utf8');
// Find and replace the backgroundImage line with a simpler approach
const oldLine = '    sec.style.backgroundImage=r.img?"url(\'images/城邦/"+encodeURIComponent(r.img)+"\')":"";';
const newLine = "    sec.style.background=r.img?'url(\"images/城邦/"+r.img+"\") center/cover no-repeat var(--bg-deep)':'none';";
const result = f.replace(oldLine, newLine);
require('fs').writeFileSync('index.html', result, 'utf8');
console.log('Replaced:', f.includes(oldLine), '->', result.includes(newLine));
