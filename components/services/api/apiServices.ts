import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration
const API_BASE_URL = 'http://192.168.1.4:8080'; // Thay đổi URL này
const API_TIMEOUT = 10000; // 10 seconds

class ApiService {
    baseURL: string;
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Get stored token
    async getToken() {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const tokenType = await AsyncStorage.getItem('tokenType') || 'Bearer';
            return token ? `${tokenType} ${token}` : null;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    // Generic API call method
    async apiCall(endpoint: string, options: any = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const token = await this.getToken();

            const defaultHeaders: Record<string, string> = {
                'Content-Type': 'application/json',
            };

            if (token && !options.skipAuth) {
                (defaultHeaders as any)['Authorization'] = token;
            }

            const config = {
                method: 'GET',
                headers: { ...defaultHeaders, ...(options.headers || {}) },
                ...options,
            };

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

            const response = await fetch(url, {
                ...config,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                throw {
                    status: response.status,
                    message: data.message || data || 'Request failed',
                    data: data,
                };
            }

            return {
                success: true,
                data: data,
                status: response.status,
            };

        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);

            if ((error as any).name === 'AbortError') {
                return {
                    success: false,
                    message: 'Request timeout. Please try again.',
                    status: 408,
                };
            }

            return {
                success: false,
                message: (error as any).message || 'Network error. Please check your connection.',
                status: (error as any).status || 500,
                error: error,
            };
        }
    }

    // Authentication APIs
    async login(username: string, password: string) {
        return this.apiCall('/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            skipAuth: true,
        });
    }

    async register(username: string, password: string) {
        // Call backend register API
        const result = await this.apiCall('/api/v1/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            skipAuth: true,
        });
        // If registration is successful and tokens are returned, save them
        if (result.success && result.data && result.data.accessToken) {
            await this.saveTokens(result.data.accessToken, result.data.tokenType || 'Bearer');
        }
        return result;
    }

    async findUserByUsername(username: string) {
        return this.apiCall('/api/v1/auth/findByUsername', {
            method: 'POST',
            body: JSON.stringify({ username }),
        });
    }

    async getWeather(location?: string) {
        // GET không nên có body, nên truyền location qua query param nếu cần
        let endpoint = '/api/weather';
        if (location) {
            endpoint += `?location=${encodeURIComponent(location)}`;
        }
        return this.apiCall(endpoint, {
            method: 'GET',
        });
    }

    // Ticket APIs (example from your backend)
    async getTicketDetail(ticketId: string, detailId: string) {
        return this.apiCall(`/ticket/${ticketId}/detail/${detailId}`);
    }

    // Token management
    async saveTokens(accessToken: string, tokenType: string = 'Bearer') {
        try {
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('tokenType', tokenType);
            return true;
        } catch (error) {
            console.error('Error saving tokens:', error);
            return false;
        }
    }

    async clearTokens() {
        try {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('tokenType');
            return true;
        } catch (error) {
            console.error('Error clearing tokens:', error);
            return false;
        }
    }

    async isAuthenticated() {
        const token = await AsyncStorage.getItem('accessToken');
        return !!token;
    }

    // Logout
    async logout() {
        await this.clearTokens();
        // Add any additional logout logic here
        return { success: true };
    }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;

// Export individual methods for easier imports
export const {
    register,
    login,
    findUserByUsername,
    getWeather,
    getTicketDetail,
    saveTokens,
    clearTokens,
    isAuthenticated,
    logout,
} = apiService;