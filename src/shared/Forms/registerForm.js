import React, { useState } from 'react';
import axios from 'axios';
import { usersUrl } from '../urls/urls';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalReducer';
import { MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState(``);
  const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    if (!regex.test(data.password)) {
      setHeader(
        'Password needs to be at least 8 digits long and include a number'
      );
      return;
    } else {
      await axios
        .post(usersUrl, data)
        .catch((err) => {
          console.log(err.response.data.message);
          err = err.response.data.message;
          setHeader(err);
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(true);
            setHeader(response.data.status);
            setTimeout(() => {
              setIsLoading(false);
              dispatch(closeModal());
            }, 2000);
          } else {
            setHeader('username in use');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (isLoading) {
    return (
      <div className='text-center m-3'>
        <h5 className='text-success m-2'>{header}</h5>
        <MDBSpinner role='status' color='info'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row px-2 mb-3'>
            <div className='col-12'>
              <input
                {...register('username', { required: 'Username is required' })}
                className='form-control'
                type='text'
                placeholder='Username'
              />
              <span className='text-warning'>{errors.username?.message}</span>
            </div>
          </div>
          <div className='row px-2 mb-3'>
            <div className='col-12'>
              <input
                {...register('email', {
                  required: 'Email address is required',
                })}
                className='form-control'
                type='email'
                placeholder='email@email.com'
                label='email'
              />
              <span className='text-warning'> {errors.email?.message} </span>
            </div>
          </div>
          <div className='row px-2 mb-3'>
            <div className='col-12'>
              <input
                {...register('firstname')}
                className='form-control'
                type='text'
                placeholder='First Name'
                label='firstName'
              />
            </div>
          </div>
          <div className='row px-2 mb-3'>
            <div className='col-12'>
              <input
                {...register('lastname')}
                className='form-control'
                type='text'
                placeholder='Last Name'
                label='lastname'
              />
            </div>
          </div>
          <div className='row px-2 mb-3'>
            <div className='col-12'>
              <input
                {...register(
                  'password',
                  {
                    required: 'Password is required',
                  },
                  { minLength: 8 }
                )}
                className='form-control'
                type='text'
                placeholder='Enter Password'
                label='Password'
              />
              <span className='text-warning'>{errors.password?.message}</span>
            </div>
          </div>
          <div className='row px-2 mb-4 mt-1'>
            <div className='col-12'>
              <input
                {...register('repeatpassword', {
                  required: 'Please Confirm Password',
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return password === value || 'Passwords should match!';
                    },
                  },
                })}
                className='form-control'
                type='text'
                placeholder='Confirm Password'
              />
              {errors.repeatpassword && (
                <span className='text-warning'>
                  {errors.repeatpassword.message}
                </span>
              )}
            </div>
          </div>
          <p className='text-center text-danger text-uppercase fw-bold'>
            {header}
          </p>

          <div className='row p-4'>
            <MDBBtn type='submit'>Register</MDBBtn>
          </div>
        </form>
      </>
    );
  }
};

export default RegistrationForm;
