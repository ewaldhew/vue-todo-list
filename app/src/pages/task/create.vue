<template>
  <div>
    <h4>Add List</h4>
    <form>
      <div class="form-group">
        <input
          id="listName"
          v-model="listName"
          type="text"
          class="form-control"
          placeholder="List Name"
        >
      </div>
    </form>
    <button class="btn btn-primary" @click="createTodoList">
      Create
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoListEditor',
  data () {
    return {
      listName: ''
    }
  },
  methods: {
    createTodoList () {
      (async () => {
        if (this.listName && this.listName.trim().length) {
          await this.$store.dispatch('createTodoList', this.listName)
          this.$router.go(-1)
        }
      })()
    }
  }
}
</script>
