import React from "react";
import LoadBreakdown from "./LoadBreakdown";
import { MDBSpinner } from "mdb-react-ui-kit";

const LoadTables = (props) => {
  const loads = props.data;

  if (loads) {
    const info = loads.map((load) => load);
    
    return (
      <div className="row mt-3 mb-3">
        <LoadBreakdown data={info}/>
      </div>
    );
  } else {
    return (
      <div className="container mt-5 text-center">
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }
};

export default LoadTables;

