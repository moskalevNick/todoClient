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

    static async getTodos() { 
        return $api.get('/api/todos')
    }

}

