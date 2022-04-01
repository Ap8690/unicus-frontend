import {Image} from 'react-bootstrap'

// image
import Loader from '../../../Assets/Loader.svg'

const NFTCreateLoading = (props: any) => {
  return (
    <div className='success__body'>
      <Image src={Loader} alt='' className='mb-3 update__spinner loader' />
      <h4 className='mt-3'>{props.message}</h4>
    </div>
  )
}

export default NFTCreateLoading
