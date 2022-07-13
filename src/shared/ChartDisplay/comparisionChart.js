import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import {
  MDBSpinner,
  MDBCardFooter,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { calculateProfit } from '../../redux/calculateTotals';
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComparison = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateProfit());
  });

  const { loadTotal, expenseTotal, loadTotalPrice, expenseTotalPrice, profit } =
    useSelector((state) => state.totals);

  // render if length is grether then 0
  if (loadTotal !== 0 || expenseTotal !== 0) {
    // loadTotals

    const data = {
      labels: ['$Loads', '$Expenses'],
      datasets: [
        {
          label: '# of Votes',
          data: [loadTotalPrice, expenseTotalPrice],
          backgroundColor: ['rgba(75, 192, 192)', 'rgba(255, 99, 132)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 3,
        },
      ],
    };
    return (
      <div className='row justify-content-center mb-4 shadow-2-strong'>
        <div className='col-md-6 col-12 mb-3 p-2'>
          <Pie
            data={data}
            width={300}
            height={250}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className='col mt-3 mb-2 align-self-center'>
          <MDBCard className='bg-light'>
            <MDBCardBody>
              <MDBCardTitle className='text-center'>
                <MDBIcon
                  fas
                  icon='file-invoice'
                  color='primary'
                  className='me-3 mb-2'
                />
                Summary
              </MDBCardTitle>
              <MDBCardText className='font-monospace fs-5'>
                <span className='d-grid gap-2 justify-content-center p-3 text-center border shadow-5 rounded-pill'>
                  {`Out of ${loadTotal} ${
                    loadTotal > 1 ? `Loads` : 'Load'
                  } You Made = $`}
                  {loadTotalPrice}
                </span>
                <span className='d-grid gap-2 justify-content-center p-3 text-center border mt-2 shadow-5 rounded-pill'>
                  {`Out of ${expenseTotal} ${
                    expenseTotal > 1 ? 'Expenses' : 'Expense'
                  } You Spent = $`}
                  {expenseTotalPrice}
                </span>
              </MDBCardText>
              <MDBCardFooter
                className={`fs-4 text-center border p-3 shadow-5 rounded-pill ${
                  profit >= 0 ? 'text-primary' : 'text-danger'
                } text-uppercase`}
              >
                {profit > 0
                  ? `Your Estimated total Profit = $${profit}`
                  : `Your Estimated total lost = $${profit}`}
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    );
  } else {
    return (
      <div className='text-center'>
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
        <h5>No info to display</h5>
      </div>
    );
  }
};

// export const ExpenseTotal = ExpenseTotal;
export default ChartComparison;
