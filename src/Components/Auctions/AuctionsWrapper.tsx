import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import NFTCardAuctions from './NFTCard/NFTCardAuctions'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { bscChain } from '../../config'
import { backendUrl } from '../../config'

const AuctionsWrapper = () => {
    // redux state
    const { networkID } = useSelector((state: any) => state.profile)
    const [category, setCategory] = useState<string>('All')
    const [sortBy, setsortBy] = useState<any>([['createdAt',-1]])
    const [sortBy2, setsortBy2] = useState<any>('createdAt')
    const [metadata, setmetadata] = useState<any>([])
    const [totalAuctions, settotalAuctions] = useState(1)
    const [skiploading, setskiploading] = useState(true)
    const [NFTSLoaded, setNFTSLoaded] = useState(false)
    const [skip, setskip] = useState(0)

    async function fetchItems() {
        if (skiploading) {
            console.log(sortBy)
            await axios
                .get(
                    `${backendUrl}/auction/getAllAuction/${skip}/${networkID}/${encodeURIComponent(JSON.stringify(sortBy))}`
                )
                .then((res: any) => {
                    console.log(sortBy)

                    settotalAuctions(res.data.totalAuctions)
                    const newData = metadata
                    newData.push(...res.data.data)
                    setmetadata(newData)
                    console.log(newData)
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
    }, [skip, sortBy2])

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

    return (
        <div className={!skiploading ? 'market_place' : ''}>
            <div className='section_info'>
                <h1 className='section_heading'>Auctions</h1>
                <h1
                    className='section_heading'
                    style={{ color: '', fontSize: '20px' }}
                >
                    Unicus has exclusive assets and vast variety of NFT
                </h1>
            </div>
            <Container>
                <Row>
                    <div className='filters' style={{marginBottom: '20px'}}>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('All')
                            }}
                        >
                            <p>All</p>
                        </div>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('Funny')
                            }}
                        >
                            <p>Funny</p>
                        </div>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('Art')
                            }}
                        >
                            <p>Art</p>
                        </div>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('Nature')
                            }}
                        >
                            <p>Nature</p>
                        </div>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('Animal')
                            }}
                        >
                            <p>Animal</p>
                        </div>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('Sports')
                            }}
                        >
                            <p>Sports</p>
                        </div>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('Photography')
                            }}
                        >
                            <p>Photography</p>
                        </div>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('Music')
                            }}
                        >
                            <p>Music</p>
                        </div>
                        <div
                            className='filter_wrapper'
                            onClick={(event) => {
                                event.preventDefault()
                                setCategory('Metaverse')
                            }}
                        >
                            <p>Metaverse</p>
                        </div>
                    </div>
                    </Row>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                        <FormControl style={{marginBottom: '30px', width: '250px'}}>
                            <InputLabel id="demo-simple-select-label">SortBy</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortBy2}
                                label="SortBy"
                                onChange={(e: any) => {
                                    if(e.target.value.includes('price')) {
                                        if(e.target.value.includes('H')) {
                                            setsortBy([["lastBid",-1],["startBid",-1]])
                                        } else {
                                            setsortBy([["lastBid",1],["startBid",1]])
                                        }
                                    } else {
                                        setsortBy([[e.target.value,-1]])
                                    }
                                    setskip(0)
                                    setmetadata([])
                                    setNFTSLoaded(false)
                                    setskiploading(true)
                                    setsortBy2(e.target.value)
                                }}
                            >
                                <MenuItem value="createdAt">Date</MenuItem>
                                <MenuItem value="views">Views</MenuItem>
                                <MenuItem value="price H">Price (High to Low)</MenuItem>
                                <MenuItem value="price L">Price (Low to High)</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Row>
                    {metadata
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
                                <NFTCardAuctions item={item} />
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

export default AuctionsWrapper
