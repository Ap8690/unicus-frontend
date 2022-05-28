import './navbar.scss'
import { useContext, useState } from 'react'
import unicusLogo from '../../assets/images/Unicus-logo.png'
import profileLogo from '../../assets/svgs/profileIcon.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import sunIcon from '../../assets/svgs/sunIcon.svg'
import walletIcon from '../../assets/svgs/walletIcon.svg'
import { UserContext } from '../../context/UserContext'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  
  const [anchorStats, setAnchorStats] = useState(null);
  const [anchorChains, setAnchorChains] = useState(null);
  const [anchorProfile, setAnchorProfile] = useState(null);
  
  const openStats = Boolean(anchorStats);
  const openChains = Boolean(anchorChains);
  const openProfile = Boolean(anchorProfile);

  const { isLogin } = useContext(UserContext)

  const handleClickStats = (event) => {
    setAnchorStats(event.currentTarget);
  };
  const handleCloseStats = () => {
    setAnchorStats(null);
  };
  const handleClickChains= (event) => {
    setAnchorChains(event.currentTarget);
  };
  const handleCloseChains = () => {
    setAnchorChains(null);
  };
  const handleClickProfile= (event) => {
    isLogin 
      ? setAnchorProfile(event.currentTarget)
      : navigate('/connect-wallet')
  };
  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };


  return <nav className='navbar'>
      <Link to={'/'} className='brand-link' >
          <img src={unicusLogo} className='navbar-brand' alt="unicus" />
      </Link>
      <SearchBar 
        search={search} 
        setSearch={setSearch}
      />
      {location.pathname === '/' || location.pathname === '/blog' 
        ? <div className='nav-links'>
            <Link to={'/about'} className='nav-link'>About</Link>
            <Link to={'/for-creator'} className='nav-link'>For Creators</Link>
            <Link to={'/token'} className='nav-link'>Token</Link>
            <Link to={'/blog'} className='nav-link'>Blog</Link>
            <Link to={'/create-store'} className='btn nav-link'>Create Store</Link>
            <Link to={'/launchpad'} className='btn nav-link'>Launchpad</Link>
            <Link to={'/marketplace'} className='btn nav-link'>Marketplace</Link>
          </div>
        : <div className='nav-links'>
            <Link to={'/explore'} className='nav-link' >Explore</Link>
            <button className='nav-link' onClick={handleClickStats}>Stats</button>
            <Menu
              anchorEl={anchorStats}
              open={openStats}
              onClose={handleCloseStats}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseStats}>
                <Link to={'/stats/ranking'} className='menu-link'>
                  Ranking
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseStats}>
                <Link to={'/stats/activity'} className='menu-link'>
                  Activity
                </Link>
              </MenuItem>
            </Menu>
            <button className='nav-link' onClick={handleClickChains}>Chains</button>
            <Menu
              anchorEl={anchorChains}
              open={openChains}
              onClose={handleCloseChains}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseChains}>Ethereum</MenuItem>
              <MenuItem onClick={handleCloseChains}>Polygon</MenuItem>
              <MenuItem onClick={handleCloseChains}>Tron</MenuItem>
              <MenuItem onClick={handleCloseChains}>Binance</MenuItem>
              <MenuItem onClick={handleCloseChains}>Solana</MenuItem>
              <MenuItem onClick={handleCloseChains}>Avalanche</MenuItem>
              
            </Menu>
            <Link to={'/create-nft'} className='nav-link'>Create NFT</Link>
            <button className='nav-link' onClick={handleClickProfile}>
              <img src={profileLogo} alt="profile" className='nav-icons' />
            </button>
            <Menu
              anchorEl={anchorProfile}
              open={openProfile}
              onClose={handleCloseProfile}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={'/'} className='menu-link'>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={'/'} className='menu-link'>
                    Favourites
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={'/'} className='menu-link'>
                    My Tickets
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={'/'} className='menu-link'>
                    My Collections
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={'/'} className='menu-link'>
                    Notification
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={'/'} className='menu-link'>
                    Account Settings
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  Logout
                </MenuItem>
              <div className='balance-box'>
                <div className='balance'>$ 0.000 USD</div>
                <div>Total Balance</div>
              </div>

            </Menu>
            <Link to={'/create-store'} className='btn nav-link'>Create Store</Link>
            <Link to={'/'} className='nav-link'>
              <img src={sunIcon} alt="profile" className='nav-icons' />
            </Link>
            <Link to={'/wallet'} className='nav-link'>
              <img src={walletIcon} alt="profile" className='nav-icons' />
            </Link>
          </div>
      }
  </nav>
}

export default Navbar