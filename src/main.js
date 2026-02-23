/* ============================================
   SOCIAL INSIGHT - MAIN APPLICATION LOGIC
   ============================================ */

// State Management
const appState = {
  data: null,
  followers: [],
  following: [],
  notFollowingBack: [],
  youDontFollow: [],
  charts: {},
  filteredData: {
    notFollowingBack: [],
    youDontFollow: []
  }
};

// DOM Elements
const elements = {
  loadingScreen: document.getElementById('loadingScreen'),
  uploadArea: document.getElementById('uploadArea'),
  fileInput: document.getElementById('fileInput'),
  fileInfo: document.getElementById('fileInfo'),
  processingStatus: document.getElementById('processingStatus'),
  
  // Sections
  uploadSection: document.getElementById('uploadSection'),
  analyticsSection: document.getElementById('analyticsSection'),
  listsSection: document.getElementById('listsSection'),
  reportSection: document.getElementById('reportSection'),
  emptyState: document.getElementById('emptyState'),
  
  // Stats
  followersCount: document.getElementById('followersCount'),
  followingCount: document.getElementById('followingCount'),
  notFollowingBackCount: document.getElementById('notFollowingBackCount'),
  youDontFollowCount: document.getElementById('youDontFollowCount'),
  
  // Charts
  relationshipChart: document.getElementById('relationshipChart'),
  followAnalysisChart: document.getElementById('followAnalysisChart'),
  
  // Lists
  notFollowingBackList: document.getElementById('notFollowingBackList'),
  youDontFollowList: document.getElementById('youDontFollowList'),
  notFollowingBackSearch: document.getElementById('notFollowingBackSearch'),
  youDontFollowSearch: document.getElementById('youDontFollowSearch'),
  
  // Report
  reportText: document.getElementById('reportText'),
  
  // Navigation
  navItems: document.querySelectorAll('.nav-item'),
  tabButtons: document.querySelectorAll('.tab-button'),
  
  // Toast
  toast: document.getElementById('toast')
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  hideLoadingScreen();
});

function initializeEventListeners() {
  // File Upload
  elements.uploadArea.addEventListener('click', () => elements.fileInput.click());
  elements.uploadArea.addEventListener('dragover', handleDragOver);
  elements.uploadArea.addEventListener('dragleave', handleDragLeave);
  elements.uploadArea.addEventListener('drop', handleDrop);
  elements.fileInput.addEventListener('change', handleFileSelect);
  
  // Navigation
  elements.navItems.forEach(item => {
    item.addEventListener('click', (e) => handleNavigation(e.target.dataset.section));
  });
  
  // Tabs
  elements.tabButtons.forEach(button => {
    button.addEventListener('click', (e) => handleTabChange(e.target.dataset.tab));
  });
  
  // Search
  elements.notFollowingBackSearch.addEventListener('input', () => filterList('notFollowingBack'));
  elements.youDontFollowSearch.addEventListener('input', () => filterList('youDontFollow'));
}

// ============================================
// FILE HANDLING
// ============================================

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  elements.uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  elements.uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  elements.uploadArea.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
}

function handleFileSelect(e) {
  const files = e.target.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
}

function processFile(file) {
  if (!file.name.endsWith('.json')) {
    showToast('Por favor selecciona un archivo JSON válido', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      showProcessing(true);
      const jsonData = JSON.parse(e.target.result);
      processInstagramData(jsonData);
      showFileInfo(file);
    } catch (error) {
      showToast('Error al procesar el archivo JSON', 'error');
      console.error(error);
    } finally {
      showProcessing(false);
    }
  };
  reader.readAsText(file);
}

function showFileInfo(file) {
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  document.getElementById('fileName').textContent = file.name;
  document.getElementById('fileSize').textContent = `${sizeMB} MB`;
  elements.fileInfo.classList.remove('hidden');
  elements.uploadArea.classList.add('hidden');
}

function clearFile() {
  elements.fileInput.value = '';
  elements.fileInfo.classList.add('hidden');
  elements.uploadArea.classList.remove('hidden');
  resetApp();
}

function showProcessing(show) {
  elements.processingStatus.classList.toggle('hidden', !show);
}

// ============================================
// DATA PROCESSING
// ============================================

function processInstagramData(data) {
  try {
    // Extract followers
    if (data.followers_and_following && data.followers_and_following.followers) {
      appState.followers = data.followers_and_following.followers.map(f => {
        const str = JSON.stringify(f);
        const match = str.match(/"value":"([^"]+)"/);
        return match ? match[1] : '';
      }).filter(Boolean);
    }
    
    // Extract following
    if (data.followers_and_following && data.followers_and_following.following) {
      appState.following = data.followers_and_following.following.map(f => {
        const str = JSON.stringify(f);
        const match = str.match(/"value":"([^"]+)"/);
        return match ? match[1] : '';
      }).filter(Boolean);
    }
    
    // Calculate relationships
    calculateRelationships();
    
    // Update UI
    updateStats();
    generateCharts();
    generateInsights();
    populateLists();
    generateReport();
    
    // Show sections
    showSections();
    showToast('Datos procesados correctamente', 'success');
    
  } catch (error) {
    console.error('Error processing data:', error);
    showToast('Error al procesar los datos', 'error');
  }
}

