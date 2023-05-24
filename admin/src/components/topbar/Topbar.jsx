import React from "react";
import "./topbar.css";
import { HomeTwoTone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
          <Link to="/" className="link">
            <HomeTwoTone />
            </Link>
            
          </div>
          <div className="topbarIconContainer">
          <Link to="/products" className="link">
            <Language />
            </Link>
            
          </div>
          <div className="topbarIconContainer">
          <Link to="/users" className="link">
            <Settings />
            </Link>
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
