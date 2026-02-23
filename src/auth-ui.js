/**
 * Módulo de interfaz de autenticación
 * Maneja login, registro y verificación de suscripción
 */

import { nexusAPI, initializeNexusAuth, formatExpirationDate } from './nexus-api.js';
import { showNotification } from './ui.js';

/**
 * Crea y muestra el modal de autenticación
 */
export function showAuthModal() {
    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <button class="auth-modal-close">&times;</button>
            
            <div class="auth-tabs">
                <button class="auth-tab-btn active" data-tab="login">Iniciar Sesión</button>
                <button class="auth-tab-btn" data-tab="register">Registrarse</button>
            </div>

            <!-- Login Tab -->
            <div class="auth-tab-content active" id="login-tab">
                <h2>Inicia sesión en tu Cuenta Nexus</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" required placeholder="tu@email.com">
                    </div>
                    <div class="form-group">
                        <label for="login-password">Contraseña</label>
                        <input type="password" id="login-password" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="auth-btn">Iniciar Sesión</button>
                </form>
                <p class="auth-help">¿No tienes cuenta? <a href="#" class="auth-switch-tab" data-tab="register">Regístrate aquí</a></p>
            </div>

            <!-- Register Tab -->
            <div class="auth-tab-content" id="register-tab">
                <h2>Crea tu Cuenta Nexus</h2>
                <form id="register-form">
                    <div class="form-group">
                        <label for="register-username">Nombre de usuario</label>
                        <input type="text" id="register-username" required placeholder="tu_usuario">
                    </div>
                    <div class="form-group">
                        <label for="register-email">Email</label>
                        <input type="email" id="register-email" required placeholder="tu@email.com">
                    </div>
                    <div class="form-group">
                        <label for="register-password">Contraseña</label>
                        <input type="password" id="register-password" required placeholder="••••••••">
                    </div>
                    <div class="form-group">
                        <label for="register-password-confirm">Confirmar contraseña</label>
                        <input type="password" id="register-password-confirm" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="auth-btn">Registrarse</button>
                </form>
                <p class="auth-help">¿Ya tienes cuenta? <a href="#" class="auth-switch-tab" data-tab="login">Inicia sesión aquí</a></p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('.auth-modal-close').addEventListener('click', () => modal.remove());
    
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchAuthTab(e.target.dataset.tab));
    });

    document.querySelectorAll('.auth-switch-tab').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchAuthTab(link.dataset.tab);
        });
    });

    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);

    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

/**
 * Cambia entre tabs de autenticación
 */
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.auth-tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`${tab}-tab`).classList.add('active');
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
}

/**
 * Maneja el login
 */
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        showNotification('Iniciando sesión...', 'info');
        await nexusAPI.login(email, password);
        showNotification('✓ Sesión iniciada correctamente', 'success');
        
        // Cerrar modal y actualizar UI
        document.getElementById('auth-modal')?.remove();
        updateAuthUI();
        
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    }
}

/**
 * Maneja el registro
 */
async function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    
    if (password !== passwordConfirm) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    try {
        showNotification('Creando cuenta...', 'info');
        await nexusAPI.register(email, password, username);
        showNotification('✓ Cuenta creada correctamente', 'success');
        
        // Cerrar modal y actualizar UI
        document.getElementById('auth-modal')?.remove();
        updateAuthUI();
        
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    }
}

/**
 * Actualiza la interfaz de autenticación
 */
export async function updateAuthUI() {
    const authStatus = await initializeNexusAuth();
    
    if (authStatus.authenticated) {
        showUserProfile(authStatus);
    } else {
        showLoginPrompt();
    }
}

/**
 * Muestra el perfil del usuario
 */
function showUserProfile(authStatus) {
    const user = nexusAPI.getCurrentUser();
    
    let profileHTML = `
        <div class="user-profile">
            <div class="profile-header">
                <h3>👤 ${user.username}</h3>
                <button class="logout-btn" onclick="nexusLogout()">Cerrar sesión</button>
            </div>
            <div class="profile-info">
                <p><strong>Email:</strong> ${user.email}</p>
    `;

    if (authStatus.hasSubscription) {
        profileHTML += `
            <div class="subscription-active">
                <p class="subscription-status">✓ Suscripción activa</p>
                <p class="subscription-expires">Expira: ${formatExpirationDate(authStatus.subscription.expiresAt)}</p>
            </div>
        `;
    } else {
        profileHTML += `
            <div class="subscription-inactive">
                <p class="subscription-status">❌ Sin suscripción activa</p>
                <p class="subscription-hint">Canjea puntos en Nexus Ads para obtener acceso premium</p>
            </div>
        `;
    }

    profileHTML += `
            </div>
        </div>
    `;

    const container = document.getElementById('auth-container');
    if (container) {
        container.innerHTML = profileHTML;
    }
}

/**
 * Muestra el prompt de login
 */
function showLoginPrompt() {
    const container = document.getElementById('auth-container');
    if (container) {
        container.innerHTML = `
            <div class="login-prompt">
                <p>Inicia sesión para acceder a Nexus IG Analyzer</p>
                <button class="login-btn" onclick="showAuthModal()">Iniciar Sesión / Registrarse</button>
            </div>
        `;
    }
}

/**
 * Cierra sesión
 */
export function nexusLogout() {
    nexusAPI.logout();
    showNotification('Sesión cerrada', 'info');
    updateAuthUI();
}

/**
 * Verifica acceso y muestra contenido
 */
export async function checkAccessAndShow() {
    const authStatus = await initializeNexusAuth();
    
    if (!authStatus.authenticated) {
        // Mostrar prompt de login
        document.getElementById('statsSection').classList.add('hidden');
        document.getElementById('chartsSection').classList.add('hidden');
        document.getElementById('listsSection').classList.add('hidden');
        showLoginPrompt();
        return false;
    }

    if (!authStatus.hasSubscription) {
        // Mostrar mensaje de suscripción requerida
        showNotification('Se requiere suscripción premium para acceder a esta función', 'warning');
        return false;
    }

    return true;
}

// Hacer funciones globales
window.showAuthModal = showAuthModal;
window.nexusLogout = nexusLogout;
