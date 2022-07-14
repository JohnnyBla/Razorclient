import React, { useState, useContext } from 'react';
import { AuthContext } from './context/auth-context';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBInput,
  MDBModalFooter,
  MDBModalBody,
  MDBModalTitle,
  MDBModalHeader,
  MDBIcon,
  MDBValidation,
  MDBValidationItem,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { submitLoad } from '../redux/loadInfoReducer';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/modalReducer';

const LoadModal = (props) => {
  const dispatch = useDispatch();
  const loadInfo = useSelector((state) => state.loadDetail.loadDetail.loads);
  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState(loadInfo);
  const [isLoading, setIsLoading] = useState(false);

  const regx = /^\d+$/;

  const auth = useContext(AuthContext);

  // function to open modal
  const showModal = () => {
    dispatch(openModal());
  };

  // function to close modal
  const noModal = () => {
    dispatch(closeModal());
  };

  // handle form submission
  const loadInformationHandlers = () => {
    if (
      formData.Origin === '' ||
      regx.test(formData.Origin) ||
      formData.Destination === '' ||
      regx.test(formData.Destination) ||
      formData.TotalMiles === '' ||
      formData.PricePerMile === ''
    ) {
      setFeedback('Check Input for Errors');
    } else {
      setIsLoading(true);
      dispatch(submitLoad(formData));
      setTimeout(() => {
        setIsLoading(!isLoading);
        dispatch(closeModal());
        window.location.reload();
      }, 2000);
    }
  };

  const loadInformationOnChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user: auth.userid,
      token: auth.token,
    });
    setFeedback('');
  };
  if (!isLoading) {
    return (
      <MDBModal show={() => showModal} onHide={noModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <MDBIcon icon='tasks' color='success' className='mx-2' />
                Submit Load Information
              </MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='success'
                onClick={noModal}
                type='button'
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBValidation onSubmit={loadInformationHandlers}>
                <div className='row px-2 mb-4'>
                  <div className='col-12'>
                    <MDBValidationItem feedback='enter a valid origin' invalid>
                      <MDBInput
                        name='Origin'
                        label='Origin'
                        type='text'
                        onChange={loadInformationOnChange}
                        value={formData.Origin}
                        required
                      />
                    </MDBValidationItem>
                  </div>
                </div>
                <div className='row px-2 mb-4'>
                  <div className='col-12'>
                    <MDBValidationItem
                      feedback='enter a valid Destination'
                      invalid
                    >
                      <MDBInput
                        name='Destination'
                        label='Destination'
                        type='text'
                        onChange={loadInformationOnChange}
                        value={formData.Destination}
                        required
                      />
                    </MDBValidationItem>
                  </div>
                </div>
                <div className='row px-2 mb-4'>
                  <div className='col-12'>
                    <MDBValidationItem
                      feedback='enter a Price Per Mile Numbers only'
                      invalid
                    >
                      <MDBInput
                        name='PricePerMile'
                        label='Price Per Mile'
                        type='number'
                        step='.000001'
                        onChange={loadInformationOnChange}
                        value={formData.PricerPerMile}
                        required
                      />
                    </MDBValidationItem>
                  </div>
                </div>
                <div className='row px-2 mb-4'>
                  <div className='col-12'>
                    <MDBValidationItem
                      feedback='enter a Price Per Mile Numbers only'
                      invalid
                    >
                      <MDBInput
                        name='TotalMiles'
                        label='Total Miles'
                        type='number'
                        step='.000001'
                        onChange={loadInformationOnChange}
                        value={formData.TotalMiles}
                        required
                      />
                    </MDBValidationItem>
                  </div>
                </div>
                <MDBModalFooter>
                  <div className='col-12 d-flex justify-content-center '>
                    <MDBValidationItem invalid>
                      <p className='font-monospace text-danger text-uppercase'>
                        {feedback}
                      </p>
                    </MDBValidationItem>
                  </div>

                  <div className='col-12 d-grid'>
                    <MDBBtn color='success' type='submit'>
                      Submit Load
                    </MDBBtn>
                  </div>
                </MDBModalFooter>
              </MDBValidation>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  } else {
    return (
      <MDBModal
        show={() => showModal}
        onHide={noModal}
        tabIndex='-1'
        className='text-center'
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <MDBIcon icon='gas-pump' color='success' className='mx-4' />
                {isLoading ? 'Saving Information' : 'Getting Information'}
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBSpinner role='status'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  }
};

export default LoadModal;
