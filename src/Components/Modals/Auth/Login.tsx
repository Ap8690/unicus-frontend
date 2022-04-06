import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getaccessToken, getUserInfo } from '../../../Redux/Profile/actions'
import ForgotPassword from './ForgotPassword'
import { backendUrl } from '../../../config'
import Cookies from 'js-cookie'


const LoginPopUp = (props: any) => {
    const dispatch = useDispatch()
    const [ForgotPasswordShow, setForgotPasswordShow] = useState(false)
    const [email, setemail] = useState<any>('')
    const [disabled, setdisabled] = useState<boolean>(false)
    const [password, setpassword] = useState<any>('')
    const [error, seterror] = useState<any>('')

    function handleLogin() {
        if (!email || !password) {
            seterror('Fields should not be empty')
        } else {
            setdisabled(true)
            axios.post(`${backendUrl}/auth/login`, {
                email: email,
                password: password,
              })
              .then(async (res: any) => {
                dispatch(getaccessToken(res.data.accessToken));
                axios.defaults.headers.common["Authorization"] =
                  "Bearer" + res.data.accessToken;
                localStorage.setItem("accessToken", res.data.accessToken);
                dispatch(getUserInfo(res.data.user));
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                Cookies.set("accessToken", res.data.accessToken, {
                  domain: "unicus.one",
                });
                Cookies.set("userInfo", JSON.stringify(res.data.user), {
                  domain: "unicus.one",
                });

                props.LoginPopUpClose();
                if (props.location.pathname.includes("login")) {
                  props.history.push("/");
                }
                else{
                    props.history.push(props.redirectUrl)
                }
              })
              .catch((err) => {
                seterror(err.response.data.msg);
                setdisabled(false);
              });
        }
    }

    function closeRedirect() {
        props.LoginPopUpClose()
        if(props.location.pathname.includes('login')) {
            props.history.push('/')
        }
    }

    return (
        <>
            <Modal
                className='buy__token__modal successModal wallets nftmodal-dialog'
                show={props.LoginPopUpShow}
                onHide={closeRedirect}
            >
                <div className='buy__cpt__modal fixWidth'>
                    <div className='buy__cpt__header'>
                        <div className='buy__cpt__header__tile mb-3'>
                            <h4>{props.storeRegistration? "Store Manager Login": "Login"}</h4>
                        </div>
                        <div
                            className='buy__cpt__header__close'
                            onClick={closeRedirect}
                        >
                            <CgClose />
                        </div>
                    </div>
                    <div className='success__body create_nft_modal fix-UI'>
                        <Form.Group className='mb-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Email'
                                className='shadow-none form-control'
                                name='email'
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                size='lg'
                            />
                            <Form.Label className='mt-3'>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                className='shadow-none form-control'
                                name='pmail'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                size='lg'
                            />
                            {!error && props.message ? (
                                <p
                                    className={
                                        props.message.includes(
                                            'Email Successfully Verified'
                                        )
                                            ? 'mt-3 greenpopup'
                                            : 'mt-3 redpopup'
                                    }
                                >
                                    {props.message}
                                </p>
                            ) : (
                                <p className='mt-3 redpopup'>{error}</p>
                            )}
                            <p
                                className='forgotpassword'
                                onClick={() => {
                                    props.LoginPopUpClose()
                                    setForgotPasswordShow(true)
                                }}
                            >
                                Forgot Password?
                            </p>
                            <button
                                disabled={disabled}
                                className='btn_brand mt-3'
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </Form.Group>
                    </div>
                </div>
            </Modal>
            <ForgotPassword
                ForgotPasswordShow={ForgotPasswordShow}
                ForgotPasswordClose={() => setForgotPasswordShow(false)}
            />
        </>
    )
}

export default withRouter(LoginPopUp)
