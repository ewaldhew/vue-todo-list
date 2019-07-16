<template>
  <div>
    <h4>Add List</h4>
    <form>
      <div class="form-group">
        <input type="text" class="form-control" id="listName"
          placeholder="List Name" v-model="listName">
      </div>
    </form>
    <button class="btn btn-primary" v-on:click="createTodoList">Create</button>
  </div>
</template>


<script>
export default {
  name: 'TodoListEditor',
  data() {
    return {
      listName: "",
    }
  },
  methods: {
    createTodoList() {
      if (this.listName && this.listName.trim().length) {
        this.$store.dispatch('createTodoList', this.listName)
        this.$router.replace('/task', () => {
          this.$router.go(0);
        });
      }
    }
  },
  beforeMount() {
    if (this.$route.params.taskId) {
      this.loadData()
    } else {
      this.isNewEntry = true
    }
  }
}
</script>
