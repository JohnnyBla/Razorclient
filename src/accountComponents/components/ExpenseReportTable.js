import React, { useState, useEffect } from 'react';
import AccountNavigation from '../accountNavigation';
import axios from 'axios';
import ExpenseTables from './tables/ExpenseTable';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';

const ExpenseReport = (props) => {
  const [userExpense, setUserExpense] = useState();

  const userId = props.uid;
  const userMessage = props.data;
  const userExpenseUrl = `http://3.86.25.200/api/expenses/user/${userId}`;

  useEffect(() => {
    try {
      axios({
        method: 'GET',
        url: userExpenseUrl,
        headers: {
          Authorization: 'Bearer ' + userMessage,
          'Content-Type': 'application/json',
        },
      })
        .catch((error) => {
          console.clear(error);
        })
        .then((response) => {
          const ExpenseInfo = response.data;
          setUserExpense(ExpenseInfo);
        })
        .catch((err) => console.warn('no expenses to display'));
    } catch (err) {
      throw err;
    }
  }, [userExpenseUrl, userMessage]);
  return (
    <div>
      <div className='bg-info'>
        <nav className='square border-bottom border-dark shadow-4-strong'>
          <MDBNavbar
            light
            bgColor='primary'
            className='square border-bottom border-dark'
          >
            <MDBContainer fluid>
              <MDBNavbarBrand className='ms-auto'>
                <img
                  src={require('../../Images/ReportTables.png')}
                  alt='logo'
                  loading='lazy'
                  className='img-fluid'
                  style={{ width: '100%', height: '30px' }}
                />
              </MDBNavbarBrand>
            </MDBContainer>
          </MDBNavbar>
          <AccountNavigation />
        </nav>
      </div>
      <div className='container'>
        <ExpenseTables data={userExpense} />
      </div>
    </div>
  );
};

export default ExpenseReport;
