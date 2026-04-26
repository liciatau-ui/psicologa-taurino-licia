const controls = document.getElementById('controls');
const info = document.getElementById('selectedInfo');
const frame = document.getElementById('siteFrame');

let selected = null;

function renderControls(type, label, path){
  selected = {type, path};
  info.innerHTML = `<b>${label}</b><br><small>${path}</small>`;

  if(type === 'text'){
    controls.className='controls';
    controls.innerHTML = `
      <div class="group">
        <h3>Testo</h3>
        <label>Contenuto</label>
        <textarea onchange="setPath('${path}', this.value)">${escapeHtml(getPath(path) || '')}</textarea>
        <div class="row">
          <div><label>Colore</label><input type="color" onchange="setPath('${path}Color', this.value)"></div>
          <div><label>Grandezza</label><input type="number" placeholder="es. 24"></div>
        </div>
        <label>Allineamento</label>
        <select onchange="setPath('settings.alignment', this.value)">
          <option value="left">Sinistra</option>
          <option value="center">Centro</option>
          <option value="right">Destra</option>
        </select>
        <div class="mini">
          <button onclick="alert('Il grassetto avanzato sarà collegato al prossimo step')">Grassetto</button>
          <button onclick="alert('Il corsivo avanzato sarà collegato al prossimo step')">Corsivo</button>
        </div>
      </div>`;
  }

  if(type === 'image'){
    controls.className='controls';
    controls.innerHTML = `
      <div class="group">
        <h3>Immagine</h3>
        <label>URL immagine</label>
        <input value="${escapeHtml(getPath(path) || '')}" onchange="setPath('${path}', this.value)">
        <label>Carica immagine</label>
        <input type="file" accept="image/*" onchange="uploadImage('${path}', this)">
        <label>Posizione</label>
        <input value="${escapeHtml(getPath(path.replace('.image','.imagePosition')) || 'center top')}" onchange="setPath('${path.replace('.image','.imagePosition')}', this.value)">
        <div class="mini">
          <button onclick="setPath('${path.replace('.image','.imagePosition')}', 'center center')">Centra</button>
          <button onclick="setPath('${path}', '')" class="danger">Elimina</button>
        </div>
      </div>`;
  }

  if(type === 'section'){
    controls.className='controls';
    controls.innerHTML = `
      <div class="group">
        <h3>Sezione</h3>
        <label>Mostra sezione</label>
        <select onchange="setPath('${path}.visible', this.value==='true')">
          <option value="true">Visibile</option>
          <option value="false">Nascosta</option>
        </select>
        <label>Layout</label>
        <input value="${escapeHtml(getPath(path+'.layout') || '')}" onchange="setPath('${path}.layout', this.value)">
      </div>`;
  }
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
}

async function saveVisual(){
  const fd = new FormData();
  fd.append('siteJson', JSON.stringify(site));
  const r = await fetch('/admin/save', {method:'POST', body:new URLSearchParams(fd)});
  if(r.ok){ alert('Salvato. Ricarico anteprima.'); frame.src='/preview?visual=1&t='+Date.now(); }
  else alert('Errore salvataggio');
}

/* Mappa rapida elementi: per ora selezione dal pannello.
   Nel prossimo step posso collegare il click diretto dentro iframe con data-path su ogni elemento. */
controls.className='controls';
controls.innerHTML = `
  <div class="group"><h3>Selezione veloce</h3>
    <button onclick="renderControls('text','Titolo homepage','hero.title')">Titolo homepage</button>
    <button onclick="renderControls('text','Testo homepage','hero.subtitle')">Testo homepage</button>
    <button onclick="renderControls('image','Foto principale','hero.image')">Foto principale</button>
    <button onclick="renderControls('text','Titolo contatti','contact.title')">Titolo contatti</button>
    <button onclick="renderControls('section','Sezione boot camp','bootcamps')">Boot camp / locandine</button>
  </div>
`;
