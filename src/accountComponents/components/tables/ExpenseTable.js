import React from "react";
import ExpenseBreakdown from "./ExpenseBreakdown";
import { MDBSpinner } from "mdb-react-ui-kit";

const ExpenseTables = (props) => {
  const expenses = props.data;
 

  if (expenses) {
    const info = expenses.map((expense) => expense);
    
    return (
      <div className="row mt-3 mb-3">
        <ExpenseBreakdown data={info}/>
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

export default ExpenseTables;