import { Image, Modal } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { ReactComponent as FiCopy } from '../../../Assets/react-icons/FiCopy.svg'
import useClipboard from 'react-use-clipboard'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
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

// redux imports
import { useDispatch } from 'react-redux'
import { disConnectWallet } from '../../../Redux/Profile/actions'
import { useEffect, useState } from 'react'
// Svgs
import MetaMask from '../../../Assets/MetaMask.svg'
import Coinbase from '../../../Assets/coinbase_Wallet.svg'
import walletConnect_wallet from '../../../Assets/LandingPage/WalletConnectCircle.svg'
import mew_wallet from '../../../Assets/mew.svg'

const ShareProfile = (props: any) => {
    // redux State
    const dispatch = useDispatch()
    const { userAddress, walletType, userInfo } = useSelector(
        (state: any) => state.profile
    )

    //   clipboard
    const [shareUrl, setshareUrl] = useState('')
    const [title, settitle] = useState('')

    useEffect(() => {
        if (userInfo) {
            setshareUrl(props.artistInfoLink ? props.artistInfoLink : `https://unicus.one/artist/${userInfo.username}`)
            settitle('Unicus')
        } else {
            setshareUrl(props.artistInfoLink ? props.artistInfoLink : `https://unicus.one/artist/${userInfo.username}`)
            settitle('Unicus')
        }
    }, [userInfo])
    const [isCopied, setCopied] = useClipboard(
        props.artistInfoLink ? props.artistInfoLink : `https://unicus.one/artist/${userInfo.username}`,
        {
            successDuration: 2000,
        }
    )

    return (
        <>
            <Modal
                className='buy__token__modal successModal wallets Disconnecct'
                show={props.show}
                onHide={props.handleClose}
            >
                <div className='buy__cpt__modal'>
                    <div className='buy__cpt__header'>
                        <div
                            style={{ marginBottom: '30px' }}
                            className={
                                'buy__cpt__header__tile mt-2'
                            }
                        >
                            <h4>Share Portfolio</h4>
                        </div>
                        <div
                            className='buy__cpt__header__close'
                            onClick={props.handleClose}
                        >
                            <CgClose />
                        </div>
                    </div>
                    <div className='success__body'>
                        <WhatsappShareButton
                            url={shareUrl}
                            title={title}
                            separator=':: '
                            className='Demo__some-network__share-button mr-3 mb-3'
                        >
                            <WhatsappIcon size={42} round />
                        </WhatsappShareButton>
                        <TwitterShareButton
                            url={shareUrl}
                            title={title}
                            className='Demo__some-network__share-button mr-3'
                        >
                            <TwitterIcon size={42} round />
                        </TwitterShareButton>
                        <LinkedinShareButton
                            url={shareUrl}
                            className='Demo__some-network__share-button mr-3'
                        >
                            <LinkedinIcon size={42} round />
                        </LinkedinShareButton>
                        <FacebookShareButton
                            url={shareUrl}
                            quote={title}
                            className='Demo__some-network__share-button mr-3'
                        >
                            <FacebookIcon size={42} round />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton
                            url={shareUrl}
                            appId='521270401588372'
                            className='Demo__some-network__share-button mr-3'
                        >
                            <FacebookMessengerIcon size={42} round />
                        </FacebookMessengerShareButton>
                        <TelegramShareButton
                            url={shareUrl}
                            title={title}
                            className='Demo__some-network__share-button'
                        >
                            <TelegramIcon size={42} round />
                        </TelegramShareButton>
                        {
                            <div className='user__id'>
                                <p onClick={setCopied} className='txt__gray id'>
                                    {props.artistInfoLink ? props.artistInfoLink : `https://unicus.one/artist/${userInfo.username}`}
                                    <span>
                                        <FiCopy />
                                    </span>
                                </p>
                                <div className='toolt'>
                                    {isCopied ? 'Copied' : 'Copy'}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ShareProfile