function calculateRelationships() {
  const followerSet = new Set(appState.followers);
  const followingSet = new Set(appState.following);
  
  // Not following back
  appState.notFollowingBack = appState.following.filter(user => !followerSet.has(user));
  
  // You don't follow
  appState.youDontFollow = appState.followers.filter(user => !followingSet.has(user));
  
  // Initialize filtered data
  appState.filteredData.notFollowingBack = [...appState.notFollowingBack];
  appState.filteredData.youDontFollow = [...appState.youDontFollow];
}

// ============================================
// UI UPDATES
// ============================================

function updateStats() {
  elements.followersCount.textContent = formatNumber(appState.followers.length);
  elements.followingCount.textContent = formatNumber(appState.following.length);
  elements.notFollowingBackCount.textContent = formatNumber(appState.notFollowingBack.length);
  elements.youDontFollowCount.textContent = formatNumber(appState.youDontFollow.length);
}

function generateCharts() {
  // Destroy existing charts
  if (appState.charts.relationship) appState.charts.relationship.destroy();
  if (appState.charts.followAnalysis) appState.charts.followAnalysis.destroy();
  
  // Relationship Chart
  const relationshipCtx = elements.relationshipChart.getContext('2d');
  appState.charts.relationship = new Chart(relationshipCtx, {
    type: 'doughnut',
    data: {
      labels: ['Mutuos', 'No te siguen', 'Te siguen pero no los sigues'],
      datasets: [{
        data: [
          appState.followers.length - appState.youDontFollow.length,
          appState.notFollowingBack.length,
          appState.youDontFollow.length
        ],
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
  
  // Follow Analysis Chart
  const followAnalysisCtx = elements.followAnalysisChart.getContext('2d');
  appState.charts.followAnalysis = new Chart(followAnalysisCtx, {
    type: 'bar',
    data: {
      labels: ['Seguidores', 'Siguiendo', 'No te siguen', 'Te siguen pero no los sigues'],
      datasets: [{
        label: 'Cantidad',
        data: [
          appState.followers.length,
          appState.following.length,
          appState.notFollowingBack.length,
          appState.youDontFollow.length
        ],
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

function generateInsights() {
  const insightsList = document.getElementById('insightsList');
  insightsList.innerHTML = '';
  
  const insights = [
    {
      text: `Tienes ${appState.followers.length.toLocaleString()} seguidores`,
      icon: '👥'
    },
    {
      text: `Sigues a ${appState.following.length.toLocaleString()} usuarios`,
      icon: '🔗'
    },
    {
      text: `${appState.notFollowingBack.length.toLocaleString()} usuarios no te siguen de vuelta`,
      icon: '❌'
    },
    {
      text: `${appState.youDontFollow.length.toLocaleString()} usuarios te siguen pero no los sigues`,
      icon: '✅'
    },
    {
      text: `Ratio de seguimiento: ${((appState.following.length / appState.followers.length) * 100).toFixed(1)}%`,
      icon: '📊'
    }
  ];
  
  insights.forEach(insight => {
    const item = document.createElement('div');
    item.className = 'insight-item';
    item.innerHTML = `<span>${insight.icon}</span> ${insight.text}`;
    insightsList.appendChild(item);
  });
}

function populateLists() {
  populateList('notFollowingBack', appState.notFollowingBack, elements.notFollowingBackList);
  populateList('youDontFollow', appState.youDontFollow, elements.youDontFollowList);
  
  // Update counts
  document.getElementById('notFollowingBackCount2').textContent = `${appState.notFollowingBack.length} usuarios`;
  document.getElementById('youDontFollowCount2').textContent = `${appState.youDontFollow.length} usuarios`;
}

function populateList(type, users, container) {
  container.innerHTML = '';
  users.forEach((user, index) => {
    const item = document.createElement('div');
    item.className = 'user-item';
    item.innerHTML = `
      <div>
        <div class="user-name">@${user}</div>
      </div>
      <button class="btn-secondary" onclick="copyToClipboard('@${user}')">📋</button>
    `;
    container.appendChild(item);
  });
}

function generateReport() {
  const report = `
REPORTE DE ANÁLISIS - SOCIAL INSIGHT
=====================================

Fecha: ${new Date().toLocaleDateString('es-ES')}
Hora: ${new Date().toLocaleTimeString('es-ES')}

ESTADÍSTICAS GENERALES
======================
Seguidores: ${appState.followers.length.toLocaleString()}
Siguiendo: ${appState.following.length.toLocaleString()}
No te siguen de vuelta: ${appState.notFollowingBack.length.toLocaleString()}
Te siguen pero no los sigues: ${appState.youDontFollow.length.toLocaleString()}

ANÁLISIS
========
Ratio de seguimiento: ${((appState.following.length / appState.followers.length) * 100).toFixed(2)}%
Porcentaje de no-followers: ${((appState.notFollowingBack.length / appState.following.length) * 100).toFixed(2)}%
Porcentaje de seguidores no seguidos: ${((appState.youDontFollow.length / appState.followers.length) * 100).toFixed(2)}%

USUARIOS QUE NO TE SIGUEN DE VUELTA (${appState.notFollowingBack.length})
${'='.repeat(50)}
${appState.notFollowingBack.slice(0, 100).map((u, i) => `${i + 1}. @${u}`).join('\n')}
${appState.notFollowingBack.length > 100 ? `\n... y ${appState.notFollowingBack.length - 100} más` : ''}

USUARIOS QUE TE SIGUEN PERO NO LOS SIGUES (${appState.youDontFollow.length})
${'='.repeat(50)}
${appState.youDontFollow.slice(0, 100).map((u, i) => `${i + 1}. @${u}`).join('\n')}
${appState.youDontFollow.length > 100 ? `\n... y ${appState.youDontFollow.length - 100} más` : ''}

Generado por Social Insight - Art Programs Studio
  `;
  
  elements.reportText.textContent = report;
}

// ============================================
// FILTERING & SEARCHING
// ============================================

function filterList(type) {
  const searchInput = type === 'notFollowingBack' 
    ? elements.notFollowingBackSearch 
    : elements.youDontFollowSearch;
  
  const query = searchInput.value.toLowerCase();
  const sourceList = type === 'notFollowingBack' 
    ? appState.notFollowingBack 
    : appState.youDontFollow;
  
  appState.filteredData[type] = sourceList.filter(user => 
    user.toLowerCase().includes(query)
  );
  
  const container = type === 'notFollowingBack' 
    ? elements.notFollowingBackList 
    : elements.youDontFollowList;
  
  populateList(type, appState.filteredData[type], container);
}

// ============================================
// DOWNLOADS & EXPORTS
// ============================================

function downloadList(type) {
  const users = appState.filteredData[type] || (type === 'notFollowingBack' ? appState.notFollowingBack : appState.youDontFollow);
  const csv = users.join('\n');
  const filename = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
  downloadFile(csv, filename, 'text/csv');
}

function downloadReport(format) {
  if (format === 'txt') {
    downloadFile(elements.reportText.textContent, `reporte_${new Date().toISOString().split('T')[0]}.txt`, 'text/plain');
  } else if (format === 'json') {
    const data = {
      fecha: new Date().toISOString(),
      estadisticas: {
        seguidores: appState.followers.length,
        siguiendo: appState.following.length,
        noTeSignenDeVuelta: appState.notFollowingBack.length,
        teSignenPeroNoLosSigues: appState.youDontFollow.length
      },
      usuarios: {
        noTeSignenDeVuelta: appState.notFollowingBack,
        teSignenPeroNoLosSigues: appState.youDontFollow
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
  navigator.clipboard.writeText(elements.reportText.textContent);
  showToast('Reporte copiado al portapapeles', 'success');
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showToast('Copiado: ' + text, 'success');
}

// ============================================
// NAVIGATION & TABS
// ============================================

function handleNavigation(section) {
  // Update active nav item
  elements.navItems.forEach(item => item.classList.remove('active'));
  document.querySelector(`[data-section="${section}"]`).classList.add('active');
  
  // Show/hide sections
  elements.uploadSection.classList.toggle('hidden', section !== 'upload');
  elements.analyticsSection.classList.toggle('hidden', section !== 'analytics');
  elements.listsSection.classList.toggle('hidden', section !== 'lists');
  elements.reportSection.classList.toggle('hidden', section !== 'report');
}

function handleTabChange(tab) {
  // Update active tab button
  elements.tabButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  
  // Show/hide tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  document.getElementById(`${tab}Tab`).classList.add('active');
}

// ============================================
// UI HELPERS
// ============================================

function showSections() {
  elements.uploadSection.classList.remove('hidden');
  elements.analyticsSection.classList.remove('hidden');
  elements.listsSection.classList.remove('hidden');
  elements.reportSection.classList.remove('hidden');
  elements.emptyState.classList.remove('active');
}

function resetApp() {
  appState.data = null;
  appState.followers = [];
  appState.following = [];
  appState.notFollowingBack = [];
  appState.youDontFollow = [];
  
  elements.uploadSection.classList.remove('hidden');
  elements.analyticsSection.classList.add('hidden');
  elements.listsSection.classList.add('hidden');
  elements.reportSection.classList.add('hidden');
  elements.emptyState.classList.add('active');
}

function hideLoadingScreen() {
  setTimeout(() => {
    elements.loadingScreen.style.opacity = '0';
    elements.loadingScreen.style.pointerEvents = 'none';
  }, 1500);
}

function showToast(message, type = 'info') {
  elements.toast.textContent = message;
  elements.toast.classList.add('show');
  
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3000);
}

function formatNumber(num) {
  return num.toLocaleString('es-ES');
}
