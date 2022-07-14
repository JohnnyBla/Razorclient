import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/auth-context';
import { removeCloseModal, removeOpenModal } from '../../redux/removeLoads';
import { removeAllLoads } from '../../redux/loadInfoReducer';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBIcon,
} from 'mdb-react-ui-kit';

const RemoveAllLoads = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(removeOpenModal());
  };

  const noModal = () => {
    dispatch(removeCloseModal());
  };

  const removeHandler = () => {
    setIsLoading(true);
    dispatch(removeAllLoads({ id: auth.userid, key: auth.token }));
    setTimeout(() => {
      noModal();
      window.location.reload();
    }, 2000);
  };
  if (!isLoading) {
    return (
      <MDBModal show={() => showModal} onHide={noModal} tabIndex='-1'>
        <MDBModalDialog centered size='lg'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className='text-danger fw-bold text-uppercase'>
                You are about to remove all loads!
              </MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='success'
                onClick={noModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='text-center fw-bold font-monospace'>
              <h3 className='text-uppercase text-success'>Important!!!</h3>
              <hr />
              <p className='text-danger'>
                If you have not yet done so we recommend exporting your data, as
                this will delete all of your saved loads.
              </p>
              <p className='text-danger'>
                Once deleted informaton is not retrievable, also you can
                navigate to the Report tables to remove Loads individually.
              </p>
              <MDBSpinner color='danger'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>
            </MDBModalBody>

            <MDBModalFooter className='justify-content-center'>
              <MDBBtn
                color='danger'
                onClick={removeHandler}
                className='mx-5 btn-sm'
              >
                remove ALL
              </MDBBtn>
              <MDBBtn color='primary' className='mx-5 btn-sm' onClick={noModal}>
                close
              </MDBBtn>
            </MDBModalFooter>
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
                Deleting All Load Data
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

export default RemoveAllLoads;
