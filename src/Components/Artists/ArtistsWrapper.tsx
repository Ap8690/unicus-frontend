import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ArtistCard from '../MarketPlace/NFTCard/ArtistCard'
import { Avatar } from '@mui/material'
import { withRouter } from 'react-router-dom'
import { bscChain, ethChain, polygonChain, bscChainHex, ethChainHex, polygonChainHex } from '../../config'
import { backendUrl } from '../../config'

const ArtistsWrapper = (props: any) => {
    // redux state
    const { networkID } = useSelector((state: any) => state.profile)
    const [category, setCategory] = useState<string>('All')
    const [metadata, setmetadata] = useState<any>([])
    const [globalArtists, setglobalArtists] = useState<any>([])
    const [skiploading, setskiploading] = useState(true)
    const [NFTSLoaded, setNFTSLoaded] = useState(false)
    const [globalModalPopup2, setglobalModalPopup2] = useState(false)
    const [skip, setskip] = useState(0)

    const handleGlobalLink = (e: any, item: any) => {
        e.preventDefault()
        props.history.push(`/artist/${item.username.trim()}`)
    }

    async function fetchItems() {
        if (skiploading) {
            await axios
                .get(
                    `${backendUrl}/users/${skip}`
                )
                .then((res: any) => {
                  console.log(res.data.users)
                    const newData = metadata
                    newData.push(...res.data.users)
                    setmetadata(newData)
                    if (res.data.msg) {
                        setNFTSLoaded(true)
                    } else {
                        setskiploading(false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setskiploading(false)
                })
        }
    }

    useEffect(() => {
        if (networkID === localStorage.getItem('networkID') || networkID === bscChain) {
            fetchItems()
        } else {
            setskiploading(false)
        }
    }, [skip])

    const handleFormSubmit = (e: any) => {
        e.preventDefault()
    }

    window.addEventListener('scroll', async function () {
        var root: any
        root = document.querySelector('.market_place')?.getBoundingClientRect()
        if (root?.top + root?.height - this.window.innerHeight - 4200 < 0) {
            if (!skiploading) {
                setskiploading(true)
                setskip((prevState) => prevState + 30)
            }
        }
    })

    const handleGlobalModal = (e: any) => {
        e.preventDefault()
        if(e.target.value.length > 2) {
            axios.get(`${backendUrl}/users/globalSearch/${e.target.value}`).then((res: any) => {
                setglobalModalPopup2(true)
                setglobalArtists(res.data.users)
            })
        } else {
            setglobalModalPopup2(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', (event: any) => {
            if(event.target.name !== 'globalModalPopup2') {
                setglobalModalPopup2(false)
            }
        })
    }, []);

    return (
        <div className={!skiploading ? 'market_place nft_banner artist_banner' : 'nft_banner artist_banner'} style={{marginBottom: '0px', paddingBottom: '0px'}}>
          <div className='section_info mb-new'>
                <h1 className='section_heading'>Artist</h1>
                <div style={{display: 'flex', margin: '2rem auto 3rem auto'}}>
                <form className='wrapper d-flex align-items-center' style={{margin: '0', position: 'relative'}} onSubmit={handleFormSubmit}>
                    <input
                        placeholder='Search Artists By Display Name or Wallet Address'
                        type='text'
                        className='form-control shadow-none input_box'
                        onChange={handleGlobalModal}
                        name="globalModalPopup2"
                    />
                    {globalModalPopup2 && (<div style={{background: '#002885', top: '39px', left: '0'}} className="globalModal">
                        {globalArtists.slice(0, 3).map((item: any) => {
                            return (
                                <a id="globalUser" onClick={(e) => {
                                    handleGlobalLink(e, item)
                                    }} href={`/artist/${item.username.trim()}`} style={{display: 'flex', alignItems: 'center', gap: '10px', margin: '0.4rem 0.5rem'}}>
                                    {item.profileUrl ? (<img id="globalUser" style={{width: '30px', height: '30px', objectFit: 'fill', borderRadius: '100%'}} src={item.profileUrl} />) : (<Avatar
                                        id="globalUser"
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            color: '#fff',
                                            background: '#bebebe',
                                        }}
                                    ></Avatar>)}
                                    <span id="globalUser">{item.username}</span>
                                </a>
                            )
                        })}
                        {globalArtists.length === 0 && (<>No result found</>)}
                    </div>)}
                </form>
                <button
                    type="submit"
                    className='btn_brand ms-3'
                    onClick={handleFormSubmit}
                >
                    Search
                </button>
                </div>
                {/* {errorMessage && errorMessage} */}
            </div>
            <Container>
                <Row>
                    {metadata &&
                        metadata
                            .filter((item: any) => {
                                if (category === 'All') {
                                    return true
                                } else {
                                    return item.category == category
                                }
                            })
                            .map((item: any) => (
                                <Col
                                    xl={4}
                                    lg={4}
                                    md={6}
                                    sm={6}
                                    xs={5}
                                    className='mb-3'
                                    key={item.id}
                                >
                                    <ArtistCard item={item} />
                                </Col>
                            ))}
                    {!NFTSLoaded && (
                        <>
                            {Array(10)
                                .fill(0, 0, 3)
                                .map((_, i) => (
                                    <Col
                                        xl={4}
                                        lg={4}
                                        md={6}
                                        sm={6}
                                        xs={5}
                                        className='mb-3'
                                        key={i}
                                    >
                                        <div className='nft_card loading'>
                                            <div className='nft_card_image_wrapper'>
                                                <div className='nft_card_image skeleton'></div>
                                                <div className='user_image skeleton'></div>
                                            </div>
                                            <h4 className='skeleton'></h4>
                                            <h4 className='skeleton'></h4>
                                            <div className='btn_loading skeleton'></div>
                                        </div>
                                    </Col>
                                ))}
                        </>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(ArtistsWrapper)