import {Col, Container, Image, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ReactComponent as FaRegEnvelope} from "../../Assets/react-icons/FaRegEnvelope.svg"

// Svgs
import Logo from '../../Assets/LandingPage/logo_white.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='c'>
            <Link to='/'>
              <Image src={Logo} alt='' className='imgg' />
            </Link>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='text-center c'>
            <p className='text-decoration-underline'>Terms & Conditions</p>
            <p className='copyright'>
              Copyright &copy; {new Date().getFullYear()}. All rights reserved
              by Unicus
            </p>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='text-end c'>
            <span className='envelope_wrapper'>
              <FaRegEnvelope />
            </span>
            <a href='mailto:Info@unicus.one'>Info@unicus.one</a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
