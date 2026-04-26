const controls = document.getElementById('controls');
const info = document.getElementById('selectedInfo');
const frame = document.getElementById('siteFrame');

let selectedPath = null;
let selectedType = null;

frame.addEventListener('load', () => {
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.body.classList.add('visual-edit-mode');

  doc.querySelectorAll('[data-edit-path]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      doc.querySelectorAll('[data-selected="true"]').forEach(x => {
        x.removeAttribute('data-selected');
        x.style.outline = '';
        x.style.outlineOffset = '';
      });

      el.setAttribute('data-selected', 'true');
      el.style.outline = '4px solid #7BA58D';
      el.style.outlineOffset = '4px';

      selectedPath = el.dataset.editPath;
      selectedType = el.dataset.editType || guessType(el);

      renderControls(selectedType, selectedPath, el);
    }, true);
  });
});

function guessType(el){
  if(el.tagName === 'IMG') return 'image';
  if(el.classList.contains('card') || el.classList.contains('contact-card')) return 'box';
  return 'text';
}

function renderControls(type, path, el){
  info.innerHTML = `<b>Elemento selezionato</b><br><small>${path}</small>`;
  controls.className='controls';

  if(type === 'image'){
    controls.innerHTML = imageControls(path);
    return;
  }

  if(type === 'box'){
    controls.innerHTML = boxControls(path);
    return;
  }

  controls.innerHTML = textControls(path);
}

function textControls(path){
  return `<div class="group">
    <h3>Testo</h3>
    <label>Contenuto</label>
    <textarea onchange="setPath('${path}', this.value)">${escapeHtml(getPath(path) || '')}</textarea>

    <div class="row">
      <div><label>Colore testo</label><input type="color" onchange="setPath('${path}Color', this.value)"></div>
      <div><label>Grandezza</label><input type="number" placeholder="es. 24" onchange="setPath('${path}Size', Number(this.value))"></div>
    </div>

    <label>Allineamento generale</label>
    <select onchange="setPath('settings.alignment', this.value)">
      <option value="left">Sinistra</option>
      <option value="center">Centro</option>
      <option value="right">Destra</option>
    </select>

    <div class="mini">
      <button onclick="setPath('${path}Bold', true)">Grassetto</button>
      <button onclick="setPath('${path}Bold', false)">Normale</button>
      <button onclick="setPath('${path}Align', 'center')">Centra</button>
      <button onclick="setPath('${path}Align', 'left')">Sinistra</button>
    </div>
  </div>`;
}

function imageControls(path){
  const posPath = path.replace('.image','.imagePosition');
  return `<div class="group">
    <h3>Immagine</h3>
    <label>URL immagine</label>
    <input value="${escapeHtml(getPath(path) || '')}" onchange="setPath('${path}', this.value)">

    <label>Carica immagine</label>
    <input type="file" accept="image/*" onchange="uploadImage('${path}', this)">

    <label>Posizione immagine</label>
    <input value="${escapeHtml(getPath(posPath) || 'center top')}" onchange="setPath('${posPath}', this.value)">

    <div class="mini">
      <button onclick="setPath('${posPath}', 'center center')">Centra</button>
      <button onclick="setPath('${posPath}', 'center top')">In alto</button>
      <button onclick="setPath('${path}', '')" class="danger">Elimina</button>
    </div>
  </div>`;
}

function boxControls(path){
  return `<div class="group">
    <h3>Box / Card</h3>
    <label>Colore sfondo globale card</label>
    <input type="color" onchange="setPath('settings.cardColor', this.value)">
    <label>Arrotondamento box</label>
    <input type="number" value="${getPath('settings.radius') || 28}" onchange="setPath('settings.radius', Number(this.value))">
    <label>Spazi tra sezioni</label>
    <input type="number" value="${getPath('settings.sectionSpacing') || 58}" onchange="setPath('settings.sectionSpacing', Number(this.value))">
  </div>`;
}

function getPath(path){
  return path.split('.').reduce((o,k)=>o?.[k],site);
}
function setPath(path,val){
  const keys=path.split('.');
  let o=site;
  keys.slice(0,-1).forEach(k=>{ if(o[k]===undefined) o[k]={}; o=o[k]; });
  o[keys.at(-1)] = val;
}
function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

async function uploadImage(path,input){
  if(!input.files?.[0]) return;
  const fd = new FormData();
  fd.append('image', input.files[0]);
  const r = await fetch('/admin/upload', {method:'POST', body:fd});
  const data = await r.json();
  if(data.url){ setPath(path,data.url); alert('Immagine caricata. Premi Salva.'); }
  else alert('Errore caricamento immagine');
}

async function saveVisual(){
  const body = new URLSearchParams();
  body.append('siteJson', JSON.stringify(site));
  const r = await fetch('/admin/save', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body});
  if(r.ok){
    alert('Salvato. Ricarico anteprima.');
    frame.src='/preview?visual=1&t='+Date.now();
  } else {
    alert('Errore salvataggio.');
  }
}