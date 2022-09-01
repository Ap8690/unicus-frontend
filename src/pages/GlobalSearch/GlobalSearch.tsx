import axios from "axios";
import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from "react";
import {ExploreElements} from "../../pages/Explore/ExploreElements";
// import ArtistCard from "../Components/MarketPlace/NFTCard/ArtistCard";
import { BASE_URL } from "../../config";
import {useParams} from "react-router-dom"
import NotFound from "../../components/404/NotFound";
import NftSkeletonLoader from "../../components/Loading/SkeletonLoading/NftSkeletonLoader";


const GlobalSearch = (props: any) => {
  const [artists, setartists] = useState<any>([])
  const [nfts, setnfts] = useState<any>([])
  const [loaded, setloaded] = useState<any>(false)
  const [loading,setLoading] = useState<Boolean>(true)
  let {search} = useParams()
    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/users/globalSearch/${search}`)
        .then((res: any) => {
          
            console.log(res.data)
            setartists(res.data.users)
            setnfts(res.data.nfts)
            setloaded(true)
            setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        }) 
    }, [search]);
    
  return (
    <section className="explore">
      <h1 className="explore-heading">NFT Results</h1>
        {loading ? <NftSkeletonLoader /> : nfts.length !== 0 ? (<ExploreElements elements={nfts} />) : <NotFound/>}
    </section>
  )
}

export default GlobalSearch