// Social Insight - Main Application
// ================================

const app = {
  followers: [],
  following: [],
  notFollowingBack: [],
  youDontFollow: [],
  charts: {}
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  hideLoadingScreen();
});

function setupEventListeners() {
  // Upload area
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  
  if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
      }
    });
  }

  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const section = e.target.dataset.section;
      navigateToSection(section);
    });
  });

  // Tabs
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.target.dataset.tab;
      switchTab(tab);
    });
  });

  // Search
  const notFollowingBackSearch = document.getElementById('notFollowingBackSearch');
  const youDontFollowSearch = document.getElementById('youDontFollowSearch');
  
  if (notFollowingBackSearch) {
    notFollowingBackSearch.addEventListener('input', () => filterList('notFollowingBack'));
  }
  if (youDontFollowSearch) {
    youDontFollowSearch.addEventListener('input', () => filterList('youDontFollow'));
  }
}

function handleFileUpload(file) {
  if (!file.name.endsWith('.json')) {
    showToast('Por favor selecciona un archivo JSON válido', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      processData(data);
      showFileInfo(file);
    } catch (error) {
      showToast('Error al procesar el archivo JSON', 'error');
      console.error(error);
    }
  };
  reader.readAsText(file);
}

function showFileInfo(file) {
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const fileInfo = document.getElementById('fileInfo');
  const uploadArea = document.getElementById('uploadArea');
  
  if (fileInfo) {
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = `${sizeMB} MB`;
    fileInfo.classList.remove('hidden');
  }
  if (uploadArea) {
    uploadArea.classList.add('hidden');
  }
}

function processData(data) {
  try {
    // Extract followers
    app.followers = [];
    app.following = [];
    
    if (data.followers_and_following && data.followers_and_following.followers) {
      app.followers = data.followers_and_following.followers.map(f => {
        const str = JSON.stringify(f);
        const match = str.match(/"value":"([^"]+)"/);
        return match ? match[1] : '';
      }).filter(Boolean);
    }

    if (data.followers_and_following && data.followers_and_following.following) {
      app.following = data.followers_and_following.following.map(f => {
        const str = JSON.stringify(f);
        const match = str.match(/"value":"([^"]+)"/);
        return match ? match[1] : '';
      }).filter(Boolean);
    }

    // Calculate relationships
    const followerSet = new Set(app.followers);
    const followingSet = new Set(app.following);
    
    app.notFollowingBack = app.following.filter(user => !followerSet.has(user));
    app.youDontFollow = app.followers.filter(user => !followingSet.has(user));

    // Update UI
    updateStats();
    generateCharts();
    generateInsights();
    populateLists();
    generateReport();
    showSections();
    showToast('✓ Datos cargados correctamente', 'success');

  } catch (error) {
    console.error('Error:', error);
    showToast('Error al procesar los datos', 'error');
  }
}

function updateStats() {
  document.getElementById('followersCount').textContent = app.followers.length.toLocaleString();
  document.getElementById('followingCount').textContent = app.following.length.toLocaleString();
  document.getElementById('notFollowingBackCount').textContent = app.notFollowingBack.length.toLocaleString();
  document.getElementById('youDontFollowCount').textContent = app.youDontFollow.length.toLocaleString();
}

