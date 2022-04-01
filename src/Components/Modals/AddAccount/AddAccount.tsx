import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Image, Modal } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import axios from 'axios'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { backendUrl } from '../../../config'
import {
    getUserInfo,
    getaccessToken,
    getuserAddress,
} from '../../../Redux/Profile/actions'
import web3 from '../../../web3'
import DefaultErrorModal from '../DefaultErrorModal'
import './AddAccount.scss'
import Web3 from 'web3'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const AddAccount = (props: any) => {
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector((state: any) => state.profile)
    const [defaultErrorModal, setdefaultErrorModal] = useState(false)
    const [defaultErrorMessage, setdefaultErrorMessage] = useState('')
    const [metaWalletAddress, setMetaWalletAddress] = useState('')
    const [metaWalletConnected, setMetaWalletConnected] = useState(false)

    const [updateResponse, setUpdateResponse] = useState(false)
    const [errorUpdate, setErrorUpdate] = useState(false)

    const [serverError, setServerError] = useState(false)
    const handledefaultErrorModal = () => {
        setdefaultErrorModal(false)
    }

    const updateWalletAddress = async (e: any) => {
        e.preventDefault()

        //if field empty show error
        if (!metaWalletAddress) {
            setErrorUpdate(true)
            return
        }
        const axiosConfig: any = {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }
        axios
            .get(
                `${backendUrl}/users/addWallet/${metaWalletAddress}`,
                axiosConfig
            )
            .then(async (res: any) => {
                setUpdateResponse(true)
                dispatch(getUserInfo(res.data.user))
                localStorage.setItem(
                    'userInfo',
                    JSON.stringify(res.data.user)
                )
                props.handleClose()
            })
            .catch((err) => {
                setServerError(true)
            })
    }

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            setMetaWalletAddress(accounts[0])
            setErrorUpdate(false)
            setServerError(false)
        })
    }
    return (
        <>
            <Modal
                className='buy__token__modal successModal wallets'
                show={props.show}
                onHide={props.handleClose}
            >
                <div className='buy__cpt__modal'>
                    <div className='buy__cpt__header'>
                        <div className='buy__cpt__header__tile mb-3'>
                            <h4>Add your metamask account</h4>
                        </div>
                        <div
                            className='buy__cpt__header__close'
                            onClick={props.handleClose}
                        >
                            <CgClose />
                        </div>
                    </div>
                    <div className='success__body mb-4'>
                        <div className='wallet-input'>
                            <Form>
                                <Form.Group
                                    className='mb-3'
                                    controlId='formBasicEmail'
                                >
                                    <Form.Label>Wallet Address</Form.Label>
                                    <Form.Control
                                        type='text'
                                        // id="metaWalletAddress"
                                        placeholder={
                                            'Enter your Wallet Address here'
                                        }
                                        onChange={(e) =>
                                            setMetaWalletAddress(e.target.value)
                                        }
                                        value={metaWalletAddress}
                                    />
                                </Form.Group>
                                {updateResponse && (
                                    <p style={{ color: '#4dff4d' }}>
                                        Wallet Updated Successfully
                                    </p>
                                )}
                                {errorUpdate && (
                                    <p style={{ color: '#fb0000' }}>
                                        Please switch your account{' '}
                                    </p>
                                )}
                                {serverError && (
                                    <p style={{ color: '#fb0000' }}>
                                        User already exists with this wallet{' '}
                                    </p>
                                )}
                                {userInfo && userInfo.wallets.length >= 5 && (
                                    <p style={{ color: '#fb0000' }}>
                                        Wallets Limit Reached{' '}
                                    </p>
                                )}
                                <Button
                                    variant='primary'
                                    // type="submit"
                                    disabled={
                                        userInfo && userInfo.wallets.length >= 5
                                    }
                                    onClick={(e) => updateWalletAddress(e)}
                                >
                                    Add Address
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
            <DefaultErrorModal
                DefaultErrorModalShow={defaultErrorModal}
                DefaultErrorModalClose={() => handledefaultErrorModal()}
                DefaultErrorMessage={defaultErrorMessage}
            />
        </>
    )
}

export default AddAccount
