import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../shared/context/auth-context';
import { openModal } from '../redux/modalReducer';

import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
} from 'mdb-react-ui-kit';

const Navigation = (props) => {
  const [showNavText, setShowNavText] = useState(false);
  const dispatch = useDispatch();

  const activeStyle = {
    color: 'red',
  };
  const notActiveStyle = {
    textDecoration: 'none',
    color: 'black',
  };
  const handleModalToggler = () => {
    dispatch(openModal());
    return props.modal;
  };

  const auth = useContext(AuthContext);
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      {props.modal}
      <MDBContainer fluid>
        <MDBNavbarBrand to='/'>Razor Dispatch</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavText(!showNavText)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavText}>
          <MDBNavbarNav className='mb-2 mb-lg-0 justify-content-around font-monospace'>
            <MDBNavbarItem>
              <NavLink
                aria-current='page'
                to='/'
                style={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                Home
              </NavLink>
            </MDBNavbarItem>
            {!auth.isLoggedIn && (
              <MDBNavbarItem>
                <NavLink
                  to='/'
                  style={({ isActive }) =>
                    isActive ? notActiveStyle : notActiveStyle
                  }
                  onClick={handleModalToggler}
                >
                  Login/Register
                </NavLink>
              </MDBNavbarItem>
            )}
            {auth.isLoggedIn && (
              <MDBNavbarItem>
                <NavLink
                  to='Dashboard'
                  style={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                >
                  Dispatch
                </NavLink>
              </MDBNavbarItem>
            )}
            <MDBNavbarItem>
              <a
                href='https://app.termly.io/document/privacy-policy/c93d9c4d-fd75-43ab-bf75-082c9e39d922'
                target='blank'
              >
                Privacy Policy
              </a>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <span className='navbar-text text-uppercase text-end font-monospace'>
            {' '}
            Revolutionizing the way we get it done{' '}
          </span>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navigation;
