import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Logout from '@mui/icons-material/Logout'
import CustomSwitch from './CustomSwitch'
import defaultImage from '../../Assets/default-profile-image.svg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { disConnectWallet } from '../../Redux/Profile/actions'

const ProfileDropDown = ({ setOpenDisconnectModal, userName }) => {
    const [darkChecked, setDarkChecked] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profile)
    const { userInfo } = profile

    // console.log(userInfo.profileUrl !== '')

    useEffect(() => {
        function toggle() {
            console.log('TEST', darkChecked)

            // var theme: any = document.getElementById('toogle__id__checkbox')
            // var white_theme = false
            // theme.addEventListener('click', () => {
            if (darkChecked) {
                // white_theme = true
                document.documentElement.style.setProperty(
                    '--primary_theme',
                    '#2D61DB'
                )
                document.documentElement.style.setProperty(
                    '--theme_bg',
                    'linear-gradient(113.49deg, #b9cce9 -21.3%, #00398e 38.12%)'
                )
                document.documentElement.style.setProperty(
                    '--secondary_theme',
                    '#e1e8f3'
                )
                document.documentElement.style.setProperty(
                    '--background_gradient',
                    'linear-gradient(95.11deg, #b9cce936 -28.61%, #00398e61 112.24%)'
                )
                document.documentElement.style.setProperty(
                    '--text_default_pure',
                    '#000'
                )
                document.documentElement.style.setProperty(
                    '--light_grey',
                    '#565656'
                )
                document.documentElement.style.setProperty(
                    '--gradient_five',
                    'rgba(45, 97, 219, 0.5)'
                )
                document.documentElement.style.setProperty(
                    '--gradient_seven',
                    '#2d61db'
                )
                document.documentElement.style.setProperty(
                    '--transparent_card_primary',
                    '#4a49492b'
                )
                document.documentElement.style.setProperty(
                    '--transparent_card_secondary',
                    '#3838382b'
                )
                document.documentElement.style.setProperty(
                    '--outlined__button',
                    'transparent'
                )
                document.documentElement.style.setProperty(
                    '--navbar_default_dull',
                    '#1a1919a6'
                )
                document.documentElement.style.setProperty(
                    '--invert__constant',
                    'invert(1)'
                )
                document.documentElement.style.setProperty(
                    '--popupBackground',
                    '#3636363d'
                )
                document.documentElement.style.setProperty(
                    '--search__bar',
                    '#5c5b5b84'
                )
            } else {
                // white_theme = false
                document.documentElement.style.setProperty(
                    '--primary_theme',
                    '#2d61db'
                )
                document.documentElement.style.setProperty(
                    '--theme_bg',
                    '#0e2c59'
                )
                document.documentElement.style.setProperty(
                    '--secondary_theme',
                    'rgba(27, 44, 71, 0.5)'
                )
                document.documentElement.style.setProperty(
                    '--background_gradient',
                    'linear-gradient(121.51deg,#0a1830 -19.56%,#04122c 107.27%)'
                )
                document.documentElement.style.setProperty(
                    '--text_default_pure',
                    '#fff'
                )
                document.documentElement.style.setProperty(
                    '--light_grey',
                    '#fff'
                )
                document.documentElement.style.setProperty(
                    '--gradient_five',
                    'linear-gradient(96.21deg,#2d61db 0.75%,#00123d 100%)'
                )
                document.documentElement.style.setProperty(
                    '--gradient_seven',
                    'rgba(214, 214, 214, 0.2)'
                )
                document.documentElement.style.setProperty(
                    '--transparent_card_primary',
                    '#d7d6d60f'
                )
                document.documentElement.style.setProperty(
                    '--transparent_card_secondary',
                    '#d7d6d612'
                )
                document.documentElement.style.setProperty(
                    '--outlined__button',
                    'transparent'
                )
                document.documentElement.style.setProperty(
                    '--navbar_default_dull',
                    'rgba(255, 255, 255, 0.7)'
                )
                document.documentElement.style.setProperty(
                    '--invert__constant',
                    'invert(0)'
                )
                document.documentElement.style.setProperty(
                    '--popupBackground',
                    '#a7a5a53d'
                )
                document.documentElement.style.setProperty(
                    '--search__bar',
                    '#c4c4c466'
                )
            }
            // })
        }
        toggle()
    }, [darkChecked])

    // console.log(darkChecked)
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    // background: '#0e2c59',
                    // height: '100vh',
                }}
            >
                <Tooltip title='Account settings'>
                    <IconButton
                        onClick={handleClick}
                        size='small'
                        // sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{
                                width: 45,
                                height: 45,
                                color: '#fff',
                                background: '#bebebe',
                            }}
                        >
                            {userInfo && userInfo.profileUrl !== '' ? (
                                <img
                                    src={userInfo.profileUrl}
                                    alt={userInfo.username}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <Avatar />
                            )}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        background: 'rgba(27, 44, 71, 0.5)',
                        color: '#fff !important',
                        mt: 1.5,
                        boxShadow:
                            '0 4px 6px -1px rgba(0, 0, 0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: -2,
                            bottom: -2,
                            left: -2,
                            right: -2,
                            zIndex: -1,
                            backdropFilter: 'blur(700px)',
                            // border: '2px solid #fff',
                            width: 210,
                            height: 160,
                            // bgcolor: "background.paper",
                            // transform: "translateY(-50%) rotate(45deg)",
                        },
                        '&:after': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            // filter: 'blur(10px)',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link
                    to='/portfolio'
                    style={{
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        color: '#fff !important',
                        width: '100%',
                    }}
                >
                    <MenuItem
                        sx={{
                            width: '100%',
                            '&:hover': {
                                background: '#8f909324',
                            },
                        }}
                        onClick={() => {
                            handleClose()
                        }}
                        // component={<Navigate to='/portfolio' />}
                    >
                        <Avatar
                            sx={{
                                width: 45,
                                height: 45,
                                color: '#fff',
                                background: '#bebebe',
                            }}
                        >
                            {userInfo && userInfo.profileUrl !== '' ? (
                                <img
                                    src={userInfo.profileUrl}
                                    alt={userInfo.username}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <Avatar
                                style={{marginLeft: '0', marginRight: '0'}}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    color: '#fff',
                                    background: '#bebebe',
                                }} />
                            )}
                        </Avatar>
                        <span>My Profile</span>
                    </MenuItem>
                </Link>
                {/* <MenuItem
                    sx={{
                        // width: '100%',
                        '&:hover': {
                            background: 'transparent',
                        },
                    }}
                >
                    <Brightness7Icon
                        sx={{
                            width: 30,
                            height: 32,
                            marginRight: 1,
                            marginLeft: -0.5,
                            color: '#ccc',
                        }}
                    />
                    <span>Light Mode</span>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <CustomSwitch
                                    sx={{
                                        m: 1,
                                        marginLeft: 3,
                                        marginRight: -2,
                                    }}
                                    defaultChecked={darkChecked}
                                    onChange={(e) => {
                                        console.log(e)
                                        setDarkChecked(e.target.checked)
                                    }}
                                />
                            }
                            label=''
                        />
                    </FormGroup>
                </MenuItem> */}
                <Divider sx={{ background: '#2d61db' }} />
                <MenuItem
                    style={{paddingTop: '7px', paddingBottom: '7px'}}
                    sx={{
                        '&:hover': {
                            background: '#8f909324',
                        },
                    }}
                    onClick={() => {
                        handleClose()
                        dispatch(disConnectWallet())
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize='small' sx={{ color: '#fff' }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default ProfileDropDown
