import { useEffect, useState, useContext } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DeleteForever from "./DeleteForever";
import ModalWrapper from "./ModalWrapper";
import { ErrorContext } from "../context/ErrorContextProvider";
import { todoRead, todoUpdate } from "../API/todoAPI";
import PaginationWrapper from "./PaginationWrapper";

function Trash() {
  const [todos, setTodos] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const {error, setError} = useContext(ErrorContext);

  useEffect(() => {
    todoRead(`/todo/trash/${currPage}`, setTodos, setNumOfPages, error, setError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  useEffect(() => {
    (currPage > numOfPages) && setCurrPage(numOfPages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfPages]);

  function handleRestoreBtn(id) {
    todoUpdate("/todo/restorefromtrash/" + id, {trash: false}, currPage, "trash", setTodos, setNumOfPages, error, setError);
  }

  return (
    <div className="trash">
      <Button type="button" variant="secondary" className="m-3">Empty Trash</Button>
    { (todos.length > 0) && <PaginationWrapper numOfPages={numOfPages} currPage={currPage} setCurrPage={setCurrPage}/> }
    {
      (todos.length > 0) && todos.map(todo => todo.trash && (
        <Card className="m-3" key={todo.id}>
          <Card.Header>
            <div className="row">
              <div className="col">
                <span className="float-start">{new Date(todo.createdAt).toLocaleString("en-GB")}</span>
              </div>
              <div className="col">
                <span className="">{todo.title}</span>
              </div>
              <div className="col">
                <p className="m-0 float-end lh-sm fw-bold">⁞</p>
              </div>
            </div>     
          </Card.Header>
          
          <Card.Body>
            <Card.Text>{todo.description}</Card.Text>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-center align-items-center">
            <ModalWrapper title="Delete">
              <DeleteForever currPage={currPage} setTodos={setTodos} setNumOfPages={setNumOfPages} id={todo.id}/>
            </ModalWrapper>

            <Button variant="outline-dark" type="button" onClick={() => handleRestoreBtn(todo.id)}>Restore</Button>
          </Card.Footer>
        </Card>
      ))
    }
    { (todos.length > 0) && <PaginationWrapper numOfPages={numOfPages} currPage={currPage} setCurrPage={setCurrPage}/> }      
  </div>
  );
}

export default Trash;