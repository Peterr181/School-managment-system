import React, { useEffect } from "react";
import "./PageContent/DashboardContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
require("dotenv").config();

interface SectionInfoProps {
  sectionName: string;
  setAddingUser: any;
  addingUser: any;
}

const SectionInfo: React.FC<SectionInfoProps> = ({
  sectionName,
  setAddingUser,
  addingUser,
}) => {
  const handleAddingUser = () => {
    setAddingUser(true);
  };

  const handleNotAddingUser = () => {
    setAddingUser(false);
  };

  useEffect(() => {
    console.log(process.env.DB_USER);
  }, []);

  return (
    <div className="dashboard__container__additional">
      <div className="dashboard__container__additional__name">
        <p>{sectionName}</p>
      </div>
      <div className="dashboard__container__additional__home">
        <p>Home</p>
        <FontAwesomeIcon icon={faCaretRight} />
        <p>{sectionName}</p>
        {sectionName !== "Dashboard" && sectionName !== "Events" && (
          <button onClick={handleAddingUser} className="useraddbtn">
            Add {sectionName}
          </button>
        )}
        {addingUser && (
          <button onClick={handleNotAddingUser} className="useraddbtn">
            Go back
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionInfo;
