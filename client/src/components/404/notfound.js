import React from "react";
import { Link } from "react-router-dom";
import error from "../../images/ghost404.svg";
export default () => {
  return (
    <div>
      <div className="container">
        <div className="card card-custom">
          <div className=" card-body wrapper-img text-center">
            <img
              src={error}
              alt=""
              style={{ width: "400px", height: "400px" }}
            />
            <h4 className="text-center text-info">
              {" "}
              Oops SORRY THIS PAGE IS NOT REAL....
            </h4>
            <Link to="/"> Go Back </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
