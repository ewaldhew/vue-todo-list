<template>
  <div>
    <h4>List: {{ todos.name }}</h4>
    <template v-if="todos.list.length === 0">
      <div class="empty">
        Nothing to do. Add a new todo using the button.
      </div>
    </template>
    <template v-else>
      <ul :key="todos.list.length">
        <TodoListItem v-for="todo in todos.list" :key="todo.id" :todo="todo" />
      </ul>
    </template>
    <router-link class="btn btn-dark" to="create" append>
      Create New Task
    </router-link>
  </div>
</template>

<script>
import TodoListItem from '~/components/TodoListItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoListItem
  },
  asyncData ({ store, params }) {
    return store.dispatch('loadTodos', params.id)
      .then(() => {
        return {
          todos: store.state.todoItems
        }
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
