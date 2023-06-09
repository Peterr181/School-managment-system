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
import { getMemberCounts, getExams } from "@/database/oracleConnection";
import {
  countSchoolEvents,
  insertExamsData,
} from "@/database/oracleConnection";

interface Exam {
  id: number;
  name: string;
  date: Date | null;
  professor: string;
}
const DashboardContent: React.FC = () => {
  const [value, onChange] = useState<Date | Date[] | null>(null);
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [parentCount, setParentCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examProfessor, setExamProfessor] = useState("");

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

    const fetchEventCount = async () => {
      try {
        const count = await countSchoolEvents();
        setEventCount(count);
      } catch (error) {
        console.error("Error fetching event count:", error);
      }
    };

    fetchEventCount();
    fetchMemberCounts();
  }, []);

  const handleCalendarChange = (value: Date | Date[]) => {
    // Handle calendar change event here
    onChange(value);
  };

  const handleAddExam = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const examData = {
      examName,
      examDate,
      examProfessor,
    };

    insertExamsData(examData)
      .then(() => {
        console.log("Exam inserted successfully");
      })
      .catch((error) => {
        console.error("Error inserting exam:", error);
      });

    // Clear exam form inputs
    setExamName("");
    setExamDate("");
    setExamProfessor("");
  };

  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examsData = await getExams();
        setExams(examsData);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

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
          name="Events"
          quantity={eventCount}
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
          <div className="header-btn-container">
            <h2>EXAMS</h2>
            <button className="useraddbtn" onClick={handleAddExam}>
              Add Exam
            </button>
          </div>
          <div className="exams-data-container">
            <ul className="exams-list">
              {exams.map((exam) => (
                <li key={exam.id} className="exams-element">
                  <span>{exam.name}</span>
                  <span>
                    {exam.date
                      ? new Date(exam.date).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <span>{exam.professor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Exam</h3>
            <form onSubmit={handleExamSubmit}>
              <div className="form-group">
                <label htmlFor="examName">Exam Name</label>
                <input
                  type="text"
                  id="examName"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="examDate">Exam Date</label>
                <input
                  type="date"
                  id="examDate"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="examProfessor">Exam Professor</label>
                <input
                  type="text"
                  id="examProfessor"
                  value={examProfessor}
                  onChange={(e) => setExamProfessor(e.target.value)}
                />
              </div>
              <button type="submit">Add Exam</button>
              <button onClick={handleModalClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
