import React, { useEffect, useState } from "react";
import { getSchoolEvents } from "../../database/oracleConnection";
import "./SchoolEvent.scss";

interface SchoolEvent {
  id: number;
  title: string;
  date: Date | null;
  description: string;
}

interface Props {
  setAddingEvent: (value: boolean) => void;
}

const SchoolEvent: React.FC<Props> = ({ setAddingEvent }) => {
  const [schoolEvents, setSchoolEvents] = useState<SchoolEvent[]>([]);

  const handleEventAdd = () => {
    setAddingEvent(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData: any[] = await getSchoolEvents();

        setSchoolEvents(eventsData);
      } catch (error) {
        console.error("Error fetching school events:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="school-events-container">
      <h2>School Events</h2>

      <ul className="event-list">
        {schoolEvents.map((event) => (
          <li key={event.id} className="event-item">
            <div className="event-header">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date">
                {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <p className="event-description">{event.description}</p>
          </li>
        ))}
      </ul>
      <div className="centerfix">
        <button className="useraddbtn " onClick={handleEventAdd}>
          Add more events!
        </button>
      </div>
    </div>
  );
};

export default SchoolEvent;
