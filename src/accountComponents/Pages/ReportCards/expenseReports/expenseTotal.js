import React from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import RemoveAllExpenses from '../../../../shared/RemovalModals/RemoveAllExpenses';
import { removeExpensesOpenModal } from '../../../../redux/removeExpensesReducer';
import {
  MDBBtn,
  MDBCardBody,
  MDBCardText,
  MDBCardFooter,
} from 'mdb-react-ui-kit';

const UserTotalExpenses = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.removeExpense);
  const total = useSelector((state) => state.totals.expenseTotal);

  return (
    <>
      <MDBCardBody>
        <div>{isOpen && <RemoveAllExpenses />}</div>
        <MDBCardText className='text-center' tag='div'>
          <div className='fs-2'>
            {' '}
            {total !== 0
              ? `Total Expense Reports: ${total}`
              : `No Expense to Display`}
          </div>
        </MDBCardText>
      </MDBCardBody>
      <MDBCardFooter className='d-grid'>
        <MDBBtn
          color='danger'
          onClick={() => dispatch(removeExpensesOpenModal())}
        >
          Remove All Expenses
        </MDBBtn>
      </MDBCardFooter>
    </>
  );
};

export default UserTotalExpenses;
