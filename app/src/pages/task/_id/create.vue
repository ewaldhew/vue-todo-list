<template>
  <div>
    <h4>{{ isNewEntry ? 'Add' : 'Edit' }} Task</h4>
    <form>
      <div class="form-group">
        <input
          id="taskName"
          v-model="taskName"
          type="text"
          class="form-control"
          placeholder="Task Name"
        >
      </div>
    </form>
    <button class="btn btn-primary" @click="updateTodo">
      Save
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoEditor',
  data () {
    return {
      taskName: '',
      isNewEntry: false
    }
  },
  beforeMount () {
    if (this.$route.params.taskId) {
      this.loadData()
    } else {
      this.isNewEntry = true
    }
  },
  methods: {
    loadData () {
      this.$store.dispatch('loadTodos', this.$route.params.id)
        .then(({ ok }) => {
          if (ok) {
            this.taskName = this.$store.state.todoItems.list
              .find(todo => todo.id.toString() === this.$route.params.taskId).name
          }
        })
        .catch(() => {
          this.taskName = ''
        })
    },
    updateTodo () {
      if (!this.taskName || this.taskName.trim().length === 0) { return }

      if (this.isNewEntry) {
        this.$store.dispatch('createTodo', {
          id: this.$route.params.id,
          name: this.taskName
        }).then(() => this.$router.go(-1))
      } else {
        this.$store.dispatch('editTodo', {
          id: this.$route.params.taskId,
          name: this.taskName
        }).then(() => this.$router.go(-1))
      }
    }
  }
}
</script>
