import { initializeCharts } from './charts.js';
import { processInstagramData, analyzeFollowers, searchUsers, sortUsers } from './analyzer.js';
import { renderUserLists, downloadCSV, filterAndRenderList, downloadReport, showNotification } from './ui.js';

// Estado global
let analysisData = null;

// Elementos del DOM
const fileInput = document.getElementById('fileInput');
const loadingIndicator = document.getElementById('loadingIndicator');
const statsSection = document.getElementById('statsSection');
const chartsSection = document.getElementById('chartsSection');
const listsSection = document.getElementById('listsSection');

// Event Listeners
fileInput.addEventListener('change', handleFileUpload);

// Botones de descarga
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

// Búsqueda en tiempo real
document.getElementById('notFollowingBackSearch')?.addEventListener('input', (e) => {
    filterAndRenderList('notFollowingBackList', e.target.value);
});

document.getElementById('youDontFollowSearch')?.addEventListener('input', (e) => {
    filterAndRenderList('youDontFollowList', e.target.value);
});

/**
 * Maneja la carga del archivo JSON
 */
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    showLoading(true);

    try {
        const fileContent = await readFile(file);
        const data = JSON.parse(fileContent);

        // Procesar datos
        analysisData = processInstagramData(data);
        
        // Mostrar resultados
        displayResults();
        
    } catch (error) {
        console.error('Error procesando archivo:', error);
        alert('Error al procesar el archivo. Asegúrate de que sea un JSON válido de Instagram.');
    } finally {
        showLoading(false);
    }
}

/**
 * Lee el archivo como texto
 */
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

/**
 * Muestra/oculta el indicador de carga
 */
function showLoading(show) {
    loadingIndicator.classList.toggle('hidden', !show);
}

/**
 * Muestra los resultados del análisis
 */
function displayResults() {
    if (!analysisData) return;

    // Actualizar estadísticas
    document.getElementById('followersCount').textContent = 
        analysisData.followers.toLocaleString('es-ES');
    document.getElementById('followingCount').textContent = 
        analysisData.following.toLocaleString('es-ES');
    document.getElementById('notFollowingBackCount').textContent = 
        analysisData.notFollowingBack.length.toLocaleString('es-ES');
    document.getElementById('youDontFollowCount').textContent = 
        analysisData.youDontFollow.length.toLocaleString('es-ES');

    // Mostrar secciones
    statsSection.classList.remove('hidden');
    chartsSection.classList.remove('hidden');
    listsSection.classList.remove('hidden');

    // Inicializar gráficos
    initializeCharts(analysisData);

    // Renderizar listas
    renderUserLists(analysisData);

    // Scroll a resultados
    setTimeout(() => {
        statsSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}



// Log de inicialización
console.log('Social Insight - Aplicación iniciada');
