import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { backendUrl } from '../../config'
import ArtistCard from './ArtistCard'
import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import dashboardBackImage from '../../Assets/dashboard-back.svg'
import useClipboard from 'react-use-clipboard'
import { ReactComponent as FiCopy } from '../../Assets/react-icons/FiCopy.svg'
import defaultProfileImage from '../../Assets/default-profile-image.svg'
import ShareProfile from '../Modals/Share/Share'
import { ReactComponent as Share } from '../../Assets/react-icons/Share.svg'

const ArtistsBanner = (props: any) => {
    const { userAddress } = useSelector(
        (state: any) => state.profile
    )
    const [address, setAddress] = useState<any>()
    const [isCopied, setCopied] = useClipboard(userAddress, {
        successDuration: 2000,
    })
    const [loading, setLoading] = useState(false)
    const [ownedByNFTS, setownedByNFTS] = useState<any>([])
    const [auctions, setauctions] = useState<any>([])
    const [errorMessage, seterrorMessage] = useState<any>('')
    const [mintedByNFTS, setmintedByNFTS] = useState<any>([])
    const [nftUserInfo, setnftUserInfo] = useState<any>([])
    const [allNFTSLoaded, setallNFTSLoaded] = useState(true)
    const [openShareProfile, setopenShareProfile] = useState(false)

    useEffect(() => {
        if (props.location.pathname.split('/')[2]) {
            setAddress(props.location.pathname.split('/')[2])
            axios
                .post(`${backendUrl}/nft/getNFTByUserName`, {
                    username: props.location.pathname.split('/')[2],
                })
                .then((res: any) => {
                    setownedByNFTS(res.data.nftsOwned)
                    setmintedByNFTS(res.data.nftsMinted)
                    setauctions(res.data.auctions)
                    setnftUserInfo(res.data.user)
                    setallNFTSLoaded(false)
                })
                .catch(() => {
                    setallNFTSLoaded(false)
                    seterrorMessage('Artist Not Found')
                })
        }
    }, [props.location.pathname.split('/')[2]])

    return (
        <div className='nft_banner artist_banner' style={{marginBottom: '0px', paddingBottom: '0px'}}>
            {nftUserInfo.length !== 0 && (
                <>
                    <div id='back-image' style={{ width: '100% !important' }}>
                        {nftUserInfo &&
                        nftUserInfo.backgroundUrl &&
                        nftUserInfo.backgroundUrl.length > 0 ? (
                            <img
                                style={{marginTop: '0px'}}
                                className='dashboard-back'
                                src={nftUserInfo.backgroundUrl}
                                alt='dashboard back'
                            />
                        ) : (
                            <img
                                style={{marginTop: '0px'}}
                                className='dashboard-back'
                                src={dashboardBackImage}
                                alt='dashboard back'
                            />
                        )}
                    </div>
                    <Container className='pos-rel'>
                        <div className='profile_section'>
                            <div className='table' style={{width: '250px'}}>
                                <div className='table-cell'>
                                    <div id='profile'>
                                        {nftUserInfo &&
                                        nftUserInfo.profileUrl &&
                                        nftUserInfo.profileUrl.length > 0 ? (
                                            <img
                                                style={{
                                                    width: '200px',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    borderRadius: '100%',
                                                }}
                                                src={nftUserInfo.profileUrl}
                                            />
                                        ) : (
                                            <img
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '100%',
                                                }}
                                                src={defaultProfileImage}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='profile-name'>
                                <h5 className='profile-name_h5 mt-8 pt-2'>
                                    {nftUserInfo.username}
                                </h5>
                                {nftUserInfo.bio && (<h6
                                    className='profile-name_h6 mt-8 mb-2'
                                    style={{ width: '400px', textAlign: 'center' }}
                                >
                                    {nftUserInfo.bio}
                                </h6>)}
                                <h6 className='profile-name_h6 mt-8 pt-2 mb-2' style={{fontSize: '16px'}}>
                                    Joined{' '}
                                    {nftUserInfo &&
                                        nftUserInfo.createdAt &&
                                        nftUserInfo.createdAt.slice(0, 10)}
                                </h6>
                                <div
                            className='profile-name_social'
                            style={{ paddingLeft: '20px' }}
                        >
                            {nftUserInfo &&
                                nftUserInfo.facebook &&
                                nftUserInfo.facebook.length > 0 && (
                                    <a href={nftUserInfo.facebook} target='_blank'>
                                        <i className='fab fa-facebook-f'></i>
                                    </a>
                                )}
                            {nftUserInfo &&
                                nftUserInfo.instagram &&
                                nftUserInfo.instagram.length > 0 && (
                                    <a
                                        href={nftUserInfo.instagram}
                                        target='_blank'
                                    >
                                        <i className='fab fa-instagram'></i>
                                    </a>
                                )}
                            {nftUserInfo &&
                                nftUserInfo.discord &&
                                nftUserInfo.discord.length > 0 && (
                                    <a href={nftUserInfo.discord} target='_blank'>
                                        <i className='fab fa-discord'></i>
                                    </a>
                                )}
                            {nftUserInfo &&
                                nftUserInfo.linkedIn &&
                                nftUserInfo.linkedIn.length > 0 && (
                                    <a href={nftUserInfo.linkedIn} target='_blank'>
                                        <i className='fab fa-linkedin-in'></i>
                                    </a>
                                )}
                            {nftUserInfo &&
                                nftUserInfo.twitter &&
                                nftUserInfo.twitter.length > 0 && (
                                    <a href={nftUserInfo.twitter} target='_blank'>
                                        <i className='fab fa-twitter'></i>
                                    </a>
                                )}
                        </div>
                            </div>
                        </div>
                        <div className='_user__id'>
                            {nftUserInfo && nftUserInfo.wallets.length > 0 && <h5 className='text-center mb-2'>Wallet Address</h5>}
                            {nftUserInfo &&
                                nftUserInfo.wallets &&
                                nftUserInfo.wallets.map((wallet: any) => (
                                    <>
                                        <p onClick={setCopied}>
                                            {wallet}{' '}
                                            <span>
                                                <FiCopy />
                                            </span>
                                        </p>
                                        <div className='toolt'>
                                            {isCopied ? 'Copied' : 'Copy'}
                                        </div>
                                    </>
                                ))}
                        </div>
                        <div
                            className='share-dashboard'
                            onClick={() => setopenShareProfile(true)}
                        >
                            <Share />
                            <span className='show-share-dashboard'>Share Profile</span>
                        </div>
                    </Container>
                </>
            )}
            <div className='artist_nfts'  style={{marginTop: '130px', width: '100%'}}>
                {(ownedByNFTS?.length > 0 || auctions.length > 0) && (
                    <h1 className='section_heading mb-4'>Owned</h1>
                )}
                <div className='dashboard'>
                    <Container>
                        {loading && (
                            <Container>
                                <Row>
                                    {Array(10)
                                        .fill(0, 0, 3)
                                        .map((_) => (
                                            <Col
                                                xl={4}
                                                lg={4}
                                                md={6}
                                                sm={6}
                                                xs={5}
                                                className='mb-3 mr-5vw'
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
                                </Row>
                            </Container>
                        )}
                        <Row>
                            {ownedByNFTS &&
                                ownedByNFTS.map(
                                    (item: {
                                        id: number
                                        name: string // price: string
                                        royalty: string
                                        category: string
                                        description: string
                                        image: string
                                    }) => (
                                        <Col
                                            xl={4}
                                            lg={4}
                                            md={6}
                                            sm={6}
                                            xs={5}
                                            className='mb-3'
                                        >
                                            <ArtistCard item={item} />
                                        </Col>
                                    )
                                )}
                            {auctions &&
                                auctions.map(
                                    (item: {
                                        id: number
                                        name: string // price: string
                                        royalty: string
                                        category: string
                                        description: string
                                        image: string
                                    }) => (
                                        <Col
                                            xl={4}
                                            lg={4}
                                            md={6}
                                            sm={6}
                                            xs={5}
                                            className='mb-3'
                                        >
                                            <ArtistCard item={item} />
                                        </Col>
                                    )
                                )}
                        </Row>
                    </Container>
                </div>
            </div>
            <Container>
                {mintedByNFTS?.length > 0 && (
                    <h1 className='section_heading mt-5 mb-4'>Minted </h1>
                )}

                <Row className='fix__center'>
                    {loading && (
                        <Row>
                            {Array(10)
                                .fill(0, 0, 3)
                                .map((_) => (
                                    <Col
                                        xl={4}
                                        lg={4}
                                        md={6}
                                        sm={6}
                                        xs={5}
                                        className='mb-3'
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
                        </Row>
                    )}
                    {mintedByNFTS &&
                        mintedByNFTS.map(
                            (item: {
                                id: number
                                name: string // price: string
                                royalty: string
                                category: string
                                description: string
                                image: string
                            }) => (
                                <Col
                                    xl={4}
                                    lg={4}
                                    md={6}
                                    sm={6}
                                    xs={5}
                                    className='mb-3'
                                >
                                    <ArtistCard item={item} />
                                </Col>
                            )
                        )}
                </Row>
            </Container>
            {/* </Container> */}
            <ShareProfile
                artistInfoLink={window.location.href}
                    show={openShareProfile}
                    handleClose={() => setopenShareProfile(false)}
                />
        </div>
    )
}

export default withRouter(ArtistsBanner)
