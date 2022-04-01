import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { backendUrl } from '../../../config'

const ResetPasswordPopUp = (props: any) => {
    const [email, setemail] = useState<any>('')
    const [disabled, setdisabled] = useState<boolean>(false)
    const [password, setpassword] = useState<any>('')
    const [error, seterror] = useState<any>('')

    function handleResetPassword() {
        if (!password) {
            seterror('Fields should not be empty')
        } else {
            setdisabled(true)
            axios.post(`${backendUrl}/auth/reset-password`, {
                token: props.location.pathname.split('/')[2],
                email: props.location.pathname.split('/')[3],
                password: password,
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

    function closeRedirect() {
        props.ResetPasswordPopUpClose()
        props.history.push('/')
    }

    return (
        <>
            <Modal
                className='buy__token__modal successModal wallets nftmodal-dialog'
                show={props.ResetPasswordPopUpShow}
                onHide={closeRedirect}
            >
                <div className='buy__cpt__modal fixWidth'>
                    <div className='buy__cpt__header'>
                        <div className='buy__cpt__header__tile mb-3'>
                            <h4>Reset Password</h4>
                        </div>
                        <div
                            className='buy__cpt__header__close'
                            onClick={props.ResetPasswordClose}
                        >
                            <CgClose />
                        </div>
                    </div>
                    <div className='success__body create_nft_modal fix-UI'>
                        <Form.Group className='mb-2'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                className='shadow-none form-control'
                                name='password'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                size='lg'
                            />
                            {error && (
                                <p
                                    className={
                                        error.includes('successfully updated')
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
                                onClick={handleResetPassword}
                            >
                                Reset Password
                            </button>
                        </Form.Group>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default withRouter(ResetPasswordPopUp)
