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
  // const [multiSelect, setMultiSelect] = useState(0);
  const {error, setError} = useContext(ErrorContext);

  useEffect(() => {
    todoRead(`todo/${filter}/${currPage}`, setTodos, setNumOfPages, error, setError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currPage]);
  
  function handleCompletedChange(todo) {
    todoUpdate("/todo/completed/" + todo.id, {completed: !todo.completed}, todos, setTodos, error, setError, filter);
  }

  function handleClickTodo(e) {
    // e.currentTarget.classList.toggle("bg-success");
  }

  return (
    <div className="to-do-list">
      <Utility setFilter={setFilter} setCurrPage={setCurrPage}/>
      <TodoForm todos={todos} setTodos={setTodos} setCurrPage={setCurrPage}/>
      { (todos.length) > 0 && <PaginationWrapper numOfPages={numOfPages} currPage={currPage} setCurrPage={setCurrPage}/> }
      {
        (todos.length) > 0 && todos.map(todo => !todo.trash && (
          <Card className="m-3 bg-opacity-25" key={todo.id} onClick={handleClickTodo}>
            <Card.Header className="lh-lg">
              <p className="d-inline">{todo.title}</p>
              {/* <p className="m-0 float-end lh-sm fw-bold">⁞</p> */}
              <DropdownButton menuVariant="dark" variant="secondary" className="float-end" id="dropdown" title="" size="sm">
                <Dropdown.Item>Multi Select</Dropdown.Item>
                <Dropdown.Item>Move Todo</Dropdown.Item>
              </DropdownButton>
            </Card.Header>

            <Card.Body>
              <Card.Text as="pre">{todo.description}</Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-center align-items-center">
              <Form.Check className="mx-2" inline type="checkbox" label="Completed" id={`checkbox-${todo.id}`} name={`checkbox-${todo.id}`} checked={todo.completed} onChange={() => handleCompletedChange(todo)}/>
              
              <ModalWrapper title="Edit">
                <Edit todos={todos} setTodos={setTodos} todo={todo}/>
              </ModalWrapper>
              
              <ModalWrapper title="Delete">
                <DeleteTemporarily todos={todos} setTodos={setTodos} id={todo.id}/>
              </ModalWrapper>
            </Card.Footer>
          </Card>
        ))
      }
      { (todos.length) > 0 && <PaginationWrapper numOfPages={numOfPages} currPage={currPage} setCurrPage={setCurrPage}/> }
    </div>
  );
}

export default TodoList;