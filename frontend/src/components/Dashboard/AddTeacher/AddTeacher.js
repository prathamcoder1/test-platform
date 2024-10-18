import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import "./AddTeacher.css";
import axios from "axios";
import apis from "../../../services/Apis";

const AddTeacher = ({ user, getAdminDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { name, email, password, confirmpassword } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (confirmpassword !== password) {
      Alert('error', 'Invalid Input', 'Confirm Password does not match');
      return;
    }

    try {
      const response = await axios.post(apis.BASE + apis.ADD_TEACHER, {
        username: name,
        email,
        password,
      }, {
        headers: {
          'Authorization': `Bearer ${Auth.retriveToken()}`,
        },
      });

      if (response.data.success) {
        Alert('info', 'Success', response.data.message);
        setFormData({ name: "", email: "", password: "", confirmpassword: "" }); // Reset form
      } else {
        Alert('error', 'Failed', response.data.message);
      }
    } catch (error) {
      Alert('error', 'Error', 'Something went wrong');
    }
  };

  const styles={backgroundColor:"white",border:"black 1px solid"}

  useEffect(() => {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return <Navigate to='/' />;
    } else if (!user.isLoggedIn) {
      getAdminDetails();
    }
  }, [user, getAdminDetails]);

  return (
    <div className="add-teacher-container">
      <form onSubmit={handleSubmit} className="form-class">
        <h2 style={{fontSize:"30px"}}>Add Teacher</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
            style={styles}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            style={styles}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            style={styles}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={handleChange}
            required
            style={styles}
          />
        </div>
        <div className="handleSubmit">
          <button type="submit" className="submit-button">Add Teacher</button>
          <Link className="linkbtn" to="/home">
            <button type="button" className="back-button">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAdminDetails,
})(AddTeacher);
