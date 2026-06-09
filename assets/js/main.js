document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlEl.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // --- Mobile Menu ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }

  // --- Home Search ---
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('search-input').value.trim();
      if (val) {
        window.location.href = 'categorias.html?search=' + encodeURIComponent(val);
      }
    });
  }

  // --- Detect page ---
  const servicesContainer = document.getElementById('services-container');
  const detTitulo = document.getElementById('det-titulo');

  if (servicesContainer || detTitulo) {
    // Check data was loaded
    if (typeof SERVICOS_DATA === 'undefined' || !Array.isArray(SERVICOS_DATA)) {
      if (servicesContainer) {
        servicesContainer.innerHTML = '<div style="text-align:center;padding:3rem;color:red;"><b>Erro:</b> Arquivo de dados não carregado. Verifique o console (F12).</div>';
      }
      console.error('SERVICOS_DATA não definido ou inválido.');
      return;
    }

    console.log('Dados OK — ' + SERVICOS_DATA.length + ' serviços carregados.');

    if (servicesContainer) {
      initCategoriasPage(SERVICOS_DATA, servicesContainer);
    }
    if (detTitulo) {
      initDetalhesPage(SERVICOS_DATA);
    }
  }

  // =====================
  // CATEGORIAS PAGE
  // =====================
  function initCategoriasPage(data, container) {
    const searchInput  = document.getElementById('global-search');
    const bairroSelect = document.getElementById('bairro-filter');
    const filterBtns   = document.querySelectorAll('.filter-btn');

    let currentCategory = 'todas';

    // Pre-fill search from URL (e.g. coming from Home)
    const params = new URLSearchParams(window.location.search);
    if (params.has('search') && searchInput) {
      searchInput.value = params.get('search');
    }

    function renderCards() {
      const termo  = searchInput  ? searchInput.value.toLowerCase().trim() : '';
      const bairro = bairroSelect ? bairroSelect.value : 'todos';

      const filtered = data.filter(item => {
        const nome = (item.nome         || '').toLowerCase();
        const desc = (item.descricao    || '').toLowerCase();
        const sub  = (item.subcategoria || '').toLowerCase();

        const okCat    = currentCategory === 'todas' || item.categoria_slug === currentCategory;
        const okBairro = bairro === 'todos' || item.bairro === bairro;
        const okSearch = !termo || nome.includes(termo) || desc.includes(termo) || sub.includes(termo);

        return okCat && okBairro && okSearch;
      });

      container.innerHTML = '';

      if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-muted);">Nenhum serviço encontrado para os filtros selecionados.</div>';
        return;
      }

      filtered.forEach(item => {
        let badgeBg = 'var(--primary-light)';
        if (item.categoria_slug === 'cidadao')      badgeBg = 'var(--secondary)';
        if (item.categoria_slug === 'educacao')     badgeBg = '#10B981';
        if (item.categoria_slug === 'seguranca')    badgeBg = '#F59E0B';
        if (item.categoria_slug === 'cultura')      badgeBg = '#8B5CF6';
        if (item.categoria_slug === 'meioambiente') badgeBg = '#84CC16';
        if (item.categoria_slug === 'esporte')      badgeBg = '#EC4899';
        if (item.categoria_slug === 'emprego')      badgeBg = '#F97316';

        const card = document.createElement('div');
        card.className = 'service-card animate-fade-in';
        card.innerHTML = `
          <div class="service-info">
            <div style="display:flex;gap:.75rem;align-items:center;margin-bottom:.5rem;flex-wrap:wrap;">
              <span style="background:${badgeBg};color:white;padding:.25rem .75rem;border-radius:var(--radius-full);font-size:.8rem;font-weight:600;">${item.categoria_nome}</span>
              <span class="text-muted" style="font-size:.8rem;">${item.subcategoria || ''}</span>
            </div>
            <h3 class="font-bold text-primary">${item.nome}</h3>
            <p class="text-muted" style="margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${item.descricao}</p>
            <div class="service-meta" style="flex-wrap:wrap;">
              <span>📍 ${item.bairro}</span>
              <span>⏰ ${item.horario}</span>
            </div>
          </div>
          <div class="service-action">
            <a href="detalhes.html?id=${item.id}" class="btn btn-primary">Ver Detalhes</a>
          </div>
        `;
        container.appendChild(card);
      });
    }

    // Listeners
    if (searchInput)  searchInput.addEventListener('input', renderCards);
    if (bairroSelect) bairroSelect.addEventListener('change', renderCards);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterBtns.forEach(b => { b.classList.replace('btn-primary', 'btn-outline'); });
        btn.classList.replace('btn-outline', 'btn-primary');
        currentCategory = btn.getAttribute('data-filter');
        renderCards();
      });
    });

    // First render
    renderCards();
  }

  // =====================
  // DETALHES PAGE
  // =====================
  function initDetalhesPage(data) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) { showError(); return; }

    const item = data.find(d => d.id === id);
    if (!item) { showError(); return; }

    // Fill fields
    setText('det-categoria', item.categoria_nome + ' — ' + item.subcategoria);
    setText('det-titulo',    item.nome);
    setText('det-desc',      item.descricao);
    setText('det-endereco',  item.endereco  || 'Não informado');
    setText('det-horario',   item.horario   || 'Não informado');
    setText('det-telefone',  item.telefone  || 'Não informado');
    setText('det-email',     item.email     || 'Não informado');

    // Map button and embedded map
    const mapaBtn = document.getElementById('det-mapa-btn');
    const mapContainer = document.getElementById('det-map-container');
    const mapQuery = item.endereco || item.nome + ' Diadema SP';

    if (mapaBtn) {
      mapaBtn.href = item.mapa_url || 'https://maps.google.com/?q=' + encodeURIComponent(mapQuery);
    }

    if (mapContainer) {
      mapContainer.innerHTML = `
        <iframe
          src="https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed"
          title="Mapa do local"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
          style="width:100%;height:100%;border:0;display:block;">
        </iframe>
      `;
    }

    setText('det-bairro-mapa', 'Bairro: ' + item.bairro);

    // Stars
    const nota = item.avaliacao || 0;
    setText('det-nota', nota.toFixed(1));
    const starsEl = document.getElementById('det-estrelas');
    if (starsEl) {
      let html = '';
      for (let i = 1; i <= 5; i++) {
        html += i <= Math.round(nota)
          ? '<span>★</span>'
          : '<span style="color:var(--border);">★</span>';
      }
      starsEl.innerHTML = html;
    }

    // Photos
    const fotosEl = document.getElementById('det-fotos');
    if (fotosEl) {
      if (item.fotos && item.fotos.length > 0) {
        fotosEl.innerHTML = item.fotos.map(src =>
          `<img src="${src}" alt="Foto ${item.nome}" class="photo-item">`
        ).join('');
      } else {
        fotosEl.innerHTML = '<p class="text-muted">Sem fotos disponíveis.</p>';
      }
    }

    // Share
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
      btnShare.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({ title: item.nome, url: window.location.href }).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copiado!'))
            .catch(() => alert('Não foi possível copiar o link.'));
        }
      });
    }

    // Show content
    const content = document.getElementById('det-content');
    if (content) content.style.display = 'block';
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function showError() {
    const content = document.getElementById('det-content');
    const errEl   = document.getElementById('det-error');
    if (content) content.style.display = 'none';
    if (errEl)   errEl.style.display   = 'block';
  }

});
