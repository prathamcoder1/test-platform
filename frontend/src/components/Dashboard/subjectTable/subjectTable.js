import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { getSubjectDetails, SubjectToggleStatus } from "../../../redux/actions/subjectDetails";
import './subjectTable.css';

const SubjectTable = ({ subjects, getSubjectDetails, SubjectToggleStatus }) => {
  
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
    if (!subjects.retrived) {
      getSubjectDetails();
    }
  }, [subjects.retrived, getSubjectDetails]);

  const handleStatusChange = useCallback((status, id) => {
    SubjectToggleStatus(status, id, getSubjectDetails);
  }, [SubjectToggleStatus, getSubjectDetails]);

  const buttonTextBasedOnStatus = (status) => (status ? "block" : "unblock");

  if (!subjects.retrived) {
    return <div>Collecting data</div>;
  }

  return (
    <div className="main">
      <h2 className="title">Subjects</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.list.map((val) => (
            <tr key={val.id}>
              <td>{val.subject}</td>
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
  subjects: state.subjects,
});

export default connect(mapStateToProps, {
  getSubjectDetails,
  SubjectToggleStatus,
})(SubjectTable);
