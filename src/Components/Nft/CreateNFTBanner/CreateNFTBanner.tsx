import {Container} from 'react-bootstrap'
import {CreateNFTBannerProps} from './CreateNFTBanner.d'

const CreateNFTBanner = ({title, tagline}: CreateNFTBannerProps) => {
  return (
    <div className='nft_banner'>
      <Container>
        <div className='section_info'>
          <p className='section_small_heading'>{tagline}</p>
          <h1 className='section_heading'>{title}</h1>
        </div>
      </Container>
    </div>
  )
}

export default CreateNFTBanner
