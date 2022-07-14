import React, { useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import Navigation from './navigationComponent';
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux/es/exports';
import Modal from '../shared/modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../shared/urls/urls';

const Home = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const data = {
    username: 'test',
    password: 'tester1234',
  };

  const testLogin = () => {
    axios
      .post(userLogin, data)
      .catch((error) => console.clear(error))
      .then((res) => {
        if (res.status === 200) {
          auth.login(
            res.data.username,
            res.data.token,
            res.data.status,
            res.data.userid
          );
          navigate('/dashboard');
        } else {
          console.warn('network Error');
        }
      });
  };
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
              onClick={testLogin}
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
