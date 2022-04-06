import { Container, Row, Col, Image, Form } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import UploadField from '../../Nft/UploadField'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as FiCopy } from '../../../Assets/react-icons/FiCopy.svg'
import { ReactComponent as AddWallet } from '../../../Assets/react-icons/AddWallet.svg'
import useClipboard from 'react-use-clipboard'
import { ReactComponent as BsFillShareFill } from '../../../Assets/react-icons/BsFillShareFill.svg'
import AiFillDelete from '../../../Assets/react-icons/AiFillDelete.svg'
import { ReactComponent as BsWallet2 } from '../../../Assets/react-icons/BsWallet2.svg'
import { ReactComponent as AiOutlineEdit } from '../../../Assets/react-icons/AiOutlineEdit.svg'
import { ReactComponent as Share } from '../../../Assets/react-icons/Share.svg'
import axios from 'axios'
import RegisterPopUp from '../../Modals/Auth/Register'
import { backendUrl } from '../../../config'
// svg
import StripeCheckout from 'react-stripe-checkout'
import getContracts from '../../../Redux/Blockchain/contracts'
import NFTCollection from '../NFTCollection'
import Avatar from '@mui/material/Avatar'
import defaultAvatar from '../default-avatar.png'
import ShareProfile from '../../Modals/Share/Share'
// var CircularJSON = require('circular-json')
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
} from 'react-share'
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon,
} from 'react-share'
import { ReactComponent as HiPencilAlt } from '../../../Assets/react-icons/HiPencilAlt.svg'
import {
    getPortfolioNFTS,
    getportfolioNFTSLoaded,
} from '../../../Redux/MarketPlace/actions'

import { getUserInfo } from '../../../Redux/Profile/actions'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { Link, useLocation, withRouter } from 'react-router-dom'
import dashboardBackImage from '../../../Assets/dashboard-back.svg'
import web3 from '../../../web3'

import ImageUploader from '../ImageUploader.js'
import ClearIcon from '@mui/icons-material/Clear'
import backImageChange from '../../../Assets/background-image.png'
import editRegular from '../../../Assets/edit-regular.svg'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import NFTCreateLoading from '../../../Components/Modals/NFTCreateLoading/NFTCreateLoading'
import AddAccount from '../../Modals/AddAccount/AddAccount'
import defaultProfileImage from '../../../Assets/default-profile-image.svg'
import pen from '../../../Assets/pen.png'

import {getUserWallet} from "../../../Utilities/Util";

