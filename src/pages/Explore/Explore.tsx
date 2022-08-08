// Lib
import { useEffect, useState } from "react";

// Images
import elementImage from "../../assets/images/createselector1.png";
import creatorImage from "../../assets/images/token.png";

// SASS
import "./Explore.scss";

// Components
import ExploreFilters from "./ExploreFilters";
import ExploreElements from "./ExploreElements";
import BlueBackground from "../../components/BlueBackground/BlueBackground";

//apis
import {
  getMarketplaceNfts,
  verifyEmailApi,
} from "../../services/api/supplier";
import { metadata } from "0xsequence/dist/declarations/src/sequence";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../utils/constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getChainId } from "../../utils/utils";
import { cookieDomain } from "../../config";
const Explore = () => {
  // HardCoded
  const [skiploading, setskiploading] = useState(true);
  const [metadata, setmetadata] = useState<any>([]);

  const filters = ["All", "Art", "Photos", "Games", "Music"];
  const elements = [
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
  ];

  const { chain } = useParams();

  // States
  const [currentFilter, setCurrentFilter] = useState("All");
  const [displayElements, setDisplayItems] = useState([]);
  const [sortBy, setsortBy] = useState<any>([["createdAt", -1]]);
  const [sortBy2, setsortBy2] = useState<any>("createdAt");
  const [skip, setskip] = useState(0);
  const [ResetPasswordPopUpShow, setResetPasswordPopUpShow] =
    useState<any>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchItems = async () => {
    if (skiploading) {
    console.log("explore chian", chain, getChainId(chain));
    
      getMarketplaceNfts(skip, getChainId(chain), sortBy)
        .then((res: any) => {
          console.log("auc", res.data.totalAuctions);

          setDisplayItems(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log(error);
          setskiploading(false);
        });
    }
  };

  const verifyEmail = async (token, email) => {
    const res = await verifyEmailApi(token, email);
    Cookies.set(ACCESS_TOKEN, res.data.accessToken, {
      domain: cookieDomain,
      expires: 30,
    });
     Cookies.set("userInfo", JSON.stringify(res.data.user), {
       domain: cookieDomain,
       expires: 30,
     });
    localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    navigate("/home", { replace: true });
  };
  const resetPassword = async () => {};
  // Effect
  useEffect(() => {
    // nothing for now
    fetchItems();
  }, [currentFilter, chain]);

  useEffect(() => {
    console.log("store", location.pathname.split("/"));

    if (
      location.pathname.includes("/login") &&
      location.pathname.split("/").length > 3
    ) {
      verifyEmail(
        location.pathname.split("/")[2],
        location.pathname.split("/")[3]
      );
    }
    if (
      location.pathname.includes("/reset-password") &&
      location.pathname.split("/").length > 3
    ) {
      setResetPasswordPopUpShow(true);
    }
  }, []);

  return (
    <section className="explore">
      <BlueBackground />
      <h1 className="explore-heading">Explore Collections</h1>
      <ExploreFilters
        filters={filters}
        setCurrentFilter={setCurrentFilter}
        currentFilter={currentFilter}
      />
      {displayElements.length > 0 && (
        <ExploreElements elements={displayElements} />
      )}
    </section>
  );
};

export default Explore;
