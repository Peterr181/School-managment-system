import React, { useState } from "react";
import "./SchoolEvent.scss";
import { insertSchoolEvent } from "../../database/oracleConnection";

type SchoolEventAdd = {
  id: string;
  eventName: string;
  eventDate: string;
  eventDescription: string;
};

interface Props {
  setAddingEvent: (value: boolean) => void;
}

const SchoolEventAdd: React.FC<Props> = ({ setAddingEvent }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eventData: SchoolEventAdd = {
      id: "", // Generate or assign a unique ID for the event
      eventName,
      eventDate,
      eventDescription,
    };

    insertSchoolEvent(eventData).then(() => {
      // Handle successful event insertion
      console.log("Event added successfully!");
      // Clear the form fields
      setEventName("");
      setEventDate("");
      setEventDescription("");
    });
    setAddingEvent(false);
  };

  const handleEventAdded = () => {
    setAddingEvent(false);
  };

  return (
    <div className="school-event__container">
      <div className="school-event__wrapper">
        <h2>Add School Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDescription">Event Description</label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default SchoolEventAdd;