const Dashboard = (props: any) => {
    const shareUrl = 'http://github.com'
    const title = 'GitHub'
    const {
        walletType,
        userAddress,
        profileLoading,
        networkID,
        userInfo,
        accessToken,
    } = useSelector((state: any) => state.profile) //   clipboard
    const { portfolioNFTS, portfolioNFTSLoaded, lastPortId } = useSelector(
        (state: any) => state.marketPlace
    )
    const [copiedWallet, setcopiedWallet] = useState<any>('')
    const [isCopied, setCopied] = useClipboard('', {
        successDuration: 3000,
    })
    // if (userInfo) {
    //     console.log("user info---", userInfo);
    // }
    function setWalletCopy(e: any) {
        setcopiedWallet(e.target.textContent)
        setCopied()
    }

    const [myNFTs, setMyNFTs] = useState<any>([])
    const [hash, setHash] = useState<any>('')
    // const [images, setimages] = useState<any>([])
    const [imageSrc, setImageSrc] = useState<any>([])
    const [userName, setUserName] = useState('UserName')
    const [RegisterPopUpShow, setRegisterPopUpShow] = useState(false)
    const { createNFT } = getContracts(walletType, networkID)

    const [userImage, setUserImage] = useState<any>([])
    const [backgroundImage, setBackgroundImage] = useState<any>([])

    const [CardCount, setCardCount] = useState(50)
    const [firstLoad, setfirstLoad] = useState(true)
    const [loading, setLoading] = useState(false)
    const [openShareProfile, setopenShareProfile] = useState(false)
    const [amount, setamount] = useState<any>('')
    const [dollarConversion, setdollarConversion] = useState(0)
    const [token, settoken] = useState('BNB')
    const [allCardsLoaded, setallCardsLoaded] = useState(false)
    const [CardsCounter, setCardsCounter] = useState(false)
    const [Duplicacy, setDuplicacy] = useState(0)
    const [getUserNFT, setgetUserNFT] = useState([])
    const [getUserAuction, setgetUserAuction] = useState([])
    const [TotalCards, setTotalCards] = useState(-1)
    const [LastCard, setLastCard] = useState<any>([])
    const [editProfile, setEditProfile] = useState(false)
    const [addFunds, setaddFunds] = useState(false)
    const [NFTSLoaded, setNFTSLoaded] = useState(true)
    const [profileImage, setProfileImage] = useState<any>([])
    const [open, setOpen] = useState<boolean>(false)

    const [uploadingUserInfo, setUploadingUserInfo] = useState<boolean>(false)

    const [fieldEmptyError, setFieldEmptyError] = useState('')
    const [shareLink, setShareLink] = useState<boolean>(false)

    const location = useLocation();
    
    const newaxiosConfig: any = {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    }

    const [updateUserProfile, setUpdateUserProfile] = useState<any>({
        userName: '',
        bio: '',
        instagram: '',
        facebook: '',
        twitter: '',
        discord: '',
        linkedIn: '',
    })
    const handleChange = (e: any) => {
        const newData = { ...updateUserProfile }
        newData[e.target.id] = e.target.value
        setUpdateUserProfile(newData)
    }

    const deleteWallet = (e: any) => {
        axios
            .get(
                `${backendUrl}/users/removeWallet/${e.target.parentNode.firstElementChild.textContent}`,
                newaxiosConfig
            )
            .then((res: any) => {
                console.log(res.data)
                dispatch(getUserInfo(res.data))
                localStorage.setItem('userInfo', JSON.stringify(res.data))
            })
    }

    const updateUserDetails = async () => {
        if (!updateUserProfile.userName) {
            return setFieldEmptyError('Please enter Username')
        }
        if (!updateUserProfile.bio) {
            return setFieldEmptyError('Please enter Bio')
        }
        setUploadingUserInfo(true)
        // /users/update/updateUser
        const axiosConfig: any = {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }

        await axios
            .post(
                `${backendUrl}/users/update/updateUser`,
                {
                    // displayname: updateUserProfile.displayName,
                    username: updateUserProfile.userName,
                    bio: updateUserProfile.bio,
                    instagram: updateUserProfile.instagram,
                    facebook: updateUserProfile.facebook,
                    twitter: updateUserProfile.twitter,
                    discord: updateUserProfile.discord,
                    linkedIn: updateUserProfile.linkedIn,
                },
                axiosConfig
            )
            .then((res: any) => {
                if (res && res.data && res.data.msg) {
                    dispatch(getUserInfo(res.data.msg))
                    localStorage.setItem(
                        'userInfo',
                        JSON.stringify(res.data.msg)
                    )
                    setEditProfile(false)
                }
            })
            .catch((err) => {
                setFieldEmptyError(err.response.data.msg)
            })

        setUploadingUserInfo(false)
    }

    const [loadingBackground, setLoadingBackground] = useState<boolean>(false)
    const [loadingProfileImage, setLoadingProfileImage] =
        useState<boolean>(false)
    const dispatch = useDispatch()

    function getUniqueListBy(arr: any, key: any) {
        return [...new Map(arr.map((item: any) => [item[key], item])).values()]
    }

    async function addAccount() {
        const account = await getUserWallet();
        console.log(account[0])
        axios
            .get(
                `${backendUrl}/users/addWallet/${account[0]}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            )
            .then((res: any) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const [product, setProduct] = useState<any>({
        name: token,
        price: dollarConversion,
        productBy: 'Unicus',
    })

    const makePayment = (token: any) => {
        console.log(product, 'checkProduct')
        const body: any = {
            token,
            product,
        }
        const headers = {
            'Content-Type': 'application/json',
        }

        return fetch(`https://stripeusnicus.herokuapp.com/payment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
            .then((res) => {
                console.log('RESPONSE ', res)
                console.log('RESPONSE ', res)
                const { status } = res
                if (status === 200) {
                    console.log('STATUS ', status)
                }
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        if (userInfo) {
            setUpdateUserProfile({
                userName: userInfo.username,
                bio: userInfo.bio,
                instagram: userInfo.instagram,
                facebook: userInfo.facebook,
                twitter: userInfo.twitter,
                discord: userInfo.discord,
                linkedIn: userInfo.linkedIn,
            })
        }
    }, [userInfo])

    useEffect(() => {
        if (getUserNFT.length === 0 && userInfo && firstLoad) {
            axios
                .get(
                    `${backendUrl}/nft/getNFTByUserId/${
                        userInfo && userInfo._id
                    }`
                )
                .then((res: any) => {
                    setfirstLoad(false)
                    setgetUserNFT(res.data.nfts)
                    setgetUserAuction(res.data.auctions)
                    setNFTSLoaded(false)
                })
                .catch(() => {
                    setNFTSLoaded(false)
                })
        }
    }, [userAddress, hash, CardsCounter, userInfo])

    let cloudinaryFormData = new FormData()

    // user profile photo
    const getUserImage = async (e: any) => {
        setUserImage(e.target.files)
        console.log(userImage)
        //uploading to cloudinary
        try {
            setLoadingProfileImage(true)
            cloudinaryFormData.append('file', e.target.files[0])
            cloudinaryFormData.append('upload_preset', `Unicus___User`)

            cloudinaryFormData.append('public_id', uuid())

            console.log(cloudinaryFormData)

            const cloudinaryRes = await fetch(
                'https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/',
                {
                    method: 'POST',
                    body: cloudinaryFormData,
                }
            )
            const JSONdata = await cloudinaryRes.json()

            console.log(JSONdata.url)

            // now sendig cloudinary url to backend server
            let newaxiosConfig: any = {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
            await axios
                .post(
                    `${backendUrl}/users/update/profilePicture`,
                    {
                        userId: userInfo._id,
                        cloudinaryUrl: JSONdata.url,
                    },
                    newaxiosConfig
                )
                .then((res: any) => {
                    console.log(
                        'Response after uploading cloudinary url -> ',
                        res
                    )
                    if (res && res.data && res.data.user) {
                        dispatch(getUserInfo(res.data.user))
                        localStorage.setItem(
                            'userInfo',
                            JSON.stringify(res.data.user)
                        )
                    }
                })
                .catch((err) => {
                    console.log('Error while uploading cloudinary url -> ', err)
                })
        } catch (err) {
            console.log('Cloudinary User Image Upload Error ->', err)
        }
        setLoadingProfileImage(false)
    }

    // PORTFOLIO TO HEADER IMAGE
    const uploadBackgroundImage = async (e: any) => {
        console.log(e.target.files)
        setBackgroundImage(e.target.files)
        try {
            //set loading true
            setLoadingBackground(true)

            cloudinaryFormData.append('file', e.target.files[0])
            cloudinaryFormData.append('upload_preset', `Unicus___User`)

            cloudinaryFormData.append('public_id', uuid())

            console.log(cloudinaryFormData)

            const cloudinaryRes = await fetch(
                'https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/',
                {
                    method: 'POST',
                    body: cloudinaryFormData,
                }
            )
            const JSONdata = await cloudinaryRes.json()

            console.log(JSONdata.url)

            // now sendig cloudinary url to backend server
            let newaxiosConfig: any = {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
            // sending to backend
            await axios
                .post(
                    `${backendUrl}/users/update/backgroundPicture`,
                    {
                        userId: userInfo._id,
                        cloudinaryUrl: JSONdata.url,
                    },
                    newaxiosConfig
                )
                .then((res: any) => {
                    console.log(
                        'Response after uploading cloudinary url -> ',
                        res
                    )

                    if (res && res.data && res.data.user) {
                        dispatch(getUserInfo(res.data.user))
                        localStorage.setItem(
                            'userInfo',
                            JSON.stringify(res.data.user)
                        )
                    }
                })
                .catch((err) => {
                    console.log('Error while uploading cloudinary url -> ', err)
                })
        } catch (err) {
            console.log('Cloudinary User Image Upload Error ->', err)
        }
        setLoadingBackground(false)
    }

    // const shareLinkClipboard = () => {
    //     console.log("shareLinkClipboard");

    //     if (userInfo && userInfo.wallets) {
    //         console.log(userInfo.wallets[0]);
    //         setShareLink(
    //             `https://unicus.one/artists/${userInfo.wallets[0]}`
    //         );
    //     }
    // };

    const copiedData = () => {
        if (userInfo && userInfo.wallets) {
            navigator.clipboard.writeText(
                `https://unicus.one/artist/${userInfo.wallets[0]}`
            )
            setShareLink(true)

            setTimeout(() => {
                setShareLink(false)
            }, 1000)
        }
    }

    useEffect(() => {
        if(location.pathname.split('/').pop() == 'addWallet') {
            setOpen(true)
        }
    }, []);

    return (
        <>
            {uploadingUserInfo && (
                <div className='waiting-for-response'>
                    <NFTCreateLoading message='Updating Profile' />
                </div>
            )}

            <AddAccount
                addAccount={location.pathname.split('/').pop() == 'addWallet' && true}
                show={open}
                handleClose={() => {
                    setOpen(false)
                    props.history.push('/portfolio')
                }}
            />
            <div id='back-image'>
                {userInfo &&
                userInfo.backgroundUrl &&
                userInfo.backgroundUrl.length > 0 ? (
                    <img
                        className='dashboard-back'
                        src={userInfo.backgroundUrl}
                        alt='dashboard back'
                    />
                ) : (
                    <img
                        className='dashboard-back'
                        src={dashboardBackImage}
                        alt='dashboard back'
                    />
                )}

                <input
                    type='file'
                    className='back-image-change'
                    alt=''
                    onChange={(e) => {
                        uploadBackgroundImage(e)
                    }}
                />
                <Box
                    className={
                        loadingBackground === false
                            ? 'hide-it'
                            : 'normal__loading'
                    }
                    sx={{ display: 'flex' }}
                >
                    <CircularProgress />
                </Box>
            </div>
            <Container className='pos-rel'>
                <div className='profile_section'>
                    <div className='table' style={{ width: '250px' }}>
                        <div className='table-cell'>
                            <div id='profile' style={{background: '#bebebe'}}>
                                {userInfo &&
                                userInfo.profileUrl &&
                                userInfo.profileUrl.length > 0 ? (
                                    <img
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '100%',
                                        }}
                                        src={userInfo.profileUrl}
                                    />
                                ) : (
                                    <Avatar style={{
                                        top: '-10px',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '100%',
                                    }} />
                                )}
                                <input
                                    className='back-image-change-2'
                                    type='file'
                                    onChange={(e) => getUserImage(e)}
                                    alt='user photo'
                                />
                            </div>

                            <Box
                                className={
                                    loadingProfileImage === false
                                        ? 'hide-it'
                                        : 'normal__loading-2'
                                }
                                sx={{ display: 'flex' }}
                            >
                                <CircularProgress />
                            </Box>
                        </div>
                    </div>
                    <div className='profile-name'>
                        <h5 className='profile-name_h5 mt-8 pt-2'>
                            {userInfo.username}
                        </h5>
                        {userInfo.bio && <h6
                            className='profile-name_h6 mt-8 mb-2'
                            style={{ width: '400px', textAlign: 'center' }}
                        >
                            {userInfo.bio}
                        </h6>}
                        <h6 className='profile-name_h6 mt-8 pt-2 mb-2'  style={{fontSize: '16px'}}>
                            Joined{' '}
                            {userInfo &&
                                userInfo.createdAt &&
                                userInfo.createdAt.slice(0, 10)}
                        </h6>
                        <div
                            className='profile-name_social'
                            style={{ paddingLeft: '20px' }}
                        >
                            {userInfo &&
                                userInfo.facebook &&
                                userInfo.facebook.length > 0 && (
                                    <a href={userInfo.facebook} target='_blank'>
                                        <i className='fab fa-facebook-f'></i>
                                    </a>
                                )}
                            {userInfo &&
                                userInfo.instagram &&
                                userInfo.instagram.length > 0 && (
                                    <a
                                        href={userInfo.instagram}
                                        target='_blank'
                                    >
                                        <i className='fab fa-instagram'></i>
                                    </a>
                                )}
                            {userInfo &&
                                userInfo.discord &&
                                userInfo.discord.length > 0 && (
                                    <a href={userInfo.discord} target='_blank'>
                                        <i className='fab fa-discord'></i>
                                    </a>
                                )}
                            {userInfo &&
                                userInfo.linkedIn &&
                                userInfo.linkedIn.length > 0 && (
                                    <a href={userInfo.linkedIn} target='_blank'>
                                        <i className='fab fa-linkedin-in'></i>
                                    </a>
                                )}
                            {userInfo &&
                                userInfo.twitter &&
                                userInfo.twitter.length > 0 && (
                                    <a href={userInfo.twitter} target='_blank'>
                                        <i className='fab fa-twitter'></i>
                                    </a>
                                )}
                        </div>
                    </div>
                </div>
                {editProfile ? (
                    <div className='mb-5 dashboard_profile'>
                        <div className='row'>
                            <Col
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                xl={6}
                                className='mb-3'
                            >
                                <div className='add_nft__right'>
                                    <Form className='formGroup'>
                                        <Form.Group className='mb-3 input_form_group'>
                                            <Form.Label>User Name*</Form.Label>
                                            <Form.Control
                                                type='text'
                                                maxLength={15}
                                                placeholder='Enter your User Name'
                                                className='shadow-none form-control form_controll_edit_profile__new'
                                                name='description'
                                                size='lg'
                                                onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                value={
                                                    updateUserProfile.userName
                                                }
                                                id='userName'
                                            />
                                            <i className='fas fa-user input_form_group__logo'></i>
                                        </Form.Group>
                                        <div style={{ display: 'block' }}>
                                            {fieldEmptyError.includes(
                                                'Username'
                                            ) && (
                                                <h3
                                                    style={{
                                                        marginBottom: '-1rem',
                                                    }}
                                                    className='show-error mt-05'
                                                >
                                                    {fieldEmptyError}
                                                </h3>
                                            )}
                                            <p
                                                style={{
                                                    marginTop: '-0.5rem',
                                                    width: 'auto',
                                                    textAlign: 'right',
                                                    marginBottom: 0,
                                                }}
                                            >
                                                {
                                                    updateUserProfile.userName
                                                        .length
                                                }
                                                /15
                                            </p>
                                        </div>
                                        <Form.Group className='mb-3 input_form_group'>
                                            <Form.Label>Bio*</Form.Label>
                                            <Form.Control
                                                type='textarea'
                                                placeholder='About yourself in few words'
                                                className='shadow-none form-control form_controll_edit_profile__new'
                                                name='title'
                                                maxLength={150}
                                                size='lg'
                                                onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                value={updateUserProfile.bio}
                                                id='bio'
                                            />
                                            <i className='far fa-address-card input_form_group__logo'></i>
                                        </Form.Group>
                                        <div style={{ display: 'block' }}>
                                            {fieldEmptyError.includes(
                                                'Bio'
                                            ) && (
                                                <h3
                                                    style={{
                                                        marginBottom: '-1rem',
                                                    }}
                                                    className='show-error mt-05'
                                                >
                                                    {fieldEmptyError}
                                                </h3>
                                            )}
                                            <p
                                                style={{
                                                    marginTop: '-0.5rem',
                                                    width: 'auto',
                                                    textAlign: 'right',
                                                    marginBottom: 0,
                                                }}
                                            >
                                                {updateUserProfile.bio &&
                                                    updateUserProfile.bio
                                                        .length}
                                                /150
                                            </p>
                                        </div>
                                        <Form.Group
                                            style={{ marginBottom: '1.8rem' }}
                                            className='input_form_group'
                                        >
                                            <Form.Label>Facebook</Form.Label>
                                            <Form.Control
                                                type='textarea'
                                                placeholder='Your Facebook Handle'
                                                className='shadow-none form-control form_controll_edit_profile__new'
                                                name='title'
                                                size='lg'
                                                onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                value={
                                                    updateUserProfile.facebook
                                                }
                                                id='facebook'
                                            />
                                            <i className='fab input_form_group__logo fa-facebook-f'></i>
                                        </Form.Group>
                                        <Form.Group className='mb-3 input_form_group'>
                                            <Form.Label>Twitter</Form.Label>
                                            <Form.Control
                                                type='textarea'
                                                placeholder='Your Twitter Handle'
                                                className='shadow-none form-control form_controll_edit_profile__new'
                                                name='title'
                                                size='lg'
                                                onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                value={
                                                    updateUserProfile.twitter
                                                }
                                                id='twitter'
                                            />
                                            <i className='input_form_group__logo fab fa-twitter'></i>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Col>
                            <Col
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                xl={6}
                                className='mb-3'
                            >
                                <div className='add_nft__right'>
                                    <Form className='formGroup'>
                                        <Form.Group
                                            style={{ marginBottom: '1.8rem' }}
                                            className='input_form_group'
                                        >
                                            <Form.Label>Instagram</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Your Instagram Handle'
                                                className='inputField shadow-none form-control form_controll_edit_profile__new'
                                                name='title'
                                                size='lg'
                                                onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                value={
                                                    updateUserProfile.instagram
                                                }
                                                id='instagram'
                                            />
                                            <i className='fab input_form_group__logo fa-instagram'></i>
                                        </Form.Group>
                                        <Form.Group
                                            style={{ marginBottom: '1.8rem' }}
                                            className='input_form_group'
                                        >
                                            <Form.Label>Discord</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Your Discord Handle'
                                                className='shadow-none form-control form_controll_edit_profile__new'
                                                name='description'
                                                size='lg'
                                                onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                value={
                                                    updateUserProfile.discord
                                                }
                                                id='discord'
                                            />
                                            <i className='fab input_form_group__logo fa-discord'></i>
                                        </Form.Group>
                                        <Form.Group className='mb-3 input_form_group'>
                                            <Form.Label>Linked In</Form.Label>
                                            <Form.Control
                                                type='textarea'
                                                placeholder='Your LinkedIn Handle'
                                                className='shadow-none form-control form_controll_edit_profile__new'
                                                name='title'
                                                size='lg'
                                                onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                value={
                                                    updateUserProfile.linkedIn
                                                }
                                                id='linkedIn'
                                            />
                                            <i className='fab input_form_group__logo fa-linkedin-in'></i>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Col>
                            <Form.Group className='mb-3'>
                                <a
                                    className='btn_brand mr-3'
                                    onClick={updateUserDetails}
                                >
                                    Save Profile
                                </a>
                                <a
                                    className='btn_brand'
                                    onClick={() => {
                                        setEditProfile(false)
                                    }}
                                >
                                    Cancel
                                </a>
                            </Form.Group>
                        </div>
                    </div>
                ) : (
                    ''
                )}

                {/* <h5 className='text-center mb-5'>Wallet Address</h5> */}
                <div className='_user__id'>
                    <h5 className='text-center mb-2'>
                        {(userInfo && userInfo.wallets.length !== 0) && 'Wallet Address'}
                        {/* <span className="wallet-plus" onClick={() => setOpen(true)}>
                        <i className="fas fa-plus-square"></i>
                    </span> */}
                    </h5>
                    {userInfo &&
                        userInfo.wallets &&
                        userInfo.wallets.map((wallet: any) => (
                            <div className='copyAddress'>
                                <p onClick={(e) => setWalletCopy(e)}>
                                    {wallet}{' '}
                                    <span>
                                        <FiCopy />
                                    </span>
                                </p>
                                {userInfo.wallets.length !== 1 && (
                                    <img
                                        src={AiFillDelete}
                                        className='delete_wallet'
                                        onClick={(e) => deleteWallet(e)}
                                    />
                                )}
                                <div className='toolt'>
                                    {isCopied ? 'Copied' : 'Copy'}
                                </div>
                            </div>
                        ))}
                        {userInfo && userInfo.wallets && userInfo.wallets.length < 5 && (<span onClick={() => setOpen(true)} className='addNewWallet' style={{position: 'relative', display: 'flex', alignItems: 'center'}}><AddWallet style={{height: '35px', width: '35px'}} /> <span style={{position: 'absolute', width: '140px', left: '45px', display: 'none', padding: "5px 8px", background: '#ffffffe6', color: 'black'}}>Add new wallet</span></span>)}
                </div>
                <div
                    className='share-dashboard'
                    onClick={() => setopenShareProfile(true)}
                >
                    <Share />
                    <span
                        className='show-share-dashboard'
                        style={{ color: '#fff' }}
                    >
                        Share Profile
                    </span>
                </div>
                {userInfo.isVerified && (
                    <div
                        className='share-dashboard top-70'
                        onClick={() => setEditProfile(!editProfile)}
                    >
                        <AiOutlineEdit
                            style={{ width: '20px', height: '20px' }}
                        />
                        <span
                            className='show-share-dashboard'
                            style={{ color: '#fff' }}
                        >
                            {editProfile ? 'Cancel' : 'Edit Profile'}
                        </span>
                    </div>
                )}
                {!userInfo.isVerified && (<div
                    className='share-dashboard top-140'
                    onClick={() => setRegisterPopUpShow(true)}
                >
                    <BsWallet2 />
                    <span
                        className='show-share-dashboard'
                        style={{ color: '#fff' }}
                    >
                        Register
                    </span>
                </div>)}
            </Container>
            <div
                className={
                    !portfolioNFTSLoaded && !loading
                        ? 'market_place dashboard'
                        : 'dashboard'
                }
            >
                <div className='section_info'>
                    <p className='section_small_heading'>NFTs</p>
                    <h1 className='section_heading'>My Collection</h1>
                </div>
                <Container>
                    <Row>
                        {getUserNFT &&
                            getUserNFT.map((item: any) => {
                                return (
                                    <Col
                                        xl={4}
                                        lg={4}
                                        md={6}
                                        sm={6}
                                        xs={5}
                                        className='mb-3'
                                        key={item.id}
                                    >
                                        <NFTCollection
                                            item={item}
                                            transID={setHash}
                                        />
                                        {/* {NFTCollection({ item, setHash })} */}
                                    </Col>
                                )
                            })}
                        {getUserAuction &&
                            getUserAuction.map((item: any) => {
                                return (
                                    <Col
                                        xl={4}
                                        lg={4}
                                        md={6}
                                        sm={6}
                                        xs={5}
                                        className='mb-3'
                                        key={item.id}
                                    >
                                        <NFTCollection
                                            item={item}
                                            transID={setHash}
                                        />
                                    </Col>
                                )
                            })}
                        {getUserNFT.length === 0 && NFTSLoaded && (
                            <>
                                {Array(10)
                                    .fill(0, 0, 3)
                                    .map((_, i) => (
                                        <Col
                                            xl={4}
                                            lg={4}
                                            md={6}
                                            sm={6}
                                            xs={5}
                                            className='mb-3'
                                            key={i}
                                        >
                                            <div className='nft_card loading'>
                                                <div className='nft_card_image_wrapper'>
                                                    <div className='nft_card_image skeleton'></div>
                                                    <div className='user_image skeleton'></div>
                                                </div>
                                                <h4 className='skeleton'></h4>
                                                <h4 className='skeleton'></h4>
                                                <div className='btn_loading skeleton'></div>
                                            </div>
                                        </Col>
                                    ))}
                            </>
                        )}
                    </Row>
                    {(getUserAuction.length === 0 && getUserNFT.length === 0 && !NFTSLoaded) && <h4 style={{textAlign: "center", marginBottom: '15rem'}}>No items to display</h4>}
                </Container>
                <RegisterPopUp
                    RegisterPopUpShow={RegisterPopUpShow}
                    RegisterPopUpClose={() => setRegisterPopUpShow(false)}
                    walletAddress={userAddress}
                    userType2={'true'}
                />
                <ShareProfile
                    show={openShareProfile}
                    handleClose={() => setopenShareProfile(false)}
                />
            </div>
        </>
    )
}

export default withRouter(Dashboard)
