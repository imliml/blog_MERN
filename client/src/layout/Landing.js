import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="display-3 mb-4">Developer Connector</h1>
          <p className="lead">
            {" "}
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <hr />
          <div className="buttons">
            <Link className="btn btn-lg btn-info mr-2" to="/register">
              Sign Up
            </Link>
            <Link className="btn btn-lg btn-light" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.protoTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
