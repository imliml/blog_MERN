import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ setAlert, login, isAuthenticated }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  const onChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      email,
      password,
    };

    login(loginData);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    // <div className="login">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-8 m-auto">
    <Fragment>
      <h1 className="display- text-center">Login</h1>
      <p className="lead text-center">Login user</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form=group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-info btn-block mt-4" />
      </form>
    </Fragment>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
