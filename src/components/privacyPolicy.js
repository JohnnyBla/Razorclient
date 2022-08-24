import React from 'react';
import Navigation from './navigationComponent';

import Modal from '../shared/modal';
import { useSelector } from 'react-redux/es/exports';

const PrivacyPolicy = () => {
  const { isOpen } = useSelector((state) => state.modal);
  // // map through questions if display === true
  // const Directory = FaqQuestions.map((faqs) => {
  //   if (!faqs.display) {
  //     return <div></div>;
  //   } else {
  //     return (
  //       <div className='col-8 mx-auto d-block' key={faqs.id}>
  //         <MDBAccordion initialActive={1}>
  //           <MDBAccordionItem
  //             collapseId={faqs.id}
  //             headerTitle={faqs.question}
  //             className='my-2 bg-info fw-bold font-monospace'
  //           >
  //             {faqs.description}
  //           </MDBAccordionItem>
  //         </MDBAccordion>
  //       </div>
  //     );
  //   }
  // });
  return (
    <div className='vh-100 bg-warning setOverflow'>
      <Navigation modal={isOpen && <Modal />} />

      <div className='row mt-5 mb-autol'>
        <div className='col-12 text-center font-monospace text-primary'>
          <h1>Frequently Asked Questions</h1>
        </div>
      </div>
      <div className='row mt-2 py-5'></div>
    </div>
  );
};

export default PrivacyPolicy;
