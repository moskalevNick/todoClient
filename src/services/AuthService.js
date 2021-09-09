import $api from "../http";

export default class AuthService {
    static async login(name, password) {
        return $api.post('/api/login', {name, password})
    }

    static async registration(email, password, name) {
        return $api.post('/api/registration', {email, password, name})
    }

    static async logout() {
        return $api.post('/api/logout')
    }

    static async getTodos(type, deadline) { 
        return $api.get(`/api/todos?type=${type}&deadline=${deadline}`)
    }

    static async setCity(city, name) { 
        return $api.post(`/api/city/${city}`, {name})
    }

    static async refresh() { 
        return $api.get('/api/refresh', {withCredentials: true})
    }

}

