import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

const DEFAULT_TODO = Object.freeze({
  id: '',
  name: '',
  task_finished: false
})

export default () => new Vuex.Store({
  state: {
    todoCollection: [],
    todoItems: {
      name: '',
      list: []
    },
    todo: DEFAULT_TODO
  },
  mutations: {
    SET_TODO_COLLECTION (state, items) {
      state.todoCollection = items
    },
    SET_TODO_LIST (state, items) {
      state.todoItems = items
    },
    SELECT_TODO (state, id) {
      state.todo = state.todoItems.list.find(todo => todo.id.toString() === id.toString())
    },
    TOGGLE_TODO (state) {
      state.todo.task_finished = !state.todo.task_finished
    },
    EDIT_TODO (state, name) {
      state.todo.name = name
    }
  },
  actions: {
    loadTodoCollection ({ commit }) {
      return api.getData(this.$axios, api.loadLists(this.$axios))
        .then((todoCollection) => {
          commit('SET_TODO_COLLECTION', todoCollection)
          return { ok: true }
        })
    },
    loadTodos ({ commit }, id) {
      return api.getData(this.$axios, api.loadTodoList(this.$axios, id))
        .then((todoList) => {
          commit('SET_TODO_LIST', todoList)
          return { ok: true }
        })
    },
    toggleTodo ({ commit }, id) {
      commit('SELECT_TODO', id)
      commit('TOGGLE_TODO')
      return api.editTodo(this.$axios, id, this.state.todo)
        .then(() => {
          return { ok: true }
        })
    },
    selectTodo ({ commit }, id) {
      commit('SELECT_TODO', id)
      return Promise.resolve({ ok: true })
    },
    editTodo ({ commit }, { id, name }) {
      commit('SELECT_TODO', id)
      commit('EDIT_TODO', name)
      return api.editTodo(this.$axios, id, this.state.todo)
        .then(() => {
          return { ok: true }
        })
    },
    createTodo ({ commit }, { id, name }) {
      return api.createTodo(this.$axios, id, name)
        .then(() => {
          return { ok: true }
        })
    },
    createTodoList ({ commit }, name) {
      return api.createTodoList(this.$axios, name)
        .then(() => {
          return { ok: true }
        })
    },
    deleteTodo ({ commit }, id) {
      return api.deleteTodo(this.$axios, id)
        .then(() => {
          return { ok: true }
        })
    }
  }
})
