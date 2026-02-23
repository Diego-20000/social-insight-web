import { initializeCharts, updateCharts, destroyCharts } from './charts.js';
import { processInstagramData, analyzeFollowers, generateChartData } from './analyzer.js';
import { renderUserLists, downloadCSV, downloadReport, showNotification, getFormattedStats } from './ui.js';

// Estado global
let analysisData = null;
let chartsInitialized = false;

/**
 * Inicializa la aplicación
 */
function initializeApp() {
    console.log('Social Insight - Iniciando aplicación');
    
    // Event listeners para carga de archivos
    document.getElementById('fileInput')?.addEventListener('change', handleFileUpload);
    
    // Event listeners para descargas
    document.getElementById('downloadNotFollowingBack')?.addEventListener('click', () => {
        if (analysisData) {
            downloadCSV(analysisData.notFollowingBack, 'no-te-siguen-de-vuelta.csv');
        }
    });

    document.getElementById('downloadYouDontFollow')?.addEventListener('click', () => {
        if (analysisData) {
            downloadCSV(analysisData.youDontFollow, 'te-siguen-pero-no-los-sigues.csv');
        }
    });

    document.getElementById('downloadReport')?.addEventListener('click', () => {
        if (analysisData) {
            downloadReport(analysisData);
        }
    });

    // Búsqueda en tiempo real
    document.getElementById('notFollowingBackSearch')?.addEventListener('input', (e) => {
        filterAndRenderList('notFollowingBackList', e.target.value);
    });

    document.getElementById('youDontFollowSearch')?.addEventListener('input', (e) => {
        filterAndRenderList('youDontFollowList', e.target.value);
    });

    // Cargar datos de ejemplo si existen
    loadExampleData();
}

/**
 * Maneja la carga del archivo JSON
 */
async function handleFileUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        showNotification('Por favor selecciona un archivo', 'warning');
        return;
    }

    // Validar que sea JSON
    if (!file.name.endsWith('.json')) {
        showNotification('Por favor carga un archivo JSON válido', 'error');
        return;
    }

    try {
        showNotification('Procesando archivo...', 'info');
        
        const fileContent = await file.text();
        const data = JSON.parse(fileContent);
        
        // Procesar datos
        analysisData = processInstagramData(data);
        
        // Generar datos para gráficos
        const chartData = generateChartData(analysisData);
        
        // Mostrar estadísticas
        displayStats(analysisData);
        
        // Renderizar listas
        renderUserLists(analysisData);
        
        // Inicializar o actualizar gráficos
        if (chartsInitialized) {
            destroyCharts();
        }
        initializeCharts(chartData);
        chartsInitialized = true;
        
        // Mostrar secciones
        document.getElementById('statsSection').classList.remove('hidden');
        document.getElementById('chartsSection').classList.remove('hidden');
        document.getElementById('listsSection').classList.remove('hidden');
        
        showNotification('✓ Datos cargados y analizados correctamente', 'success');
        
        // Scroll a resultados
        setTimeout(() => {
            document.getElementById('statsSection').scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
    } catch (error) {
        console.error('Error procesando archivo:', error);
        showNotification(`Error: ${error.message}`, 'error');
    }
}

/**
 * Muestra las estadísticas en tarjetas
 */
function displayStats(data) {
    const stats = analyzeFollowers(data);
    const formattedStats = getFormattedStats(data);
    
    const statsContainer = document.getElementById('statsContainer');
    if (!statsContainer) return;
    
    statsContainer.innerHTML = `
        <div class="stat-card">
            <span class="stat-icon">👥</span>
            <div class="stat-content">
                <p class="stat-label">Seguidores</p>
                <p class="stat-value">${formattedStats.followers}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <span class="stat-icon">➡️</span>
            <div class="stat-content">
                <p class="stat-label">Siguiendo</p>
                <p class="stat-value">${formattedStats.following}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <span class="stat-icon">❌</span>
            <div class="stat-content">
                <p class="stat-label">No te siguen de vuelta</p>
                <p class="stat-value">${formattedStats.notFollowingBack}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <span class="stat-icon">💔</span>
            <div class="stat-content">
                <p class="stat-label">Te siguen pero no los sigues</p>
                <p class="stat-value">${formattedStats.youDontFollow}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <span class="stat-icon">✅</span>
            <div class="stat-content">
                <p class="stat-label">Seguidores mutuos</p>
                <p class="stat-value">${formattedStats.mutualFollows}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <span class="stat-icon">📊</span>
            <div class="stat-content">
                <p class="stat-label">Ratio Follow/Followers</p>
                <p class="stat-value">${stats.followRatio}%</p>
            </div>
        </div>
    `;
}

/**
 * Filtra y renderiza lista de usuarios
 */
function filterAndRenderList(listId, searchTerm) {
    if (!analysisData) return;
    
    let sourceList = [];
    
    if (listId === 'notFollowingBackList') {
        sourceList = analysisData.notFollowingBack;
    } else if (listId === 'youDontFollowList') {
        sourceList = analysisData.youDontFollow;
    }
    
    // Filtrar por término de búsqueda
    let filteredList = sourceList;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredList = sourceList.filter(user => 
            user.username.toLowerCase().includes(term)
        );
    }
    
    // Renderizar lista filtrada
    renderFilteredList(listId, filteredList);
}

/**
 * Renderiza una lista filtrada
 */
function renderFilteredList(listId, users) {
    const listElement = document.getElementById(listId);
    if (!listElement) return;

    listElement.innerHTML = '';

    if (users.length === 0) {
        listElement.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #65676b;">
                <p style="font-size: 1.1rem; margin-bottom: 5px;">✨ ¡Perfecto!</p>
                <p>No hay usuarios que coincidan con tu búsqueda</p>
            </div>
        `;
        return;
    }

    users.forEach((user, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.style.animationDelay = `${index * 0.05}s`;
        
        const username = document.createElement('span');
        username.className = 'user-name';
        username.textContent = user.username;

        const link = document.createElement('a');
        link.className = 'user-link';
        link.href = user.href || `https://instagram.com/${user.username}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Ver perfil →';

        userItem.appendChild(username);
        userItem.appendChild(link);
        listElement.appendChild(userItem);
    });
}

/**
 * Carga datos de ejemplo
 */
async function loadExampleData() {
    try {
        const response = await fetch('/example-data.json');
        if (!response.ok) return;
        
        const data = await response.json();
        
        // Procesar datos de ejemplo
        analysisData = processInstagramData(data);
        const chartData = generateChartData(analysisData);
        
        // Mostrar estadísticas
        displayStats(analysisData);
        
        // Renderizar listas
        renderUserLists(analysisData);
        
        // Inicializar gráficos
        initializeCharts(chartData);
        chartsInitialized = true;
        
        // Mostrar secciones
        document.getElementById('statsSection').classList.remove('hidden');
        document.getElementById('chartsSection').classList.remove('hidden');
        document.getElementById('listsSection').classList.remove('hidden');
        
        console.log('Datos de ejemplo cargados correctamente');
        
    } catch (error) {
        console.log('No hay datos de ejemplo disponibles');
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Log de inicialización
console.log('Social Insight - Aplicación iniciada');
