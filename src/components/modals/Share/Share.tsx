import { Modal } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { ReactComponent as FiCopy } from '../../../Assets/react-icons/FiCopy.svg'
import useClipboard from 'react-use-clipboard'
import { useSelector } from 'react-redux'
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share'
import {
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from 'react-share'

// redux imports
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
// Svgs

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
        if(props.general){
        if (userInfo) {
            setshareUrl(
              props.artistInfoLink
                ? props.artistInfoLink
                : `https://${window.location.host.split(".")[0]}.unicus.one/artist/${userInfo.username}`
            );
            settitle(props.general.storeName)
        } else {
            setshareUrl(
              props.artistInfoLink
                ? props.artistInfoLink
                : `https://${
                    window.location.host.split(".")[0]
                  }.unicus.one/artist/${userInfo.username}`
            );
            settitle(props.general.storeName);
        }
    }
    }, [userInfo, props.general])
    const [isCopied, setCopied] = useClipboard(
      props.artistInfoLink
        ? props.artistInfoLink
        : `https://${window.location.host.split(".")[0]}.unicus.one/artist/${
            userInfo.username
          }`,
      {
        successDuration: 2000,
      }
    );

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
                                <p onClick={setCopied} className='txt__gray id' style={{overflow:"auto"}}>
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

