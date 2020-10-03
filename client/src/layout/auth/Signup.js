import React, { useState } from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import PropTypes from "prop-types"


const Signup = ({history, setAlert, register}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger')
    }
    const userData = {
      name,
      email,
      password,
      password2,
    };
    console.log(userData)

    register(userData)
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
            <br />
            <p className="my-1">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};



export default connect(
    null,
    {setAlert, register}
)(Signup);
