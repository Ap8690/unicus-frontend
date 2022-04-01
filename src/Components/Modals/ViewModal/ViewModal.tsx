import { Modal } from 'react-bootstrap'
import './ViewModal.scss'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../../config'

const ViewModal = (props: any) => {
    const [views, setviews] = useState([])

    useEffect(() => {
        if(props.show) {
            axios.get(`${backendUrl}/nft/getNFTViews/${props.nftId}`).then((res: any) => {
                setviews(res.data.views[0] ? res.data.views[0].views : [])
            })
        }
    }, [props.show])
    
    return (
        <>
            <Modal
                className='buy__token__modal successModal wallets'
                show={props.show}
                onHide={props.handleClose}
            >
                <div style={{paddingBottom: '10px'}} className='buy__cpt__modal'>
                    <div className='buy__cpt__header'>
                        <div className='buy__cpt__header__tile mb-3'>
                            <h4>Total NFT Views</h4>
                        </div>
                        <div
                            className='buy__cpt__header__close'
                            onClick={props.handleClose}
                        >
                            <CgClose />
                        </div>
                    </div>
                    <div className='success__body'>
                        {views.slice(0).reverse().map((obj: any) => {
                            console.log(obj)
                            return (<div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.7rem'}}>
                                {(obj.profileUrl ? (
                                        <img
                                            id='globalUser'
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit:
                                                    'fill',
                                                borderRadius:
                                                    '100%',
                                            }}
                                            src={
                                                obj.profileUrl
                                            }
                                        />
                                    ) : (
                                        <Avatar
                                            id='globalUser'
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                color: '#fff',
                                                background:
                                                    '#bebebe',
                                            }}
                                        ></Avatar>
                                    ))}
                                <div>
                                    <h5 style={{fontSize: '18px', marginBottom: '0.1rem', textAlign: 'left'}}>{obj.username}</h5>
                                    <h5 style={{fontSize: '18px', marginBottom: '0', textAlign: 'left'}}>{obj.bio}</h5>
                                </div>
                            </div>)
                        })}
                        {views.length == 0 && <h5>No views yet</h5>}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ViewModal
