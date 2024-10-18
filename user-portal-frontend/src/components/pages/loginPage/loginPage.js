import React, { useState } from 'react';
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AlertBox from '../../atoms/Alertbox/AlertBox';
import LoginForm from '../../templates/loginForm/loginForm';
import Auth from '../../../helper/Auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  main: {
    textAlign: 'center',
    paddingTop: '5%',
    margin: 'auto',
  },
}));

const LoginPage = ({ user }) => {
  const classes = useStyles();
  const [gotoStudentRegister, setGotoStudentRegister] = useState(false);

  const handleStudentRegisterClick = () => {
    setGotoStudentRegister(true);
  };

  if (gotoStudentRegister) {
    return <Navigate to="/studentRegisterPage" />;
  }
  if (user.isLoggedIn) {
    return user.userDetails.type === 'TEACHER' ? (
      <Navigate to="/homeTeacher" />
    ) : (
      <Navigate to="/homeStudent" />
    );
  } else if (Auth.retriveToken() && Auth.retriveToken() !== 'undefined') {
    return <Navigate to="/homeStudent" />;
  }

  return (
    <div>
      <AppBar elevation={0}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Login
          </Typography>
          <Button variant="contained" onClick={handleStudentRegisterClick}>
            Student Register
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.addHeight}></div>
      <div className={classes.main}>
        <AlertBox />
        <LoginForm />
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  user: state.user,
});

export default connect(mapStatetoProps)(LoginPage);
