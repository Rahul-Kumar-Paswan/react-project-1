import React from "react";
import "../App.css";
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/upload">Upload</Link>
      {/* <button onClick={() => setShowLinks(!showLinks)}>
          <ReorderIcon />
        </button> */}
    </div>
  );
}
