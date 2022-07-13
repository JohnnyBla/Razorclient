import React from 'react';
import { useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardText,
  MDBCardFooter,
} from 'mdb-react-ui-kit';

export const UserExpenses = () => {
  const total = useSelector((state) => state.totals.expenseTotalPrice);

  return (
    <MDBCard alignment='center' className='bg-danger fw-bold text-uppercase'>
      <MDBCardHeader>Expense Totals</MDBCardHeader>
      <MDBCardBody>
        <MDBCardText>${total}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter>{`${new Date().toLocaleString()}`}</MDBCardFooter>
    </MDBCard>
  );
};

export default UserExpenses;
