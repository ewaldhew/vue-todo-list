import axios from 'axios'
import Axios from 'vue-axios'
import Vue from 'vue'

Vue.use(Axios, axios)

const instance = axios.create({
    baseURL: 'http://localhost:1234',
    timeout: 10000,
    maxContentLength: 3000000, // 3 MB
    validateStatus: () => {
        return true; // consider the request resolved as long as we get a response from the server
    },
    withCredentials: true
});

export function getData(promise) {
    return promise
        .then((data) => {
            if (data.status === 200) {
                return data.data || true;
            } else {
                throw new Error(data.statusText || 'Failed to process request.');
            }
        })
}

export function loadLists() {
    return instance.get('/task/')
}

export function loadTodoList(id) {
    return instance.get('/task/' + id)
}

export function loadTodo(id) {
    return instance.get('/todo/' + id)
}

export function editTodo(id, newTodo) {
    return instance.patch('/todo/' + id, newTodo)
}

export function createTodoList(name) {
    return instance.put('/task/', { name: name })
}

export function createTodo(id, name) {
    return instance.put('/todo/', { id: id, name: name })
}

export function deleteTodo(id) {
    return instance.delete('/todo/' + id)
}

export default {
    getData,
    loadLists,
    loadTodoList,
    loadTodo,
    editTodo,
    createTodo,
    createTodoList,
    deleteTodo,
}
