import {Container} from 'react-bootstrap'
import {ReactComponent as BsArrowLeft} from '../../Assets/react-icons/BsArrowLeft.svg'
import {Link} from 'react-router-dom'

// Svgs
// import ImgOne from '../../Assets/LandingPage/Smart_fluid.svg'
// import RoboCoin from '../../Assets/LandingPage/robodogeCoin.svg'

const NotFound = () => {
  return (
    <div className='notfound'>
      <Container>
        <div className='notfound__wrapper'>
          <div className='fluid__wrapper'>
            <h1>404</h1>
          </div>
          <h4>Not Found</h4>
          <Link to='/'>
            <button className='btn_brand'>
              <span>
                <BsArrowLeft />
              </span>{' '}
              Back To Home
            </button>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
