import React, { useState, useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import { NavLink } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBBtn,
} from 'mdb-react-ui-kit';

const AccountNavigation = (props) => {
  const [showNavText, setShowNavText] = useState(false);

  const activeStyle = {
    color: 'red',
  };
  const notActiveStyle = {
    textDecoration: 'none',
    color: 'black',
  };
  const auth = useContext(AuthContext);

  return (
    <>
      {auth.isLoggedIn && (
        <MDBNavbar expand='lg' light bgColor='light'>
          <MDBContainer fluid>
            <MDBNavbarBrand className='row'>
              <div className='col-12 text-muted' style={{ fontSize: '12px' }}>
                Welcome
              </div>
              <div className='col mx-2' style={{ fontSize: '16px' }}>
                {auth.userName}
              </div>
            </MDBNavbarBrand>
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
                    to='/Dashboard'
                    style={({ isActive }) =>
                      isActive ? activeStyle : notActiveStyle
                    }
                  >
                    Dashboard
                  </NavLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <NavLink
                    to='/Load-Report-Tables'
                    style={({ isActive }) =>
                      isActive ? notActiveStyle : notActiveStyle
                    }
                  >
                    Load Report Tables
                  </NavLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <NavLink
                    to='/Expense-Report-Tables'
                    style={({ isActive }) =>
                      isActive ? notActiveStyle : notActiveStyle
                    }
                  >
                    Expense Report Tables
                  </NavLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle tag='a'>Sign-Out</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <MDBDropdownLink className='d-grid gap-2'>
                          {' '}
                          <MDBBtn color='danger' rounded onClick={auth.logout}>
                            Sign-Out
                          </MDBBtn>
                        </MDBDropdownLink>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      )}
    </>
  );
};

export default AccountNavigation;
