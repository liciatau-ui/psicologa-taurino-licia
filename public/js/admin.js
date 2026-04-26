function showTab(name){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));document.getElementById('tab-'+name).classList.add('active');if(name==='json')document.getElementById('jsonArea').value=JSON.stringify(site,null,2)}
function input(path,label,type='text'){const value=get(path)??'';return `<div class="field"><label>${label}</label><input type="${type}" value="${escapeHtml(value)}" onchange="set('${path}',this.value)"></div>`}
function textarea(path,label){const value=get(path)??'';return `<div class="field"><label>${label}</label><textarea onchange="set('${path}',this.value)">${escapeHtml(value)}</textarea></div>`}
function select(path,label,opts){const value=get(path);return `<div class="field"><label>${label}</label><select onchange="set('${path}',this.value)">${opts.map(o=>`<option ${o===value?'selected':''}>${o}</option>`).join('')}</select></div>`}
function checkbox(path,label){const value=get(path);return `<div class="field"><label><input type="checkbox" ${value?'checked':''} onchange="set('${path}',this.checked)"> ${label}</label></div>`}
function color(path,label){return input(path,label,'color')}
function number(path,label){return input(path,label,'number')}
function get(path){return path.split('.').reduce((o,k)=>o?.[k],site)}
function set(path,val){const keys=path.split('.');let o=site;keys.slice(0,-1).forEach(k=>o=o[k]);const last=keys.at(-1);if(!isNaN(val)&&val!==''&&document.activeElement?.type==='number') val=Number(val);o[last]=val;refreshJson()}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function refreshJson(){document.getElementById('jsonArea').value=JSON.stringify(site,null,2)}
function syncAndSave(){try{if(document.getElementById('tab-json').classList.contains('active')) site=JSON.parse(document.getElementById('jsonArea').value);document.getElementById('siteJson').value=JSON.stringify(site)}catch(e){alert('JSON non valido: '+e.message);event.preventDefault()}}
function removeItem(path,i){get(path).splice(i,1);render()}
function addObject(path,obj){get(path).push(obj);render()}
function addString(path){get(path).push('Nuova voce');render()}
async function uploadImage(path,input){const fd=new FormData();fd.append('image',input.files[0]);const r=await fetch('/admin/upload',{method:'POST',body:fd});const data=await r.json();if(data.url){set(path,data.url);render();alert('Immagine caricata')}else alert('Errore upload')}
function imageField(path,label){return `<div class="field"><label>${label}</label><input value="${escapeHtml(get(path)||'')}" onchange="set('${path}',this.value)" placeholder="URL immagine"><input type="file" accept="image/*" onchange="uploadImage('${path}',this)"></div>`}
function renderContent(){
let html='';
html+=`<details class="group"><summary>Impostazioni contatti</summary><div class="row">${input('settings.siteName','Nome sito')}${input('settings.logoText','Testo logo')}${input('settings.whatsapp','WhatsApp senza +')}${input('settings.phone','Telefono')}${input('settings.email','Email')}${input('settings.city','Città')}${input('settings.instagram','Instagram')}${input('settings.instagramUrl','Link Instagram')}</div>${textarea('settings.address','Indirizzo')}${input('settings.albo','Albo')}${input('settings.piva','P.IVA')}</details>`;
html+=sectionBasic('hero','Hero / Prima schermata',['eyebrow','title','subtitle','primaryButton','secondaryButton'],true);
html+=listObjects('services.items','Servizi','services',['title','text']);
html+=listStrings('bes.items','BES e DSA','bes');
html+=listObjects('cognitive.items','Stimolazione cognitiva','cognitive',['title','text']);
html+=sectionBasic('bes','Testo sezione BES',['eyebrow','title','text']);
html+=sectionBasic('cognitive','Testo stimolazione cognitiva',['eyebrow','title','text']);
html+=sectionBasic('about','Chi sono',['eyebrow','title','text'],true);
html+=listStrings('process.items','Passaggi primo colloquio','process');
html+=sectionBasic('process','Testo primo colloquio',['eyebrow','title','text']);
html+=listObjects('articles.items','Articoli','articles',['title','text']);
html+=sectionBasic('contact','Contatti',['eyebrow','title','text']);
document.getElementById('tab-content').innerHTML=html;
}
function sectionBasic(key,title,fields,img=false){let html=`<details class="group"><summary>${title}</summary>${checkbox(key+'.visible','Mostra sezione')}`;fields.forEach(f=>{html+=f==='title'?textarea(`${key}.${f}`,f):textarea(`${key}.${f}`,f)});if(img)html+=imageField(`${key}.image`,'Immagine');return html+'</details>'}
function listObjects(path,title,section,fields){let arr=get(path);let html=`<details class="group"><summary>${title}</summary>${checkbox(section+'.visible','Mostra sezione')}`;arr.forEach((it,i)=>{html+=`<div class="item"><b>Elemento ${i+1}</b>`;fields.forEach(f=>html+=textarea(`${path}.${i}.${f}`,f));html+=`<div class="mini-actions"><button class="danger" onclick="removeItem('${path}',${i})">Elimina</button></div></div>`});html+=`<button class="add" onclick="addObject('${path}',{title:'Nuovo titolo',text:'Nuovo testo'})">+ Aggiungi</button></details>`;return html}
function listStrings(path,title,section){let arr=get(path);let html=`<details class="group"><summary>${title}</summary>${checkbox(section+'.visible','Mostra sezione')}`;arr.forEach((it,i)=>{html+=`<div class="item">${textarea(`${path}.${i}`,'Voce '+(i+1))}<button class="danger" onclick="removeItem('${path}',${i})">Elimina</button></div>`});html+=`<button class="add" onclick="addString('${path}')">+ Aggiungi voce</button></details>`;return html}
function renderStyle(){document.getElementById('tab-style').innerHTML=`<details class="group"><summary>Grafica globale</summary><div class="row">${color('settings.primaryColor','Colore principale')}${color('settings.secondaryColor','Colore secondario')}${color('settings.accentColor','Colore scuro')}${color('settings.backgroundColor','Sfondo')}${color('settings.textColor','Testo')}${select('settings.fontFamily','Font',['Inter','Montserrat','Playfair Display'])}${number('settings.titleSize','Dimensione titolo hero')}${number('settings.textSize','Dimensione testo')}${number('settings.radius','Arrotondamento box')}${select('settings.alignment','Allineamento',['left','center','right'])}</div></details><details class="group"><summary>Menu sito</summary>${site.nav.map((n,i)=>`<div class="item">${input(`nav.${i}.label`,'Etichetta')}${input(`nav.${i}.href`,'Link')}<button class="danger" onclick="removeItem('nav',${i})">Elimina</button></div>`).join('')}<button class="add" onclick="addObject('nav',{label:'Nuova voce',href:'#'})">+ Aggiungi voce menu</button></details>`}
function render(){renderContent();renderStyle();refreshJson()}
render();


function jumpAdminSection(title){
  if(!title) return;
  const groups=[...document.querySelectorAll('.group')];
  const found=groups.find(g => (g.querySelector('summary')?.textContent || '').trim() === title);
  if(found){
    found.open = true;
    found.scrollIntoView({behavior:'smooth', block:'start'});
  }
}
function openFirstGroup(){
  const first=document.querySelector('.tab.active .group');
  if(first) first.open=true;
}
setTimeout(openFirstGroup,50);
