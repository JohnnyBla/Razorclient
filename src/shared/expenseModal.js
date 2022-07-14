import React, { useState, useContext } from 'react';
import { AuthContext } from './context/auth-context';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBInput,
  MDBModalFooter,
  MDBModalBody,
  MDBModalTitle,
  MDBModalHeader,
  MDBIcon,
  MDBValidation,
  MDBValidationItem,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { submitExpense } from '../redux/loadInfoReducer';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/modalReducer';

const ExpenseModal = (props) => {
  const dispatch = useDispatch();
  const expenseInfo = useSelector(
    (state) => state.loadDetail.loadDetail.expenses
  );

  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState(expenseInfo);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useContext(AuthContext);

  // function to open modal
  const showModal = () => {
    dispatch(openModal());
  };

  // function to close modal
  const noModal = () => {
    dispatch(closeModal());
  };

  // handle form submission
  const expenseInformationHandlers = () => {
    if (
      (formData.fuelPrice === false) &
      (formData.Repairs === false) &
      (formData.RoomAndBoard === false) &
      (formData.Misc === false)
    ) {
      setFeedback(
        'There are no expenses to report...\n\n Please close me or enter at least one price'
      );
    } else {
      setIsLoading(true);
      dispatch(submitExpense(formData));
      setTimeout(() => {
        setIsLoading(!isLoading);
        dispatch(closeModal());
        window.location.reload();
      }, 2000);
    }
  };

  const expenseInformationOnChange = (e) => {
    e.preventDefault();
    const data = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: Number(data),
      user: auth.userid,
      token: auth.token,
    });
    setFeedback('');
  };
  if (!isLoading) {
    return (
      <MDBModal show={() => showModal} onHide={noModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <MDBIcon icon='gas-pump' color='danger' className='mx-2' />
                Submit Expense Information
              </MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='danger'
                onClick={noModal}
                type='button'
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBValidation onSubmit={expenseInformationHandlers}>
                <div className='row px-2 mb-4'>
                  <div className='col-12'>
                    <MDBValidationItem feedback='enter a Price'>
                      <MDBInput
                        label='Fuel Price'
                        type='number'
                        name='fuelPrice'
                        step='.000001'
                        onChange={expenseInformationOnChange}
                        value={formData.fuelPrice}
                      />
                    </MDBValidationItem>
                  </div>
                </div>
                <div className='row px-2 mb-4'>
                  <div className='col-12'>
                    <MDBValidationItem feedback='enter a price'>
                      <MDBInput
                        name='Repairs'
                        label='Repairs'
                        type='number'
                        step='.000001'
                        onChange={expenseInformationOnChange}
                        value={formData.Repairs}
                      />
                    </MDBValidationItem>
                  </div>
                </div>
                <div className='row px-2 mb-4'>
                  <div className='col-12'>
                    <MDBValidationItem feedback='enter a price'>
                      <MDBInput
                        name='RoomAndBoard'
                        label='Room and Board'
                        type='number'
                        step='.000001'
                        onChange={expenseInformationOnChange}
                        value={formData.RoomAndBoard}
                      />
                    </MDBValidationItem>
                  </div>
                </div>
                <div className='row px-2 mb-4'>
                  <div className='col-12'>
                    <MDBValidationItem feedback='enter a price'>
                      <MDBInput
                        name='Misc'
                        label='Miscellaneous'
                        type='number'
                        step='.000001'
                        onChange={expenseInformationOnChange}
                        value={formData.Misc}
                      />
                    </MDBValidationItem>
                  </div>
                </div>
                <MDBModalFooter>
                  <div className='col-12 d-flex justify-content-center'>
                    <MDBValidationItem invalid>
                      <p className='font-monospace text-danger text-uppercase'>
                        {feedback}
                      </p>
                    </MDBValidationItem>
                  </div>

                  <div className='col-12 d-grid'>
                    <MDBBtn color='danger' type='submit'>
                      Submit Expense
                    </MDBBtn>
                  </div>
                </MDBModalFooter>
              </MDBValidation>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  } else {
    return (
      <MDBModal
        show={() => showModal}
        onHide={noModal}
        tabIndex='-1'
        className='text-center'
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <MDBIcon icon='gas-pump' color='success' className='mx-4' />
                {isLoading ? 'Saving Information' : 'Getting Information'}
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBSpinner role='status'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  }
};

export default ExpenseModal;
