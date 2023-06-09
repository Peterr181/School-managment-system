import React, { useState } from "react";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUser,
  faUserGraduate,
  faUsers,
  faCalendarAlt,
  faUtensils,
  faBus,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/school-logo.png";

type SetCurrentSectionType = (section: string) => void;

interface SidebarProps {
  setCurrentSection: SetCurrentSectionType;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentSection }) => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (section: string) => {
    setCurrentSection(section);
    setActiveSection(section);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="schoollogo" className="school-logo" />
      </div>
      <ul className="sidebar-menu">
        <li
          className={activeSection === "Dashboard" ? "active" : ""}
          onClick={() => handleSectionClick("Dashboard")}
        >
          <a href="#">
            <div className="sidebar-item">
              <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
              <span className="sidebar-text">Dashboard</span>
            </div>
          </a>
        </li>
        <li
          className={activeSection === "Teachers" ? "active" : ""}
          onClick={() => handleSectionClick("Teachers")}
        >
          <a href="#">
            <div className="sidebar-item">
              <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
              <span className="sidebar-text">Teachers</span>
            </div>
          </a>
        </li>
        <li
          className={activeSection === "Students" ? "active" : ""}
          onClick={() => handleSectionClick("Students")}
        >
          <a href="#">
            <div className="sidebar-item">
              <FontAwesomeIcon icon={faUserGraduate} className="sidebar-icon" />
              <span className="sidebar-text">Students</span>
            </div>
          </a>
        </li>
        <li
          className={activeSection === "Parents" ? "active" : ""}
          onClick={() => handleSectionClick("Parents")}
        >
          <a href="#">
            <div className="sidebar-item">
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              <span className="sidebar-text">Parents</span>
            </div>
          </a>
        </li>
        <li
          className={activeSection === "Events" ? "active" : ""}
          onClick={() => handleSectionClick("Events")}
        >
          <a href="#">
            <div className="sidebar-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="sidebar-icon" />
              <span className="sidebar-text">Events</span>
            </div>
          </a>
        </li>
        <li
          className={activeSection === "Meals" ? "active" : ""}
          onClick={() => handleSectionClick("Meals")}
        >
          <a href="#">
            <div className="sidebar-item">
              <FontAwesomeIcon icon={faUtensils} className="sidebar-icon" />
              <span className="sidebar-text">Meals</span>
            </div>
          </a>
        </li>

        {/* <li
          className={activeSection === "Transport" ? "active" : ""}
          onClick={() => handleSectionClick("Transport")}
        >
          <a href="#">
            <div className="sidebar-item">
              <FontAwesomeIcon icon={faBus} className="sidebar-icon" />
              <span className="sidebar-text">Transport</span>
            </div>
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
