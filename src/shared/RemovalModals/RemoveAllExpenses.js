import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/auth-context';
import { removeAllExpenses } from '../../redux/loadInfoReducer';
import {
  removeExpensesOpenModal,
  removeExpensesCloseModal,
} from '../../redux/removeExpensesReducer';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBIcon,
} from 'mdb-react-ui-kit';

const RemoveAllExpenses = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(removeExpensesOpenModal());
  };

  const noModal = () => {
    dispatch(removeExpensesCloseModal());
  };

  const removeHandler = () => {
    setIsLoading(true);
    dispatch(removeAllExpenses({ id: auth.userid, key: auth.token }));
    setTimeout(() => {
      noModal();
      window.location.reload();
    }, 1000);
  };

  if (!isLoading) {
    return (
      <MDBModal show={() => showModal} onHide={noModal} tabIndex='-1'>
        <MDBModalDialog centered size='lg'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className='text-danger fw-bold'>
                removing ALL Expenses
              </MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='danger'
                onClick={noModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='text-center text-danger fw-bold font-monospace'>
              <h3 className='text-uppercase'>Important!!!</h3>
              <hr />
              <p>
                If you have not yet done so we recommend exporting your data, as
                this will delete all of your saved Expenses
              </p>
              <p>
                Once deleted informaton is not retrievable, also you can
                navigate to the Report tables to remove Expenses individually.
              </p>
              <MDBSpinner color='danger'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>
            </MDBModalBody>

            <MDBModalFooter className='justify-content-center'>
              <MDBBtn
                color='danger'
                onClick={removeHandler}
                className='mx-5 btn-sm'
              >
                remove ALL
              </MDBBtn>
              <MDBBtn color='primary' className='mx-5 btn-sm' onClick={noModal}>
                close
              </MDBBtn>
            </MDBModalFooter>
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
                Deleting All Expenses Data
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

export default RemoveAllExpenses;
