import React from 'react';
import RemoveAllLoads from '../../../../shared/RemovalModals/RemoveAllLoads';
import { removeOpenModal } from '../../../../redux/removeLoads';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import {
  MDBBtn,
  MDBCardBody,
  MDBCardText,
  MDBCardFooter,
} from 'mdb-react-ui-kit';

export const TotalUserLoads = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.removeModal);
  const total = useSelector((state) => state.totals.loadTotal);

  return (
    <>
      <MDBCardBody>
        <div> {isOpen && <RemoveAllLoads />}</div>
        <MDBCardText className='text-center' tag='div'>
          <div className='fs-2'>
            {total !== 0
              ? `Total Load Reports: ${total}`
              : `No Loads to Display`}
          </div>
        </MDBCardText>
      </MDBCardBody>
      <MDBCardFooter className='d-grid'>
        <MDBBtn color='success' onClick={() => dispatch(removeOpenModal())}>
          Remove All Loads
        </MDBBtn>
      </MDBCardFooter>
    </>
  );
};

export default TotalUserLoads;
