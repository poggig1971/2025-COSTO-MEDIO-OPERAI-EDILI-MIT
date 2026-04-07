// ═══════════════════════════════════
// INIT
// ═══════════════════════════════════

function initCCNL() {
  renderCCNLLayout();
  renderCCNLList();
}

// ═══════════════════════════════════
// LAYOUT
// ═══════════════════════════════════

function renderCCNLLayout() {
  const container = document.getElementById("ccnl-container");

  container.innerHTML = `
    <div style="display:flex;gap:20px">

      <!-- SIDEBAR -->
      <div style="width:300px;background:white;border:1px solid #e5e7eb;border-radius:6px;padding:12px">

        <input id="ccnl-search" placeholder="🔍 Cerca articolo..." 
          style="width:100%;padding:6px;border:1px solid #d1d5db;border-radius:4px;margin-bottom:10px"
          oninput="renderCCNLList()"
        />

        <select id="ccnl-filter" onchange="renderCCNLList()" 
          style="width:100%;padding:6px;border:1px solid #d1d5db;border-radius:4px;margin-bottom:10px">
          <option value="ALL">Tutti</option>
          <option value="O">Operai</option>
          <option value="I">Impiegati</option>
        </select>

        <div id="ccnl-list" style="max-height:500px;overflow:auto"></div>

      </div>

      <!-- CONTENUTO -->
      <div style="flex:1;background:white;border:1px solid #e5e7eb;border-radius:6px;padding:16px">

        <div id="ccnl-content">
          <div style="color:#6b7280;font-size:13px">
            Seleziona un articolo per visualizzare il contenuto
          </div>
        </div>

      </div>

    </div>
  `;
}

// ═══════════════════════════════════
// LISTA ARTICOLI
// ═══════════════════════════════════

function renderCCNLList() {
  const list = document.getElementById("ccnl-list");
  const search = document.getElementById("ccnl-search").value.toLowerCase();
  const filter = document.getElementById("ccnl-filter").value;

  let html = "";

  Object.values(CCNL_ARTS).forEach(a => {

    if (filter !== "ALL" && a.cat !== filter) return;

    const text = (a.n + " " + a.t).toLowerCase();
    if (!text.includes(search)) return;

    html += `
      <div onclick="openArticle('${a.n}')"
        style="padding:6px;border-bottom:1px solid #f1f5f9;cursor:pointer">
        <b>Art. ${a.n}</b><br>
        <span style="font-size:11px;color:#6b7280">${a.t}</span>
      </div>
    `;
  });

  list.innerHTML = html;
}

// ═══════════════════════════════════
// APERTURA ARTICOLO
// ═══════════════════════════════════

function openArticle(id) {
  const a = CCNL_ARTS[id];
  const container = document.getElementById("ccnl-content");

  container.innerHTML = `
    <div style="font-size:18px;font-weight:700;color:#1e3a8a;margin-bottom:10px">
      Art. ${a.n} — ${a.t}
    </div>

    <div style="white-space:pre-line;font-size:13px;line-height:1.5">
      ${a.c}
    </div>
  `;
}
