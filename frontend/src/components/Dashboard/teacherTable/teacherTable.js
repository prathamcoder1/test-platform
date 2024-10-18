import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTeacherDetails, TeacherToggleStatus } from "../../../redux/actions/teacherDetails";
import './teacherTable.css';

const TeacherTable = ({ teachers, getTeacherDetails, TeacherToggleStatus }) => {
  
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
    if (!teachers.retrived) {
      getTeacherDetails();
    }
  }, [teachers.retrived, getTeacherDetails]);

  const handleStatusChange = (status, id) => {
    TeacherToggleStatus(status, id, getTeacherDetails);
  };

  const buttonTextBasedOnStatus = (status) => {
    return status ? "block" : "unblock";
  };

  if (!teachers.retrived) {
    return <div>Collecting data...</div>;
  }

  return (
    <div className="main" >
      <h2 className="title">Teachers</h2>
      <table>
        <thead>
          <tr>
            <th>{"Name  "}</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.list.map((val) => (
            <tr key={val.id}>
              <td>{`${val.name}`}</td>
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
  teachers: state.teachers,
});

export default connect(mapStateToProps, {
  getTeacherDetails,
  TeacherToggleStatus,
})(TeacherTable);
