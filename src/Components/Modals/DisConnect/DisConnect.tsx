import { Modal } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { ReactComponent as FiCopy } from '../../../Assets/react-icons/FiCopy.svg'
import useClipboard from 'react-use-clipboard'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'

// redux imports
import { useDispatch } from 'react-redux'
import { disConnectWallet } from '../../../Redux/Profile/actions'

// Svgs
import { WalletsPopupProps } from '../../../Utilities/Util'

const DisConnect = ({ show, handleClose }: WalletsPopupProps) => {
    // redux State
    const dispatch = useDispatch()
    const { userAddress, userInfo } = useSelector(
        (state: any) => state.profile
    )

    //   clipboard
    const [isCopied, setCopied] = useClipboard(userAddress, {
        successDuration: 2000,
    })
    return (
        <>
            <Modal
                className='buy__token__modal successModal wallets Disconnecct'
                show={show}
                onHide={handleClose}
            >
                <div className='buy__cpt__modal'>
                    <div className='buy__cpt__header'>
                        <div
                            className={
                                userAddress
                                    ? 'buy__cpt__header__tile mt-2'
                                    : 'buy__cpt__header__tile mb-3 mt-2'
                            }
                        >
                            <h4>
                                {userAddress
                                    ? 'Disconnect User'
                                    : 'Connect Wallet'}
                            </h4>
                        </div>
                        <div
                            className='buy__cpt__header__close'
                            onClick={handleClose}
                        >
                            <CgClose />
                        </div>
                    </div>
                    {userAddress && (
                        <h5 className='disconnect-wallet'>Wallet Address</h5>
                    )}
                    <div className='success__body'>
                        {userAddress ? (
                            <div className='user__id'>
                                <p
                                    onClick={setCopied}
                                    className='txt__gray id txt__change__click_id'
                                >
                                    {userInfo && userInfo?.wallets[0]}
                                    <span>
                                        <FiCopy />
                                    </span>
                                </p>
                                <div className='toolt'>
                                    {isCopied ? 'Copied' : 'Copy'}
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleClose}
                                className='btn_brand w-100 mb-4'
                            >
                                <LinkContainer to='/portfolio'>
                                    <Nav.Link className='navLinks'>
                                        Connect Wallet
                                    </Nav.Link>
                                </LinkContainer>
                            </button>
                        )}
                    </div>
                    {userAddress && (
                        <div>
                            <button
                                onClick={setCopied}
                                className='btn_brand w-100 mb-3 btn_outlined'
                            >
                                {isCopied ? 'Copied' : 'Copy to Clipboard'}
                            </button>
                        </div>
                    )}
                    <div>
                        <div className='buy__cpt__header'>
                            <div className='buy__cpt__header__tile mb-3'>
                                <h4>
                                    {!(userAddress) &&
                                        'Disconnect User'}
                                </h4>
                            </div>
                        </div>
                        <button
                            onClick={() => dispatch(disConnectWallet())}
                            className='btn_brand w-100 mb-3 cl-white'
                        >
                            {userAddress
                                ? 'Disconnect User'
                                : 'Disconnect User'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DisConnect
