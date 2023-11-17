import React, { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const EventEditor = ({ id, title, desc, date, updateEvent, deleteEvent, updateActivestate}) => {
  const initialEventData = {
    eventTitle: title,
    eventDesc: desc,
    eventDate: date,
  };

  const [show, setShow] = useState(false);
  const [eventData, setEventData] = useState(initialEventData);
  const [editableData, setEditableData] = useState(initialEventData);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setEditableData(eventData);
    setShow(false);
  };

  const handleSave = (e, id, data) => {
    updateEvent(e, id, data);
    setEventData(data);
    setShow(false);
  };

  const deleteItem = (id) => {
    deleteEvent(id);
    updateActivestate(null);
    setShow(false);
  };

  return (
    <div className="my-2">
      <ListGroup>
        <ListGroup.Item>Title: {eventData.eventTitle}</ListGroup.Item>
        <ListGroup.Item>Description: {eventData.eventDesc}</ListGroup.Item>
        <ListGroup.Item>Date: {eventData.eventDate}</ListGroup.Item>
        <ListGroup.Item>
          <Button className="m-1" variant="primary" onClick={handleShow}>
            Edit item
          </Button>
          <Button
            className="m-1"
            variant="warning"
            onClick={() => updateActivestate(null)}
          >
            Close modal
          </Button>
        </ListGroup.Item>
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSave(e, id, editableData)}>
            <div className="mb-3">
              <label className="form-label">Event name:</label>
              <input
                className="form-control"
                type="text"
                name="eventTitle"
                value={editableData.eventTitle}
                onChange={(e) =>
                  setEditableData({
                    ...editableData,
                    eventTitle: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Event description:</label>
              <input
                className="form-control"
                type="text"
                name="eventDesc"
                value={editableData.eventDesc}
                onChange={(e) =>
                  setEditableData({
                    ...editableData,
                    eventDesc: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Date:</label>
              <input
                className="form-control"
                type="date"
                name="eventDate"
                value={editableData.eventDate}
                onChange={(e) =>
                  setEditableData({
                    ...editableData,
                    eventDate: e.target.value,
                  })
                }
                required
              />
            </div>
            <Button variant="danger" onClick={() => deleteItem(id)}>
              Delete
            </Button>
            <Button variant="primary" className="m-1" type="submit">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventEditor;
