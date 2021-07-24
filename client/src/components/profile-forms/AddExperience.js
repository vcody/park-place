import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
      name: '',
      location: '',
      image: '',
      from: '',
      to: '',
    });

    const { name, location, from, to } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
    <Fragment>
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-tree"></i> Add any national park experiences you've had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
        e.preventDefault();

        addExperience(formData, history);
      }}>
        <div className="form-group">
          <input type="text" 
            placeholder="* Park name" 
            name="name" 
            value={name} 
            onChange={e => onChange(e)}
            required />
        </div>
        <div className="form-group">
          <input type="text" 
            placeholder=" * Location" 
            name="location" 
            value={location} 
            onChange={e => onChange(e)} 
            required />
        </div>

        { /* TODO: Add image for park... */ }

        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" 
            name="from" 
            value={from}
            onChange={e => onChange(e)}
            required />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" 
            name="to"
            onChange={e => onChange(e)}
            value={to} />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>   
    </Fragment>
    )
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
