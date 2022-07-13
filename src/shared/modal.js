import React, { useState } from 'react';
import RegistrationForm from './Forms/registerForm';
import LoginForm from './Forms/signInFrom';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../redux/modalReducer';
import axios from 'axios';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBIcon,
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
  const googleLogin = () => {
    axios({
      method: 'get',
      url: 'http://3.86.25.200/api/users/google/token',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => console.log(err));
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
                <div className='row mx-auto text-center'>
                  <div className='col'>
                    <p className='text-center fw-bold text-uppercase font-monospace'>
                      Sign In With:
                    </p>

                    <MDBBtn
                      size='lg'
                      floating
                      style={{ backgroundColor: '#dd4b39' }}
                      href='#'
                      type='button'
                      onClick={googleLogin}
                    >
                      <MDBIcon fab icon='google' />
                    </MDBBtn>
                  </div>
                </div>
              </div>
              <div className='container'>
                <div className='row mx-auto'>
                  <div className='mt-3 mb-2 text-center text-uppercase fw-bold font-monospace'>
                    or:
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
