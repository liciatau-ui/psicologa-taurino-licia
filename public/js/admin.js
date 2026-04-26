const sectionLabels = {
  services: "Servizi",
  bes: "BES e DSA",
  cognitive: "Stimolazione cognitiva",
  about: "Chi sono",
  process: "Primo colloquio",
  articles: "Articoli",
  contact: "Contatti"
};

function showTab(name){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  if(name==='json') document.getElementById('jsonArea').value=JSON.stringify(site,null,2);
}

function get(path){return path.split('.').reduce((o,k)=>o?.[k],site)}
function set(path,val){
  const keys=path.split('.');
  let o=site;
  keys.slice(0,-1).forEach(k=>{
    if(o[k] === undefined) o[k] = {};
    o=o[k];
  });
  const last=keys.at(-1);
  const el=document.activeElement;
  if(el && el.type==='number') val=Number(val);
  o[last]=val;
  refreshJson();
}
function escapeHtml(v){return String(v ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function refreshJson(){const area=document.getElementById('jsonArea'); if(area) area.value=JSON.stringify(site,null,2)}
function refreshPreview(){document.getElementById('previewFrame').src='/preview?time='+Date.now()}
function syncAndSave(event){
  try{
    if(document.getElementById('tab-json').classList.contains('active')){
      site=JSON.parse(document.getElementById('jsonArea').value);
    }
    document.getElementById('siteJson').value=JSON.stringify(site);
  }catch(e){
    event.preventDefault();
    alert('JSON non valido: '+e.message);
  }
}

function input(path,label,type='text',placeholder=''){
  const value=get(path)??'';
  return `<div class="field"><label>${label}</label><input type="${type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" onchange="set('${path}',this.value)"></div>`;
}
function textarea(path,label){
  const value=get(path)??'';
  return `<div class="field"><label>${label}</label><textarea onchange="set('${path}',this.value)">${escapeHtml(value)}</textarea></div>`;
}
function select(path,label,opts){
  const value=get(path);
  return `<div class="field"><label>${label}</label><select onchange="set('${path}',this.value)">${opts.map(o=>`<option value="${escapeHtml(o)}" ${o===value?'selected':''}>${escapeHtml(o)}</option>`).join('')}</select></div>`;
}
function checkbox(path,label){
  const value=get(path);
  return `<div class="field"><label><input type="checkbox" ${value?'checked':''} onchange="set('${path}',this.checked)"> ${label}</label></div>`;
}
function color(path,label){return input(path,label,'color')}
function number(path,label){return input(path,label,'number')}
function details(title,body,open=false){
  return `<details class="group" ${open?'open':''}><summary>${title}</summary><div class="group-body">${body}</div></details>`;
}
async function uploadImage(path,input){
  if(!input.files || !input.files[0]) return;
  const fd=new FormData();
  fd.append('image',input.files[0]);
  const r=await fetch('/admin/upload',{method:'POST',body:fd});
  const data=await r.json();
  if(data.url){
    set(path,data.url);
    render();
    alert('Immagine caricata');
  } else alert('Errore upload immagine');
}
function imageField(path,label){
  const value=get(path)||'';
  return `<div class="field">
    <label>${label}</label>
    <input value="${escapeHtml(value)}" onchange="set('${path}',this.value)" placeholder="/img/licia-taurino.jpg oppure URL">
    <input type="file" accept="image/*" onchange="uploadImage('${path}',this)">
    ${value ? `<div class="image-preview"><img src="${escapeHtml(value)}"><span>Immagine attuale</span></div>` : ''}
  </div>`;
}

function removeItem(path,i){get(path).splice(i,1);render()}
function addObject(path,obj){get(path).push(obj);render()}
function addString(path){get(path).push('Nuova voce');render()}
function moveItem(path,i,dir){
  const arr=get(path); const ni=i+dir;
  if(ni<0 || ni>=arr.length) return;
  [arr[i],arr[ni]]=[arr[ni],arr[i]];
  render();
}

function sectionBasic(key,title,fields,img=false,extra=''){
  let html=checkbox(key+'.visible','Mostra sezione');
  html+=select(key+'.layout','Layout sezione', layoutOptions(key));
  fields.forEach(f=>{
    html+= f.includes('title') ? textarea(`${key}.${f}`,labelOf(f)) : textarea(`${key}.${f}`,labelOf(f));
  });
  if(img){
    html+=imageField(`${key}.image`,'Immagine');
    html+=input(`${key}.imagePosition`,'Posizione immagine','text','center top');
  }
  html+=extra;
  return details(title,html);
}
function labelOf(f){
  return ({eyebrow:'Sottotitolo piccolo',title:'Titolo',subtitle:'Testo descrittivo',text:'Testo',primaryButton:'Testo pulsante principale',secondaryButton:'Testo pulsante secondario',badgeTop:'Badge alto',badgeBottom:'Badge basso',name:'Nome sotto foto',alboText:'Iscrizione albo',footerText:'Testo footer'})[f] || f;
}
function layoutOptions(key){
  if(key==='hero') return ['text-left','image-left'];
  if(key==='about') return ['photo-left','photo-right'];
  if(key==='services') return ['grid-4','grid-3'];
  if(key==='bes') return ['dark-split'];
  if(key==='process') return ['steps-right'];
  if(key==='contact') return ['cards'];
  return ['grid-3'];
}

function listObjects(path,title,section,fields){
  let arr=get(path)||[];
  let html=checkbox(section+'.visible','Mostra sezione');
  html+=select(section+'.layout','Layout sezione', layoutOptions(section));
  html+=textarea(section+'.eyebrow','Sottotitolo piccolo');
  html+=textarea(section+'.title','Titolo sezione');
  if(get(section+'.text') !== undefined) html+=textarea(section+'.text','Testo introduttivo');

  arr.forEach((it,i)=>{
    html+=`<div class="item"><div class="item-head"><b>Elemento ${i+1}</b><div class="mini-actions">
      <button type="button" class="move" onclick="moveItem('${path}',${i},-1)">↑</button>
      <button type="button" class="move" onclick="moveItem('${path}',${i},1)">↓</button>
      <button type="button" class="danger" onclick="removeItem('${path}',${i})">Elimina</button>
    </div></div>`;
    fields.forEach(f=>html+=textarea(`${path}.${i}.${f}`,labelOf(f)));
    html+=`</div>`;
  });
  html+=`<button type="button" class="add" onclick="addObject('${path}',{title:'Nuovo titolo',text:'Nuovo testo'})">+ Aggiungi elemento</button>`;
  return details(title,html);
}

function listStrings(path,title,section){
  let arr=get(path)||[];
  let html=checkbox(section+'.visible','Mostra sezione');
  html+=select(section+'.layout','Layout sezione', layoutOptions(section));
  html+=textarea(section+'.eyebrow','Sottotitolo piccolo');
  html+=textarea(section+'.title','Titolo sezione');
  if(get(section+'.text') !== undefined) html+=textarea(section+'.text','Testo introduttivo');

  arr.forEach((it,i)=>{
    html+=`<div class="item"><div class="item-head"><b>Voce ${i+1}</b><div class="mini-actions">
      <button type="button" class="move" onclick="moveItem('${path}',${i},-1)">↑</button>
      <button type="button" class="move" onclick="moveItem('${path}',${i},1)">↓</button>
      <button type="button" class="danger" onclick="removeItem('${path}',${i})">Elimina</button>
    </div></div>${textarea(`${path}.${i}`,'Testo voce')}</div>`;
  });
  html+=`<button type="button" class="add" onclick="addString('${path}')">+ Aggiungi voce</button>`;
  return details(title,html);
}

function renderContent(){
  let html='';
  html+=details('Impostazioni generali',
    `<div class="row">
      ${input('settings.siteName','Nome sito')}
      ${input('settings.profession','Professione')}
      ${input('settings.logoText','Testo logo')}
      ${input('settings.whatsapp','WhatsApp senza +')}
      ${input('settings.phone','Telefono')}
      ${input('settings.email','Email')}
      ${input('settings.instagram','Instagram')}
      ${input('settings.instagramUrl','Link Instagram')}
      ${input('settings.city','Città')}
      ${input('settings.albo','Iscrizione albo')}
      ${input('settings.piva','P.IVA')}
    </div>
    ${textarea('settings.address','Indirizzo')}
    ${textarea('settings.whatsappMessage','Messaggio preimpostato WhatsApp')}
    ${textarea('settings.footerText','Testo footer')}`, true);

  html+=sectionBasic('hero','Hero / Prima schermata',['eyebrow','title','subtitle','primaryButton','secondaryButton','badgeTop','badgeBottom'],true);
  html+=listObjects('services.items','Servizi','services',['title','text']);
  html+=listStrings('bes.items','BES e DSA','bes');
  html+=listObjects('cognitive.items','Stimolazione cognitiva','cognitive',['title','text']);
  html+=sectionBasic('about','Chi sono',['eyebrow','title','text','name','subtitle','alboText'],true);
  html+=listStrings('process.items','Primo colloquio','process');
  html+=listObjects('articles.items','Articoli','articles',['title','text']);
  html+=sectionBasic('contact','Contatti',['eyebrow','title','text']);

  document.getElementById('tab-content').innerHTML=html;
}

function renderStyle(){
  const html1 = details('Colori e font',
    `<div class="row">
      ${color('settings.primaryColor','Colore principale')}
      ${color('settings.secondaryColor','Colore secondario')}
      ${color('settings.accentColor','Colore scuro')}
      ${color('settings.backgroundColor','Sfondo')}
      ${color('settings.cardColor','Colore box/card')}
      ${color('settings.textColor','Colore testo')}
      ${color('settings.mutedColor','Colore testo secondario')}
      ${select('settings.fontFamily','Font testi',['Inter','Montserrat','Lora','Playfair Display'])}
      ${select('settings.headingFont','Font titoli',['Playfair Display','Inter','Montserrat','Lora'])}
    </div>`, true);

  const html2 = details('Spazi e grandezze',
    `<div class="row">
      ${number('settings.titleSize','Grandezza titolo principale')}
      ${number('settings.sectionTitleSize','Grandezza titoli sezioni')}
      ${number('settings.textSize','Grandezza testo')}
      ${number('settings.menuSize','Grandezza menu')}
      ${number('settings.radius','Arrotondamento box')}
      ${number('settings.buttonRadius','Arrotondamento pulsanti')}
      ${number('settings.containerWidth','Larghezza sito')}
      ${number('settings.sectionSpacing','Spazio tra sezioni')}
      ${select('settings.alignment','Allineamento testi',['left','center','right'])}
      ${select('settings.menuPosition','Posizione menu',['left','center','right'])}
    </div>`, true);

  document.getElementById('tab-style').innerHTML=html1+html2;
}

function renderMenu(){
  let navHtml='';
  (site.nav||[]).forEach((n,i)=>{
    navHtml+=`<div class="item"><div class="item-head"><b>Voce menu ${i+1}</b><div class="mini-actions">
      <button type="button" class="move" onclick="moveItem('nav',${i},-1)">↑</button>
      <button type="button" class="move" onclick="moveItem('nav',${i},1)">↓</button>
      <button type="button" class="danger" onclick="removeItem('nav',${i})">Elimina</button>
    </div></div>
    ${checkbox(`nav.${i}.visible`,'Visibile')}
    ${input(`nav.${i}.label`,'Nome voce')}
    ${input(`nav.${i}.href`,'Link / ancora')}
    </div>`;
  });
  navHtml+=`<button type="button" class="add" onclick="addObject('nav',{label:'Nuova voce',href:'#',visible:true})">+ Aggiungi voce menu</button>`;

  let orderHtml='<p class="hint">Qui decidi l’ordine delle sezioni nel sito. Usa le frecce per spostarle.</p>';
  (site.sectionOrder||[]).forEach((key,i)=>{
    orderHtml+=`<div class="item"><div class="item-head"><b>${sectionLabels[key] || key}</b><div class="mini-actions">
      <button type="button" class="move" onclick="moveItem('sectionOrder',${i},-1)">↑</button>
      <button type="button" class="move" onclick="moveItem('sectionOrder',${i},1)">↓</button>
    </div></div></div>`;
  });

  document.getElementById('tab-menu').innerHTML=details('Menu sito',navHtml,true)+details('Ordine sezioni',orderHtml,true);
}

function jumpAdminSection(title){
  if(!title) return;
  document.querySelectorAll('.group').forEach(g=>{
    const s=g.querySelector('summary');
    if(s && s.textContent.trim()===title){
      g.open=true;
      g.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
}

function render(){
  renderContent();
  renderStyle();
  renderMenu();
  refreshJson();
}
render();
