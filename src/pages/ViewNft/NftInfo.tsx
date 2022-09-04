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
    getUserInfo,
    offerBid,
    offerPrice,
    processPurchase,
    removeAuction,
    removeSale,
    sendStorageDeposit,
    userInfo,
} from "../../utils/utils";
import {
    buyItemApi,
    cancelAuctionApi,
    createAuctionApi,
    createSellApi,
    endSaleApi,
    placeBidApi,
} from "../../services/api/supplier";
import { useEffect, useState } from "react";
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
import { getDecimal } from "../../utils/helpers";
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
    Metaplex,
    keypairIdentity,
    bundlrStorage,
} from "@metaplex-foundation/js";
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

const NftInfo = ({
    filters,
    creator,
    activeFilter,
    setActiveFilter,
    historyData,
    topBid,
    nft,
    auction,
    setNftLoading,
}) => {
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
    let provider;
    let program;
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

    const [button, setButton] = useState("Buy Now");
    const navigate = useNavigate();

    const createSaleSol = async (key, assetPrice) => {
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

    const createAuctionSol = async (key, assetPrice, startTime, endTime) => {
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
                startTime,
                endTime,
                {
                    accounts: {
                        order: auctionAccount,
                        orderTokenAccount: auctionTokenAccount,
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

    const sellOrderSol = async (key) => {
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
            let order = await program.account.order.fetch(orderAccount);
            console.log("Create Order Success!", order);

            return order.mintKey;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const removeSaleSol = async (key) => {
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
            let order = await program.account.order.fetch(orderAccount);

            return order.mintKey;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const bidAuctionSol = async (key, assetPrice) => {
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

    const auctionResolveSol = async (key) => {
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

    const cancelAuctionSol = async (key) => {
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
            console.log("bid", startBid);

            setPopUpShow(false);
            const address = await connectWallet(
                nft.chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible
            );
            console.log("create sell", address, nft);
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
            if (startBid == 0.0) {
                toast.error("Asset Price cannot be zero");
                return;
            }
            if (nft.chain == nearChain) {
                obj.auctionId = nft.tokenId;
                localStorage.setItem("nearAction", "Sale");
                localStorage.setItem("nearSellObj", JSON.stringify(obj));
                await sendStorageDeposit();

                return;
            } else if (nft.chain == solonaChain) {
                const aucMintKey = await createSaleSol(nft.tokenId, startBid);
                obj.auctionId = aucMintKey;
                obj.auctionHash = aucMintKey;
            } else {
                const listContract = new web3.eth.Contract(
                    //@ts-ignore
                    getCreateNftABI(),
                    getNftContractAddress(nft)
                );

                console.log(listContract);

                nft.contractType && nft.contractType == "1155"
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
                const res = await getMarketPlace(nft.chain)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        web3.utils.toWei(startBid, "ether")
                    )
                    .send({ from: address });

                if (nft.chain === tronChain) {
                    // setNftLoading(true);
                    // setLoadingMessage(
                    //   "Waiting for transaction confirmation.(It can take upto a min to confirm)"
                    // );
                    // const success = await setNotification(res);
                    // if (success) {
                    //   obj.auctionId = res;
                    //   obj.auctionHash = res;
                    // } else {
                    //   throw Error("Transaction Failed");
                    // }
                } else if (res?.transactionHash) {
                    obj.auctionId = res.events.saleCreated.returnValues.itemId;
                    obj.auctionHash = res.transactionHash;
                }
            }
            await createSellApi(obj).then((res) => {
                toast.success("Sale created");
                window.location.reload();
                console.log(res.data);
            });
        } catch (e) {
            console.log(e);

            toast.error(e);
        }
    }

    async function createAuction() {
        try {
            setPopUpShow(false);
            const address = await connectWallet(
                nft.chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible
            );
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

            if (nft.chain == nearChain) {
                obj.auctionId = nft.tokenId;
                localStorage.setItem("nearAction", "Auction");
                localStorage.setItem("nearAuctionObj", JSON.stringify(obj));
                await sendStorageDeposit();

                return;
            } else if (nft.chain == solonaChain) {
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
            } else {
                await getCreateNftContract(nft.chain)
                    .methods.approve(
                        getAuctionContractAddress(nft.chain),
                        nft.tokenId
                    )
                    .send({ from: address });
                console.log(getCreateNftContractAddress(nft.chain, "721"));

                const res = await getAuctionContract(nft.chain)
                    .methods.createAuction(
                        getCreateNftContractAddress(nft.chain, "721"),
                        nft.tokenId,
                        web3.utils.toWei(startBid.toString(), "ether"),
                        Number(duration) * 86400
                    )
                    .send({ from: address });
                console.log("res", res);

                if (nft.chain === tronChain) {
                    const success = await setNotification(res);
                    if (success) {
                        obj.auctionId = res;
                        obj.auctionHash = res;
                    } else {
                        throw Error("Transaction Failed");
                    }
                } else if (res?.transactionHash) {
                    obj.auctionId =
                        res.events.AuctionCreated.returnValues.auctionId;
                    obj.auctionHash = res.transactionHash;
                }
                await createAuctionApi(obj).then((res) => {
                    toast.success("Auction created");
                    console.log(res.data);
                });
            }
        } catch (e) {
            console.log(e);
            toast.error("Auction Failed");
        }
    }
    async function buyItem() {
        try {
            setNftLoading(true);
            const address = await connectWallet(
                auction.chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible
            );
            console.log("buy item", address, auction);

            let transactionHash;
            if (nft.chain == nearChain) {
                await offerPrice(
                    nft.tokenId,
                    Number(auction.startBid) / getDecimal(nft.chain)
                );
                return;
            } else if (nft.chain == solonaChain) {
                const aucMintKey = await sellOrderSol(auction.auctionId);
                transactionHash = aucMintKey;
            } else {
                const res = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.buyItem(auction.auctionId)
                    .send({
                        from: address,
                        value: auction.startBid,
                    });
                console.log(res);
                transactionHash = res.transactionHash;
            }
            toast("Buy Successful");
            if (transactionHash) {
                toast("Updating asset info...");
                await buyItemApi(
                    auction,
                    transactionHash,
                    creator.name,
                    creator.id
                ).then((res: any) => {
                    console.log(res.data);
                    toast.success("Bought Item");
                });
                setNftLoading(false);
                navigate("/profile/created");
            }
        } catch (e) {
            setNftLoading(false);
            toast.error(e);
        }
    }

    async function placeBid() {
        try {
            setNftLoading(true);
            const address = await connectWallet(
                auction.chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible
            );

            if (auction.chain.toString() == nearChain) {
                localStorage.setItem("nearBid", bid.toString());
                offerBid(nft.tokenId, Number(bid));
                return;
            } else if (nft.chain == solonaChain) {
                const aucMintKey = await bidAuctionSol(auction.auctionId, bid);
                await placeBidApi(
                    auction,
                    aucMintKey,
                    (Number(bid) * getDecimal(nft.chain)).toFixed(0),
                    creator.name,
                    creator.email
                );
            } else {
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.placeBid(auction.auctionId)
                    .send({
                        from: address,
                        value: web3.utils.toWei(bid, "ether"),
                    });
                console.log(res);
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
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
            setNftLoading(false);
        } catch (e) {
            setNftLoading(false);
            toast.error(e);
        }
    }
    async function endSale() {
        try {
            setNftLoading(true);
            const address = await connectWallet(
                auction.chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible
            );

            if (nft.chain.toString() == nearChain) {
                removeSale(nft.tokenId);
                return;
            } else if (nft.chain == solonaChain) {
                const aucMintKey = await removeSaleSol(auction.auctionId);
            } else {
                const res = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.EndSale(auction.auctionId)
                    .send({ from: address });
                if (res?.transactionHash) {
                    await endSaleApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    ).then((res) => {
                        console.log(res.data);
                        toast.success("Sale Ended");
                    });
                    setNftLoading(false);
                    navigate("/profile/created");
                }
            }
        } catch (e) {
            setNftLoading(false);
            toast.error(e);
        }
    }

    async function endAuction() {
        try {
            setNftLoading(true);

            // if (new Date() < auction.duration) {
            //   toast.error("Auction is ongoing. Try cancelling.");
            //   return console.log("Auction Not ended Yet");
            // }

            const address = await connectWallet(
                auction.chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible
            );

            if (auction.chain == nearChain) {
                processPurchase(nft.tokenId);
            } else if (nft.chain == solonaChain) {
                const aucMintKey = await auctionResolveSol(auction.auctionId);
            } else {
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.endAuction(auction.auctionId)
                    .send({ from: address });
                if (res?.transactionHash) {
                    await endSaleApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    ).then((res) => {
                        console.log(res.data);
                        toast.success("Sale Ended");
                    });
                    setNftLoading(false);

                    navigate("/profile/created");
                }
            }
        } catch (e) {
            setNftLoading(false);

            console.log(e);
            toast.error(e);
        }
    }

    async function cancelAuction() {
        try {
            setNftLoading(true);

            const address = await connectWallet(
                auction.chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible
            );

            if (auction.chain == nearChain) {
                removeAuction(nft.tokenId);
            } else if (nft.chain == solonaChain) {
                const aucMintKey = await cancelAuctionSol(auction.auctionId);
            } else {
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.cancelAuction(auction.auctionId)
                    .send({ from: address });
                if (res?.transactionHash) {
                    await cancelAuctionApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    ).then((res) => {
                        console.log(res.data);
                        toast.success("Auction Cancelled");
                    });

                    setNftLoading(false);

                    navigate("/profile/created");
                }
            }
        } catch (e) {
            setNftLoading(false);

            console.log(e);
            toast.error(e);
        }
    }

    const getButtonName = () => {
        const userInfo = getUserInfo();
        console.log("button name", nft, userInfo);

        if (userInfo) {
            if (userInfo._id == nft.uploadedBy) {
                if (nft.nftStatus == 2) {
                    return "End Sale";
                } else if (nft.nftStatus == 3) {
                    console.log(
                        "datw",
                        auction.auctionTimer,
                        new Date() > new Date(auction.auctionTimer),
                        new Date() < new Date(auction.auctionTimer)
                    );

                    if (new Date() < new Date(auction.auctionTimer)) {
                        return "Cancel Auction";
                    } else {
                        return "End Auction";
                    }
                }
            } else {
                if (nft.nftStatus == 1) {
                    return "Not For Sale";
                } else if (nft.nftStatus == 2) {
                    return "Buy Now";
                } else if (nft.nftStatus == 3) {
                    return "Place Bid";
                }
            }
        } else {
            return "Connect Wallet";
        }
    };

    const handleButtonClick = async () => {
        const userInfo = getUserInfo();

        if (userInfo) {
            if (userInfo._id == nft.uploadedBy) {
                if (nft.nftStatus == 2) {
                    endSale();
                } else if (nft.nftStatus == 3) {
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

    useEffect(() => {
        (async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const txhash = urlParams.get("transactionHashes");
            const errorCode = urlParams.get("errorCode");
            const errMsg = urlParams.get("errorMessage");

            console.log("sear", txhash, errorCode, errMsg);

            if (errorCode) {
                toast.error(errorCode);
            } else if (txhash != null) {
                const address = await connectNear();
                axios
                    .post("https://rpc.testnet.near.org", {
                        jsonrpc: "2.0",
                        id: "dontcare",
                        method: "tx",
                        params: [txhash, address],
                    })
                    .then((res: any) => {
                        console.log("sear 1", res);

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
                                .method_name == "nft_approve"
                        ) {
                            const obj = JSON.parse(
                                localStorage.getItem("nearSellObj")
                            );
                            obj.auctionHash = txhash;
                            createSellApi(obj).then((res) => {
                                toast.success("Sale created");
                                localStorage.removeItem("nearSellObj");
                                navigate("/explore");
                                console.log(res.data);
                            });
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name == "approve_nft_auction"
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
                                .method_name == "offer"
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
                                .method_name == "remove_sale"
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
                                .method_name == "offer_bid"
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
                                .method_name == "remove_auction"
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
                                .method_name == "process_auction_purchase"
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
    }, []);

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
                        <div className="mt-5 input_price">
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
                            {auction?.lastBid
                                ? (
                                      auction?.lastBid / getDecimal(nft.chain)
                                  ).toFixed(4)
                                : (
                                      auction?.startBid / getDecimal(nft.chain)
                                  ).toFixed(4)}{" "}
                            {getChainSymbol(nft.chain)}
                        </span>
                    )}
                    {/* <span>$ 5768.6</span>
        <span>12 in stock</span> */}
                </div>
                <div className="nft-description">
                    <p>{nft.description}</p>
                    {/* <button>Read More</button> */}
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
                        <span>{creator && creator.username}</span>
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
                    {activeFilter === "Properties" && <Properties nft={nft} />}
                </div>
                <div className="bid-buy-box">
                    <div className="user-info">
                        {/* <img src={topBid.img} alt="top-bid" className="user-img" /> */}
                        <div>
                            {/* <span>
              Highest bid by <span className="blue-text">{topBid.name}</span>
            </span> */}
                            {auction && (
                                <div className="price-info">
                                    <span className="blue-head">
                                        {auction.lastBid && auction.lastBid != 0
                                            ? auction.lastBid
                                            : auction.startBid /
                                              getDecimal(nft.chain)}{" "}
                                        {getChainSymbol(nft.chain)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="btn-box">
                        {/* <button className="btn" onClick={() => placeBid()}>
            Place a bid
          </button> */}
                        {userInfo &&
                        userInfo._id == nft.uploadedBy &&
                        nft.nftStatus == 1 ? (
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
                        )}
                    </div>
                    <span className="service-fee">Service fees 2%</span>
                </div>
            </div>
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

const Properties = ({ nft }) => {
    return (
        <div className="nft-history-box">
            {nft && nft.tags && nft.tags.length > 1 ? (
                nft.tags.map((tag: any) => {
                    return (
                        <div key={uuid()} className="gridBbox">
                            <h6>{tag.propertyType}</h6>
                            <h6>{tag.propertyName}</h6>
                        </div>
                    );
                })
            ) : (
                <div>No properties</div>
            )}
        </div>
    );
};
export default NftInfo;
