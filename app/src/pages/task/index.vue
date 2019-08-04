<template>
  <div class="list-group">
    <div>Your todo lists:</div>
    <template v-for="list in lists">
      <router-link
        :key="list.id"
        :to="'/task/' + list.id"
        class="list-group-item
      list-group-item-action"
      >
        {{ list.name }}
      </router-link>
    </template>
    <router-link class="btn btn-primary" to="create" append>
      Create New Task List
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TodoListCollection',
  asyncData ({ store }) {
    return store.dispatch('loadTodoCollection')
      .then(() => {
        return {
          lists: store.state.todoCollection
        }
      })
  }
}
</script>