function generateCharts() {
  // Destroy existing charts
  if (app.charts.relationship) app.charts.relationship.destroy();
  if (app.charts.followAnalysis) app.charts.followAnalysis.destroy();

  const mutualCount = app.followers.length - app.youDontFollow.length;

  // Relationship Chart
  const relationshipCtx = document.getElementById('relationshipChart');
  if (relationshipCtx) {
    app.charts.relationship = new Chart(relationshipCtx, {
      type: 'doughnut',
      data: {
        labels: ['Mutuos', 'No te siguen', 'Te siguen pero no los sigues'],
        datasets: [{
          data: [mutualCount, app.notFollowingBack.length, app.youDontFollow.length],
          backgroundColor: ['#4A5D4A', '#8B3A3A', '#3A4F6B'],
          borderColor: '#C9A24D',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: { color: '#F5F5F5', font: { size: 12 } }
          }
        }
      }
    });
  }

  // Follow Analysis Chart
  const followAnalysisCtx = document.getElementById('followAnalysisChart');
  if (followAnalysisCtx) {
    app.charts.followAnalysis = new Chart(followAnalysisCtx, {
      type: 'bar',
      data: {
        labels: ['Seguidores', 'Siguiendo', 'No te siguen', 'Te siguen pero no los sigues'],
        datasets: [{
          label: 'Cantidad',
          data: [app.followers.length, app.following.length, app.notFollowingBack.length, app.youDontFollow.length],
          backgroundColor: ['#3A4F6B', '#4A5D4A', '#8B3A3A', '#C9A24D'],
          borderColor: '#C9A24D',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: { color: '#F5F5F5' }
          }
        },
        scales: {
          y: {
            ticks: { color: '#B8B8B8' },
            grid: { color: '#2E3F2F' }
          },
          x: {
            ticks: { color: '#B8B8B8' },
            grid: { color: '#2E3F2F' }
          }
        }
      }
    });
  }
}

function generateInsights() {
  const insightsList = document.getElementById('insightsList');
  if (!insightsList) return;

  insightsList.innerHTML = '';

  const insights = [
    `👥 Tienes ${app.followers.length.toLocaleString()} seguidores`,
    `🔗 Sigues a ${app.following.length.toLocaleString()} usuarios`,
    `❌ ${app.notFollowingBack.length.toLocaleString()} usuarios no te siguen de vuelta`,
    `✅ ${app.youDontFollow.length.toLocaleString()} usuarios te siguen pero no los sigues`,
    `📊 Ratio: ${((app.following.length / app.followers.length) * 100).toFixed(1)}%`
  ];

  insights.forEach(insight => {
    const item = document.createElement('div');
    item.className = 'insight-item';
    item.textContent = insight;
    insightsList.appendChild(item);
  });
}

function populateLists() {
  populateList('notFollowingBack', app.notFollowingBack);
  populateList('youDontFollow', app.youDontFollow);
  
  document.getElementById('notFollowingBackCount2').textContent = `${app.notFollowingBack.length} usuarios`;
  document.getElementById('youDontFollowCount2').textContent = `${app.youDontFollow.length} usuarios`;
}

function populateList(type, users) {
  const container = type === 'notFollowingBack' 
    ? document.getElementById('notFollowingBackList')
    : document.getElementById('youDontFollowList');

  if (!container) return;

  container.innerHTML = '';
  users.forEach(user => {
    const item = document.createElement('div');
    item.className = 'user-item';
    item.innerHTML = `
      <div class="user-name">@${user}</div>
      <button class="btn-secondary" onclick="copyToClipboard('@${user}')">📋</button>
    `;
    container.appendChild(item);
  });
}

function filterList(type) {
  const searchInput = type === 'notFollowingBack'
    ? document.getElementById('notFollowingBackSearch')
    : document.getElementById('youDontFollowSearch');

  if (!searchInput) return;

  const query = searchInput.value.toLowerCase();
  const users = type === 'notFollowingBack' ? app.notFollowingBack : app.youDontFollow;
  const filtered = users.filter(u => u.toLowerCase().includes(query));

  const container = type === 'notFollowingBack'
    ? document.getElementById('notFollowingBackList')
    : document.getElementById('youDontFollowList');

  if (!container) return;

  container.innerHTML = '';
  filtered.forEach(user => {
    const item = document.createElement('div');
    item.className = 'user-item';
    item.innerHTML = `
      <div class="user-name">@${user}</div>
      <button class="btn-secondary" onclick="copyToClipboard('@${user}')">📋</button>
    `;
    container.appendChild(item);
  });
}

