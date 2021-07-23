import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const Experience = ({ experience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.name}</td>
            <td className="hide-sm">{exp.location}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> {
                    exp.to === null ? ('') : (<Moment format='YYYY/MM/DD'>- {exp.to}</Moment>) 
                }
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { experiences }
                </tbody>
            </table>
        </Fragment>
    )
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
};

export default Experience;
