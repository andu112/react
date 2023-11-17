import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventAdder from "./EventAdder";
import EventEditor from "./EventEditor";

const Calendar = () => {
  const initialEventData = {
    eventTitle: "",
    eventDesc: "",
    eventDate: "",
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  const [eventData, setEventData] = useState(initialEventData);
  const [activeEvent, setActiveEvent] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();

    const eventObject = {
      title: eventData.eventTitle,
      desc: eventData.eventDesc,
      date: eventData.eventDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/events",
        eventObject
      );
      setEvents((prevEvents) => [...prevEvents, response.data]);
      setEventData(initialEventData);
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Error adding event. Please try again later.");
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Error deleting event. Please try again later.");
    }
  };

  const updateEvent = async (e, id, updatedEvent) => {
    e.preventDefault();

    const edited = {
      title: updatedEvent.eventTitle,
      desc: updatedEvent.eventDesc,
      date: updatedEvent.eventDate,
    };

    const event = events.find((event) => event.id === id);
    const changedEvent = {
      ...event,
      title: edited.title,
      desc: edited.desc,
      date: edited.date,
    };
    const response = await axios.put(
      `http://localhost:3001/events/${id}`,
      changedEvent
    );
    setEvents(events.map((event) => (event.id !== id ? event : response.data)));
  };

  const handleInputChange = (e) => {
    setEventData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEventClick = (id) => {
    if (id === null) {
      setActiveEvent({});
      return;
    }
    const singleEvent = events.find((event) => event.id == id);
    setActiveEvent((prevState) => ({ ...prevState, ...singleEvent }));
  };

  return (
    <div className="container">
      <h1>Calendar</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            eventClick={(inf) => handleEventClick(inf.event.id)}
          />
        </>
      )}
      {Object.keys(activeEvent).length !== 0 ? (
        <EventEditor
          key={activeEvent.id}
          {...activeEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          updateActivestate={handleEventClick}
        />
      ) : null}
      <EventAdder
        eventValues={eventData}
        handleInputChange={handleInputChange}
        addEvent={addEvent}
      />
    </div>
  );
};

export default Calendar;
