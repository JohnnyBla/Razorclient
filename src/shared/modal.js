import React, { useState } from 'react';
import RegistrationForm from './Forms/registerForm';
import LoginForm from './Forms/signInFrom';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../redux/modalReducer';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';

const Modal = () => {
  const dispatch = useDispatch();

  // function to open modal
  const showModal = () => {
    dispatch(openModal());
  };

  // function to close modal
  const noModal = () => {
    dispatch(closeModal());
  };

  // set fill for pills Login and Register
  const [fillActive, setFillActive] = useState('tab1');
  const handleFillClick = (value: string) => {
    if (value === fillActive) {
      return;
    }
    setFillActive(value);
  };

  return (
    <MDBModal staticBackdrop show={() => showModal} tabIndex='-1'>
      <MDBModalDialog size='lg'>
        <MDBModalContent className='modalBackground'>
          <MDBModalTitle className='container p-3'>
            <div className='d-flex col justify-content-end'>
              <MDBBtn
                className='btn-close btn-sm '
                color='none'
                onClick={noModal}
                type='button'
              ></MDBBtn>
            </div>

            <MDBTabs pills fill>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleFillClick('tab1')}
                  active={fillActive === 'tab1'}
                >
                  Login
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleFillClick('tab2')}
                  active={fillActive === 'tab2'}
                >
                  Register
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
          </MDBModalTitle>
          <MDBTabsContent>
            <MDBTabsPane show={fillActive === 'tab1'}>
              <div className='container'>
                <div className='row mx-auto'>
                  <div className='mt-3 mb-2 text-center text-uppercase fw-bold font-monospace'>
                    Login:
                  </div>
                </div>
                {/* Login form */}
                <LoginForm />
              </div>
            </MDBTabsPane>
            <MDBTabsPane show={fillActive === 'tab2'}>
              <div className='container'>
                <div className='row text-center'>
                  <div className='mt-2 mb-2'>Register:</div>
                </div>
                {/* registration form */}
                <RegistrationForm />
              </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default Modal;
