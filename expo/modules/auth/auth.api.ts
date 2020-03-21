import config from '../../config';

class AuthApi {
    static login(email: string, password: string) {
        console.log(config.url);
        return fetch(`${config.url}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }

    static register(first: string, last: string, email: string, password: string) {
        return fetch(`${config.url}/api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({ first, last, email, password }),
            headers: config.configHeaders,
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }

    static refreshToken(refreshToken: string) {
        return fetch(`${config.url}/api/auth/refreshToken`, {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
            headers: config.configHeaders,
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }

    static checkAuthTest(token: string | null, refreshToken: string) {
        return fetch(`${config.url}/api/auth/getAll`, {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
            headers: {
                ...config.configHeaders,
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }
}
export default AuthApi;
