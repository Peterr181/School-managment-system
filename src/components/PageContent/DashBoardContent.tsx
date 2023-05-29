import React, { useState, ChangeEvent, useEffect } from "react";
import MemberItem from "./MemberItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUser,
  faPersonDressBurst,
  faPerson,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import { useSpring, animated } from "react-spring";
import "react-calendar/dist/Calendar.css";
import { getMemberCounts } from "@/database/oracleConnection";
const DashboardContent: React.FC = () => {
  const [value, onChange] = useState<Date | Date[] | null>(null);

  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [parentCount, setParentCount] = useState(0);

  useEffect(() => {
    const fetchMemberCounts = async () => {
      try {
        const { teachers, students, parents } = await getMemberCounts();
        setTeacherCount(teachers);
        setStudentCount(students);
        setParentCount(parents);
      } catch (error) {
        console.error("Error fetching member counts:", error);
      }
    };

    fetchMemberCounts();
  }, []);

  const handleCalendarChange = (value: Date | Date[]) => {
    // Handle calendar change event here
    onChange(value);
  };
  return (
    <div className="dashboard__mainelements__container">
      <div className="memberitems__container">
        <MemberItem
          name="Students"
          quantity={studentCount}
          background="#e97451"
          iconType={faUserGraduate}
        />
        <MemberItem
          name="Teachers"
          quantity={teacherCount}
          background="#f28500"
          iconType={faUser}
        />
        <MemberItem
          name="Parents"
          quantity={parentCount}
          background="#f4c430"
          iconType={faPersonDressBurst}
        />
        <MemberItem
          name="Classes"
          quantity={0}
          background="#9acd32"
          iconType={faCalendar}
        />
      </div>
      <div className="dashboard__calendarevents__container">
        <div className="dashboard__calendarevents__container__calendar">
          <div className="dashboard__calendarevents__container__calendar__activities">
            <div className="dummy1">
              <h2>ACTIVITIES CALENDAR</h2>
            </div>
            <div className="dummy2">
              <div className="legend-item">
                <div
                  className="legend-circle"
                  style={{ backgroundColor: "#FF0000" }}
                ></div>
                <span>Events</span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-circle"
                  style={{ backgroundColor: "#00FF00" }}
                ></div>
                <span>Exams</span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-circle"
                  style={{ backgroundColor: "#0000FF" }}
                ></div>
                <span>Holidays</span>
              </div>
            </div>
          </div>
          <Calendar
            onChange={handleCalendarChange as any}
            value={value as any}
            className="custom-calendar"
          />
        </div>
        <div className="dashboard__calendarevents__container__exams">
          <h2>EXAMS</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
