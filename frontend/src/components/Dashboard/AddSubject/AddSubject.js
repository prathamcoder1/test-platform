import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import axios from "axios";
import apis from "../../../services/Apis";
import "./AddSubject.css"

const AddSubject = ({ user, getAdminDetails }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(apis.BASE + apis.ADD_SUBJECT, {
        name,
      }, {
        headers: {
          'Authorization': `Bearer ${Auth.retriveToken()}`,
        },
      });

      if (response.data.success) {
        Alert('info', 'Success', response.data.message);
        setName(""); // Reset input after successful submission
      } else {
        Alert('error', 'Failed', response.data.message);
      }
    } catch (error) {
      Alert('error', 'Error', 'Something went wrong');
    }
  };

  useEffect(() => {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return <Navigate to='/' />;
    } else if (!user.isLoggedIn) {
      getAdminDetails();
    }
  }, [user, getAdminDetails]);

  const styles={backgroundColor:"white",border:"black 1px solid"}


  return (
    <form onSubmit={handleSubmit} className="form-class">
      <h2 style={{color:"black",fontSize:"30px"}}>Add Subject</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          required
          style={styles}
        />
      </div>
      
      <div style={{display:"flex", justifyContent:"space-around"}}>
        <button type="submit">Add Subject</button>
        <button>
          <Link className="linkbtn" to='/home'>Back</Link>
        </button>
      </div>
      
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAdminDetails,
})(AddSubject);
