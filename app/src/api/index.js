export function getData (instance, promise) {
  return promise
    .then((data) => {
      if (data.status === 200) {
        return data.data || true
      } else {
        throw new Error(data.statusText || 'Failed to process request.')
      }
    })
}

export function loadLists (instance) {
  return instance.get('/task/')
}

export function loadTodoList (instance, id) {
  return instance.get('/task/' + id)
}

export function loadTodo (instance, id) {
  return instance.get('/todo/' + id)
}

export function editTodo (instance, id, newTodo) {
  return instance.patch('/todo/' + id, newTodo)
}

export function createTodoList (instance, name) {
  return instance.put('/task/', { name })
}

export function createTodo (instance, id, name) {
  return instance.put('/todo/', { id, name })
}

export function deleteTodo (instance, id) {
  return instance.delete('/todo/' + id)
}

export default {
  getData,
  loadLists,
  loadTodoList,
  loadTodo,
  editTodo,
  createTodo,
  createTodoList,
  deleteTodo
}
