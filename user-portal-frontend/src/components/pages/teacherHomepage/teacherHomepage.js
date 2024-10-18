import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";
import AddQuestionForm from "../../templates/AddQuestionForm/AddQuestionForm";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import { Drawer, Typography, AppBar, Toolbar, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import QuestionDetails from "../../templates/QuestionDetails/questionDetails";
import CreateTestForm from "../../templates/CreateTestForm/CreateTestForm";
import TestDetails from "../../templates/TestDetails/TestDetails";
import Homepage from "./homepage"

const drawerWidth = 200;
const appbarHeight = 64;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
  },
  drawerPaper: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
  },
  flex: {
    display: 'flex',
  },
  content: {
    margin: 'auto',
  },
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  appbar: {
    height: appbarHeight,
  },
}));

const TeacherHomepage = ({ user, getUserDetails }) => {
  const classes = useStyles();
  const [content, setContent] = useState(<Homepage/>);

  const menuList = [
    { title: 'Home', content: <Homepage/> },
    { title: 'Add Question', content: <AddQuestionForm /> },
    { title: 'Questions', content: <QuestionDetails /> },
    { title: 'Create Test', content: <CreateTestForm /> },
    { title: 'View Tests', content: <TestDetails /> },
  ];

  useEffect(() => {
    if (!user.isLoggedIn) {
      getUserDetails();
    }
  }, [user.isLoggedIn, getUserDetails]);

  if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
    return <Navigate to="/" />;
  }
  if (!user.isLoggedIn) {
    return <div></div>;
  }
  if (user.userDetails.type !== 'TEACHER') {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar elevation={0} className={classes.appbar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Homepage
          </Typography>
          <Typography variant="h6">
            Teacher: {user.userDetails.username}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.addHeight}></div>
      <div className={classes.flex}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          {/* Sidebar list */}
          <List>
            {menuList.map((item, index) => (
              <ListItem button key={index} onClick={() => setContent(item.content)}>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
            <ListItem>
              <LogoutButton />
            </ListItem>
          </List>
        </Drawer>
        <div className={classes.content}>
          <AlertBox />
          {content}
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  user: state.user,
});

export default connect(mapStatetoProps, { getUserDetails })(TeacherHomepage);
