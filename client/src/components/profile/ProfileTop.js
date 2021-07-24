import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({ profile: {
    status,
    location,
    social,
    user: { name, avatar } 
} }) => {
    return (
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 className="large">{name}</h1>
          <p className="lead">{status}</p>
          <p>{location && <span>{location}</span>}</p>
          <div className="icons my-1">
            {
               social && 
               social.twitter &&
            (
            <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </Link>
            )}
            {
                social &&
                social.facebook &&
            (
            <Link to={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </Link>
            )}
            {
                social &&
                social.instagram && 
            (
            <Link to="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </Link>
            )}
          </div>
        </div>
    )
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileTop;
