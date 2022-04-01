import Avatar from '@mui/material/Avatar'

// svg
import { Link } from 'react-router-dom'
// redux imports
import dashboardBackImage from '../../../Assets/dashboard-back.svg'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { ethChain, polygonChain } from '../../../config'
// import WalletsPopup from '../../Modals/WalletsPopup/WalletsPopup'
// import DisConnect from '../../Modals/DisConnect/DisConnect'
// import {useEffect, useState} from 'react'

const ArtistCard = ({ item }: any) => {
    const { networkID } =
        useSelector((state: any) => state.profile)

    // redux state
    const [price, setprice] = useState('')
    const [projectLoaded, setprojectLoaded] = useState(false)

    useEffect(() => {
        if (networkID === ethChain) {
            setprice('Eth')
        } else if (networkID === polygonChain) {
            setprice('Matic')
        } else {
            setprice('BNB')
        }
    }, [])

    return (
        <>
            <Link
                to={{
                    pathname: `/artist/${item.username.trim()}`,
                }}
            >
                <div className={projectLoaded ? 'nft_card' : 'nft_card loading'}>
                    <div className='nft_card_image_wrapper'>
                    {!projectLoaded && (
                        <div className='nft_card_image skeleton'></div>
                    )}
                    {(<div className='nft_card_image' style={projectLoaded ? {height: '250px'} : {display: 'none', height: '250px'}}>
                    <img
                        style={{height: '260px'}}
                        src={
                            item.backgroundUrl
                                ? item.backgroundUrl
                                : dashboardBackImage
                        }
                        onLoad={() => setprojectLoaded(true)}
                        alt={item.username}
                    />
                    </div>)}
                    <div
                            className='user_image'
                            style={{
                                height: '110px',
                                width: '110px',
                                bottom: '-50px',
                            }}
                        >
                            {item.profileUrl ? <img
                                src={
                                    item.profileUrl
                                }
                            /> : <Avatar sx={{
                                width: '100%',
                                height: '100%',
                                color: '#fff',
                                background: '#bebebe',
                            }}/>}
                        </div>
                    </div>
                    <h5
                        style={{
                            textAlign: 'center',
                            marginBottom: '20px',
                            marginTop: '70px',
                            color: 'var(--text_default_pure)',
                        }}
                        title={item.username}
                    >
                        {item.username}
                    </h5>
                </div>
            </Link>
        </>
    )
}

export default ArtistCard
