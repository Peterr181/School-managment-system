import React, { useEffect, useState } from "react";
import "./UserAdd.scss";
import {
  getUserDataByCategory,
  removeUserData,
} from "@/database/oracleConnection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  bloodGroup: string;
  phone: string;
  qualification: string;
  gender: string;
  streetAddress: string;
  city: string;
  country: string;
  pinCode: string;
  role: string;
};

type UserAddProps = {
  sectionName: string;
};

const UserAdd: React.FC<UserAddProps> = ({ sectionName }) => {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDataByCategory(sectionName);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [sectionName]);

  useEffect(() => {
    console.log(userData); // Log the updated userData value
  }, [userData]);

  const handleRemoveUser = async (id: number) => {
    try {
      console.log(id);
      await removeUserData(id);
      setUserData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  };

  return (
    <div className="user-add__container">
      <table className="user-add__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Blood Group</th>
            <th>Phone</th>
            <th>Qualification</th>
            <th>Gender</th>
            <th>Street Address</th>
            <th>City</th>
            <th>Country</th>
            <th>PIN Code</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.length === 0 ? (
            <tr>
              <td colSpan={15} className="user-add__no-data">
                No data available in table until something is added.
              </td>
            </tr>
          ) : (
            userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.middleName}</td>
                <td>{user.lastName}</td>
                <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                {/* Convert to string using toDateString() */}
                <td>{user.bloodGroup}</td>
                <td>{user.phone}</td>
                <td>{user.qualification}</td>
                <td>{user.gender}</td>
                <td>{user.streetAddress}</td>
                <td>{user.city}</td>
                <td>{user.country}</td>
                <td>{user.pinCode}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="remove-button"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserAdd;
