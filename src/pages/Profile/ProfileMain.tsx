// Lib
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Routes, Route, useLocation } from "react-router-dom";
import * as nearAPI from 'near-api-js';

import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { useConnection, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import * as anchor from "@project-serum/anchor";
import { Program, getProvider, Provider, Wallet } from "@project-serum/anchor";


// Components
import User from "./User/User";
import Activity from "../Activity/Activity";
import ProfileNavigation from "./Navigation/ProfileNavigation";
import Favourited from "./Favourited/Favourited";
import Listing from "./Listing/Listing";

import SolMintNftIdl from "../../utils/sol_mint_nft.json"

// Images
import userImg from "../../assets/images/userImage.png";
import backgroundImg from "../../assets/images/userBackground.png";
import favouritedImg from "../../assets/images/favouritedImage.png";
import itemPic from "../../assets/images/itemPic.png";

// Icons
import profileCollected from "../../assets/svgs/profileCollected.svg";
import profileCreated from "../../assets/svgs/profileCreated.svg";
import profileFavourited from "../../assets/svgs/profileFavourited.svg";
import profileActivity from "../../assets/svgs/profileActivity.svg";
import profileListing from "../../assets/svgs/listing.svg";
import profileOffers from "../../assets/svgs/list.svg";

// Styles
import "./ProfileMain.scss";


const SOL_MINT_NFT_PROGRAM_ID = new anchor.web3.PublicKey(
  "EJ16q9rhttCaukJP89WZyKs7dnEBTmzAixLLqCV8gUUs"
);

// Generics
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

function Profile(props: any): JSX.Element {

  const [NftResults, setNftResults] = useState([]);
  const [assetPrice, setAssetprice] = useState("");
  const [minimum, setMinimum] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
 // const [nftMarketResults, setNftMarketResults] = useState([]);


  const handleInputChange = (e) => {
    setAssetprice(e.target.value);
  };

  useEffect(() => {
    if (!showLoader) {
      displayAllNft();
      //loadSaleItems();
    }
  }, [showLoader]);

  /*const loadSaleItems = async () => {
    let nftTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "nft-contract.boomboom.testnet",
        methodName: "nft_tokens",
        args: {
        from_index: "0",
        limit: 64,
      }});

    let saleTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "market_contract.boomboom.testnet",
        methodName: "get_sales_by_nft_contract_id",
        args: {
          nft_contract_id: "nft-contract.boomboom.testnet",
          from_index: "0",
          limit: 64,
        }
        });

      let sales = [];

    for (let i = 0; i < nftTokens.length; i++) {
      const { token_id } = nftTokens[i];
      let saleToken = saleTokens.find(({ token_id: t }) => t === token_id);
      if (saleToken !== undefined) {
        sales[i] = Object.assign(nftTokens[i], saleToken);
    
      }
    }
    setNftMarketResults(sales);
  };*/


  

  const displayAllNft = async () => {
    let userNFTs = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "nft-contract.unicus.testnet",
        methodName: "nft_tokens_for_owner",
        args: {
          account_id: props.near.currentUser,
          from_index: "0",
          limit: 64,
        }
      });
    setNftResults(userNFTs);
    setShowLoader(true);
  }

  const {
    utils: {
      format: { parseNearAmount},
    },
  } = nearAPI;


  const approveNFTForSale = async (token_id) => {
    sendStorageDeposit();
    let sale_conditions = {
      sale_conditions: assetPrice, // set asset price in ui
    };
    await props.near.walletConnection.account().functionCall({
      contractId: "nft-contract.unicus.testnet",
      methodName: "nft_approve",
      args: {
        token_id: token_id,
        account_id: "market_contract.unicus.testnet",
        msg: JSON.stringify(sale_conditions),
      },
      attachedDeposit: parseNearAmount("0.01"),
    });
  };


  const approveNFTForAuction = async (token_id) => {
    sendStorageDeposit();
    let sale_conditions = {
      sale_conditions: assetPrice, // set asset price in ui
    };
    await props.near.walletConnection.account().functionCall({
      contractId: "nft-contract.unicus.testnet",
      methodName: "approve_nft_auction",
      args: {
        token_id: token_id,
        account_id: "market_contract.unicus.testnet",
        start_time: startTime, // Time in seconds (as type u64)
        end_time: endTime,  // Time in seconds (as type u64)
        msg: JSON.stringify(sale_conditions),
      },
      attachedDeposit: parseNearAmount("0.01"),
    });  
  };

  const getMinimumStorage = async () => {
    let minimum_balance = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "market_contract.unicus.testnet",
        methodName: "storage_minimum_balance"
      });
    setMinimum(minimum_balance);

  };

  const sendStorageDeposit = async () => {
    getMinimumStorage();
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet" ,
      methodName: "storage_deposit",
      args: {},

      attachedDeposit: minimum,
    });
  }











  //solana nfts

  const {connection} = useConnection();
      
  const wallet = useAnchorWallet();
  const { publicKey, sendTransaction  } = useWallet();

  const { LAMPORTS_PER_SOL } = anchor.web3;

  const provider = new anchor.AnchorProvider(connection, wallet, {commitment: 'processed'});
    anchor.setProvider(provider);

   const program = new Program(
      // @ts-ignore
      SolMintNftIdl,
      SOL_MINT_NFT_PROGRAM_ID,
      provider
    );





  const metaplex = new Metaplex(connection);


  //Fetch all nfts of by owner
  //the returned NFTs may be Metadatas
  const myNfts = async () => {
    await metaplex
    .nfts()
    .findAllByOwner(metaplex.identity().publicKey)
    .run();
  } 
  

  //In order to transform a Metadata into an Nft(json), you may use the load operation like so

  // const nft = await metaplex.nfts().load(metadata).run();



  //------ Create sale------//



  const createSale = async () => {

    //use metadata to feth the mintkey like this...
    //const mintKey = new anchor.web3.PublicKey(metatdata.mint.toArray("le"));

    const associatedTokenAddress = await getAssociatedTokenAddress(
      mintKey,
      wallet.publicKey
    );

    const [orderAccount] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("order"), mintKey.toBytes()],
    program.programId
    );

    const orderTokenAccount = await getAssociatedTokenAddress(
      mintKey,
      orderAccount,
      true
      );
  
  

  let price = assetPrice * LAMPORTS_PER_SOL;


  try {
    const tx = program.transaction.createOrder(
      "An order",
      new anchor.BN(price),
      {
        accounts: {
          order: orderAccount,
          orderTokenAccount: orderTokenAccount,
          mintKey: mintKey,
          creator: wallet.publicKey,
          creatorTokenAccount: associatedTokenAddress,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
      }
    );

    const signature = await sendTransaction(tx, connection);
    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });
    console.log("Create Order Success!");

    let order = await program.account.order.fetch(orderAccount);
    return order;
  } catch (err) {
    console.log(err);
    return null;
  }

  }


  const createAuction = async () => {

    //use metadata to feth the mintkey like this...
    //const mintKey = new anchor.web3.PublicKey(metatdata.mint.toArray("le"));

    const associatedTokenAddress = await getAssociatedTokenAddress(
      mintKey,
      wallet.publicKey
    );

    const [auctionAccount] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("auction"), mintKey.toBytes()],
    program.programId
    );


    const auctionTokenAccount = await getAssociatedTokenAddress(
      mintKey,
      auctionAccount,
      true
      );

    let price = assetPrice * LAMPORTS_PER_SOL;


    try {
    const tx = program.transaction.createAuction(
      "An auction",
      new anchor.BN(price),
      startTime,
      endTime,
      {
        accounts: {
          order: auctionAccount,
          orderTokenAccount: auctionTokenAccount,
          mintKey: mintKey,
          creator: wallet.publicKey,
          creatorTokenAccount: associatedTokenAddress,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
      }
    );
    const signature = await sendTransaction(tx, connection);
    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });
    console.log("Create Auction Success!");

    let auction = await program.account.auction.fetch(auctionAccount);
    return auction;
    } catch (err) {
    console.log(err);
    return null;
  }

  }









  // add is additional information
  const tabs = [
    { name: "Collected", image: profileCollected, add: "5" },
    { name: "Created", image: profileCreated, add: "" },
    { name: "Favourited", image: profileFavourited, add: "6" },
    { name: "Activity", image: profileActivity, add: "" },
    { name: "Listing", image: profileListing, add: "" },
    { name: "Offers", image: profileOffers, add: "" },
  ];
  // Index of current element
  const location = useLocation();

  // Name of the current tab
  const tabName = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1
  );
  const [currentTab, setCurrentTab]: useStateType<Number> = useState(
    tabs.findIndex((tab) => tab.name.toLowerCase() === tabName)
  );
  const [search, setSearch]: useStateType<String> = useState("");
  const user = {
    name: "Kyle Garrick",
    id: "6xc4c16a6451as56dfgf1ghdsa6db21a",
    joinDate: "21 July 2022",
    image: userImg,
    backimg: backgroundImg,
    social: {
      twitter: "#",
      instagram: "#",
      facebook: "#",
    },
    collected: null,
    favourited: null,
  };
  const items = [
    {
      image: favouritedImg,
      eventName: "Event Name 1",
      eventDescription:
        "OpenSea is the world's first and largest NFT marketplace",
    },
    {
      image: favouritedImg,
      eventName: "Event Name 1",
      eventDescription:
        "OpenSea is the world's first and largest NFT marketplace",
    },
    {
      image: favouritedImg,
      eventName: "Event Name 1",
      eventDescription:
        "OpenSea is the world's first and largest NFT marketplace",
    },
    {
      image: favouritedImg,
      eventName: "Event Name 1",
      eventDescription:
        "OpenSea is the world's first and largest NFT marketplace",
    },
  ];

  const listing = [
    {
      image: itemPic,
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "25120",
      fd: "-",
      exp: "July 25, 2022",
    },
    {
      image: itemPic,
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "25120",
      fd: "-",
      exp: "July 25, 2022",
    },
    {
      image: itemPic,
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "25120",
      fd: "-",
      exp: "July 25, 2022",
    },
  ];
  const [displayListing, setDisplayListing] = useState(listing);
  useEffect(() => {
    const q = search.toLowerCase();
    const temp = listing.filter((item) => item.item.toLowerCase().includes(q));
    setDisplayListing(temp);
  }, [search]);
  return (
    <div className="profile">
      <div>
        {NftResults
        ? NftResults.map((nft, index) => (
          <div>
            <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          approveNFTForSale(nft.metadata.title);
                        }}
                      >
                        <div className="form-in-wrapper">
                          <h3 className="text-center pb-1">SELL NFT</h3>

                          <div className="box-wrapper">
                            <div className="box-in-wrapper">
                              <div className="input-wrapper">
                                <input
                                  className="input-box"
                                  placeholder="Add sale price"
                                  name="assetPrice"
                                  type="text"
                                  value={assetPrice}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-btn-wrapper">
                            <button className="form-btn">Sell now</button>
                          </div>
                        </div>
                      </form>
            
          </div>
        ))
      : "NFTs not found"}
      </div>
      <User user={user} />
      <ProfileNavigation
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Routes>
        <Route path="/favourited" element={<Favourited items={items} />} />
        <Route path="/activity" element={<Activity />} />
        <Route
          path="/listing"
          element={
            <Listing
              list={displayListing}
              search={search}
              setSearch={setSearch}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Profile;
