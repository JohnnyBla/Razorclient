import React, { useContext } from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import ChartComparison from '../shared/ChartDisplay/comparisionChart';
import AccountNavigation from './accountNavigation';
import { AuthContext } from '../shared/context/auth-context';
import RunReport from './Pages/RunReport';

const DispatchComponent = (props) => {
  const auth = useContext(AuthContext);
  const user = props.uid;

  if (!user) {
    auth.logout();
  } else {
    return (
      <div className='bg-primary'>
        <nav className='square border-bottom border-dark shadow-4-strong'>
          <MDBNavbar
            light
            bgColor='primary'
            className='square border-bottom border-dark'
          >
            <MDBContainer fluid>
              <MDBNavbarBrand  className='ms-auto'>
                <img
                  src={require('../Images/LogoImage.png')}
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

        <RunReport data={props} />
        <div className='container mx-auto mb-3 bg-info rounded'>
          <ChartComparison data={props} />
        </div>
      </div>
    );
  }
};

export default DispatchComponent;
