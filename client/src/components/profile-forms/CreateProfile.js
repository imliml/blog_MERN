import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CreateProfile = (props) => {
  const [formData, setFormData] = useState({
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    bio: "",
    githubusername: "",
    skills: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    handle,
    company,
    website,
    location,
    status,
    bio,
    githubusername,
    skills,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="junior Developer">junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text"></small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text"></small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Bio"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text"></small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="github user name"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text"></small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text"></small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Handle"
            name="handle"
            value={handle}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text"></small>
        </div>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
