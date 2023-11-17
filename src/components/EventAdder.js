// HelloWorldModal.js

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EventAdder = ({ eventValues, handleInputChange, addEvent }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleSave = (e) => {
    addEvent(e);
    setShow(false);
  };

  return (
    <>
      <Button className="my-2" variant="primary" onClick={handleShow}>
        Add new event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSave(e)}>
            <div className="mb-3">
              <label className="form-label">Event Title:</label>

              <input
                className="form-control"
                type="text"
                name="eventTitle"
                value={eventValues.eventTitle}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Event description:</label>
              <input
                className="form-control"
                type="text"
                name="eventDesc"
                value={eventValues.eventDesc}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Date:</label>
              <input
                className="form-control"
                type="date"
                name="eventDate"
                value={eventValues.eventDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button variant="danger" className="m-1" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className="m-1" type="submit">
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventAdder;
