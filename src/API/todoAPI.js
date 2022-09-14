import axios from "axios";

// create new todo
function todoCreate(url, data, todos, setTodos, error, setError) {
  axios.post(url, data)
    .then(res => {
      if (res.statusText === "OK") {
        setTodos([res.data, ...todos]);
      }
    })
    .catch(err => {
      const errMsg = (err.response.data.error) ? err.response.data.error : err.message;
      setError([errMsg, ...error]);
    });
}

// read todo list
function todoRead(url, setTodos, setNumOfPages, error, setError) {
  axios.get(url)
    .then(res => {
      if (res.statusText === "OK") {
        setTodos(res.data.todos);
        setNumOfPages(res.data.numOfPages);
      }
    })
    .catch(err => {
      const errMsg = (err.response.data.error) ? err.response.data.error : err.message;
      setError([errMsg, ...error]);
    });
}

// update todo
// filter arg is used for handling completed change only
function todoUpdate(url, data, todos, setTodos, error, setError, filter = "none") {
  axios.patch(url, data)
    .then(res => {
      if (res.statusText === "OK") {
        setTodos(todos => todos.map(todo => (todo.id === res.data.id) ? {...todo, ...res.data} : todo));
        if (filter === "completed") {
          setTodos(todos => todos.filter(todo => todo.completed === true));
        } else if (filter === "pending") {
          setTodos(todos => todos.filter(todo => todo.completed === false));
        }
      }
    })
    .catch(err => {
      const errMsg = (err.response.data.error) ? err.response.data.error : err.message;
      setError([errMsg, ...error]);
    });
}

// delete todo
function todoDelete(url, todos, setTodos, error, setError) {
  axios.delete(url)
    .then(res => {
      if (res.statusText === "OK") {
        setTodos(todos.filter(todo => (todo.id !== res.data.id)));
      }
    })
    .catch(err => {
      const errMsg = (err.response.data.error) ? err.response.data.error : err.message;
      setError([errMsg, ...error]);
    });
}

export {
  todoCreate,
  todoRead,
  todoUpdate,
  todoDelete
};