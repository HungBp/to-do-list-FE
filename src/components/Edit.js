import { useState, useContext, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ErrorContext } from "../context/ErrorContextProvider";
import { todoUpdate } from "../API/todoAPI";

function Edit({currPage, filter, setTodos, setNumOfPages, todo, handleClose}) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const {error, setError} = useContext(ErrorContext);
  const cancelBtnRef = useRef();

  function handleSaveBtn(e, id) {
    e.preventDefault();
    todoUpdate("/todo/edit/" + id, {title, description}, currPage, filter, setTodos, setNumOfPages, error, setError);
    cancelBtnRef.current.click();
  }
  
  return (
    <Form onSubmit={e => handleSaveBtn(e, todo.id)}>
      <Form.Group className="mx-3">
        <Form.Label htmlFor={`title-edit-${todo.id}`}> Title </Form.Label>
        <Form.Control type="text" name={`title-edit-${todo.id}`} id={`title-edit-${todo.id}`} value={title} autoComplete="off" onChange={e => setTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group className="m-3">
        <Form.Label htmlFor={`description-edit-${todo.id}`}> Description </Form.Label>
        <Form.Control as="textarea" id={`description-edit-${todo.id}`} name={`description-edit-${todo.id}`} value={description} rows="3" onChange={e => setDescription(e.target.value)}/>
      </Form.Group>

      <Form.Group className="m-3 text-center">
        <Button className="mx-3" variant="primary" type="submit"> Save </Button>
        <Button className="mx-3" ref={cancelBtnRef} variant="secondary" type="button" aria-label="Close" onClick={handleClose}> Cancel </Button>
      </Form.Group>
    </Form>    
  );
}

export default Edit;