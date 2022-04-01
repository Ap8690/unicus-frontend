import {Image} from 'react-bootstrap'
import {ReactComponent as FiCopy} from "../../../Assets/react-icons/FiCopy.svg"
import useClipboard from 'react-use-clipboard'

// image
import Tick from '../../../Assets/Tick.svg'
interface NFTCreateSuccess {
  hash: any
  collection?: any
  titleInfo?: string
  title?: boolean
}

const NFTCreateSuccess = ({title, titleInfo, hash}: NFTCreateSuccess) => {
  // clipboard
  const [isCopied, setCopied] = useClipboard(hash, {
    successDuration: 2000,
  })
  return (
    <div className='success__body'>
      <Image src={Tick} alt='' className='mb-3 loader' />
      {title === false ? (
        <>
          <h4 className='mt-3'>NFT created successfully</h4>
        </>
      ) : title === true ? (
        <h4 className='mt-3'>{titleInfo}</h4>
      ) : null}

      <div className='user__id'>
        <p onClick={setCopied} className='txt__gray id'>
          {hash}
          <span>
            <FiCopy />
          </span>
        </p>
        <div className='toolt'>{isCopied ? 'Copied' : 'Copy'}</div>
      </div>
    </div>
  )
}

export default NFTCreateSuccess
