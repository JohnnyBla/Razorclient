import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLogin } from '../urls/urls';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../redux/modalReducer';

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState('usernames are case sensitive');
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await axios
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
          dispatch(closeModal());
          navigate('/dashboard');
        } else {
          setError('Login Failed');
        }
      })
      .catch((error) => {
        setError('Login Failed');
        setCount(count + 1);
        if (count === 3) {
          const Attempts = count - 1;
          setError(
            `You will be redirected in ${Attempts} more attempts Click on Forgot Password if you Need assistance`
          );
        }
        if (count === 4) {
          setError('Please Reset Password');
        }
        if (count === 5) {
          navigate('/rdpassreset');
          dispatch(closeModal());
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row mb-2 px-2 justify-content-center'>
          <div className='col-10'>
            <input
              className='form-control'
              type='text'
              {...register('username', {
                required: 'Please Enter Username!',
              })}
              placeholder='username'
              aria-label='default input example'
            />
            <p className='text-danger'>{errors.username?.message}</p>
          </div>
        </div>
        <div className='row px-2 mb-3 justify-content-center'>
          <div className='col-10 mb-2'>
            <input
              {...register('password', {
                required: 'Please Enter Password!',
              })}
              className='form-control'
              type='password'
              placeholder='password'
              aria-label='default input example'
            />
            <p className='text-danger'>{errors.password?.message}</p>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='d-grid mb-5 col-10'>
            <button className='btn btn-primary' type='submit'>
              Submit
            </button>
          </div>
        </div>
        <p className='text-center text-danger fw-bold'>{error}</p>

        <a href='/rdpassreset'>
          {' '}
          <p className='text-center text-primary text-uppercase fw-bold'>
            Forgot Password?
          </p>
        </a>
      </form>
    </>
  );
};

export default LoginPage;

//
