
import React from "react";
import { Link } from "react-router-dom";
import logo from '../logo.png';
import './logo.css';

const BaseLayout = (props) => {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/"> <img className="logo-img" src={logo} alt="" /> </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
                
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/class">Class</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/analytics">Analytics</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {props.children}
    </>
  );
};

export default BaseLayout;