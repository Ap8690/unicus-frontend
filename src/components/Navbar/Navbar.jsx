import './navbar.scss'
import unicusLogo from '../../assets/images/Unicus-logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav className='navbar'>
      <Link to={'/'} className='brand-link' >
          <img src={unicusLogo} className='navbar-brand' alt="unicus" />
      </Link>
      <div className='nav-links'>
        <Link to={'/about'} className='nav-link' >About</Link>
        <Link to={'/for-creator'} className='nav-link' >For Creators</Link>
        <Link to={'/token'} className='nav-link' >Token</Link>
        <Link to={'/blog'} className='nav-link' >Blog</Link>
        <Link to={'/create-store'} className='btn nav-link'>Create Store</Link>
        <Link to={'/launchpad'} className='btn nav-link'>Launchpad</Link>
        <Link to={'/marketplace'} className='btn nav-link'>Marketplace</Link>
      </div>
  </nav>
}

export default Navbar