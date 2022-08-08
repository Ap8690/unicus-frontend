// Libs
import { useEffect, useState } from "react";


import { useConnection, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import * as nearAPI from 'near-api-js';



import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import * as anchor from "@project-serum/anchor";
import { Program, getProvider, Provider, Wallet } from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";


import SolMintNftIdl from "../../../utils/sol_mint_nft.json";

// Components
import MarketPlaceAuctionsElements from "./MarketPlaceAuctionsElements"
import MarketPlaceAuctionsNavigator from "./MarketPlaceAuctionsNavigator"
import BottomNavigationMarker from "../BottomNavigationMarker"
import {getAuctions} from "../../../services/api/supplier"



const SOL_MINT_NFT_PROGRAM_ID = new anchor.web3.PublicKey(
  "EJ16q9rhttCaukJP89WZyKs7dnEBTmzAixLLqCV8gUUs"
);

//function MarketPlaceAuctions(props: any): JSX.Element {
const MarketPlaceAuctions = ({ list }) =>{
  // Take list and filter as per the requirement
  const [currentType, setCurrentType] = useState("live");
  const [currentScroll, setCurrentScroll] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [displayList, setDisplayList] = useState(list);

  //NEAR
  const [nftAuctionResults, setNftAuctionResults] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [assetBid, setAssetBid] = useState("");

  // Some hardcoded data
  const types = ["Live", "Upcoming", "Ended"]; //"Live", "Upcoming", "Ended"
  const length = width > 768 ? Math.ceil(displayList.length / 3) : displayList.length;

  //Near AUCTION ---------


  /*
  useEffect(() => {
    if (!showLoader) {
      loadAuctionItems();
    }
  }, [showLoader]);

  //Gets all the auctions
  const loadAuctionItems = async () => {
    let nftTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "nft-contract.unicus.testnet",
        methodName: "nft_tokens",
        args: {
        from_index: "0",
        limit: 64,
      }}); 

    let auctionTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "market_contract.unicus.testnet",
        methodName: "get_auctions_by_nft_contract_id",
        args: {
          nft_contract_id: "nft-contract.unicus.testnet",
          from_index: "0",
          limit: 64,
        }
        });

      let auctions = [];

    for (let i = 0; i < nftTokens.length; i++) {
      const { token_id } = nftTokens[i];
      let auctionToken = auctionTokens.find(({ token_id: t }) => t === token_id);
      if (saleToken !== undefined) {
        auctions[i] = Object.assign(nftTokens[i], auctionToken);
    
      }
    }
    setNftAuctionResults(auctions);
    setShowLoader(true);
  };

  const {
    utils: {
      format: { parseNearAmount},
    },
  } = nearAPI;

  //Place Bid on auction
  const OfferBid = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet",
      methodName: "offer_bid",
      args: {
        nft_contract_id: "nft-contract.unicus.testnet",
        token_id,
      },
      attachedDeposit: parseNearAmount(assetBid),
      gas: "200000000000000",
    })
  }

  //removes auction and rfundss if there is any existing bid
  const RemoveAuction = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet",
      methodName: "remove_auction",
      args: {
        nft_contract_id: "nft-contract.unicus.testnet",
        token_id,
      },
      attachedDeposit: parseNearAmount("1"),
      gas: "200000000000000",
    })
  }

  //remove the auction and resolve purchase
  const ProcessPurchase = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet",
      methodName: "process_auction_purchase",
      args: {
        nft_contract_id: "nft-contract.unicus.testnet",
        token_id,
      },
      attachedDeposit: 0,
      gas: "200000000000000",
    })
  }
  
  */





  //------ solana auction------//





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
  /*const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage()); */

  //get all the auction items


  //this will return all the auction instances created
  const allAuctionAccounts = await program.account.auction.all();


  //this will return  nft by its mintkey. we can get the mintkey by the auction accounts we fetched in "allAuctionAccounts"
  const nft = await metaplex.nfts().findByMint(auction.mintKey).run();



  const bidAuction = async () => {

    let mintKey = auction.mintKey;

    let price = assetPrice * LAMPORTS_PER_SOL;

    const [auctionAccount] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("auction"), mintKey.toBytes()],
    program.programId
    );


    let bidderTokenAccount = await getAssociatedTokenAddress(
    mintKey,
    wallet.publicKey
    );


    try {
    const tx = new anchor.web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        bidderTokenAccount,
        wallet.publicKey,
        mintKey
      )
    );

    const signature = await sendTransaction(tx, connection);
    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });



    } catch (err) {
    console.log(err);
    return false;
    }



    try {
    const tx = program.transaction.bid(
      new anchor.BN(price),
      {
      accounts: {
        auction: auctionAccount,
        mintKey: mintKey,
        creator: auction.creator,
        bidder: wallet.publicKey,
        refundReceiver: auction.refundReceiver,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      },
    });

    const signature = await sendTransaction(tx, connection);
    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });

    console.log("bid Success!");
    return true;
    } catch (err) {
    console.log(err);
    return false;
    }


  }



  //auction resolve


  const auctionResolve = async () => {

    let mintKey = auction.mintKey;

    const [auctionAccount] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("auction"), mintKey.toBytes()],
    program.programId
    );

    const auctionTokenAccount = await getAssociatedTokenAddress(
    mintKey,
    auctionAccount,
    true
    );

    let refundReceiverTokenAccount = await getAssociatedTokenAddress(
    mintKey,
    auction.refundReceiver
    );


    try {
    const tx = new anchor.web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
        auction.refundReceiver,
        refundReceiverTokenAccount,
        auction.refundReceiver,
        mintKey
      )
    );

    const signature = await sendTransaction(tx, connection);
    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });



    } catch (err) {
    console.log(err);
    return false;
    }



    try {
    const tx = program.transaction.auctionResolve(
      {
      accounts: {
        auction: auctionAccount,
        auctionTokenAccount: auctionTokenAccount ,
        mintKey: mintKey,
        creator: auction.creator,
        refundReceiver: auction.refundReceiver,
        refundReceiverTokenAccount: refundReceiverTokenAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      },
    });

    const signature = await sendTransaction(tx, connection);
    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });

    console.log("auction resolve Success!");
    return true;
    } catch (err) {
    console.log(err);
    return false;
    }


  }




  const cancelAuction = async () => {
    let mintKey = auction.mintKey;

    const [auctionAccount] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("auction"), mintKey.toBytes()],
    program.programId
    );

    const auctionTokenAccount = await getAssociatedTokenAddress(
    mintKey,
    auctionAccount,
    true
    );

    let creatorTokenAccount = await getAssociatedTokenAddress(
    mintKey,
    wallet.publicKey
    );


    try {
    const tx = new anchor.web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        creatorTokenAccount,
        wallet.publicKey,
        mintKey
      )
    );

    const signature = await sendTransaction(tx, connection);
    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });



    } catch (err) {
    console.log(err);
    return false;
    }



    try {
    const tx = program.transaction.cancelAuction({
      accounts: {
        auction: auctionAccount,
        auctionTokenAccount: auctionTokenAccount,
        mintKey: mintKey,
        creator: wallet.publicKey,
        creatorTokenAccount: creatorTokenAccount,
        refundReceiver: auction.refundReceiver,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      },
    });

    const signature = await sendTransaction(tx, connection);
    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });

    console.log("cancel auction Success!");
    return true;
    } catch (err) {
    console.log(err);
    return false;
    }


  }










  // Filter out list on the basis of elements
  useEffect(() => {
    getAuctions(10,currentType)
    .then(res => {
      console.log(res);
      setDisplayList(res?.data.nfts)
    })
  }, [currentType]);

  useEffect(() => {
    getAuctions(10,currentType)
  },[])
  return (
    <div className="market-place-auctions">
      <MarketPlaceAuctionsNavigator
        currentScroll={currentScroll}
        setCurrentScroll={setCurrentScroll}
        types={types}
        length={length}
        currentType={currentType}
        setCurrentType={setCurrentType}
      />
      <MarketPlaceAuctionsElements list={displayList} currentScroll={currentScroll} currentType={currentType} />
      <BottomNavigationMarker currentPage={currentScroll} length={length} />
    </div>
  );
};

export default MarketPlaceAuctions;
