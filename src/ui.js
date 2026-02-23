import { searchUsers, sortUsers } from './analyzer.js';

// Estado global de listas
let currentNotFollowingBack = [];
let currentYouDontFollow = [];

/**
 * Renderiza las listas de usuarios
 */
export function renderUserLists(analysisData) {
    currentNotFollowingBack = analysisData.notFollowingBack;
    currentYouDontFollow = analysisData.youDontFollow;
    
    renderList('notFollowingBackList', analysisData.notFollowingBack);
    renderList('youDontFollowList', analysisData.youDontFollow);
}

/**
 * Renderiza una lista de usuarios
 */
function renderList(elementId, users) {
    const listElement = document.getElementById(elementId);
    if (!listElement) return;

    listElement.innerHTML = '';

    if (users.length === 0) {
        listElement.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #65676b;">
                <p style="font-size: 1.1rem; margin-bottom: 5px;">✨ ¡Perfecto!</p>
                <p>No hay usuarios en esta categoría</p>
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
 * Descarga una lista de usuarios como CSV
 */
export function downloadCSV(users, filename) {
    if (users.length === 0) {
        showNotification('No hay datos para descargar', 'warning');
        return;
    }

    // Crear contenido CSV
    let csv = 'Usuario,URL de Perfil,Fecha Agregado\n';
    
    users.forEach(user => {
        const username = user.username.replace(/"/g, '""');
        const url = user.href || `https://instagram.com/${user.username}`;
        const date = user.timestamp ? new Date(user.timestamp * 1000).toLocaleDateString('es-ES') : 'N/A';
        csv += `"${username}","${url}","${date}"\n`;
    });

    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`✓ ${filename} descargado correctamente`, 'success');
}

/**
 * Muestra una notificación
 */
export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#31a24c' : type === 'error' ? '#ed4956' : type === 'warning' ? '#f77737' : '#405de6';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${bgColor};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Filtra y renderiza lista de usuarios
 */
export function filterAndRenderList(listId, searchTerm, sortBy = 'username') {
    let users = [];
    let sourceList = [];
    
    if (listId === 'notFollowingBackList') {
        sourceList = currentNotFollowingBack;
    } else if (listId === 'youDontFollowList') {
        sourceList = currentYouDontFollow;
    }
    
    // Buscar
    users = searchUsers(sourceList, searchTerm);
    
    // Ordenar
    users = sortUsers(users, sortBy);
    
    // Renderizar
    renderList(listId, users);
}

/**
 * Copia texto al portapapeles
 */
export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✓ Copiado al portapapeles', 'success');
    }).catch(() => {
        showNotification('Error al copiar', 'error');
    });
}

/**
 * Genera reporte de texto
 */
export function generateTextReport(analysisData) {
    const stats = {
        followers: analysisData.followers,
        following: analysisData.following,
        notFollowingBack: analysisData.notFollowingBack.length,
        youDontFollow: analysisData.youDontFollow.length,
        mutualFollows: analysisData.mutualFollows.length
    };

    let report = `REPORTE DE ANÁLISIS DE INSTAGRAM\n`;
    report += `${'='.repeat(50)}\n\n`;
    report += `Fecha: ${new Date().toLocaleDateString('es-ES')}\n\n`;
    
    report += `ESTADÍSTICAS GENERALES\n`;
    report += `${'-'.repeat(50)}\n`;
    report += `Seguidores: ${stats.followers.toLocaleString('es-ES')}\n`;
    report += `Siguiendo: ${stats.following.toLocaleString('es-ES')}\n`;
    report += `Seguidores mutuos: ${stats.mutualFollows.toLocaleString('es-ES')}\n\n`;
    
    report += `ANÁLISIS DETALLADO\n`;
    report += `${'-'.repeat(50)}\n`;
    report += `No te siguen de vuelta: ${stats.notFollowingBack.toLocaleString('es-ES')}\n`;
    report += `Te siguen pero no los sigues: ${stats.youDontFollow.toLocaleString('es-ES')}\n\n`;
    
    report += `PORCENTAJES\n`;
    report += `${'-'.repeat(50)}\n`;
    const followRatio = stats.following > 0 ? (stats.following / stats.followers * 100).toFixed(2) : 0;
    const engagementRate = stats.followers > 0 ? (stats.mutualFollows / stats.followers * 100).toFixed(2) : 0;
    
    report += `Ratio Seguimiento: ${followRatio}%\n`;
    report += `Tasa de Compromiso: ${engagementRate}%\n`;
    
    return report;
}

/**
 * Descarga reporte como texto
 */
export function downloadReport(analysisData, filename = 'reporte-instagram.txt') {
    const report = generateTextReport(analysisData);
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`✓ ${filename} descargado correctamente`, 'success');
}

/**
 * Obtiene información formateada de estadísticas
 */
export function getFormattedStats(analysisData) {
    const stats = {
        followers: analysisData.followers.toLocaleString('es-ES'),
        following: analysisData.following.toLocaleString('es-ES'),
        notFollowingBack: analysisData.notFollowingBack.length.toLocaleString('es-ES'),
        youDontFollow: analysisData.youDontFollow.length.toLocaleString('es-ES'),
        mutualFollows: analysisData.mutualFollows.length.toLocaleString('es-ES')
    };
    
    return stats;
}
