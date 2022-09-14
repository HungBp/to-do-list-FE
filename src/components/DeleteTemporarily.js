import { useContext, useRef } from "react";
import Button from 'react-bootstrap/Button';
import { todoUpdate } from "../API/todoAPI";
import { ErrorContext } from "../context/ErrorContextProvider";

function DeleteTemporarily({currPage, filter, setTodos, setNumOfPages, id, handleClose}) {
  const {error, setError} = useContext(ErrorContext);
  const noBtnRef = useRef();

  function handleClickYesBtn(id) {
    todoUpdate("/todo/movetotrash/" + id, {trash: true}, currPage, filter, setTodos, setNumOfPages, error, setError);
    noBtnRef.current.click();
  }

  return (
    <div className="text-center">
      <p> Are you sure? </p>
      <p> Item move to trash for 30 days before deleting forever. </p>
      <Button className="m-3 mt-0" variant="secondary" type="button" onClick={() => handleClickYesBtn(id)}> Yes </Button>
      <Button className="m-3 mt-0" variant="primary" type="button" ref={noBtnRef} aria-label="Close" onClick={handleClose}> No </Button>
    </div>
  );
}

export default DeleteTemporarily;