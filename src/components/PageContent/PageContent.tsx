import React, { useState } from "react";
import "./DashboardContent.scss";
import SectionInfo from "../SectionInfo";
import UserAdd from "../UserAdd/UserAdd";
import DashBoardContent from "./DashBoardContent";
import TopNav from "./TopNav";
import AddUserData from "../UserAdd/AddUserData";

interface DashboardContentProps {
  sectionName: string;
}

const PageContent: React.FC<DashboardContentProps> = ({ sectionName }) => {
  const [addingUser, setAddingUser] = useState(false);

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
    default:
      break;
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
