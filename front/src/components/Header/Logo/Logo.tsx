import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <span>
        <Link to="/">memories</Link>
      </span>
    </div>
  );
};

export default Logo;
