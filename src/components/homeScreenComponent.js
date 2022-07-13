import React from 'react';
import Navigation from './navigationComponent';
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux/es/exports';
import Modal from '../shared/modal';

const Home = () => {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <div className='homePage vh-100'>
      <Navigation modal={isOpen && <Modal />} />
      <div className='container mt-5'>
        <div className='row mt-5'>
          <div className='col-12 text-center mt-md-5'>
            <MDBBtn
              rounded
              color='warning'
              className='font-monospace mt-md-5 top-50 translate-middle-y'
              size='lg'
              to='/'
            >
              {' '}
              <MDBIcon className='me-2' size='2x' fas icon='globe-americas' />
              Enter Demo Account
            </MDBBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
