<template>
  <div>
    <h4>List: {{ listName }}</h4>
    <template v-if="todoList.length === 0">
      <div class="empty">Nothing to do. Add a new todo using the button.</div>
    </template>
    <template v-else>
      <ul v-bind:key="todoList.length">
        <TodoListItem v-for="todo in todoList" v-bind:key="todo.id" :todo="todo" />
      </ul>
    </template>
    <router-link class="btn btn-dark" to="create" append>Create New Task</router-link>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";

export default {
  name: "TodoList",
  computed: {
    listName() {
      return this.$store.state.todoItems.name;
    },
    todoList() {
      return this.$store.state.todoItems.list;
    }
  },
  components: {
    TodoListItem
  },
  methods: {
    loadData() {
      this.$store.dispatch("loadTodos", this.$route.params.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.loadData())
  }
};
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
