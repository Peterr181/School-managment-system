import React, { useState, useEffect } from "react";
import "./UserAdd.scss";
import { insertUserData, getUserCount } from "../../database/oracleConnection";

type addUserDataProps = {
  sectionName: string;
};

const AddUserData: React.FC<addUserDataProps> = ({ sectionName }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [gender, setGender] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [nextId, setNextId] = useState<number>(0); // Next available ID

  useEffect(() => {
    // Fetch the current user count from the database
    getUserCount().then((count) => {
      setNextId(count + 1); // Calculate the next available ID
    });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    // Ensure leading zeros for month and day
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDateOfBirth = formatDate(dateOfBirth); // Format the date

    const userData = {
      id: nextId, // Use the next available ID
      firstName,
      middleName,
      lastName,
      dateOfBirth: formattedDateOfBirth,
      bloodGroup,
      phone,
      qualification,
      gender,
      streetAddress,
      city,
      country,
      pinCode,
      userCategory: sectionName, // Replace with the actual user category value
    };

    insertUserData(userData).then(() => {
      setNextId((prevId) => prevId + 1); // Increment the next available ID
    });

    // Clear the form fields
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setDateOfBirth("");
    setBloodGroup("");
    setPhone("");
    setQualification("");
    setGender("");
    setStreetAddress("");
    setCity("");
    setCountry("");
    setPinCode("");
  };
  return (
    <div className="add-user-data__container">
      <div className="adduserdata__wrapper">
        <h2>Add User Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group</label>
            <input
              type="text"
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pinCode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserData;
