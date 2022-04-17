import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <ul>
      <li>
        <Link to="/">Live Visitors</Link>
      </li>
      <li>
        <Link to="/publicChat">Public Chat Room</Link>
      </li>
    </ul>
  );
}

export default Header;
