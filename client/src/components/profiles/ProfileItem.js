import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: {
    user: { _id, name, avatar },
    status,
    location,
    interests
}}) => {
    return (
        <div className="profile bg-light">
            <img className="round-img" src={avatar} alt="" />
            <div>
                <h2>{name}</h2>
                <p>{status}</p>
                <p className="my-1"> {location && <span><i className="fas fa-location-arrow"></i>{' ' + location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                { interests.slice(0, 4).map((interest, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check-circle"></i> {interest}
                    </li>
                )) }
            </ul>
        </div>
    )
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
