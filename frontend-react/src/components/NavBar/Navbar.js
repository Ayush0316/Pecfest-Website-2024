// NavBar.jsx
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
// import 
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.linksLeft}>
        <NavLink  to="/AboutUs">About</NavLink>
        <NavLink  to="#about">Developers</NavLink>
        <NavLink  to="#competitions">Competitions</NavLink>

        <NavLink  to="/events">Events</NavLink>
        <NavLink  to="/sponsors">Sponsors</NavLink>

      </div>
      <img src="logo.png" alt="Logo" className={styles.logo} /> {/* Update with your logo path */}
      <div className={styles.linksRight}>
      
        <NavLink  to="#schedule">Schedule</NavLink>
        <NavLink  to="/team">Team</NavLink>
        <NavLink  to="/gallery">Gallery</NavLink>
        <NavLink to="#brochure">Brochure</NavLink>
        <NavLink to="#contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
      <nav className={`${isOpen ? styles.mini : styles.miniNav}`}>
        <img src="logo.png" alt="Logo" className={styles.img} />
        {isOpen ? (
          <></>
        ) : (<button onClick={toggleMenu} className={styles.hamburger}>
          ☰
        </button>
        )}

        <div className={`${isOpen ? styles.active : styles.links}`} >
          <button onClick={toggleMenu} className={styles.hamburg}>
            ×
          </button>
          <NavLink onClick={toggleMenu} to="/AboutUs">About</NavLink>
          <NavLink onClick={toggleMenu} to="#about">Developers</NavLink>
          <NavLink onClick={toggleMenu} to="#competitions">Competitions</NavLink>
          <NavLink onClick={toggleMenu} to="/events">Events</NavLink>
          <NavLink onClick={toggleMenu} to="/sponsors">Sponsors</NavLink>
          <NavLink onClick={toggleMenu} to="#schedule">Schedule</NavLink>
          <NavLink onClick={toggleMenu} to="/team">Team</NavLink>
          <NavLink onClick={toggleMenu} to="/gallery">Gallery</NavLink>
          <NavLink onClick={toggleMenu} to="#brochure">Brochure</NavLink>
          <NavLink onClick={toggleMenu} to="#contact">Contact</NavLink>
          <NavLink onClick={toggleMenu} to="/login">Login</NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
