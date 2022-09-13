import "./viewnft.scss";
import nftImg from "../../assets/images/marketPlaceMain.png";
import {
    approveNFTForAuction,
    approveNFTForSale,
    connectNear,
    connectWallet,
    getAuctionContract,
    getAuctionContractAddress,
    getChainSymbol,
    getCreateNftABI,
    getCreateNftContract,
    getCreateNftContractAddress,
    getMarketPlace,
    getMarketPlaceContractAddress,
    getNftContractAddress,
    getRPCErrorMessage,
    getUserInfo,
    offerBid,
    offerPrice,
    processPurchase,
    removeAuction,
    removeSale,
    sendStorageDeposit,
    tronWeb,
} from "../../utils/utils";
import {
    buyItemApi,
    cancelAuctionApi,
    createAuctionApi,
    createSellApi,
    endSaleApi,
    placeBidApi,
} from "../../services/api/supplier";
import { useContext, useEffect, useState } from "react";
import web3 from "../../web3";
import { toast } from "react-toastify";
import {
    BASE_URL,
    bscChain,
    ethChain,
    nearChain,
    solonaChain,
    tronChain,
} from "../../config";
import axios from "axios";
import { setNotification } from "../../Redux/Blockchain/contracts";
import { decodeParams, getDecimal } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import PlaceBid from "../../components/modals/PlaceBid/PlaceBid";
import Input from "../../components/Input/Input";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    createInitializeMintInstruction,
    MINT_SIZE,
    createAssociatedTokenAccountInstruction,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import SolMintNftIdl from "../../utils/sol_mint_nft.json";
import uuid from "react-uuid";
import { getCompleteDate } from "../../utils/date";
import WalletsModal from "../../components/modals/WalletsModal/WalletsModal";
import {isChainConnected} from "../../utils/helpers"
import { ConnectWalletContext } from "../../context/ConnectWalletContext";

const BIDS_PLACEHOLDER = [
    {
        bid: 5,
        img: nftImg,
        bidder: 'Jon Snow',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    },
]

