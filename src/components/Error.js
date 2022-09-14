import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';
import { useState, useContext, useEffect } from "react";
import { ErrorContext } from "../context/ErrorContextProvider";

function Error() {
  const {error, setError} = useContext(ErrorContext);
  const [show, setShow] = useState([]);

  useEffect(() => {
    for (let i = 0; i < error.length; i++) {
      if (i === 0) {setShow(show => [true]);}
      else {setShow(show => [...show, true]);}
    }
  }, [error.length]);

  function handleCloseBtn(index) {
    setShow(show.filter((eachShow, eachIndex) => index !== eachIndex));
    setError(error.filter((eachError, eachIndex) => index !== eachIndex));
  }

  return (
    <div className="error position-absolute w-25 top-0 start-0">
      {
        (error.length > 0) && error.map((err, index) => (
          <Alert show={show[index]} variant="danger" id={index} key={index}>
            <div className="position-absolute top-0 end-0">
              <CloseButton onClick={() => handleCloseBtn(index)}/>
            </div>
            <p className="m-0">{err}</p>
          </Alert>
        )).reverse()
      }
    </div>
  );
}

export default Error;