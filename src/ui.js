/**
 * Renderiza las listas de usuarios
 */
export function renderUserLists(analysisData) {
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
        listElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #65676b;">No hay usuarios</div>';
        return;
    }

    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        const username = document.createElement('span');
        username.className = 'user-name';
        username.textContent = user.username;

        const link = document.createElement('a');
        link.className = 'user-link';
        link.href = user.href || `https://instagram.com/${user.username}`;
        link.target = '_blank';
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
        alert('No hay datos para descargar');
        return;
    }

    // Crear contenido CSV
    let csv = 'Usuario,URL de Perfil\n';
    
    users.forEach(user => {
        const username = user.username.replace(/"/g, '""');
        const url = user.href || `https://instagram.com/${user.username}`;
        csv += `"${username}","${url}"\n`;
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
}

/**
 * Muestra una notificación
 */
export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#31a24c' : type === 'error' ? '#ed4956' : '#405de6'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
