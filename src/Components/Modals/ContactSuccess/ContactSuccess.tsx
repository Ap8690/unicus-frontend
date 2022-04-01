import {Image} from 'react-bootstrap'
import DefaultModal from '../DefaultModal/DefaultModal'

// image
import Tick from '../../../Assets/Tick.svg'

interface ContactSuccessProps {
  type: 'news_letter' | 'contact_us'
  show: boolean
  handleClose: () => void
}

const ContactSuccess = ({type, show, handleClose}: ContactSuccessProps) => {
  return (
    <DefaultModal type='success' show={show} handleClose={handleClose}>
      <div className='success__body'>
        <Image src={Tick} alt='' className='mb-3 loader' />
        {type === 'news_letter' ? (
          <>
            <h4 className='success_title mt-2 mb-5'>Thanks for joining us</h4>
          </>
        ) : type === 'contact_us' ? (
          <>
            <h4 className='mt-3'>Thank you for getting in touch!</h4>
            <h6 className='info p-0 my-3 normalText'>
              We appreciate you contacting us. One of our Team will get back in
              touch with you soon! Have a great day
            </h6>
          </>
        ) : null}
      </div>
    </DefaultModal>
  )
}

export default ContactSuccess
