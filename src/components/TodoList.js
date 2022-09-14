import { useContext, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DeleteTemporarily from "./DeleteTemporarily";
import ModalWrapper from "./ModalWrapper";
import Edit from "./Edit";
import Utility from "./Utility";
import TodoForm from './TodoForm';
import { ErrorContext } from "../context/ErrorContextProvider";
import PaginationWrapper from "./PaginationWrapper";
import { todoRead, todoUpdate } from "../API/todoAPI";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currPage, setCurrPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [multiSelect, setMultiSelect] = useState(false);
  const {error, setError} = useContext(ErrorContext);

  useEffect(() => {
    todoRead(`todo/${filter}/${currPage}`, setTodos, setNumOfPages, error, setError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currPage]);
  
  useEffect(() => {
    (currPage > numOfPages) && setCurrPage(numOfPages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfPages]);
  
  function handleCompletedChange(todo) {
    todoUpdate("/todo/completed/" + todo.id, {completed: !todo.completed}, currPage, filter, setTodos, setNumOfPages, error, setError);
  }

  function handleClickTodo(e) {
    multiSelect && e.currentTarget.classList.toggle("bg-success");
  }

  function handleSelectDropdown(eKey) {
    (eKey === "multi") && setMultiSelect(!multiSelect);
  }

  return (
    <div className="to-do-list">
      <Utility filter={filter} setFilter={setFilter} setCurrPage={setCurrPage}/>
      <TodoForm setCurrPage={setCurrPage} setFilter={setFilter} setTodos={setTodos} setNumOfPages={setNumOfPages}/>
      { (todos.length > 0) && <PaginationWrapper numOfPages={numOfPages} currPage={currPage} setCurrPage={setCurrPage}/> }
      {
        (todos.length > 0) && todos.map(todo => !todo.trash && (
          <Card className="m-3 bg-opacity-25" key={todo.id} onClick={handleClickTodo}>
            <Card.Header>
              <div className="row">
                <div className="col">
                  <span className="float-start">{new Date(todo.createdAt).toLocaleString("en-GB")}</span>
                </div>
                <div className="col">
                  <span className="">{todo.title}</span>
                </div>
                <div className="col">
                  <DropdownButton variant="outline-secondary" className="float-end" id="dropdown" title="⁞" size="sm" onSelect={handleSelectDropdown}>
                    <Dropdown.Item eventKey="multi">Multi Select</Dropdown.Item>
                    <Dropdown.Item eventKey="move">Move Todo</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>              
            </Card.Header>

            <Card.Body>
              <Card.Text as="pre">{todo.description}</Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-center align-items-center">
              <Form.Check className="mx-2" inline type="checkbox" label="Completed" id={`checkbox-${todo.id}`} name={`checkbox-${todo.id}`} checked={todo.completed} onChange={() => handleCompletedChange(todo)}/>
              
              <ModalWrapper title="Edit">
                <Edit currPage={currPage} filter={filter} setTodos={setTodos} setNumOfPages={setNumOfPages} todo={todo}/>
              </ModalWrapper>
              
              <ModalWrapper title="Delete">
                <DeleteTemporarily currPage={currPage} filter={filter} setTodos={setTodos} setNumOfPages={setNumOfPages} id={todo.id}/>
              </ModalWrapper>
            </Card.Footer>
          </Card>
        ))
      }
      { (todos.length > 0) && <PaginationWrapper numOfPages={numOfPages} currPage={currPage} setCurrPage={setCurrPage}/> }
    </div>
  );
}

export default TodoList;