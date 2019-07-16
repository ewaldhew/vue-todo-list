import Vue from 'vue'
import Router from 'vue-router'
import TodoListCollection from '@/components/TodoListCollection'
import TodoList from '@/components/TodoList'
import TodoListEditor from '@/components/TodoListEditor'
import TodoEditor from '@/components/TodoEditor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/task'
    },
    {
      path: '/task',
      name: 'TodoListCollection',
      component: TodoListCollection
    },
    {
      path: '/task/create',
      name: 'TodoListCreate',
      component: TodoListEditor
    },
    {
      path: '/task/:id',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/task/:id/create',
      name: 'Create',
      component: TodoEditor
    },
    {
      path: '/task/:id/edit/:taskId',
      name: 'Edit',
      component: TodoEditor
    }
  ]
})
