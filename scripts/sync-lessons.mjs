import {mkdir,writeFile,readFile} from 'node:fs/promises';
const origin=process.env.LESSON_SOURCE_URL;
const token=process.env.LESSON_SOURCE_TOKEN;
if(!origin||!token)throw Error('Missing lesson source configuration');
const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai'}).format(new Date());
let rows;
for(let attempt=0;attempt<16;attempt++){
  try{
    const response=await fetch(origin+'/api/lessons',{headers:{'OAI-Sites-Authorization':'Bearer '+token},signal:AbortSignal.timeout(30000)});
    if(!response.ok)throw Error('Source returned HTTP '+response.status);
    rows=await response.json();
    if(!Array.isArray(rows))throw Error('Invalid source response');
    if(rows.some(x=>x.date===today))break;
  }catch(error){console.log('Source unavailable; attempt '+(attempt+1));}
  if(attempt===15)throw Error('Today’s lesson is not available; existing lessons remain unchanged');
  await new Promise(resolve=>setTimeout(resolve,60000));
}
await mkdir('lessons',{recursive:true});
for(const lesson of rows){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(lesson.date)||!lesson.title||lesson.sections?.length!==7)throw Error('Invalid lesson');
  const file='lessons/'+lesson.date+'.json';
  const text=JSON.stringify(lesson,null,2);
  let previous='';try{previous=await readFile(file,'utf8')}catch{}
  if(previous!==text)await writeFile(file,text);
}
console.log('Synchronized '+rows.length+' lessons; latest date '+today);
