import axios from "axios";
import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import MarketCard from "../Components/MarketPlace/NFTCard/MarketCard";
import ArtistCard from "../Components/MarketPlace/NFTCard/ArtistCard";
import { backendUrl } from "../config";

const GlobalSearch = (props: any) => {
  const [artists, setartists] = useState<any>([])
  const [nfts, setnfts] = useState<any>([])
  const [loaded, setloaded] = useState<any>(false)

    useEffect(() => {
        axios.get(`${backendUrl}/users/globalSearch/${props.location.pathname.split("/").pop()}`).then((res: any) => {
            console.log(res.data)
            setartists(res.data.users)
            setnfts(res.data.nfts)
            setloaded(true)
        })
    }, [props.location.pathname.split("/").pop()]);
    
  return (
    <div style={{padding: '100px', paddingBottom: '0', marginTop: '60px'}}>
        {nfts.length !== 0 ? (
          <Row>
            {nfts.map((item: any) => (
                <Col
                    xl={4}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={5}
                    className='mb-3'
                    key={item.id}
                >
                    <MarketCard item={item} />
                </Col>
            ))}
          </Row>
        ) : (!loaded && <Row>
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
                              <h6 className='skeleton'></h6>
                              <h6 className='skeleton'></h6>
                              <div className='btn_loading skeleton'></div>
                          </div>
                      </Col>
                  ))}
          </Row>)}
        {artists.length !== 0 ? (
          <Row>
            {artists.map((item: any) => (
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
          </Row>
        ) : ''}
        {(artists.length === 0 && nfts.length === 0 && loaded) && (<h3 style={{marginBottom: '200px', textAlign: 'center'}}>No Search Results</h3>)}
    </div>
  )
}

export default withRouter(GlobalSearch)
