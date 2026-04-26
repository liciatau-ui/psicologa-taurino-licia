const controls = document.getElementById('controls');
const info = document.getElementById('selectedInfo');
const frame = document.getElementById('siteFrame');

let selectedPath = null;
let selectedType = null;
let selectedElement = null;

frame.addEventListener('load', attachClickHandlers);

function attachClickHandlers(){
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.body.classList.add('visual-edit-mode');

  doc.querySelectorAll('[data-edit-path]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      doc.querySelectorAll('[data-selected="true"]').forEach(x => x.removeAttribute('data-selected'));
      el.setAttribute('data-selected','true');

      selectedElement = el;
      selectedPath = el.dataset.editPath;
      selectedType = el.dataset.editType || guessType(el);

      renderControls(selectedType, selectedPath, el);
    }, true);
  });
}

function guessType(el){
  if(el.tagName === 'IMG') return 'image';
  if(el.dataset.editType === 'section') return 'section';
  if(el.classList.contains('card') || el.classList.contains('contact-card')) return 'box';
  return 'text';
}

function renderControls(type,path,el){
  info.innerHTML = `<b>${humanType(type)}</b><br><small>${path}</small>`;
  controls.className='controls';
  if(type === 'image') controls.innerHTML = imageControls(path);
  else if(type === 'box') controls.innerHTML = boxControls(path);
  else if(type === 'section') controls.innerHTML = sectionControls(path);
  else controls.innerHTML = textControls(path);
}
function humanType(t){return {text:'Testo',image:'Immagine',box:'Box/Card',section:'Sezione'}[t]||'Elemento'}

function textControls(path){
  return `<div class="group">
    <h3>Testo</h3>
    <label>Contenuto</label>
    <textarea onchange="setPath('${path}', this.value); liveText(this.value)">${escapeHtml(getPath(path) || '')}</textarea>

    <div class="row">
      <div><label>Colore</label><input type="color" onchange="setStyle('${path}','color',this.value)"></div>
      <div><label>Grandezza px</label><input type="number" placeholder="es. 24" onchange="setStyle('${path}','fontSize',this.value+'px')"></div>
    </div>

    <label>Allineamento</label>
    <select onchange="setStyle('${path}','textAlign',this.value)">
      <option value="">Automatico</option>
      <option value="left">Sinistra</option>
      <option value="center">Centro</option>
      <option value="right">Destra</option>
    </select>

    <div class="mini">
      <button onclick="setStyle('${path}','fontWeight','900')">Grassetto</button>
      <button onclick="setStyle('${path}','fontWeight','400')">Normale</button>
      <button onclick="setStyle('${path}','textTransform','uppercase')">Maiuscolo</button>
      <button onclick="setStyle('${path}','textTransform','none')">Normale</button>
    </div>
  </div>`;
}

function imageControls(path){
  const posPath = path.replace('.image','.imagePosition');
  return `<div class="group">
    <h3>Immagine</h3>
    <label>URL immagine</label>
    <input value="${escapeHtml(getPath(path) || '')}" onchange="setPath('${path}',this.value); liveAttr('src',this.value)">

    <label>Carica immagine</label>
    <input type="file" accept="image/*" onchange="uploadImage('${path}',this)">

    <label>Posizione immagine</label>
    <input value="${escapeHtml(getPath(posPath) || 'center top')}" onchange="setPath('${posPath}',this.value); setStyle('${path}','objectPosition',this.value)">

    <div class="row">
      <div><label>Larghezza</label><input type="text" placeholder="es. 100% o 360px" onchange="setStyle('${path}','width',this.value)"></div>
      <div><label>Altezza</label><input type="text" placeholder="es. 420px" onchange="setStyle('${path}','height',this.value)"></div>
    </div>

    <div class="mini">
      <button onclick="setPath('${posPath}','center center'); setStyle('${path}','objectPosition','center center')">Centra</button>
      <button onclick="setStyle('${path}','transform','scale(1.08)')">Ingrandisci</button>
      <button onclick="setStyle('${path}','transform','scale(1)')">Normale</button>
      <button class="danger" onclick="setPath('${path}',''); liveAttr('src','')">Elimina</button>
    </div>
  </div>`;
}

function boxControls(path){
  return `<div class="group">
    <h3>Box / Card</h3>
    <div class="row">
      <div><label>Sfondo</label><input type="color" onchange="setStyle('${path}','backgroundColor',this.value)"></div>
      <div><label>Testo</label><input type="color" onchange="setStyle('${path}','color',this.value)"></div>
    </div>
    <div class="row">
      <div><label>Padding</label><input type="text" placeholder="es. 30px" onchange="setStyle('${path}','padding',this.value)"></div>
      <div><label>Arrotondamento</label><input type="text" placeholder="es. 24px" onchange="setStyle('${path}','borderRadius',this.value)"></div>
    </div>
    <label>Spostamento</label>
    <input type="text" placeholder="es. translateX(20px)" onchange="setStyle('${path}','transform',this.value)">
  </div>`;
}

function sectionControls(path){
  return `<div class="group">
    <h3>Sezione</h3>
    <label>Mostra / nascondi</label>
    <select onchange="setPath('${path}.visible', this.value==='true')">
      <option value="true">Visibile</option>
      <option value="false">Nascosta</option>
    </select>
    <div class="row">
      <div><label>Sfondo</label><input type="color" onchange="setStyle('${path}','backgroundColor',this.value)"></div>
      <div><label>Spazio interno</label><input type="text" placeholder="es. 60px 0" onchange="setStyle('${path}','padding',this.value)"></div>
    </div>
    <label>Spostamento sezione</label>
    <input type="text" placeholder="es. translateY(-20px)" onchange="setStyle('${path}','transform',this.value)">
  </div>`;
}

function getPath(path){return path.split('.').reduce((o,k)=>o?.[k],site)}
function setPath(path,val){
  const keys=path.split('.');
  let o=site;
  keys.slice(0,-1).forEach(k=>{if(o[k]===undefined)o[k]={};o=o[k]});
  o[keys.at(-1)] = val;
}
function setStyle(path,prop,val){
  site.visualStyles = site.visualStyles || {};
  site.visualStyles[path] = site.visualStyles[path] || {};
  site.visualStyles[path][prop] = val;
  if(selectedElement) selectedElement.style[prop] = val;
}
function liveText(v){ if(selectedElement) selectedElement.textContent = v; }
function liveAttr(attr,v){ if(selectedElement) selectedElement.setAttribute(attr,v); }

async function uploadImage(path,input){
  if(!input.files?.[0]) return;
  const fd = new FormData();
  fd.append('image', input.files[0]);
  const r = await fetch('/admin/upload',{method:'POST',body:fd});
  const data = await r.json();
  if(data.url){ setPath(path,data.url); liveAttr('src',data.url); alert('Immagine caricata. Premi Salva.'); }
  else alert('Errore caricamento');
}

async function saveVisual(){
  const body = new URLSearchParams();
  body.append('siteJson', JSON.stringify(site));
  const r = await fetch('/admin/save',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
  if(r.ok){ alert('Salvato.'); frame.src='/preview?visual=1&t='+Date.now(); }
  else alert('Errore salvataggio');
}
function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
