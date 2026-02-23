/**
 * Módulo de integración con Nexus Server
 * Maneja autenticación, verificación de suscripciones y canjes de puntos
 */

// Configuración
const NEXUS_SERVER_URL = process.env.VITE_NEXUS_SERVER_URL || 'http://localhost:3000';
const APP_NAME = 'IG_Analyzer';

/**
 * Clase para manejar la comunicación con Nexus Server
 */
export class NexusAPI {
    constructor() {
        this.token = localStorage.getItem('nexus_token');
        this.user = JSON.parse(localStorage.getItem('nexus_user') || '{}');
    }

    /**
     * Realiza una request al servidor Nexus
     */
    async request(endpoint, options = {}) {
        const url = `${NEXUS_SERVER_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                if (response.status === 401) {
                    this.logout();
                    throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
                }
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en Nexus API:', error);
            throw error;
        }
    }

    /**
     * Registra un nuevo usuario en Nexus
     */
    async register(email, password, username) {
        const data = await this.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, username })
        });

        this.setAuth(data.token, data.user);
        return data;
    }

    /**
     * Inicia sesión en Nexus
     */
    async login(email, password) {
        const data = await this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        this.setAuth(data.token, data.user);
        return data;
    }

    /**
     * Verifica si el token es válido
     */
    async verifyToken() {
        try {
            const data = await this.request('/api/auth/verify', {
                method: 'GET'
            });
            return data.valid;
        } catch (error) {
            return false;
        }
    }

    /**
     * Obtiene el perfil del usuario actual
     */
    async getProfile() {
        const data = await this.request('/api/users/profile', {
            method: 'GET'
        });

        this.user = data;
        localStorage.setItem('nexus_user', JSON.stringify(data));
        return data;
    }

    /**
     * Obtiene el saldo de puntos del usuario
     */
    async getPoints() {
        const data = await this.request('/api/users/points', {
            method: 'GET'
        });

        return data;
    }

    /**
     * Obtiene el historial de puntos
     */
    async getPointsHistory(limit = 50) {
        const data = await this.request(`/api/points/history?limit=${limit}`, {
            method: 'GET'
        });

        return data;
    }

    /**
     * Verifica si el usuario tiene suscripción activa para esta app
     */
    async checkSubscription() {
        try {
            const data = await this.request(`/api/subscriptions/active?app=${APP_NAME}`, {
                method: 'GET'
            });

            return {
                isActive: data.is_active,
                expiresAt: data.end_date,
                daysRemaining: data.days_remaining
            };
        } catch (error) {
            console.error('Error verificando suscripción:', error);
            return {
                isActive: false,
                expiresAt: null,
                daysRemaining: 0
            };
        }
    }

    /**
     * Canjea puntos por acceso premium a esta app
     */
    async redeemPoints(pointsAmount) {
        const data = await this.request('/api/subscriptions/redeem', {
            method: 'POST',
            body: JSON.stringify({
                app_name: APP_NAME,
                points_to_spend: pointsAmount
            })
        });

        return {
            success: true,
            newBalance: data.new_balance,
            subscriptionExpiresAt: data.subscription_expires_at,
            message: 'Suscripción activada exitosamente'
        };
    }

    /**
     * Obtiene el historial de suscripciones
     */
    async getSubscriptionHistory() {
        const data = await this.request('/api/subscriptions/history', {
            method: 'GET'
        });

        return data;
    }

    /**
     * Guarda el token y usuario en localStorage
     */
    setAuth(token, user) {
        this.token = token;
        this.user = user;
        localStorage.setItem('nexus_token', token);
        localStorage.setItem('nexus_user', JSON.stringify(user));
    }

    /**
     * Cierra sesión
     */
    logout() {
        this.token = null;
        this.user = {};
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
    }

    /**
     * Verifica si el usuario está autenticado
     */
    isAuthenticated() {
        return !!this.token;
    }

    /**
     * Obtiene el usuario actual
     */
    getCurrentUser() {
        return this.user;
    }

    /**
     * Obtiene el token actual
     */
    getToken() {
        return this.token;
    }
}

// Instancia singleton
export const nexusAPI = new NexusAPI();

/**
 * Hook para verificar autenticación y suscripción
 */
export async function initializeNexusAuth() {
    // Verificar si hay token guardado
    if (!nexusAPI.isAuthenticated()) {
        return {
            authenticated: false,
            hasSubscription: false
        };
    }

    try {
        // Verificar que el token sea válido
        const isValid = await nexusAPI.verifyToken();
        
        if (!isValid) {
            nexusAPI.logout();
            return {
                authenticated: false,
                hasSubscription: false
            };
        }

        // Obtener perfil actualizado
        await nexusAPI.getProfile();

        // Verificar suscripción
        const subscription = await nexusAPI.checkSubscription();

        return {
            authenticated: true,
            hasSubscription: subscription.isActive,
            subscription
        };
    } catch (error) {
        console.error('Error inicializando autenticación:', error);
        return {
            authenticated: false,
            hasSubscription: false
        };
    }
}

/**
 * Formatea fecha de expiración
 */
export function formatExpirationDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const today = new Date();
    const daysLeft = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expirado';
    if (daysLeft === 0) return 'Hoy';
    if (daysLeft === 1) return 'Mañana';
    
    return `${daysLeft} días`;
}

/**
 * Calcula puntos necesarios para acceso premium
 */
export function calculatePointsNeeded(videosWatched, videosRequired = 30) {
    return Math.max(0, videosRequired - videosWatched);
}
