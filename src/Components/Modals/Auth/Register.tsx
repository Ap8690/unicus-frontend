import { Modal, Col, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { useState } from 'react'
import axios from 'axios'
import './register.scss'
import { disConnectWallet } from '../../../Redux/Profile/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { backendUrl } from '../../../config'

const RegisterPopUp = (props: any) => {
    const dispatch = useDispatch()
    const [email, setemail] = useState<any>('')
    const [disabled, setdisabled] = useState<boolean>(false)
    const [error, seterror] = useState<any>('')
    const [success, setsuccess] = useState<any>('')
    const [password, setpassword] = useState<any>('')
    const { userInfo } = useSelector((state: any) => state.profile)
    const [userName, setUserName] = useState<any>('')

    function handleRegister() {
        var data: any
        if (props.walletAddress) {
            data = {
                email: email,
                password: password,
                username: userName,
                walletAddress: props.walletAddress,
                userType2: props.userType2,
                storeRegistration: props.storeRegistration
            }
        } else {
            data = {
              email: email,
              password: password,
              username: userName,
              storeRegistration: props.storeRegistration,
            };
        }

        if (!email || !password || (!userName && !props.userType2)) {
            seterror('Fields should not be empty')
        } else {
            setdisabled(true)
            axios
                .post(`${backendUrl}/auth/register`, data)
                .then((res: any) => {
                    setsuccess(res.data.msg)
                    seterror('')
                    setdisabled(false)
                    setTimeout(() => {
                        props.RegisterPopUpClose()
                    }, 5000);
                    if (props.userType2 === 'true') {
                        dispatch(disConnectWallet())
                    }
                })
                .catch((err) => {
                    setsuccess('')
                    if (err.response && err.response.data.msg.split(':')[2]) {
                        seterror(
                            err.response.data.msg.split(':')[2].split(',')[0]
                        )
                    } else {
                        if (err.response) {
                            seterror(err.response.data.msg)
                        }
                    }
                    setdisabled(false)
                })
        }
    }

    return (
        <>
            <Modal
                className='buy__token__modal successModal wallets nftmodal-dialog'
                show={props.RegisterPopUpShow}
                onHide={props.RegisterPopUpClose}
            >
                <div
                    className='buy__cpt__modal register___modal'
                    style={{ maxWidth: '400px !important' }}
                >
                    <div className='buy__cpt__header'>
                        <div className='buy__cpt__header__tile mb-3'>
                            <h4>{props.storeRegistration? "Store Manager Registration":"Register"}</h4>
                        </div>
                        <div
                            className='buy__cpt__header__close'
                            onClick={props.RegisterPopUpClose}
                        >
                            <CgClose />
                        </div>
                    </div>
                    {props.userType2 === 'true' &&
                        userInfo.verificationToken && (
                            <p>
                                Please verify your email ({userInfo.email}) or
                                register with another email
                            </p>
                        )}
                    <div className='row success__body create_nft_modal fix-UI'>
                        {/* <Row> */}
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                            className='mb-1 success__body_column'
                        >
                            <Form.Group className='mb-2'>
                                <Form.Label>Email*</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Email'
                                    className='shadow-none form-control mb-4'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    size='lg'
                                />
                                {props.userType2 !== 'true' && (
                                    <>
                                        <Form.Label>Display Name*</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Display Name'
                                            className='shadow-none form-control mb-4'
                                            name='userName'
                                            value={userName}
                                            onChange={(e) =>
                                                setUserName(e.target.value)
                                            }
                                            size='lg'
                                        />
                                    </>
                                )}
                                <Form.Label>Password*</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    className='shadow-none form-control'
                                    name='pmail'
                                    value={password}
                                    onChange={(e) =>
                                        setpassword(e.target.value)
                                    }
                                    size='lg'
                                />
                            </Form.Group>
                            {error && (
                                <p className='mt-2 mb-0 redpopup'>{error}</p>
                            )}
                            {success && (
                                <p className='mt-2 mb-0 greenpopup'>
                                    {success}
                                </p>
                            )}
                            <button
                                disabled={disabled}
                                className='btn_brand mt-3'
                                onClick={handleRegister}
                            >
                                {disabled ? 'Loading…' : 'Register'}
                            </button>
                        </Col>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default RegisterPopUp
