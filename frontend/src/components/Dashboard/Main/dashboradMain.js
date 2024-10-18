import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { MainCard } from "../Card/card";
import TeacherImg from '../teacher.png';
import StudentImg from '../student.jfif';
import SubjectImg from '../subject.jfif';
import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";

const styles = {
  button: {
    backgroundColor: '#34aaca', 
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    
  },
  buttonHover: {
    backgroundColor: '#ffffff', // Lighter shade for hover effect
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
  },
  logoutBtn: {
    marginLeft: '80%',
  },
  headerMargin: {
    marginTop: 80,
  },
  inlineBlock: {
    display: 'inline-block',
  },
  linkBtn: {
    color: 'white',
  },
};

const DashboardMain = ({ classes, user, dashboardDetails, logoutUser, getAdminDetails, getDashboardCount }) => {
  const [expand, setExpand] = useState("none");
  const [onHover, setOnHover] = useState(false)


  useEffect(() => {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return;
    } else if (!user.isLoggedIn) {
      getAdminDetails();
    } else if (!dashboardDetails.retrived) {
      getDashboardCount();
    }
  }, [user.isLoggedIn, dashboardDetails.retrived, getAdminDetails, getDashboardCount]);

  const handleLogout = () => {
    logoutUser();
  };

  const handleTableExpand = (type) => {
    setExpand(prevExpand => (prevExpand === type ? "none" : type));
  };

  let tableComponent;
  if (expand === "Teacher") {
    tableComponent = <TeacherTable />;
  } else if (expand === "Student") {
    tableComponent = <StudentTable />;
  } else if (expand === "Subject") {
    tableComponent = <SubjectTable />;
  }

  if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <button style={{...styles.button, ...(onHover ? styles.buttonHover : {})}} onMouseEnter={() =>setOnHover(true)}  onMouseLeave={() => setOnHover(false)} onClick={handleLogout} className={classes.logoutBtn}>Logout</button>
      <br />
      <br/>
      <div style={{display:"flex", margin:"5px",padding:"10px",justifyContent:"space-between"}}>
        <div >
          <MainCard title='Teacher' value={dashboardDetails.teacherActive} total={dashboardDetails.teacherActive + dashboardDetails.teacherBlocked} image={TeacherImg} />
          <div className={classes.inlineBlock}>
            <button style={styles.button}>
              <Link to="/addTeacher" className={classes.linkBtn}>Add Teacher</Link>
            </button>
            <br />
            <br/>
            <button style={styles.button} onClick={() => handleTableExpand("Teacher")}>Show</button>
          </div>
        </div>

        <div >
          <MainCard title='Student' value={dashboardDetails.studentActive} total={dashboardDetails.studentActive + dashboardDetails.studentBlocked} image={StudentImg} />
          <button style={styles.button} onClick={() => handleTableExpand("Student")}>Show</button>
        </div>
        

        <div >
          <MainCard title='Subject' value={dashboardDetails.subjectActive} total={dashboardDetails.subjectActive + dashboardDetails.subjectBlocked} image={SubjectImg} />
          <div className={classes.inlineBlock}>
            <button style={styles.button}>
              <Link to="/addSubject" className={classes.linkBtn}>Add Subject</Link>
            </button>
            <br />
            <br/>
            <button style={styles.button} onClick={() => handleTableExpand("Subject")}>Show</button>
          </div>
        </div>
        
        <br />

        {tableComponent}
      </div>
    </div>
    
  );
};

const mapStateToProps = state => ({
  user: state.user,
  dashboardDetails: state.dashboardDetails,
});

export default withStyles(styles)(connect(mapStateToProps, {
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain));
