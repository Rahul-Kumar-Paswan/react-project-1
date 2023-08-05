import React, { useState } from "react";
import "../App.css";
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="Navbar">
      <div className="leftside">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <button onClick={() => setShowLinks(!showLinks)}>
          <ReorderIcon />
        </button>
      </div>
      <div className="rightside">
        <input type="text" placeholder="Search.."></input>
        <button>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
