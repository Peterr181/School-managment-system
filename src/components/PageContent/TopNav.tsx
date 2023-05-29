import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faUser,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
const TopNav = () => {
  return (
    <div className="dashboard__container__nav">
      <div className="dashboard__container__nav__text">
        <p>
          "Live as if you were to die tommorow. Learn as if you were to live
          forever."
        </p>
      </div>
      <div className="dashboard__container__nav__account">
        <FontAwesomeIcon className="user__icon" icon={faUser} />
        <p>adminofsite</p>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    </div>
  );
};

export default TopNav;