const NftInfo = ({
    filters,
    creator,
    activeFilter,
    setActiveFilter,
    historyData,
    bids,
    nft,
    auction,
    setNftLoading,
    fetchItem,
    pageChain
}) => {
    let userInfo = getUserInfo()
    const {fullLoading,chainConnected,setChainConnected,setWalletModal,walletModal} = useContext(ConnectWalletContext)
    const [startBid, setStartBid] = useState<any>(
        auction ? auction.startBid : 0.0
    );

    const [duration, setDuration] = useState("1");
    const [bid, setBid] = useState("");
    const [type, setType] = useState(0);
    const [popUpShow, setPopUpShow] = useState(false);
    const [popUpShowBid, setPopUpShowBid] = useState(false);

    const { connection } = useConnection();
    const { wallet, connect, publicKey, sendTransaction } = useWallet();
    const anWallet = useAnchorWallet();
    const { setVisible } = useWalletModal();
    let provider: any;
    let program: any;
    const getSolWallet = () => {
        return wallet;
    };
    const SOL_MINT_NFT_PROGRAM_ID = new anchor.web3.PublicKey(
        "EJ16q9rhttCaukJP89WZyKs7dnEBTmzAixLLqCV8gUUs"
    );

    useEffect(() => {
        if (anWallet) {
            provider = new anchor.AnchorProvider(connection, anWallet, {
                commitment: "processed",
            });
            anchor.setProvider(provider);

            program = new Program(
                //@ts-ignore
                SolMintNftIdl,
                SOL_MINT_NFT_PROGRAM_ID,
                provider
            );
        }
    }, [anWallet]);

    const navigate = useNavigate();

    const createSaleSol = async (key: any, assetPrice: any) => {
        //use metadata to feth the mintkey like this...
        //const mintKey = new anchor.web3.PublicKey(metatdata.mint.toArray("le"));
        provider = new anchor.AnchorProvider(connection, anWallet, {
            commitment: "processed",
        });
        anchor.setProvider(provider);

        program = new Program(
            //@ts-ignore
            SolMintNftIdl,
            SOL_MINT_NFT_PROGRAM_ID,
            provider
        );

        const mintKey = new anchor.web3.PublicKey(key);

        const associatedTokenAddress = await getAssociatedTokenAddress(
            mintKey,
            anWallet.publicKey
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
                        creator: anWallet.publicKey,
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

            let order = await program.account.order.fetch(orderAccount);
            console.log("Create Order Success!", order);

            return order.mintKey;
        } catch (err) {
            console.log(err);
            return null;
            
        }
    };

    const createAuctionSol = async (
        key: any,
        assetPrice: any,
        startTime: any,
        endTime: any
    ) => {
        //use metadata to feth the mintkey like this...
        //const mintKey = new anchor.web3.PublicKey(metatdata.mint.toArray("le"));
        
        
        
        provider = new anchor.AnchorProvider(connection, anWallet, {
            commitment: "processed",
        });
        anchor.setProvider(provider);

        program = new Program(
            //@ts-ignore
            SolMintNftIdl,
            SOL_MINT_NFT_PROGRAM_ID,
            provider
        );

        const mintKey = new anchor.web3.PublicKey(key);

        const associatedTokenAddress = await getAssociatedTokenAddress(
            mintKey,
            anWallet.publicKey
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
                new anchor.BN(startTime),
                new anchor.BN(endTime),
                {
                    accounts: {
                        auction: auctionAccount,
                        auctionTokenAccount: auctionTokenAccount,
                        mintKey: mintKey,
                        creator: anWallet.publicKey,
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

            let auction = await program.account.auction.fetch(auctionAccount);
            console.log("Create Auction Success!", auction);

            return auction.mintKey;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const sellOrderSol = async (key: any) => {
        provider = new anchor.AnchorProvider(connection, anWallet, {
            commitment: "processed",
        });
        anchor.setProvider(provider);

        program = new Program(
            //@ts-ignore
            SolMintNftIdl,
            SOL_MINT_NFT_PROGRAM_ID,
            provider
        );

        const mintKey = new anchor.web3.PublicKey(key);

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
            anWallet.publicKey
        );

        try {
            const tx = new anchor.web3.Transaction().add(
                createAssociatedTokenAccountInstruction(
                    anWallet.publicKey,
                    buyerTokenAccount,
                    anWallet.publicKey,
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
                    buyer: anWallet.publicKey,
                    creator: creator.username,
                    buyerTokenAccount: buyerTokenAccount,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    payer: provider.wallet.publicKey,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                },
            });

            const signature = await sendTransaction(tx, connection);
            const latestBlockhash = await connection.getLatestBlockhash();

            console.log({
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                signature: signature,
            },"connection")

            await connection.confirmTransaction({
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                signature: signature,
            });

            console.log("Fill Order Success!",orderAccount,program.account.order,program.account);
            let order = await program.account.order.fetch(orderAccount);
            console.log("Create Order Success!", order);

            return order.mintKey;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const removeSaleSol = async (key: any) => {
        provider = new anchor.AnchorProvider(connection, anWallet, {
            commitment: "processed",
        });
        anchor.setProvider(provider);
        console.log(provider,"provider")

        program = new Program(
            //@ts-ignore
            SolMintNftIdl,
            SOL_MINT_NFT_PROGRAM_ID,
            provider
        );

        const mintKey = new anchor.web3.PublicKey(key);

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
            anWallet.publicKey
        );

        try {
            const tx = program.transaction.cancelOrder({
                accounts: {
                    order: orderAccount,
                    orderTokenAccount: orderTokenAccount,
                    mintKey: mintKey,
                    creator: anWallet.publicKey,
                    creatorTokenAccount: associatedTokenAddress,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    payer: provider.wallet.publicKey,
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

            console.log("Cancel Order Success!",orderAccount);
            let order = await program.account.order.fetch(orderAccount);

            return order.mintKey;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const bidAuctionSol = async (key: any, assetPrice: any) => {
        provider = new anchor.AnchorProvider(connection, anWallet, {
            commitment: "processed",
        });
        anchor.setProvider(provider);

        program = new Program(
            //@ts-ignore
            SolMintNftIdl,
            SOL_MINT_NFT_PROGRAM_ID,
            provider
        );

        const mintKey = new anchor.web3.PublicKey(key);

        let price = assetPrice * LAMPORTS_PER_SOL;

        const [auctionAccount] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("auction"), mintKey.toBytes()],
            program.programId
        );

        let auction = await program.account.auction.fetch(auctionAccount);

        let bidderTokenAccount = await getAssociatedTokenAddress(
            mintKey,
            anWallet.publicKey
        );

        try {
            const tx = new anchor.web3.Transaction().add(
                createAssociatedTokenAccountInstruction(
                    anWallet.publicKey,
                    bidderTokenAccount,
                    anWallet.publicKey,
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
            const tx = program.transaction.bid(new anchor.BN(price), {
                accounts: {
                    auction: auctionAccount,
                    mintKey: mintKey,
                    creator: auction.creator,
                    bidder: anWallet.publicKey,
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

            console.log("Create Auction Success!", auction);

            return auction.mintKey;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    //auction resolve

    const auctionResolveSol = async (key: any) => {
        provider = new anchor.AnchorProvider(connection, anWallet, {
            commitment: "processed",
        });
        anchor.setProvider(provider);

        program = new Program(
            //@ts-ignore
            SolMintNftIdl,
            SOL_MINT_NFT_PROGRAM_ID,
            provider
        );

        const mintKey = new anchor.web3.PublicKey(key);
        const [auctionAccount] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("auction"), mintKey.toBytes()],
            program.programId
        );

        let auction = await program.account.auction.fetch(auctionAccount);

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
            const tx = program.transaction.auctionResolve({
                accounts: {
                    auction: auctionAccount,
                    auctionTokenAccount: auctionTokenAccount,
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

            console.log("Create Auction Success!", auction);

            return auction.mintKey;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const cancelAuctionSol = async (key: any) => {
        provider = new anchor.AnchorProvider(connection, anWallet, {
            commitment: "processed",
        });
        anchor.setProvider(provider);

        program = new Program(
            //@ts-ignore
            SolMintNftIdl,
            SOL_MINT_NFT_PROGRAM_ID,
            provider
        );

        const mintKey = new anchor.web3.PublicKey(key);
        const [auctionAccount] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("auction"), mintKey.toBytes()],
            program.programId
        );

        let auction = await program.account.auction.fetch(auctionAccount);

        const auctionTokenAccount = await getAssociatedTokenAddress(
            mintKey,
            auctionAccount,
            true
        );

        let creatorTokenAccount = await getAssociatedTokenAddress(
            mintKey,
            anWallet.publicKey
        );

        try {
            const tx = new anchor.web3.Transaction().add(
                createAssociatedTokenAccountInstruction(
                    anWallet.publicKey,
                    creatorTokenAccount,
                    anWallet.publicKey,
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
                    creator: anWallet.publicKey,
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
            return auction.mintKey;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    async function createSell() {
        try {
            setPopUpShow(false);
            setNftLoading(true)
            console.log(nft.chain,typeof nft.chain,"chains")
            // const address = await connectWallet(
            //     nft.chain,
            //     publicKey,
            //     getSolWallet,
            //     connect,
            //     setVisible
            // );
            let address: String = localStorage.getItem('walletConnected')
            let obj = {
                nftId: nft._id,
                sellerInfo: userInfo.username,
                auctionId: "",
                startBid: (
                    parseFloat(startBid) * getDecimal(nft.chain)
                ).toFixed(0),
                auctionType: "Sale",
                auctionHash: "",
                tokenId: nft.tokenId,
                chain: nft.chain,
                name: nft.name,
                cloudinaryUrl: nft.cloudinaryUrl,
                sellerWallet: address,
                sellerId: userInfo && userInfo._id,
            };
            if (startBid === 0.0) {
                toast.error("Asset Price cannot be zero");
                return;
            }
            if (nft.chain.toString() === nearChain) {
                obj.auctionId = nft.tokenId;
                localStorage.setItem("nearAction", "Sale");
                localStorage.setItem("nearSellObj", JSON.stringify(obj));
                const res = await sendStorageDeposit();
                console.log(res,"near res")

                return;
            } else if (nft.chain.toString() === solonaChain) {
                const aucMintKey = await createSaleSol(nft.tokenId, startBid);
                obj.auctionId = aucMintKey;
                obj.auctionHash = aucMintKey;
            } 
            else if (Number(nft.chain) === Number(tronChain)) {
                console.log("else if")
                const listContract = getCreateNftContract(
                    nft.chain,
                    getNftContractAddress(nft)
                );

                nft.contractType && nft.contractType === "1155"
                    ? await listContract.methods
                          .setApprovalForAll(
                              getMarketPlaceContractAddress(nft.chain, "1155"),
                              true
                          )
                          .send({ from: address })
                    : await listContract.methods
                          .approve(
                              getMarketPlaceContractAddress(nft.chain),
                              nft.tokenId
                          )
                          .send({ from: address });
                //else fr 1155 apprval fr all , params marketAdrress1155 , true
                console.log("APPROVED!")
                const amount = startBid * getDecimal(tronChain)
                console.log(amount,'amount')
                const res = await getMarketPlace(nft.chain)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        (startBid*getDecimal(tronChain))?.toString()
                    )
                    .send({ from: address});
                setNftLoading(true);
                // setLoadingMessage(
                //     "Waiting for transaction confirmation.(It can take upto a min to confirm)"
                // );
                const success = await setNotification(res);
                if (success) {
                    obj.auctionId = tronWeb.toDecimal(await decodeParams(['uint256'],"0x"+success?.log[2]?.topics[1],false));
                    obj.auctionHash = res;
                } else {
                    throw Error("Transaction Failed");
                }
            } 
            else {
                console.log("else")
                const listContract = new web3.eth.Contract(
                    //@ts-ignore
                    getCreateNftABI(),
                    getNftContractAddress(nft)
                );

                const gasPrice = await web3.eth.getGasPrice()
                let estimated = nft.contractType && nft.contractType === "1155"
                    ? await listContract.methods
                          .setApprovalForAll(
                              getMarketPlaceContractAddress(nft.chain, "1155"),
                              true
                          )
                          .estimateGas({ from: address })
                    : await listContract.methods
                          .approve(
                              getMarketPlaceContractAddress(nft.chain),
                              nft.tokenId
                          )
                          .estimateGas({ from: address });

                nft.contractType && nft.contractType === "1155"
                    ? await listContract.methods
                          .setApprovalForAll(
                              getMarketPlaceContractAddress(nft.chain, "1155"),
                              true
                          )
                          .send({ from: address ,gas:estimated, gasPrice:gasPrice })
                    : await listContract.methods
                          .approve(
                              getMarketPlaceContractAddress(nft.chain),
                              nft.tokenId
                          )
                          .send({ from: address ,gas:estimated, gasPrice:gasPrice});
                //else fr 1155 apprval fr all , params marketAdrress1155 , true
                estimated = await getMarketPlace(nft.chain, nft.contractType)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        web3.utils.toWei(startBid, "ether")
                    )
                    .estimateGas({ from: address });

                const res = await getMarketPlace(nft.chain,nft.contractType)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        web3.utils.toWei(startBid, "ether")
                    )
                    .send({ from: address ,gas:estimated, gasPrice:gasPrice});

                obj.auctionId = res.events.saleCreated.returnValues.itemId;
                obj.auctionHash = res.transactionHash;
            }
            await createSellApi(obj)
            setNftLoading(false)
            toast.success("Sale created");
            await fetchItem()
        } catch (e) {
            console.log(e);
            getRPCErrorMessage(e)
        }
    }

    async function createAuction() {
        try {
            setPopUpShow(false);
            setNftLoading(true)

            let address: String = localStorage.getItem('walletConnected')
            console.log("create auction", address, auction);

            let obj = {
                nftId: nft._id,
                sellerInfo: userInfo.username,
                auctionId: "",
                startBid: Number(startBid) * getDecimal(nft.chain),
                auctionType: "Auction",
                duration: Number(duration) * 86400,
                auctionHash: "",
                tokenId: nft.tokenId,
                chain: nft.chain,
                name: nft.name,
                cloudinaryUrl: nft.cloudinaryUrl,
                sellerWallet: address,
                sellerId: userInfo && userInfo._id,
            };

            if (nft.chain.toString() === nearChain) {
                obj.auctionId = nft.tokenId;
                localStorage.setItem("nearAction", "Auction");
                localStorage.setItem("nearAuctionObj", JSON.stringify(obj));
                await sendStorageDeposit();

                return;
            } else if (nft.chain.toString() === solonaChain) {
                const aucMintKey = await createAuctionSol(
                    nft.tokenId,
                    startBid,
                    Math.ceil(new Date().getTime() / 1000),
                    Math.ceil(
                        new Date().setSeconds(
                            new Date().getSeconds() + obj.duration
                        ) / 1000
                    )
                );
                obj.auctionId = aucMintKey;
                obj.auctionHash = aucMintKey;
                await createAuctionApi(obj)
                setNftLoading(false)
                toast.success("Auction created");
            } else if (nft.chain.toString() === tronChain) {
                await getCreateNftContract(nft.chain)
                .methods.approve(
                    getAuctionContractAddress(nft.chain),
                    nft.tokenId
                )
                .send({ from: address });
                const amount = startBid * getDecimal(tronChain)
                console.log(amount,nft.tokenId)
                const res = await getAuctionContract(nft.chain)
                .methods.createAuction(
                    getCreateNftContractAddress(nft.chain, "721"),
                    nft.tokenId,
                    amount.toString(),
                    Number(duration) * 86400
                )
                .send({ from: address });
                const success = await setNotification(res);
                console.log(success,"success")
                    if (success) {
                        obj.auctionId = tronWeb.toDecimal(await decodeParams(['uint256'],"0x"+success?.log[2]?.topics[1],false));;
                        obj.auctionHash = res;
                    } else {
                        throw Error("Transaction Failed");
                    }
                await createAuctionApi(obj)
                toast.success("Auction created");
            } else {
                const gasPrice = await web3.eth.getGasPrice()
                let estimated = await getCreateNftContract(nft.chain)
                .methods.approve(
                    getAuctionContractAddress(nft.chain),
                    nft.tokenId
                )
                .estimateGas({ from: address });
                await getCreateNftContract(nft.chain)
                    .methods.approve(
                        getAuctionContractAddress(nft.chain),
                        nft.tokenId
                    )
                    .send({ from: address ,gas:estimated, gasPrice:gasPrice});

                estimated = await getAuctionContract(nft.chain)
                .methods.createAuction(
                    getCreateNftContractAddress(nft.chain, "721"),
                    nft.tokenId,
                    web3.utils.toWei(startBid.toString(), "ether"),
                    Number(duration) * 86400
                ).estimateGas({ from: address });
                const res = await getAuctionContract(nft.chain)
                    .methods.createAuction(
                        getCreateNftContractAddress(nft.chain, "721"),
                        nft.tokenId,
                        web3.utils.toWei(startBid.toString(), "ether"),
                        Number(duration) * 86400
                    )
                    .send({ from: address ,gas:estimated, gasPrice:gasPrice});

                obj.auctionId =
                    res.events.AuctionCreated.returnValues.auctionId;
                obj.auctionHash = res.transactionHash;
                await createAuctionApi(obj)
                setNftLoading(false)
                toast.success("Auction created");
            }
            await fetchItem()
        } catch (e) {
            setNftLoading(false)
            getRPCErrorMessage(e)
        }
    }

    async function buyItem() {
        try {
            setNftLoading(true);
            // const address = await connectWallet(
            //     auction.chain,
            //     publicKey,
            //     getSolWallet,
            //     connect,
            //     setVisible
            // );
            let address: String = localStorage.getItem('walletConnected')
            let transactionHash:any;
            if (nft.chain.toString() === nearChain) {
                await offerPrice(
                    nft.tokenId,
                    Number(auction.startBid) / getDecimal(nft.chain)
                );
                return;
            } else if (nft.chain.toString() === solonaChain) {
                const aucMintKey = await sellOrderSol(auction.auctionId);
                transactionHash = aucMintKey;
            } else if (nft.chain.toString() === tronChain) {
                console.log("running")
                const itemInfo = await getMarketPlace(auction.chain,
                    auction.nftId.contractType)
                    .methods.idToMarketItem(auction.auctionId).call()
                    console.log(tronWeb.toDecimal(itemInfo.price),"itemInfo")
                const res = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.buyItem(auction.auctionId)
                    .send({
                        from: address,
                        callValue: tronWeb.toDecimal(itemInfo.price),
                    });
                const success = await setNotification(res);
                if(success){
                    transactionHash = res;
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice()
                const estimated = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                ).methods.buyItem(auction.auctionId)
                .estimateGas({
                    from: address,
                    value: auction.startBid,
                })
                const res = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                ).methods.buyItem(auction.auctionId)
                .send({
                    from: address,
                    value: auction.startBid,
                    gas:estimated, 
                    gasPrice:gasPrice
                });
                transactionHash = res.transactionHash;
            }
            if (transactionHash) {
                await buyItemApi(
                    auction,
                    transactionHash,
                    creator.name,
                    creator.id
                )
                toast.success("Bought Item");
                setNftLoading(false);
                navigate("/profile/created");
            }
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e)
        }
        setNftLoading(false);
    }

    async function placeBid() {
        try {
            setNftLoading(true);
            // const address = await connectWallet(
            //     auction.chain,
            //     publicKey,
            //     getSolWallet,
            //     connect,
            //     setVisible
            // );
            let address: String = localStorage.getItem('walletConnected')
            if(auction.startBid/getDecimal(nft.chain.toString()) >= Number(bid)){
                setNftLoading(false)
                toast.error("The new bid value should be more then the last bid!")
                return
            }

            if (nft.chain.toString() === nearChain) {
                localStorage.setItem("nearBid", bid.toString());
                offerBid(nft.tokenId, Number(bid));
                return;
            } else if (nft.chain.toString() === solonaChain) {
                const aucMintKey = await bidAuctionSol(auction.auctionId, bid);
                await placeBidApi(
                    auction,
                    aucMintKey,
                    (Number(bid) * getDecimal(nft.chain)).toFixed(0),
                    creator.name,
                    creator.email
                );
            } else if (nft.chain.toString() === tronChain) {
                const amount = Number(bid) * getDecimal(tronChain)
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                ).methods.placeBid(auction.auctionId)
                .send({
                    from: address,
                    callValue: amount.toString(),
                });
                toast("Bid placed Successful");
                const success = await setNotification(res);
                if (res && success) {
                    toast("Updating bid info...");
                    await placeBidApi(
                        auction,
                        res,
                        amount,
                        creator.name,
                        creator.email
                    )
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice()
                const estimated = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                ).methods.placeBid(auction.auctionId)
                .estimateGas({
                    from: address,
                    value: web3.utils.toWei(bid, "ether"),
                });
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                ).methods.placeBid(auction.auctionId)
                .send({
                    from: address,
                    value: web3.utils.toWei(bid, "ether"),
                    gas:estimated, 
                    gasPrice:gasPrice
                });
                toast("Bid placed Successful");
                if (res?.transactionHash) {
                    toast("Updating bid info...");
                    await placeBidApi(
                        auction,
                        res?.transactionHash,
                        web3.utils.toWei(bid, "ether"),
                        creator.name,
                        creator.email
                    )
                }
            }
            setNftLoading(false);
            await fetchItem()
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e)
        }
    }
    
    async function endSale() {
        try {
            setNftLoading(true);
            // const address = await connectWallet(
            //     auction.chain,
            //     publicKey,
            //     getSolWallet,
            //     connect,
            //     setVisible
            // );
            let address: String = localStorage.getItem('walletConnected')
            console.log(typeof nft.chain,typeof tronChain,"jdskfhdsjkfhhd")
            if (nft.chain.toString() === nearChain) {
                removeSale(nft.tokenId);
                return;
            } else if (Number(nft.chain) === Number(solonaChain)) {
                const aucMintKey = await removeSaleSol(auction.auctionId);
            } else if (Number(nft.chain) === Number(tronChain)) {
                const res = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.EndSale(auction.auctionId)
                    .send({ from: address });
                if (res) {
                    await endSaleApi(
                        auction,
                        res,
                        creator.name
                    )
                    toast.success("Sale Ended");
                    setNftLoading(false);
                    navigate("/profile/created");
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice()
                const estimated = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.EndSale(auction.auctionId)
                    .estimateGas({ from: address });
                const res = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.EndSale(auction.auctionId)
                    .send({ from: address ,gas:estimated, gasPrice:gasPrice});
                if (res?.transactionHash) {
                    await endSaleApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    )
                    toast.success("Sale Ended");
                    setNftLoading(false);
                    navigate("/profile/created");
                }
            }
            await fetchItem()
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e)
        }
    }

    async function endAuction() {
        try {
            setNftLoading(true);

            // if (new Date() < auction.duration) {
            //   toast.error("Auction is ongoing. Try cancelling.");
            //   return console.log("Auction Not ended Yet");
            // }

            // const address = await connectWallet(
            //     auction.chain,
            //     publicKey,
            //     getSolWallet,
            //     connect,
            //     setVisible
            // );
            let address: String = localStorage.getItem('walletConnected')
            if (auction.chain.toString() === nearChain) {
                processPurchase(nft.tokenId);
            } else if (nft.chain.toString() === solonaChain) {
                const aucMintKey = await auctionResolveSol(auction.auctionId);
            } else if (nft.chain.toString() === tronChain) {
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.endAuction(auction.auctionId)
                    .send({ from: address });
                if (res) {
                    await endSaleApi(
                        auction,
                        res,
                        creator.name
                    )
                    toast.success("Sale Ended");
                    setNftLoading(false);
                    navigate("/profile/created");
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice()
                const estimated = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                .methods.endAuction(auction.auctionId)
                .estimateGas({ from: address });
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.endAuction(auction.auctionId)
                    .send({ from: address ,gas:estimated, gasPrice:gasPrice});
                if (res?.transactionHash) {
                    await endSaleApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    )
                    toast.success("Sale Ended");
                    setNftLoading(false);
                    navigate("/profile/created");
                }
            }
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e)
        }
    }

    async function cancelAuction() {
        try {
            setNftLoading(true);

            // const address = await connectWallet(
            //     auction.chain,
            //     publicKey,
            //     getSolWallet,
            //     connect,
            //     setVisible
            // );
            let address: String = localStorage.getItem('walletConnected')
            if (auction.chain.toString() === nearChain) {
                removeAuction(nft.tokenId);
            } else if (nft.chain.toString() === solonaChain) {
                const aucMintKey = await cancelAuctionSol(auction.auctionId);
            } else if (nft.chain.toString() === tronChain) {
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.cancelAuction(auction.auctionId)
                    .send({ from: address });
                if (res) {
                    await cancelAuctionApi(
                        auction,
                        res,
                        creator.name
                    )
                    toast.success("Auction Cancelled");
                    setNftLoading(false);
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice()
                const estimated = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.cancelAuction(auction.auctionId)
                    .estimateGas({ from: address });
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.cancelAuction(auction.auctionId)
                    .send({ from: address ,gas:estimated, gasPrice:gasPrice});
                if (res?.transactionHash) {
                    await cancelAuctionApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    )
                    toast.success("Auction Cancelled");
                    setNftLoading(false);
                }
            }
            await fetchItem()
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e)
        }
    }

    const getButtonName = () => {
        const userInfo = getUserInfo();

        if (userInfo) {
            console.log(userInfo._id, nft.owner, "addresses")
            console.log("userInfo: ", userInfo);
            if (userInfo._id === nft.owner) {
                if (nft.nftStatus === 2) {
                    return "End Sale";
                } else if (nft.nftStatus === 3) {
                    if (new Date() < new Date(auction.auctionTimer)) {
                        return "Cancel Auction";
                    } else {
                        return "End Auction";
                    }
                }
                else if(nft.nftStatus === 1) {
                    console.log("HERE")
                }
            } else {
                if (nft.nftStatus === 1) {
                    return "Not For Sale";
                } else if (nft.nftStatus === 2) {
                    return "Buy Now";
                } else if (nft.nftStatus === 3) {
                    return "Place Bid";
                }
            }
        } else {
            setChainConnected(false)
        }
    };

    const handleButtonClick = async () => {
        const userInfo = getUserInfo();

        if (userInfo) {
            if (userInfo._id === nft.owner) {
                if (nft.nftStatus === 2) {
                    endSale();
                } else if (nft.nftStatus === 3) {
                    if (new Date() < new Date(auction.auctionTimer)) {
                        cancelAuction();
                    } else {
                        endAuction();
                    }
                }
                
            } else {
                if (nft.nftStatus == 1) {
                    toast("NFT is not for sale yet");
                } else if (nft.nftStatus == 2) {
                    buyItem();
                } else if (nft.nftStatus == 3) {
                    setPopUpShowBid(true);
                }
            }
        } else {
            await connectWallet(
                nft.chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible
            );
        }
    };

    const checkChain = () => {
        if(isChainConnected(pageChain))
        setChainConnected(pageChain)
    }

    useEffect(() => {
        
        (async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const txhash = urlParams.get("transactionHashes");
            const errorCode = urlParams.get("errorCode");
            const errMsg = urlParams.get("errorMessage");

            if (errorCode) {
                toast.error(errorCode);
            } else if (txhash !== null) {
                const address = await connectNear();
                axios
                    .post("https://rpc.testnet.near.org", {
                        jsonrpc: "2.0",
                        id: "dontcare",
                        method: "tx",
                        params: [txhash, address],
                    })
                    .then((res: any) => {
                        if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name == "storage_deposit"
                        ) {
                            const action = localStorage.getItem("nearAction");
                            if (action == "Auction") {
                                const obj = JSON.parse(
                                    localStorage.getItem("nearAuctionObj")
                                );
                                approveNFTForAuction(
                                    nft.tokenId,
                                    obj.startBid / getDecimal(obj.chain),
                                    Math.ceil(new Date().getTime() / 1000),
                                    Math.ceil(
                                        new Date().setSeconds(
                                            new Date().getSeconds() +
                                                obj.duration
                                        ) / 1000
                                    )
                                );
                            } else if (action == "Sale") {
                                const obj = JSON.parse(
                                    localStorage.getItem("nearSellObj")
                                );

                                approveNFTForSale(
                                    nft.tokenId,
                                    obj.startBid / getDecimal(obj.chain)
                                );
                            }
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "nft_approve"
                        ) {
                            const obj = JSON.parse(
                                localStorage.getItem("nearSellObj")
                            );
                            obj.auctionHash = txhash;
                            createSellApi(obj).then((res) => {
                                toast.success("Sale created");
                                localStorage.removeItem("nearSellObj");
                                navigate("/explore");
                            });
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "approve_nft_auction"
                        ) {
                            const obj = JSON.parse(
                                localStorage.getItem("nearAuctionObj")
                            );
                            obj.auctionHash = txhash;
                            createAuctionApi(obj).then((res) => {
                                toast.success("Auction created");
                                localStorage.removeItem("nearAuctionObj");
                                navigate("/explore");
                                console.log(res.data);
                            });
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "offer"
                        ) {
                            buyItemApi(
                                auction,
                                txhash,
                                creator.name,
                                creator.id
                            ).then((res) => {
                                toast.success("Buy successful");
                                navigate("/profile");
                                console.log(res.data);
                            });
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "remove_sale"
                        ) {
                            endSaleApi(auction, txhash, creator.name).then(
                                (res) => {
                                    toast.success("Sale Ended");
                                    navigate("/profile");
                                    console.log(res.data);
                                }
                            );
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "offer_bid"
                        ) {
                            const obj = JSON.parse(
                                localStorage.getItem("nearSellObj")
                            );
                            placeBidApi(
                                auction,
                                txhash,
                                obj.bid * getDecimal(obj.chan),
                                creator.name,
                                creator.email
                            ).then((res) => {
                                toast.success("Buy successful");
                                navigate("/profile");
                                console.log(res.data);
                            });
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "remove_auction"
                        ) {
                            cancelAuctionApi(
                                auction,
                                txhash,
                                creator.name
                            ).then((res) => {
                                toast.success("Auction Cancelled");
                                navigate("/profile");
                                console.log(res.data);
                            });
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "process_auction_purchase"
                        ) {
                            endSaleApi(auction, txhash, creator.name).then(
                                (res) => {
                                    toast.success("Auction Ended");
                                    navigate("/profile");
                                    console.log(res.data);
                                }
                            );
                        }
                    });
            }
        })();

        checkChain()
    }, []);
    

    useEffect(() => {
        if(localStorage.getItem('walletConnected')) {
            checkChain()
        }
    },[fullLoading])
    return (
        <>
            <PlaceBid
                title={type === 0 ? "Input Price" : "Input Price and Time"}
                show={popUpShow}
                handleClose={() => setPopUpShow(false)}
                type="success"
            >
                <div className="success__body">
                    <>
                        <div className="input_price">
                            <Input
                                title="Asset Price"
                                placeholder="Enter Asset Price"
                                state={startBid}
                                setState={setStartBid}
                                number
                            />

                            {type === 1 && (
                                <div
                                    className="blockchain"
                                    style={{ marginTop: "15px" }}
                                >
                                    <div className="field-title">Duration</div>
                                    <div className="select-chain">
                                        <FormControl
                                            variant="standard"
                                            sx={{
                                                m: 0,
                                                minWidth: 120,
                                                width: "100%",
                                            }}
                                        >
                                            <Select
                                                labelId="chain-select-label"
                                                id="chain-select"
                                                value={duration}
                                                onChange={(e) =>
                                                    setDuration(e.target.value)
                                                }
                                                label="Chain"
                                            >
                                                <MenuItem value="1">
                                                    1 Day
                                                </MenuItem>
                                                <MenuItem value="2">
                                                    2 Days
                                                </MenuItem>
                                                <MenuItem value="3">
                                                    3 Days
                                                </MenuItem>
                                                <MenuItem value="4">
                                                    4 Days
                                                </MenuItem>
                                                <MenuItem value="5">
                                                    5 Days
                                                </MenuItem>
                                                <MenuItem value="6">
                                                    6 Days
                                                </MenuItem>
                                                <MenuItem value="7">
                                                    7 Days
                                                </MenuItem>
                                                <MenuItem value="8">
                                                    8 Days
                                                </MenuItem>
                                                <MenuItem value="9">
                                                    9 Days
                                                </MenuItem>
                                                <MenuItem value="10">
                                                    10 Days
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            )}
                            <button
                                className="btn"
                                style={{ marginTop: "15px" }}
                                onClick={() =>
                                    type === 0 ? createSell() : createAuction()
                                }
                            >
                                Submit
                            </button>
                        </div>
                    </>
                </div>
            </PlaceBid>
            <PlaceBid
                title={"Bid NFT"}
                show={popUpShowBid}
                handleClose={() => setPopUpShowBid(false)}
                type="success"
            >
                <div className="success__body">
                    <div className="mt-5 input_price">
                        <Input
                            title="Place Bid"
                            placeholder="Enter Your Bid"
                            state={bid}
                            setState={setBid}
                            number
                        />
                        <button
                            className="btn"
                            style={{ marginTop: "15px" }}
                            onClick={() => placeBid()}
                        >
                            Place Bid
                        </button>
                    </div>
                </div>
            </PlaceBid>
            <div className="nft-info">
                <h2>{nft.name}</h2>
                <div className="nft-price">
                    {auction && (
                        <span>
                            {auction?.lastBid && auction?.lastBid !== 0
                                ? (
                                      auction?.lastBid / getDecimal(nft.chain)
                                  ).toFixed(4)
                                : (
                                      auction?.startBid / getDecimal(nft.chain)
                                  ).toFixed(4)}{" "}
                            {getChainSymbol(nft.chain)}
                        </span>
                    )}
                </div>
                <div className="nft-description">
                    <p>{nft.description}</p>
                </div>
                <div className="nft-creator">
                    <span>Creator</span>
                    <div>
                        <img
                            src={
                                creator && creator.profileUrl
                                    ? creator.profileUrl
                                    : nftImg
                            }
                            alt="creator"
                            className="user-img"
                        />
                        <span>{creator?.username}</span>
                    </div>
                </div>
                <div className="more-info">
                    <div className="filters">
                        {filters.map((filter: any) => (
                            <button
                                key={uuid()}
                                onClick={() => setActiveFilter(filter)}
                                className={`filter-btn mr-2 ${
                                    filter === activeFilter ? "active" : ""
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    {activeFilter === "History" && (
                        <History data={historyData} />
                    )}
                    {activeFilter === "Properties" && (
                        <Properties tags={nft.tags} />
                    )}
                    {activeFilter === "Bids" && (
                        <Bids bids={bids} nftChain={nft?.chain}/>
                    )}
                </div>
                <div className="bid-buy-box">
                    <div className="user-info">
                        <div>
                            {auction && (
                                <div className="price-info">
                                    <span className="blue-head">
                                    {auction?.lastBid && auction?.lastBid !== 0
                                        ? (
                                            auction?.lastBid / getDecimal(nft.chain)
                                        ).toFixed(4)
                                        : (
                                            auction?.startBid / getDecimal(nft.chain)
                                        ).toFixed(4)}{" "}
                                    {getChainSymbol(nft.chain)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="btn-box">
                        {chainConnected ? (
                            userInfo &&
                            userInfo._id === nft.owner &&
                            Number(nft.nftStatus) === 1 ? (
                                <div style={{ width: "100%", display: "flex" }}>
                                    <button
                                        className="btn mr-2"
                                        onClick={() => {
                                            setType(0);
                                            setPopUpShow(true);
                                        }}
                                    >
                                        Create Sale
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setType(1);
                                            setPopUpShow(true);
                                        }}
                                    >
                                        Start Auction
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn"
                                    onClick={() => handleButtonClick()}
                                >
                                    {getButtonName()}
                                </button>
                            )
                        ) : (
                            <button
                                className="btn"
                                onClick={() => setWalletModal(true)}
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                    <span className="service-fee">Service fees 2%</span>
                </div>
            </div>

            <WalletsModal
                open={walletModal}
                setOpen={setWalletModal}
                chainName={pageChain}
            />
        </>
    );
};

const History = ({ data }) => {
    return (
        <div className="nft-history-box">
            {data.map((history: any) => (
                <div key={uuid()} className="nft-history">
                    <div>
                        <div className="msg">
                            {history.state} {getCompleteDate(history.date)}
                        </div>
                        <div className="info">From {history.from}</div>
                        <div className="info">To {history.to}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Properties = ({ tags }) => {
    return (
        <div className="nft-history-box">
            {tags && tags.length > 0 ? (
                tags.map((tag: any) => {
                    return (
                        <div key={uuid()} className="flex ">
                            <span className="mr-2">{tag.property} :</span>
                            <span className="font-bold">{tag.value}</span>
                        </div>
                    );
                })
            ) : (
                <div>No properties</div>
            )}
        </div>
    );
};

const Bids = ({ bids, nftChain }) => {
  return(
    <div className="nft-bids-box">
        {bids.map((bid:any)=>(
            <Bid nftChain={nftChain} key={uuid()} bidInfo={bid} />
        ))}
    </div>
  )
}

const Bid = ({bidInfo, key, nftChain}) => {
  return(
    <div id={key} className="bidInfo-bid">
        <div className="bid-user">
            <img src={nftImg} alt="" />
        </div>
        <div className="bid-info">
            <div className="bid-head">
                Bid {(bidInfo.bidValue) / getDecimal(nftChain)} {bidInfo.bidCurrency}
            </div>
            <div className="bid-sub">
                By {bidInfo.bidder} {getCompleteDate(bidInfo.createdAt)}
            </div>
        </div>
    </div>
  )
}

export default NftInfo;
function setLoadingMessage(arg0: string) {
    throw new Error("Function not implemented.");
}

