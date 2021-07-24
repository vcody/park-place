import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ 
    experience: { name, location, to, from}
}) => {
    return (
        <div>
            <h3 className="text-dark">
                {name}
            </h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> {!to ? '' : <Moment format='YYYY/MM/DD'>- {to}</Moment>}
            </p>
        </div>
    )
};

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
