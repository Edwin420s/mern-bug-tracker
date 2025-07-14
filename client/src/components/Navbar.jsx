import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Bug List</Link>
        </li>
        <li>
          <Link to="/add-bug">Add Bug</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;