<template>
  <div class="list-group">
    <div>Your todo lists:</div>
    <template v-for="list in lists">
      <router-link :to="'/task/' + list.id" class="list-group-item
      list-group-item-action" :key="list.id">
        {{ list.name }}
      </router-link>
    </template>
    <router-link class="btn btn-primary" to="create" append>Create New Task List</router-link>
  </div>
</template>

<script>
export default {
  name: 'TodoListCollection',
  data() {
    return {
      lists: []
    }
  },
  methods: {
    loadData() {
      this.$store.dispatch('loadTodoCollection')
      .then(({ ok }) => {
        if (ok) {
          this.lists = this.$store.state.todoCollection
        }
      })
      .catch(() => {
        this.lists = []
      })
    }
  },
  beforeMount() {
    this.loadData()
  }
}
</script>

