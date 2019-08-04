<template>
  <div class="card">
    <div class="row no-gutters">
      <div
        class="col-2"
        :class="[todo.task_finished ? 'btn-success' : 'btn-light', 'btn']"
        @click="toggleTodo(todo.id)"
      >
        <span class="center">✓</span>
      </div>
      <router-link
        class="card-body btn btn-light col-8"
        :to="'edit/' + todo.id"
        append
      >
        {{ todo.name }}
      </router-link>
      <div class="col-2 btn btn-danger" @click="deleteTodo(todo.id)">
        <span class="center">🗑</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoListItem',
  props: ['todo'],
  methods: {
    toggleTodo (id) {
      this.$store.dispatch('toggleTodo', id)
    },
    deleteTodo (id) {
      this.$store.dispatch('deleteTodo', id)
      this.$router.go(0)
    }
  }
}
</script>

<style>
.center {
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
}
</style>
