import {mkdir,readFile,readdir,writeFile,copyFile} from 'node:fs/promises';
const files=(await readdir('lessons')).filter(x=>/^\d{4}-\d{2}-\d{2}\.json$/.test(x));
const lessons=await Promise.all(files.map(async f=>JSON.parse(await readFile('lessons/'+f,'utf8'))));
for(const l of lessons){if(!l.date||!l.title||l.sections?.length!==7)throw Error('Invalid lesson '+l.date);}
lessons.sort((a,b)=>b.date.localeCompare(a.date));
await mkdir('_site/lessons',{recursive:true});
await writeFile('_site/lessons/index.json',JSON.stringify(lessons));
await copyFile('index.html','_site/index.html');
await writeFile('_site/.nojekyll','');
console.log('Built '+lessons.length+' lessons');
