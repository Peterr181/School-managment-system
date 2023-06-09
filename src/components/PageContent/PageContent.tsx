import React, { useState, useEffect } from "react";
import "./DashboardContent.scss";
import SectionInfo from "../SectionInfo";
import UserAdd from "../UserAdd/UserAdd";
import DashBoardContent from "./DashBoardContent";
import TopNav from "./TopNav";
import SchoolEvent from "../SchoolEvent/SchoolEvent";
import AddUserData from "../UserAdd/AddUserData";
import SchoolEventAdd from "../SchoolEvent/SchoolEventAdd";
import { countSchoolEvents } from "@/database/oracleConnection";
import Meals from "../Meals/Meals";

interface DashboardContentProps {
  sectionName: string;
}

const PageContent: React.FC<DashboardContentProps> = ({ sectionName }) => {
  const [addingUser, setAddingUser] = useState(false);
  const [events, setEvents] = useState(0);
  const [addingEvent, setAddingEvent] = useState(false);

  useEffect(() => {
    const fetchEventCount = async () => {
      try {
        const count = await countSchoolEvents();
        setEvents(count);
      } catch (error) {
        console.error("Error fetching event count:", error);
      }
    };

    fetchEventCount();
  }, []);
  let contentComponent;

  switch (sectionName) {
    case "Dashboard":
      contentComponent = <DashBoardContent />;
      break;
    case "Teachers":
      contentComponent = <UserAdd sectionName={sectionName} />;
      break;
    case "Students":
      contentComponent = <UserAdd sectionName={sectionName} />;
      break;
    case "Parents":
      contentComponent = <UserAdd sectionName={sectionName} />;
      break;
    case "Events":
      contentComponent = addingEvent ? (
        <SchoolEventAdd setAddingEvent={setAddingEvent} />
      ) : (
        <SchoolEvent setAddingEvent={setAddingEvent} />
      );
      break;
    case "Meals":
      contentComponent = <Meals />;
  }

  return (
    <div className="dashboard__container">
      <TopNav />
      <SectionInfo
        sectionName={sectionName}
        setAddingUser={setAddingUser}
        addingUser={addingUser}
      />
      <div className="sections__wrapper">
        {!addingUser ? (
          <div className="sections__content">{contentComponent}</div>
        ) : (
          <AddUserData sectionName={sectionName} />
        )}
      </div>
    </div>
  );
};

export default PageContent;
