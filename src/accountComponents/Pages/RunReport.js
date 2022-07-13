import React, { useState, useContext, useEffect } from 'react';
import { openModal } from '../../redux/modalReducer';
import { useDispatch, useSelector } from 'react-redux';
import LoadModal from '../../shared/loadModal';
import ExpenseModal from '../../shared/expenseModal';
import { AuthContext } from '../../shared/context/auth-context';
import UserExpenses from './ReportCards/expenseReports/expenseReport';
import UserTotalExpenses from './ReportCards/expenseReports/expenseTotal';
import UserLoads from './ReportCards/loadReports/loadReport';
import TotalUserLoads from './ReportCards/loadReports/loadTotal';
import axios from 'axios';
import { MDBCard, MDBCardHeader, MDBBtn } from 'mdb-react-ui-kit';
import { loadTotal, expenseTotal } from '../../redux/calculateTotals';

const RunReport = (props) => {
  const [displayOne, setDisplayOne] = useState('d-none');
  const [displayTwo, setDisplayTwo] = useState('d-none');
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://3.86.25.200/api/loads/user/${props.data.uid}`,
      headers: {
        Authorization: 'Bearer' + props.data.data,
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        console.clear(err);
      })
      .then((load) => {
        dispatch(loadTotal(load.data));
      })
      .catch((err) => {
        console.clear(err);
      });
    axios({
      method: 'GET',
      url: `http://3.86.25.200/api/expenses/user/${props.data.uid}`,
      headers: {
        Authorization: 'Bearer' + props.data.data,
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        console.clear(err);
      })
      .then((expense) => {
        dispatch(expenseTotal(expense.data));
      })
      .catch((err) => {
        console.warn('Not enough information to calculate data');
      });
  }, [dispatch, props.data.data, props.data.uid]);

  return (
    <div className='container mt-4 mb-5 p-3 shadow-5-strong bg-info rounded'>
      <div className={displayOne}> {isOpen && <LoadModal />}</div>
      <div className={displayTwo}> {isOpen && <ExpenseModal />}</div>

      {auth.isLoggedIn && (
        <div className='row align-items-center mx-auto'>
          <div className='col-md-4 col mb-2'>
            <UserLoads data={auth} />
          </div>
          <div className='col order-first mb-3 order-md-last'>
            <MDBCard>
              <MDBCardHeader className='text-end'>
                <MDBBtn
                  color='success'
                  type='button'
                  onClick={() => {
                    setDisplayTwo('d-none');
                    setDisplayOne('d-block');

                    dispatch(openModal());
                  }}
                >
                  Submit Load
                </MDBBtn>
              </MDBCardHeader>

              <TotalUserLoads data={auth} />
            </MDBCard>
          </div>
        </div>
      )}
      {auth.isLoggedIn && (
        <div className='row align-items-center mx-auto mt-2'>
          <div className='col-md-4 col mb-3'>
            <UserExpenses data={auth} />
          </div>
          <div className='col order-first mb-3'>
            <MDBCard>
              <MDBCardHeader className='text-end'>
                <MDBBtn
                  color='danger'
                  onClick={() => {
                    setDisplayOne('d-none');
                    setDisplayTwo('d-block');
                    dispatch(openModal());
                  }}
                >
                  Submit Expense
                </MDBBtn>
              </MDBCardHeader>
              <UserTotalExpenses data={auth} />
            </MDBCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default RunReport;
