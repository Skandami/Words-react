import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error">
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p>Just like your second sock...</p>
        <Link to="/">Go to Home page</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
