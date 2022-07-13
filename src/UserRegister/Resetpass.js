import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import axios from 'axios';
const ResetPass = () => {
  const passwordRequest = {
    email: '',
    password: '',
    repeatpassword: '',
  };

  const [formData, setFormData] = useState(passwordRequest);
  const [header, setHeader] = useState('');
  const [confirmationHeader, setConfirmationHeader] = useState('');
  const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (
      formData.email === '' ||
      formData.password === '' ||
      formData.repeatpassword === ''
    ) {
      setHeader('check information for completetion');
    } else if (formData.password !== formData.repeatpassword) {
      setHeader('passwords must match');
    } else if (!regex.test(formData.password)) {
      setHeader('password must be 8 characters and include a number');
    } else {
      axios
        .put('https://razordispatchback.herokuapp.com/api/users', formData)
        .then((response) => {
          if (response.status === 200) {
            setConfirmationHeader(response.data);
            setFormData(passwordRequest);
          } else {
            console.warn(response.error.message);
          }
        })
        .catch((err) => {
          err = err.response.data.message;
          setHeader(err);
        });
    }
  };
  return (
    <>
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <nav aria-label='breadcrumb'>
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <NavLink to='/'>Return To Home Page</NavLink>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </nav>
        </MDBContainer>
      </MDBNavbar>
      <div className='container vh-100 bg-dark square rounded'>
        <h4 className='text-center mt-5 text-light'>
          {' '}
          RazorDispatch Password Reset
        </h4>
        <p className='text-center fs-3 text-uppercase text-success'>
          {confirmationHeader}
        </p>
        <div className='row mt-5 justify-content-center'>
          <div className='col-10'>
            <MDBValidation className='bg-white square rounded'>
              <h5 className='p-2 text-center mt-3'>{header}</h5>
              <MDBValidationItem
                className='p-2 col-md-8 mx-auto col mb-2'
                feedback='Please Enter a valid email address'
                invalid
              >
                <MDBInput
                  label='Email Address'
                  type='email'
                  name='email'
                  size='md'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                className='p-2 col-md-8 mx-auto col mb-2'
                feedback='At Least 8 digits plus a Number'
                invalid
              >
                <MDBInput
                  label='Password'
                  type='text'
                  name='password'
                  size='md'
                  value={formData.password}
                  minLength='8'
                  onChange={handleChange}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                className='p-2 col-md-8 mx-auto col'
                feedback='Passwords must match'
                invalid
              >
                <MDBInput
                  label='Repeat Password'
                  type='text'
                  name='repeatpassword'
                  size='md'
                  value={formData.repeatpassword}
                  onChange={handleChange}
                  required
                />
              </MDBValidationItem>
              <div className='d-grid p-3'>
                <MDBBtn type='submit' color='success' onClick={handleSubmit}>
                  Submit
                </MDBBtn>
              </div>
            </MDBValidation>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
