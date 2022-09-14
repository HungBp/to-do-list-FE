import Form from 'react-bootstrap/Form';

function Utility({setFilter, setCurrPage}) {
  function handleChangeForm(e) {
    setFilter(e.target.value);
    setCurrPage(1);
  }

  return (
    <div >
      <Form className="d-flex justify-content-center align-items-center" onChange={e => handleChangeForm(e)}>
        <Form.Check className="mx-2 my-3" type="radio" name="filter" value="all" id="all" label="All" defaultChecked></Form.Check>
        <Form.Check className="mx-2 my-3" type="radio" name="filter" value="completed" id="completed" label="Completed"></Form.Check>
        <Form.Check className="mx-2 my-3" type="radio" name="filter" value="pending" id="pending" label="Pending"></Form.Check>
        <Form.Group className="mx-2 my-3">
          <Form.Control type="search" variant="primary" size="sm"/>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Utility;