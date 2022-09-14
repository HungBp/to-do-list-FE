import { useContext, useRef } from "react";
import Button from 'react-bootstrap/Button';
import { todoDelete } from "../API/todoAPI";
import { ErrorContext } from "../context/ErrorContextProvider";

function DeleteForever({todos, setTodos, id, handleClose}) {
  const {error, setError} = useContext(ErrorContext);
  const noBtnRef = useRef();

  function handleClickYesBtn(id) {
    todoDelete("/todo/delete/" + id, todos, setTodos, error, setError);
    noBtnRef.current.click();
  }

  return (
    <div className="text-center">
        <p> Are you sure? </p>
        <p> Item will be delete forever and can't be restore. </p>
        <Button className="m-3 mt-0" variant="secondary" type="button" onClick={() => handleClickYesBtn(id)}> Yes </Button>
        <Button className="m-3 mt-0" variant="primary" type="button" ref={noBtnRef} aria-label="Close" onClick={handleClose}> No </Button>
    </div>
  );
}

export default DeleteForever;