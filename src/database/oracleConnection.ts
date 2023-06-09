const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
require("dotenv").config();
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

export async function insertUserData(userData: any) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Fetch the next available ID from the database
    const getNextIdQuery = `
      SELECT MAX(ID) as maxId
      FROM test1
    `;
    const getNextIdResult = await connection.execute(getNextIdQuery);
    const nextId = getNextIdResult.rows[0].MAXID + 1;

    // Use the next ID in the userData object
    userData.id = nextId;

    const insertQuery = `
      INSERT INTO test1 (
        ID,
        FIRST_NAME,
        MIDDLE_NAME,
        LAST_NAME,
        DATE_OF_BIRTH,
        BLOOD_GROUP,
        PHONE,
        QUALIFICATION,
        GENDER,
        STREET_ADDRESS,
        CITY,
        COUNTRY,
        PIN_CODE,
        ROLE
      ) VALUES (
        :id,
        :firstName,
        :middleName,
        :lastName,
        TO_DATE(:dateOfBirth, 'YYYY-MM-DD'),
        :bloodGroup,
        :phone,
        :qualification,
        :gender,
        :streetAddress,
        :city,
        :country,
        :pinCode,
        :userCategory
      )
    `;

    await connection.execute(insertQuery, userData);
    await connection.commit();
    console.log("User data inserted successfully");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function getUserDataByCategory(category: string) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `
      SELECT ID, FIRST_NAME, MIDDLE_NAME, LAST_NAME, DATE_OF_BIRTH, BLOOD_GROUP, PHONE, QUALIFICATION, GENDER, STREET_ADDRESS, CITY, COUNTRY, PIN_CODE, ROLE
      FROM test1
      WHERE ROLE = :category
    `;
    const binds = {
      category: category,
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const queryResult = await connection.execute(query, binds, options);
    const result = queryResult.rows.map((row: any) => {
      const user: any = {
        id: row.ID,
        firstName: row.FIRST_NAME,
        middleName: row.MIDDLE_NAME,
        lastName: row.LAST_NAME,
        dateOfBirth: row.DATE_OF_BIRTH,
        bloodGroup: row.BLOOD_GROUP,
        phone: row.PHONE,
        qualification: row.QUALIFICATION,
        gender: row.GENDER,
        streetAddress: row.STREET_ADDRESS,
        city: row.CITY,
        country: row.COUNTRY,
        pinCode: row.PIN_CODE,
        role: row.ROLE,
      };
      return user;
    });

    return result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error to handle it in the component
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function getMemberCounts(): Promise<{
  teachers: number;
  students: number;
  parents: number;
}> {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `
      SELECT COUNT(*) as count, ROLE
      FROM test1
      WHERE ROLE IN ('Teachers', 'Students')
      GROUP BY ROLE
    `;

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const queryResult = await connection.execute(query, {}, options);
    const result: { teachers: number; students: number; parents: number } = {
      teachers: 0,
      students: 0,
      parents: 0,
    };

    queryResult.rows.forEach((row: any) => {
      if (row.ROLE === "Teachers") {
        result.teachers = row.COUNT;
      } else if (row.ROLE === "Students") {
        result.students = row.COUNT;
      } else if (row.ROLE === "Parents") {
        result.parents = row.COUNT;
      }
    });

    return result;
  } catch (error) {
    console.error("Error fetching member counts:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function getUserCount(): Promise<number> {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `
      SELECT COUNT(*) as count
      FROM test1
    `;

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const queryResult = await connection.execute(query, {}, options);
    const count = queryResult.rows[0].COUNT;

    return count;
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export const removeUserData = async (id: any) => {
  let connection;

  try {
    // Get a connection from the pool
    connection = await oracledb.getConnection(dbConfig);

    // Prepare the SQL statement
    const sql = `DELETE FROM test1 WHERE id = :id`;

    // Bind the ID parameter
    const binds = [id];

    // Execute the SQL statement
    await connection.execute(sql, binds);
    await connection.commit();

    console.log("User data removed successfully");
  } catch (error) {
    console.error("Error removing user data:", error);
    throw error;
  } finally {
    // Release the connection
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  }
};
export async function insertSchoolEvent(eventData: any) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Fetch the next available ID from the database
    const getNextIdQuery = `
      SELECT MAX(ID) as maxId
      FROM events
    `;
    const getNextIdResult = await connection.execute(getNextIdQuery);
    const nextId = getNextIdResult.rows[0].MAXID + 1;

    // Use the next ID in the eventData object
    eventData.id = nextId;

    // Format the eventDate string to 'DD-MM-YYYY' format
    const formattedDate = new Date(eventData.eventDate).toLocaleDateString(
      "en-GB"
    );

    const insertQuery = `
      INSERT INTO events (
        ID,
        event_name,
        event_date,
        event_description
      ) VALUES (
        :id,
        :eventName,
        TO_DATE(:eventDate, 'DD-MM-YYYY'),
        :eventDescription
      )
    `;

    await connection.execute(insertQuery, {
      id: eventData.id,
      eventName: eventData.eventName,
      eventDate: formattedDate,
      eventDescription: eventData.eventDescription,
    });

    await connection.commit();
    console.log("School event inserted successfully");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export interface SchoolEvent {
  id: number;
  title: string;
  date: Date; // Update the type to Date
  description: string;
}
export async function getSchoolEvents(): Promise<SchoolEvent[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const query = `
      SELECT ID, event_name, event_date, event_description
      FROM events
      ORDER BY ID
    `;

    const result = await connection.execute(query);

    const events: SchoolEvent[] = result.rows.map((row: any) => {
      const eventDate =
        row.EVENT_DATE instanceof Date
          ? row.EVENT_DATE
          : new Date(row.EVENT_DATE);
      const formattedDate = eventDate.toLocaleDateString("en-GB");

      return {
        id: row.ID,
        title: row.EVENT_NAME,
        date: formattedDate !== "Invalid Date" ? eventDate : null,
        description: row.EVENT_DESCRIPTION,
      };
    });

    return events;
  } catch (error) {
    console.error("Error retrieving school events from the database:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  }
}

interface Exam {
  id: number;
  name: string;
  date: Date | null;
  professor: string;
}
export async function getExams(): Promise<Exam[]> {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const query = `
      SELECT ID, exam_name, exam_date, exam_professor
      FROM exams
      ORDER BY ID
    `;

    const result = await connection.execute(query);

    const exams: Exam[] = result.rows.map((row: any) => {
      const examDate =
        row.EXAM_DATE instanceof Date ? row.EXAM_DATE : new Date(row.EXAM_DATE);
      const formattedDate = examDate.toLocaleDateString("en-GB");

      return {
        id: row.ID,
        name: row.EXAM_NAME,
        date: formattedDate !== "Invalid Date" ? examDate : null,
        professor: row.EXAM_PROFESSOR,
      };
    });

    return exams;
  } catch (error) {
    console.error("Error retrieving exams from the database:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  }
}

export async function countSchoolEvents(): Promise<number> {
  let connection;
  let count = 0;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const countQuery = `
      SELECT COUNT(*) AS eventCount
      FROM events
    `;

    const result = await connection.execute(countQuery);
    count = result.rows[0].EVENTCOUNT;

    console.log("Number of school events:", count);
  } catch (err) {
    console.error("Error counting school events:", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }

  return count;
}

export async function insertExamsData(eventData: any) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Fetch the next available ID from the database
    const getNextIdQuery = `
      SELECT MAX(ID) as maxId
      FROM exams
    `;
    const getNextIdResult = await connection.execute(getNextIdQuery);
    const nextId = getNextIdResult.rows[0].MAXID + 1;

    // Use the next ID in the eventData object
    eventData.id = nextId;

    // Format the eventDate string to 'DD-MM-YYYY' format
    const formattedDate = new Date(eventData.examDate).toLocaleDateString(
      "en-GB"
    );

    const insertQuery = `
      INSERT INTO exams (
        ID,
        exam_name,
        exam_date,
        exam_professor
      ) VALUES (
        :id,
        :examName,
        TO_DATE(:examDate, 'DD-MM-YYYY'),
        :examProfessor
      )
    `;

    await connection.execute(insertQuery, {
      id: eventData.id,
      examName: eventData.examName,
      examDate: formattedDate,
      examProfessor: eventData.examProfessor,
    });

    await connection.commit();
    console.log("Exam data inserted successfully");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
