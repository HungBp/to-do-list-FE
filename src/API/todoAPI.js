import axios from "axios";

// create new todo
function todoCreate(url, data, currPage, filter, setTodos, setNumOfPages, error, setError) {
  axios.post(url, data)
    .then(res => {
      if (res.statusText === "OK") {
        todoRead(`todo/${filter}/${currPage}`, setTodos, setNumOfPages, error, setError);
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
function todoUpdate(url, data, currPage, filter, setTodos, setNumOfPages, error, setError) {
  axios.patch(url, data)
    .then(res => {
      if (res.statusText === "OK") {
        todoRead(`todo/${filter}/${currPage}`, setTodos, setNumOfPages, error, setError);
      }
    })
    .catch(err => {
      const errMsg = (err.response.data.error) ? err.response.data.error : err.message;
      setError([errMsg, ...error]);
    });
}

// delete todo
function todoDelete(url, currPage, filter, setTodos, setNumOfPages, error, setError) {
  axios.delete(url)
    .then(res => {
      if (res.statusText === "OK") {
        todoRead(`todo/${filter}/${currPage}`, setTodos, setNumOfPages, error, setError);
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