import { cloneElement } from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

function ModalWrapper({children, title}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {(title === "Login") ? <Navbar.Text role='button' className="ms-sm-3" onClick={handleShow}>Login</Navbar.Text> : <Button className="mx-2" type="button" variant="outline-dark" onClick={handleShow}>{title}</Button>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{cloneElement(children, {handleClose})}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalWrapper;