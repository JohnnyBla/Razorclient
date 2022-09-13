import React from 'react';
import Navigation from './navigationComponent';
import { useSelector } from 'react-redux/es/exports';
import Modal from '../shared/modal';

const Home = () => {
  const { isOpen } = useSelector((state) => state.modal);

  return (
    <div className='homePage vh-100'>
      <Navigation modal={isOpen && <Modal />} />
      <div className='container mt-5'>
        <div className='row mt-5'>
          <div className='col-md-3 col-12 mt-md-5'>
            <h4 className='text-black mx-3 font-monospace text-uppercase'>
              Optimize your loads and expenses today
            </h4>

            <a
              target='blank'
              href='https://play.google.com/store/apps/details?id=com.majhack90.razordispatch&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
            >
              <img
                alt='Get it on Google Play'
                src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                height='auto'
                width='250px'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
