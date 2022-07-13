import React from "react";
import { Link } from "react-router-dom";
import { MDBFooter } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left mt-auto">
      <div className="text-center p-3">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <Link className="text-dark" to="/">
          Razor Dispatch
        </Link>
      </div>
    </MDBFooter>
  );
};

export default Footer;
