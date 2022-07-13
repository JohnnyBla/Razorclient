import React, { useState, useEffect } from 'react';
import AccountNavigation from '../accountNavigation';
import axios from 'axios';
import LoadTables from './tables/LoadTable';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';

const LoadReport = (props) => {
  const [userLoad, setUserLoad] = useState();
  const userId = props.uid;
  const userMessage = props.data;
  const userLoadsUrl = `http://3.86.25.200/api/loads/user/${userId}`;
  // get loadInfo

  useEffect(() => {
    try {
      axios({
        method: 'GET',
        url: userLoadsUrl,
        headers: {
          Authorization: 'Bearer ' + userMessage,
          'Content-Type': 'application/json',
        },
      })
        .catch((error) => {
          console.clear(error);
        })
        .then((response) => {
          const loadInfo = response.data;
          setUserLoad(loadInfo);
        })
        .catch((err) => {
          console.warn('no loads to display');
        });
    } catch (err) {
      throw err;
    }
  }, [userLoadsUrl, userMessage]);

  return (
    <div>
      <div className='bg-info'>
        <nav className='square border-bottom border-dark shadow-4-strong'>
          <MDBNavbar
            light
            bgColor='primary'
            className='square border-bottom border-dark'
          >
            <MDBContainer fluid>
              <MDBNavbarBrand className='ms-auto'>
                <img
                  src={require('../../Images/ReportTables.png')}
                  alt='logo'
                  loading='lazy'
                  className='img-fluid'
                  style={{ width: '100%', height: '30px' }}
                />
              </MDBNavbarBrand>
            </MDBContainer>
          </MDBNavbar>
          <AccountNavigation />
        </nav>
      </div>
      <div className='container'>
        <LoadTables data={userLoad} />
      </div>
    </div>
  );
};

export default LoadReport;
