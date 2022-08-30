import axios from "axios";
import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from "react";
import {ExploreElements} from "../../pages/Explore/ExploreElements";
// import ArtistCard from "../Components/MarketPlace/NFTCard/ArtistCard";
import { BASE_URL } from "../../config";
import {useParams} from "react-router-dom"
import NotFound from "../../components/404/NotFound";
const GlobalSearch = (props: any) => {
  const [artists, setartists] = useState<any>([])
  const [nfts, setnfts] = useState<any>([])
  const [loaded, setloaded] = useState<any>(false)
  let {search} = useParams()
    useEffect(() => {
        axios.get(`${BASE_URL}/users/globalSearch/${search}`).then((res: any) => {
            console.log(res.data)
            setartists(res.data.users)
            setnfts(res.data.nfts)
            setloaded(true)
        })
    }, [search]);
    
  return (
    <section className="explore">
      <h1 className="explore-heading">NFT</h1>
        {nfts.length !== 0 ? (
         <ExploreElements elements={nfts} />
        ) : <NotFound/>}
        {/* {artists.length !== 0 ? (
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
        {(artists.length === 0 && nfts.length === 0 && loaded) && (<h3 style={{marginBottom: '200px', textAlign: 'center'}}>No Search Results</h3>)} */}
    </section>
  )
}

export default GlobalSearch