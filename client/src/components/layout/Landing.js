import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">ParkPlace</h1>
          <p className="lead">
            Learn about national parks, record your outdoor memories, and meet fellow outdoors enthusiasts
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing;