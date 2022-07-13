import React from 'react';
import { useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardText,
  MDBCardFooter,
} from 'mdb-react-ui-kit';

export const UserLoads = () => {
  const TotalPrice = useSelector((state) => state.totals.loadTotalPrice);

  return (
    <MDBCard alignment='center' className='bg-success fw-bold text-uppercase'>
      <MDBCardHeader>Load Totals</MDBCardHeader>
      <MDBCardBody>
        <MDBCardText>${TotalPrice}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter>{`${new Date().toLocaleString()}`}</MDBCardFooter>
    </MDBCard>
  );
};

export default UserLoads;
