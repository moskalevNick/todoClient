import $api from "../http";

export default class TodoService {
    static async changeTodo( id, type ) {
        return $api.post(`/api/todos/${id}`, {type: type})
    }

    static async removeTodo( id ) {
        return $api.delete(`/api/todos/${id}`)
    }

    static async addTodo( title ) {
        return $api.put(`/api/todos`, {title: title})
    }

    static async removeAllChecked() {
        return $api.delete(`/api/todos`)
    }
}