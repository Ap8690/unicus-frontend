// Libs
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

// Images
import mpWallet from "../../../assets/svgs/mpWallet.svg";
import mpCreate from "../../../assets/svgs/mpCreate.svg";
import mpAdd from "../../../assets/svgs/mpAdd.svg";
import mpList from "../../../assets/svgs/mpList.svg";


const SOL_MINT_NFT_PROGRAM_ID = new anchor.web3.PublicKey(
  "EJ16q9rhttCaukJP89WZyKs7dnEBTmzAixLLqCV8gUUs"
);




const Element = ({ element }) => {
  return (
    <div className="info-div">
      <div className="img-holder">
        <img src={element.image} alt={element.name} />
      </div>
      <h3 className="info-heading">{element.heading}</h3>
      <p className="info-text">{element.text}</p>
    </div>
  );
};
function MarketPlaceCreateAndSell(props: any): JSX.Element {

  const [nftMarketResults, setNftMarketResults] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [assetBid, setAssetBid] = useState("");

  useEffect(() => {
    if (!showLoader) {
      loadSaleItems();
    }
  }, [showLoader]);

  const loadSaleItems = async () => {
    let nftTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "nft-contract.unicus.testnet",
        methodName: "nft_tokens",
        args: {
        from_index: "0",
        limit: 64,
      }});

    let saleTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "market_contract.unicus.testnet",
        methodName: "get_sales_by_nft_contract_id",
        args: {
          nft_contract_id: "nft-contract.unicus.testnet",
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
    setShowLoader(true);
  };

  const {
    utils: {
      format: { parseNearAmount},
    },
  } = nearAPI;

  /*place an offer on a specific sale. The sale will go through as long as your deposit is greater than or equal to the list price
  process the purchase (which will remove the sale, transfer and get the payout from the nft contract, and then distribute royalties)
  -> Loop through nftmarketResults.map(nft, index), execute OfferPrice(nft.token_id)*/
  const OfferPrice = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet",
      methodName: "offer",
      args: {
        nft_contract_id: "nft-contract.unicus.testnet",
        token_id,
      },
      attachedDeposit: parseNearAmount(assetBid),
      gas: "200000000000000",
    })
  }

  const RemoveSale = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet",
      methodName: "remove_sale",
      args: {
        nft_contract_id: "nft-contract.unicus.testnet",
        token_id,
      },
      attachedDeposit: parseNearAmount("1"),
      gas: "200000000000000",
    })
  }





  // solana market-------------////





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



  //get all the sale items


  //this will return all the order instances created
  const allOrderAccounts = await program.account.order.all();

  //this will return  nft by its mintkey. we can get the mintkey by the order accounts we fetched in "allOrderAccounts"
  const nft = await metaplex.nfts().findByMint(order.mintKey).run();



  //sell a order


  const sellOrder = async () => {

    let mintKey = order.mintKey;



    const [orderAccount] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("order"), mintKey.toBytes()],
    program.programId
    );

    const orderTokenAccount = await getAssociatedTokenAddress(
    mintKey,
    orderAccount,
    true
    );

    let buyerTokenAccount = await getAssociatedTokenAddress(
    mintKey,
    wallet.publicKey
    );



    try {
    const tx = new anchor.web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        buyerTokenAccount,
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
    const tx = program.transaction.fillOrder({
      accounts: {
        order: orderAccount,
        orderTokenAccount: orderTokenAccount,
        mintKey: mintKey,
        creator: order.creator,
        buyer: wallet.publicKey,
        buyerTokenAccount: buyerTokenAccount,
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

    console.log("Fill Order Success!");
    return true;
    } catch (err) {
    console.log(err);
    return false;
    }



  }




  const removeSale = () => {

    let mintKey = order.mintKey;

    const [orderAccount] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("order"), mintKey.toBytes()],
    program.programId
    );

    const orderTokenAccount = await getAssociatedTokenAddress(
    mintKey,
    orderAccount,
    true
    );

    const associatedTokenAddress = await getAssociatedTokenAddress(
      mintKey,
      wallet.publicKey
    );


    try {
    const tx = program.transaction.cancelOrder({
      accounts: {
        order: orderAccount,
        orderTokenAccount: orderTokenAccount,
        mintKey: mintKey,
        creator: wallet.publicKey,
        creatorTokenAccount: associatedTokenAddress,
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
    
    console.log("Cancel Order Success!");
    return true;
    } catch (err) {
    console.log(err);
    return false;
    }

  }







  const elements = [
    {
      name: "Wallet",
      image: mpWallet,
      heading: "Set up your wallet",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare ut lobortis sit erat morbi.",
    },
    {
      name: "Create",
      image: mpCreate,
      heading: "Create your collection",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare ut lobortis sit erat morbi.",
    },
    {
      name: "Add",
      image: mpAdd,
      heading: "Add your NFTs",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare ut lobortis sit erat morbi.",
    },
    {
      name: "List",
      image: mpList,
      heading: "List them for sale",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare ut lobortis sit erat morbi.",
    },
  ];
  return (
    <div className="market-place-create-and-sell">
      <div className="left">
        <h2 className="heading">Create And Sell your NFTs</h2>
        <Link to="/create-nft" className="btn nav-link">Create</Link>
      </div>
      <div className="right">
        {elements.map((element, i) => (
          <Element element={element} key={`mpcs${i}`} />
        ))}
      </div>
    </div>
  );
};

export default MarketPlaceCreateAndSell;
