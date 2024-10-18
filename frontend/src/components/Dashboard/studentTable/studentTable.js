import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStudentDetails, StudentToggleStatus } from "../../../redux/actions/studentDetails";
import './studentTable.css';

const StudentTable = ({ students, getStudentDetails, StudentToggleStatus }) => {

  const styles = {
    button: {
      backgroundColor: '#34aaca', 
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      padding: '5px 8px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      margin:"10px"
      
    }
  }

  useEffect(() => {
    if (!students.retrived) {
      getStudentDetails();
    }
  }, [students.retrived, getStudentDetails]);

  const handleStatusChange = (status, id) => {
    StudentToggleStatus(status, id, getStudentDetails);
  };

  const buttonTextBasedOnStatus = (status) => {
    return status ? "block" : "unblock";
  };

  if (!students.retrived) {
    return <div>Collecting data...</div>;
  }

  return (
    <div className="main" style={{border:"white 1px solid"}} >
      <h2 className="title">Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.list.map((val) => (
            <tr key={val.id} style={{}}>
              <td>{val.name}</td>
              <td>{val.status.toString()}</td>
              <td>
                <button style={styles.button} onClick={() => handleStatusChange(val.status, val.id)}>
                  {buttonTextBasedOnStatus(val.status)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps, {
  getStudentDetails,
  StudentToggleStatus,
})(StudentTable);
