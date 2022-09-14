import Form from 'react-bootstrap/Form';

function Utility({filter, setFilter, setCurrPage}) {
  function handleChangeForm(e) {
    setFilter(e.target.value);
    setCurrPage(1);
  }

  return (
    <div >
      <Form className="d-flex justify-content-center align-items-center">
        <Form.Check className="mx-2 my-3" type="radio" name="filter" value="all" label="All" checked={filter === "all"} onChange={handleChangeForm}/>
        <Form.Check className="mx-2 my-3" type="radio" name="filter" value="completed" label="Completed" checked={filter === "completed"}  onChange={handleChangeForm}/>
        <Form.Check className="mx-2 my-3" type="radio" name="filter" value="pending" label="Pending" checked={filter === "pending"}  onChange={handleChangeForm}/>
        <Form.Group className="mx-2 my-3">
          <Form.Control type="search" variant="primary" size="sm" placeholder='Search'/>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Utility;