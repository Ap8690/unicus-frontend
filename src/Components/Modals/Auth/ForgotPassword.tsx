import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { backendUrl } from '../../../config'

const ForgotPassword = (props: any) => {
    const [email, setemail] = useState<any>('')
    const [disabled, setdisabled] = useState<boolean>(false)
    const [error, seterror] = useState<any>('')

    function handleForgotPassword() {
        if (!email) {
            seterror('Fields should not be empty')
        } else {
            setdisabled(true)
            axios.post(`${backendUrl}/auth/forgot-password`, {
                email: email,
            })
                .then((res: any) => {
                    seterror(res.data.msg)
                })
                .catch((err) => {
                    seterror(err.response.data.msg)
                    setdisabled(false)
                })
        }
    }

    return (
        <>
            <Modal
                className='buy__token__modal successModal wallets nftmodal-dialog'
                show={props.ForgotPasswordShow}
                onHide={props.ForgotPasswordClose}
            >
                <div className='buy__cpt__modal fixWidth'>
                    <div className='buy__cpt__header'>
                        <div className='buy__cpt__header__tile mb-3'>
                            <h4>Forgot Password</h4>
                        </div>
                        <div
                            className='buy__cpt__header__close'
                            onClick={props.ForgotPasswordClose}
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
                            {error && (
                                <p
                                    className={
                                        error.includes('reset password')
                                            ? 'mt-3 mb-0 greenpopup'
                                            : 'mt-3 mb-0 redpopup'
                                    }
                                >
                                    {error}
                                </p>
                            )}
                            <button
                                disabled={disabled}
                                className='btn_brand mt-3'
                                onClick={handleForgotPassword}
                            >
                                Forgot Password
                            </button>
                        </Form.Group>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default withRouter(ForgotPassword)