function generateReport() {
  const report = `REPORTE DE ANÁLISIS - SOCIAL INSIGHT
=====================================

Fecha: ${new Date().toLocaleDateString('es-ES')}
Hora: ${new Date().toLocaleTimeString('es-ES')}

ESTADÍSTICAS GENERALES
======================
Seguidores: ${app.followers.length.toLocaleString()}
Siguiendo: ${app.following.length.toLocaleString()}
No te siguen de vuelta: ${app.notFollowingBack.length.toLocaleString()}
Te siguen pero no los sigues: ${app.youDontFollow.length.toLocaleString()}

ANÁLISIS
========
Ratio de seguimiento: ${((app.following.length / app.followers.length) * 100).toFixed(2)}%
Porcentaje de no-followers: ${((app.notFollowingBack.length / app.following.length) * 100).toFixed(2)}%

USUARIOS QUE NO TE SIGUEN DE VUELTA (${app.notFollowingBack.length})
${'='.repeat(50)}
${app.notFollowingBack.slice(0, 100).map((u, i) => `${i + 1}. @${u}`).join('\n')}
${app.notFollowingBack.length > 100 ? `\n... y ${app.notFollowingBack.length - 100} más` : ''}

USUARIOS QUE TE SIGUEN PERO NO LOS SIGUES (${app.youDontFollow.length})
${'='.repeat(50)}
${app.youDontFollow.slice(0, 100).map((u, i) => `${i + 1}. @${u}`).join('\n')}
${app.youDontFollow.length > 100 ? `\n... y ${app.youDontFollow.length - 100} más` : ''}

Generado por Social Insight - Art Programs Studio`;

  const reportText = document.getElementById('reportText');
  if (reportText) {
    reportText.textContent = report;
  }
}

function downloadList(type) {
  const users = type === 'notFollowingBack' ? app.notFollowingBack : app.youDontFollow;
  const csv = users.join('\n');
  const filename = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
  downloadFile(csv, filename, 'text/csv');
}

function downloadReport(format) {
  const reportText = document.getElementById('reportText').textContent;
  
  if (format === 'txt') {
    downloadFile(reportText, `reporte_${new Date().toISOString().split('T')[0]}.txt`, 'text/plain');
  } else if (format === 'json') {
    const data = {
      fecha: new Date().toISOString(),
      estadisticas: {
        seguidores: app.followers.length,
        siguiendo: app.following.length,
        noTeSignenDeVuelta: app.notFollowingBack.length,
        teSignenPeroNoLosSigues: app.youDontFollow.length
      },
      usuarios: {
        noTeSignenDeVuelta: app.notFollowingBack,
        teSignenPeroNoLosSigues: app.youDontFollow
      }
    };
    downloadFile(JSON.stringify(data, null, 2), `reporte_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
  }
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Descargado: ${filename}`, 'success');
}

function copyReport() {
  const reportText = document.getElementById('reportText').textContent;
  navigator.clipboard.writeText(reportText);
  showToast('Reporte copiado al portapapeles', 'success');
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showToast('Copiado: ' + text, 'success');
}

function navigateToSection(section) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  document.querySelector(`[data-section="${section}"]`).classList.add('active');

  document.getElementById('uploadSection').classList.toggle('hidden', section !== 'upload');
  document.getElementById('analyticsSection').classList.toggle('hidden', section !== 'analytics');
  document.getElementById('listsSection').classList.toggle('hidden', section !== 'lists');
  document.getElementById('reportSection').classList.toggle('hidden', section !== 'report');
}

function switchTab(tab) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  document.getElementById(`${tab}Tab`).classList.add('active');
}

function showSections() {
  document.getElementById('uploadSection').classList.remove('hidden');
  document.getElementById('analyticsSection').classList.remove('hidden');
  document.getElementById('listsSection').classList.remove('hidden');
  document.getElementById('reportSection').classList.remove('hidden');
  document.getElementById('emptyState').classList.remove('active');
}

function hideLoadingScreen() {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.pointerEvents = 'none';
    }
  }, 1500);
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}
