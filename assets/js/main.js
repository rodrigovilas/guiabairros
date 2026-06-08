document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }

  // --- Search Simulation (Home) ---
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('search-input').value;
      if (input.trim() !== '') {
        window.location.href = `categorias.html?search=${encodeURIComponent(input)}`;
      }
    });
  }

  // --- Load Data via JSON ---
  const isCategoriasPage = document.getElementById('services-container') !== null;
  const isDetalhesPage = document.getElementById('det-titulo') !== null;

  if (isCategoriasPage || isDetalhesPage) {
    fetch('assets/data/servicos.json')
      .then(response => response.json())
      .then(data => {
        if (isCategoriasPage) initCategoriasPage(data);
        if (isDetalhesPage) initDetalhesPage(data);
      })
      .catch(error => {
        console.error("Erro ao carregar serviços:", error);
        if (isCategoriasPage) {
          document.getElementById('services-container').innerHTML = '<p class="text-center text-muted">Erro ao carregar dados.</p>';
        }
      });
  }

  // --- Categorias Page Logic ---
  function initCategoriasPage(data) {
    const container = document.getElementById('services-container');
    const searchInput = document.getElementById('global-search');
    const bairroSelect = document.getElementById('bairro-filter');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentCategory = 'todas';
    let currentSearch = '';
    
    // Check URL for search parameter (from Home)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('search')) {
      currentSearch = urlParams.get('search');
      if (searchInput) searchInput.value = currentSearch;
    }

    function renderCards() {
      const termo = searchInput ? searchInput.value.toLowerCase() : '';
      const bairro = bairroSelect ? bairroSelect.value : 'todos';

      const filtered = data.filter(item => {
        const matchCat = currentCategory === 'todas' || item.categoria_slug === currentCategory;
        const matchBairro = bairro === 'todos' || item.bairro === bairro;
        const matchSearch = item.nome.toLowerCase().includes(termo) || 
                            item.descricao.toLowerCase().includes(termo) ||
                            item.subcategoria.toLowerCase().includes(termo);
        return matchCat && matchBairro && matchSearch;
      });

      container.innerHTML = '';

      if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          Nenhum serviço encontrado com os filtros selecionados.
        </div>`;
        return;
      }

      filtered.forEach(item => {
        // Color per category roughly
        let badgeBg = 'var(--primary-light)';
        if(item.categoria_slug === 'cidadao') badgeBg = 'var(--secondary)';
        if(item.categoria_slug === 'educacao') badgeBg = '#10B981';
        if(item.categoria_slug === 'seguranca') badgeBg = '#F59E0B';
        if(item.categoria_slug === 'cultura') badgeBg = '#8B5CF6';
        if(item.categoria_slug === 'meioambiente') badgeBg = '#84CC16';

        const card = document.createElement('div');
        card.className = 'service-card animate-fade-in';
        card.innerHTML = `
          <div class="service-info">
              <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.5rem;">
                  <span style="background: ${badgeBg}; color: white; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600;">${item.categoria_nome}</span>
                  <span class="text-muted" style="font-size: 0.8rem;">${item.subcategoria}</span>
              </div>
              <h3 class="font-bold text-primary">${item.nome}</h3>
              <p class="text-muted" style="margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.descricao}</p>
              
              <div class="service-meta" style="flex-wrap: wrap;">
                  <span>📍 Bairro: ${item.bairro}</span>
                  <span>⏰ ${item.horario}</span>
              </div>
          </div>
          <div style="margin-top: 1rem; min-width: 150px; text-align: right;">
              <a href="detalhes.html?id=${item.id}" class="btn btn-primary" style="width: 100%;">Ver Detalhes</a>
          </div>
        `;
        container.appendChild(card);
      });
    }

    // Event Listeners
    if (searchInput) searchInput.addEventListener('input', renderCards);
    if (bairroSelect) bairroSelect.addEventListener('change', renderCards);

    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          filterBtns.forEach(b => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-outline');
          });
          btn.classList.remove('btn-outline');
          btn.classList.add('btn-primary');
          
          currentCategory = btn.getAttribute('data-filter');
          renderCards();
        });
      });
    }

    // Initial render
    renderCards();
  }

  // --- Detalhes Page Logic ---
  function initDetalhesPage(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
      showError();
      return;
    }

    const item = data.find(d => d.id === id);
    if (!item) {
      showError();
      return;
    }

    // Populate Data
    document.getElementById('det-categoria').textContent = item.categoria_nome + " - " + item.subcategoria;
    document.getElementById('det-titulo').textContent = item.nome;
    document.getElementById('det-desc').textContent = item.descricao;
    
    document.getElementById('det-endereco').textContent = item.endereco;
    document.getElementById('det-horario').textContent = item.horario;
    document.getElementById('det-telefone').textContent = item.telefone;
    document.getElementById('det-email').textContent = item.email;
    
    document.getElementById('det-mapa-btn').href = item.mapa_url;
    document.getElementById('det-bairro-mapa').textContent = "Região: " + item.bairro;

    // Estrelas
    document.getElementById('det-nota').textContent = item.avaliacao.toFixed(1);
    let starsHtml = '';
    for(let i=1; i<=5; i++) {
      if(i <= Math.round(item.avaliacao)) {
        starsHtml += '<span>★</span>';
      } else {
        starsHtml += '<span style="color: var(--border);">★</span>';
      }
    }
    document.getElementById('det-estrelas').innerHTML = starsHtml;

    // Fotos
    const fotosContainer = document.getElementById('det-fotos');
    if (item.fotos && item.fotos.length > 0) {
      let fotosHtml = '';
      item.fotos.forEach(src => {
        fotosHtml += `<img src="${src}" alt="Foto ${item.nome}" class="photo-item">`;
      });
      fotosContainer.innerHTML = fotosHtml;
    } else {
      fotosContainer.innerHTML = '<p class="text-muted">Sem fotos disponíveis.</p>';
    }

    // Share Button
    const btnShare = document.getElementById('btn-share');
    if(btnShare) {
      btnShare.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({
            title: item.nome,
            text: `Veja informações sobre ${item.nome} no Guia Diadema.`,
            url: window.location.href,
          }).catch(console.error);
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert('Link copiado para a área de transferência!');
        }
      });
    }

    // Show content
    document.getElementById('det-content').style.display = 'block';
  }

  function showError() {
    const section = document.getElementById('det-content');
    if(section) section.style.display = 'none';
    const err = document.getElementById('det-error');
    if(err) err.style.display = 'block';
  }
});
