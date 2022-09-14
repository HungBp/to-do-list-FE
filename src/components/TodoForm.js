import { useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { ErrorContext } from "../context/ErrorContextProvider";
import { todoCreate } from "../API/todoAPI";

function TodoForm({setCurrPage, setFilter, setTodos, setNumOfPages}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {error, setError} = useContext(ErrorContext);

  function handleSubmitBtn(e) {
    const currPage = 1;
    const filter = "all";
    
    e.preventDefault();
    todoCreate("/todo/new", {title, description}, currPage, filter, setTodos, setNumOfPages, error, setError);
    setTitle("");
    setDescription("");
    setOpen(false);
    setCurrPage(currPage);
    setFilter(filter);
  }

  return (
    <div className="todo-form">
      <Button variant="primary" type="button" className="rounded-circle m-3 mt-0" aria-controls="add-todo" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? "-" : "+"}
      </Button> 

      <Collapse in={open}>
        <Form id="add-todo" onSubmit={handleSubmitBtn}>
          <Form.Group className="m-3">
            <Form.Label htmlFor="title"> Title </Form.Label>
            <Form.Control type="text" name="title" id="title" value={title} autoComplete="off" onChange={e => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group className="m-3">
            <Form.Label htmlFor="description"> Description </Form.Label>
            <Form.Control as="textarea" id="description" name="description" value={description} rows="3" onChange={e => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group className="m-3">
            <Button variant="primary" type="submit"> Add </Button>
          </Form.Group>
        </Form>
      </Collapse>
    </div>
  );
}

export default TodoForm;