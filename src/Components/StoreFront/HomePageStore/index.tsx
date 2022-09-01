import React, { useEffect, useState } from 'react'
import { Row,Col,Button } from 'react-bootstrap'
import DottedImage from "../../../Assets/DottedImage.png"
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import ReactHtmlParser from "react-html-parser";
import { IAppearance } from '../../../Models/Appearance'
import { IGeneral } from '../../../Models/General'
import { IStore } from '../../../Models/Store'
import SimpleNFTCard from '../../MarketPlace/NFTCard/SimpleNFTCard'
import { backendUrl } from '../../../config'


function HomePage(store: IStore) {
    const { networkID } = useSelector((state: any) => state.profile);
    const [category, setCategory] = useState<string>("All");
    const [generals, setGeneral] = useState<IGeneral>(store.general)
    const [Appearance, setAppearance] = useState<IAppearance>(store.appearance);
    const [recentCreated, setRecentCreated] = useState([])
    const [availableSale, setAvailableSale] = useState([])
    const [recentPurchased, setRecentPurchased] = useState([])

    const history = useHistory()
    useEffect(() => {
      setGeneral(store.general)
      setAppearance(store.appearance);
    }, [store])
    
    useEffect(()=>{
      init()
    },[])

    const init=async()=>{
      await axios.get(`${backendUrl}/nft/getRecent/${networkID}`).then((res)=>{
        console.log("recent", res.data.nfts);
        setRecentCreated(res.data.nfts);
      }).catch((err)=>{

      })
      await axios
        .get(
          `${backendUrl}/auction/getAllExplore/0/${networkID}/${encodeURIComponent(
            JSON.stringify([["createdAt", -1]])
          )}`
        )
        .then((res: any) => {
          console.log("available", res.data.data);
          setAvailableSale(res.data.data);
        })
        .catch((err) => {
          toast.error(err.messaage);
        });   
         await axios
        .get(`${backendUrl}/auction/getRecentPurchased/${networkID}`)
        .then((res: any) => {
          console.log("recent purchased", res.data.data);
          setRecentPurchased(res.data.data);
        })
        .catch((err) => {
          toast.error(err.messaage)
        }); 
    }
    
  return (
    <div className="px-3 px-sm-5">
      <Row className="homepage pt-5">
        <Col lg={6}>
          <div className="Paragraph1">
            {Appearance && Appearance.heading && Appearance.heading != "" ? (
              Appearance.heading
            ) : (
              <div>
                Create, Collect and sell extraordinary <p id="NFTs">NFTs</p>
              </div>
            )}
            <p id="NoTechKnowledge">
              {Appearance &&
              Appearance.headerDescription &&
              Appearance.headerDescription != ""
                ? Appearance.headerDescription
                : "No Technical Knowledge Needed. A Global B2B SaaS, empowers you to launch your own white-label NFT store or NFT Marketplace without any technical knowledge"}
            </p>
          </div>

          <br></br>
          <br></br>

          <div className="d-flex">
            <Link to="/explore">
              <Button id="Explore" variant="primary">
                Explore
              </Button>
            </Link>

            <Link to="/create-nft">
              <Button id="Create" variant="primary" className="ms-3">
                Create
              </Button>
            </Link>
          </div>
        </Col>
        <Col className="d-none d-lg-block" lg={6}>
          <img src={DottedImage} className="DottedImage" />
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Row className="mt-5 SecondPartRow">
        <Col>
          <div className="BrowseCategory text-center">Browse by Category</div>
          <div className="LongButton"></div>
        </Col>
      </Row>

      <Row>
        <div className="Category d-flex" style={{ marginBottom: "20px" }}>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");
              event.preventDefault();
              setCategory("All");
            }}
          >
            <p>All</p>
          </div>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");
              event.preventDefault();
              setCategory("Funny");
            }}
          >
            <p>Funny</p>
          </div>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");
              event.preventDefault();
              setCategory("Art");
            }}
          >
            <p>Art</p>
          </div>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");
              event.preventDefault();
              setCategory("Nature");
            }}
          >
            <p>Nature</p>
          </div>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");

              event.preventDefault();
              setCategory("Animal");
            }}
          >
            <p>Animal</p>
          </div>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");

              event.preventDefault();
              setCategory("Sports");
            }}
          >
            <p>Sports</p>
          </div>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");

              event.preventDefault();
              setCategory("Photography");
            }}
          >
            <p>Photography</p>
          </div>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");

              event.preventDefault();
              setCategory("Music");
            }}
          >
            <p>Music</p>
          </div>
          <div
            className="CategoryDiv"
            onClick={(event) => {
              history.push("/explore");

              event.preventDefault();
              setCategory("Metaverse");
            }}
          >
            <p>Metaverse</p>
          </div>
        </div>
      </Row>

      <Row className="mt-5">
        <Col>
          <div className="RecentlyCreated text-center">Recently Created</div>
          <div className="LongButton"></div>
        </Col>
      </Row>

      <Row className="mt-5">
        {recentCreated.length > 0 ? (
          <div className="d-flex FifthPartRow" style={{"height":"50%"}}>
            {recentCreated.map((item) => (
              <SimpleNFTCard item={item} path={"nft"} />
            ))}
          </div>
        ) : (
          <div className="ParentDiv">
            <p className="NoCollectionToShow text-center">
              No Collection to Show Right Now
            </p>
          </div>
        )}
      </Row>

      <Row className="">
        <Col>
          <div className="BrowseCategory text-center">Available for Sale</div>
          <div className="LongButton"></div>
        </Col>
      </Row>

      <Row className="mt-5">
        {availableSale.length > 0 ? (
          <div className="d-flex FifthPartRow">
            {availableSale.map((item) => (
              <SimpleNFTCard item={item} path={"sale"} />
            ))}
          </div>
        ) : (
          <div className="ParentDiv">
            <p className="NoCollectionToShow text-center">
              No Collection to Show Right Now
            </p>
          </div>
        )}
      </Row>

      <br></br>
      <br></br>
      <Row className="mt-5 EigthPartRow">
        <Col>
          <div className="BrowseCategory text-center">Recently Purchased</div>
          <div className="LongButton"></div>
        </Col>
      </Row>

      <Row className="mt-5">
        {recentPurchased.length > 0 ? (
          <div className="d-flex FifthPartRow">
            {recentPurchased.map((item) => (
              <SimpleNFTCard item={item} path={"nft"} />
            ))}
          </div>
        ) : (
          <div className="ParentDiv">
            <p className="NoCollectionToShow text-center">
              No Collection to Show Right Now
            </p>
          </div>
        )}
      </Row>

      <br></br>
      <br></br>
      <br></br>
      {generals && generals.showNewsLetter ? (
        <div className="NewsLetter px-4">
          <Row>
            <Col lg={12}>
              <div className="NewsLetterPara">
                {generals.storeName}
                <br></br>
                The Evolution Of Crypto! Stay updated!
              </div>
            </Col>
          </Row>
          <Row className=" emailRow align-items-center">
            <Col lg={3} />
            <Col lg={4}>
              <div>
                <input
                  className="emailInput"
                  type="text"
                  name="newsletter_email"
                  id="EmailBar"
                  placeholder="Email Address"
                />
              </div>
            </Col>
            <Col lg={2}>
              <div className="SubscribeBtn">
                <Button className="Subscribe" variant="primary">
                  Subscribe
                </Button>
              </div>
            </Col>
            <Col lg={1} />
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default HomePage;