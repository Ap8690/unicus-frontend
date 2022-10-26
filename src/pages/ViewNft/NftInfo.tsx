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
    getChainName,
    nearWalletConnection,
    getMinimumStorage,
    trimString,
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
import {
    nearChain,
    nearMarketAddress,
    nearNftAddress,
    solonaChain,
    tronChain,
} from "../../config";
import toast from "react-hot-toast";
import axios from "axios";
import { setNotification } from "../../Redux/Blockchain/contracts";
import { decodeParams, getDecimal, capitalize } from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import PlaceBid from "../../components/modals/PlaceBid/PlaceBid";
import Input from "../../components/Input/Input";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    TOKEN_PROGRAM_ID,
    getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import SolMintNftIdl from "../../utils/sol_mint_nft.json";
import uuid from "react-uuid";
import { getCompleteDate, getTomorrowDate } from "../../utils/date";
import WalletsModal from "../../components/modals/WalletsModal/WalletsModal";
import { isChainConnected } from "../../utils/helpers";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getRemainingSeconds } from "../../utils/date";
import { ChainContext } from "../../context/ChainContext";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import Tooltip from "@mui/material/Tooltip";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

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
    pageChain,
}) => {
    let userInfo = getUserInfo();
    // const { chain } = useParams();
    const { setChain } = useContext(ChainContext);
    const { chainConnected, setChainConnected, setWalletModal, walletModal } =
        useContext(ConnectWalletContext);
    const [chainChangeMessage, setChainChangeMessage] = useState("");
    const [startBid, setStartBid] = useState<any>(
        auction ? auction.startBid : 0.0
    );
    const [duration, setDuration] = useState<any>(86400);
    const [newTime, setNewTime] = useState<Dayjs | null>(
        dayjs(getTomorrowDate())
    );
    const [bid, setBid] = useState("");
    const [type, setType] = useState(0);
    const [popUpShow, setPopUpShow] = useState(false);
    const [popUpShowBid, setPopUpShowBid] = useState(false);
    const [assetQuantity, setAssetQuantity] = useState(1)
    const { connection } = useConnection();
    const { connect, publicKey, sendTransaction } = useWallet();
    const wallet = useWallet();
    const anWallet = useAnchorWallet();
    const { setVisible } = useWalletModal();
    let provider: any;
    let program: any;
    const getSolWallet = () => {
        return wallet;
    };
    const SOL_MINT_NFT_PROGRAM_ID = new anchor.web3.PublicKey(
        "AvrGQ538bsHRfqJpyfEZumVxLfde3GcBw4AH4JLT3Wyu"
    );

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
            await connection.confirmTransaction({
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                signature: signature,
            });

            // console.log("Fill Order Success!",orderAccount,program.account.order,program.account);
            // let order = await program.account.order.fetch(orderAccount);
            // console.log("Create Order Success!", order);

            return latestBlockhash.blockhash;
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

            // console.log("Cancel Order Success!",orderAccount);
            // let order = await program.account.order.fetch(orderAccount);

            return latestBlockhash.blockhash;
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

        // try {
        //     const tx = new anchor.web3.Transaction().add(
        //         createAssociatedTokenAccountInstruction(
        //             anWallet.publicKey,
        //             bidderTokenAccount,
        //             anWallet.publicKey,
        //             mintKey
        //         )
        //     );

        //     const signature = await sendTransaction(tx, connection);
        //     const latestBlockhash = await connection.getLatestBlockhash();

        //     await connection.confirmTransaction({
        //         blockhash: latestBlockhash.blockhash,
        //         lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        //         signature: signature,
        //     });
        // } catch (err) {
        //     console.log(err);
        // }

        // try {
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

        return auction.mintKey;
        // } catch (err) {
        //     console.log(err);
        //     return false;
        // }
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

        let creatorTokenAccount = await getAssociatedTokenAddress(
            mintKey,
            auction.creator
        );
        let refundReceiverTokenAccount = await getAssociatedTokenAddress(
            mintKey,
            auction.refundReceiver
        );

        const associatedAccountInfo = await connection.getAccountInfo(
            refundReceiverTokenAccount
        );

        // if(associatedAccountInfo = null)

        if (!associatedAccountInfo) {
            try {
                let tx = new anchor.web3.Transaction().add(
                    createAssociatedTokenAccountInstruction(
                        provider.wallet.publicKey,
                        refundReceiverTokenAccount,
                        auction.refundReceiver,
                        mintKey
                    )
                );

                let signature = await sendTransaction(tx, connection);
                let latestBlockhash = await connection.getLatestBlockhash();

                await connection.confirmTransaction({
                    blockhash: latestBlockhash.blockhash,
                    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                    signature: signature,
                });
            } catch (error) {
                console.log(error);
            }
        }

        const tx = program.transaction.auctionResolve({
            accounts: {
                auction: auctionAccount,
                auctionTokenAccount: auctionTokenAccount,
                mintKey: mintKey,
                creator: auction.creator,
                creatorTokenAccount: creatorTokenAccount, /// extra account field
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

        return auction.mintKey;
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

        // let tx = new anchor.web3.Transaction().add(
        //     createAssociatedTokenAccountInstruction(
        //         anWallet.publicKey,
        //         creatorTokenAccount,
        //         anWallet.publicKey,
        //         mintKey
        //     )
        // );

        // let signature = await sendTransaction(tx, connection);
        // let latestBlockhash = await connection.getLatestBlockhash();

        // await connection.confirmTransaction({
        //     blockhash: latestBlockhash.blockhash,
        //     lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        //     signature: signature,
        // });

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
    };

    async function createSell() {
        try {
            if (Number(nft.chain) !== Number(localStorage.getItem("CHAIN"))) {
                throw new Error(
                    `Please login with ${capitalize(
                        getChainName(nft.chain)
                    )} Chain`
                );
            }
            setPopUpShow(false);
            setNftLoading(true);
            let address: String = localStorage.getItem("walletConnected");
            console.log("address: ", address);
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
                throw new Error("Asset Price cannot be zero");
            }
            if (nft.chain.toString() === nearChain()) {
                const wallet = localStorage.getItem("wallet");
                if (wallet === "Sender") {
                    obj.auctionId = nft.tokenId;
                    const minimum = await getMinimumStorage();
                    let tx = {
                        receiverId: nearMarketAddress,
                        actions: [
                            {
                                methodName: "storage_deposit",
                                args: {},
                                deposit: minimum,
                            },
                        ],
                    };
                    // @ts-ignore
                    const storageTx = await window.near.signAndSendTransaction(
                        tx
                    );
                    console.log(
                        storageTx,
                        "dhfij",
                        parseNearAmount(obj.startBid.toString())
                    );
                    // // let sale_conditions = {
                    //     const sale_conditions: parseNearAmount(obj.startBid.toString()), // set asset price in ui
                    // // };
                    tx = {
                        receiverId: nearNftAddress,
                        actions: [
                            {
                                methodName: "nft_approve",
                                args: {
                                    token_id: obj.tokenId,
                                    account_id: nearMarketAddress,
                                    msg: JSON.stringify({
                                        sale_conditions: parseNearAmount(
                                            (
                                                Number(obj.startBid) /
                                                getDecimal(nft.chain)
                                            ).toString()
                                        ),
                                    }),
                                },
                                deposit: parseNearAmount("0.01"),
                            },
                        ],
                    };
                    // @ts-ignore
                    const res = await window.near.signAndSendTransaction(tx);
                    console.log(res, "response");
                    if (res?.error) {
                        throw new Error("User Rejected The Transaction!");
                    }
                    if (res?.response?.error) {
                        throw new Error("Sale not created!");
                    } else {
                        obj.auctionHash = res.response[0].transaction.hash;
                    }
                } else {
                    obj.auctionId = nft.tokenId;
                    localStorage.setItem("nearAction", "Sale");
                    localStorage.setItem("nearSellObj", JSON.stringify(obj));
                    const res = await sendStorageDeposit();
                    console.log(res, "near res");

                    return;
                }
            } else if (nft.chain.toString() === solonaChain()) {
                const aucMintKey = await createSaleSol(nft.tokenId, startBid);
                obj.auctionId = aucMintKey;
                obj.auctionHash = aucMintKey;
            } else if (Number(nft.chain) === Number(tronChain())) {
                console.log("else if");
                const listContract = getCreateNftContract(
                    nft.chain,
                    getNftContractAddress(nft, nft.contractType)
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
                console.log("APPROVED!");
                const amount = startBid * getDecimal(tronChain());
                const res = await getMarketPlace(nft.chain)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        (startBid * getDecimal(tronChain()))?.toString()
                    )
                    .send({ from: address });
                setNftLoading(true);
                const success = await setNotification(res);
                if (success) {
                    obj.auctionId = tronWeb.toDecimal(
                        await decodeParams(
                            ["uint256"],
                            "0x" + success?.log[2]?.topics[1],
                            false
                        )
                    );
                    obj.auctionHash = res;
                } else {
                    throw Error("Transaction Failed");
                }
            } else {
                const listContract = new web3.eth.Contract(
                    //@ts-ignore
                    getCreateNftABI(nft.contractType),
                    getNftContractAddress(nft, nft.contractType)
                );

                const gasPrice = await web3.eth.getGasPrice();
                let estimated =
                    nft.contractType && nft.contractType === "1155"
                        ? await listContract.methods
                              .setApprovalForAll(
                                  getMarketPlaceContractAddress(
                                      nft.chain,
                                      "1155"
                                  ),
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
                          .send({
                              from: address,
                              gas: estimated,
                              gasPrice: gasPrice,
                          })
                    : await listContract.methods
                          .approve(
                              getMarketPlaceContractAddress(nft.chain),
                              nft.tokenId
                          )
                          .send({
                              from: address,
                              gas: estimated,
                              gasPrice: gasPrice,
                          });
                //else fr 1155 apprval fr all , params marketAdrress1155 , true
                
                let res: { events: { saleCreated: { returnValues: { itemId: string; }; }; }; transactionHash: string; };
                
                if(nft.contractType === "721"){
                    estimated = await getMarketPlace(nft.chain, nft.contractType)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        web3.utils.toWei(startBid, "ether")
                    )
                    .estimateGas({ from: address });

                    res= await getMarketPlace(nft.chain, nft.contractType)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        web3.utils.toWei(startBid, "ether"),
                    )
                    .send({
                        from: address,
                        gas: estimated,
                        gasPrice: gasPrice,
                    });
                }
                else{
                    estimated = await getMarketPlace(nft.chain, nft.contractType)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        web3.utils.toWei(startBid, "ether"),
                        assetQuantity
                    )
                    .estimateGas({ from: address });

                    console.log(nft.contractAddress,
                        nft.tokenId,
                        web3.utils.toWei(startBid, "ether"),
                        assetQuantity,"print")
                    res= await getMarketPlace(nft.chain, nft.contractType)
                    .methods.createSale(
                        nft.contractAddress,
                        nft.tokenId,
                        web3.utils.toWei(startBid, "ether"),
                        assetQuantity
                    )
                    .send({
                        from: address,
                        gas: estimated,
                        gasPrice: gasPrice,
                    });
                }

                obj.auctionId = res.events.saleCreated.returnValues.itemId;
                obj.auctionHash = res.transactionHash;
            }
            await createSellApi(obj);

            console.log("here");
            await fetchItem();
            setNftLoading(false);
            return toast.success("Sale created");
        } catch (e) {
            console.log(e);
            getRPCErrorMessage(e);
            setNftLoading(false);
        }
    }

    async function createAuction() {
        try {
            if (Number(nft.chain) !== Number(localStorage.getItem("CHAIN"))) {
                throw new Error(
                    `Please login with ${capitalize(
                        getChainName(nft.chain)
                    )} Chain`
                );
            }
            if (Number(startBid) == 0) {
                throw new Error(`Auction price cannot be zero`);
            }
            setPopUpShow(false);
            setNftLoading(true);

            let address: String = localStorage.getItem("walletConnected");
            console.log("(Number(duration)", Number(duration));
            let obj = {
                nftId: nft._id,
                sellerInfo: userInfo.username,
                auctionId: "",
                startBid: Number(startBid) * getDecimal(nft.chain),
                auctionType: "Auction",
                duration: Number(duration),
                auctionHash: "",
                tokenId: nft.tokenId,
                chain: nft.chain,
                name: nft.name,
                cloudinaryUrl: nft.cloudinaryUrl,
                sellerWallet: address,
                sellerId: userInfo && userInfo._id,
            };

            if (nft.chain.toString() === nearChain()) {
                const wallet = localStorage.getItem("wallet");
                if (wallet === "Sender") {
                    obj.auctionId = nft.tokenId;
                    const minimum = await getMinimumStorage();
                    let tx = {
                        receiverId: nearMarketAddress,
                        actions: [
                            {
                                methodName: "storage_deposit",
                                args: {},
                                deposit: minimum,
                            },
                        ],
                    };
                    // @ts-ignore
                    const storageTx = await window.near.signAndSendTransaction(
                        tx
                    );
                    console.log(
                        storageTx,
                        "dhfij",
                        parseNearAmount(obj.startBid.toString())
                    );

                    tx = {
                        receiverId: nearNftAddress,
                        actions: [
                            {
                                methodName: "approve_nft_auction",
                                args: {
                                    auction_token: obj.tokenId,
                                    account_id: nearMarketAddress,
                                    start_time: Math.ceil(
                                        new Date().getTime() / 1000
                                    ), // Time in seconds (as type u64)
                                    end_time: Math.ceil(
                                        new Date().setSeconds(
                                            new Date().getSeconds() +
                                                obj.duration
                                        ) / 1000
                                    ), // Time in seconds (as type u64)
                                    msg: JSON.stringify({
                                        sale_conditions: parseNearAmount(
                                            (
                                                Number(obj.startBid) /
                                                getDecimal(nft.chain)
                                            ).toString()
                                        ),
                                    }),
                                },
                                deposit: parseNearAmount("0.01"),
                            },
                        ],
                    };
                    // @ts-ignore
                    const res = await window.near.signAndSendTransaction(tx);
                    console.log(res, "response");
                    if (res?.error) {
                        throw new Error("User Rejected The Transaction!");
                    }
                    if (res?.response?.error) {
                        throw new Error("Auction not created!");
                    } else {
                        obj.auctionHash = res.response[0].transaction.hash;
                        await createAuctionApi(obj);
                        setNftLoading(false);
                        toast.success("Auction created");
                    }
                } else {
                    obj.auctionId = nft.tokenId;
                    localStorage.setItem("nearAction", "Auction");
                    localStorage.setItem("nearAuctionObj", JSON.stringify(obj));
                    await sendStorageDeposit();
                    return;
                }
            } else if (nft.chain.toString() === solonaChain()) {
                const aucMintKey = await createAuctionSol(
                    nft.tokenId,
                    startBid,
                    Math.ceil(new Date().getTime() / 1000) + 300,
                    Math.ceil(
                        new Date().setSeconds(
                            new Date().getSeconds() + obj.duration
                        ) /
                            1000 +
                            600
                    )
                );
                obj.auctionId = aucMintKey;
                obj.auctionHash = aucMintKey;
                await createAuctionApi(obj);
                setNftLoading(false);
                toast.success("Auction created");
            } else if (nft.chain.toString() === tronChain()) {
                await getCreateNftContract(nft.chain, nft.contractType)
                    .methods.approve(
                        getAuctionContractAddress(nft.chain, nft.contractType),
                        nft.tokenId
                    )
                    .send({ from: address });
                const amount = startBid * getDecimal(tronChain());
                const res = await getAuctionContract(
                    nft.chain,
                    nft.contractType
                )
                    .methods.createAuction(
                        getCreateNftContractAddress(
                            nft.chain,
                            nft.contractType
                        ),
                        nft.tokenId,
                        amount.toString(),
                        Number(duration)
                    )
                    .send({ from: address });
                const success = await setNotification(res);
                if (success) {
                    obj.auctionId = tronWeb.toDecimal(
                        await decodeParams(
                            ["uint256"],
                            "0x" + success?.log[2]?.topics[1],
                            false
                        )
                    );
                    obj.auctionHash = res;
                } else {
                    throw Error("Transaction Failed");
                }
                await createAuctionApi(obj);
                toast.success("Auction created");
            } else {
                const gasPrice = await web3.eth.getGasPrice();
                console.log(
                    await getCreateNftContract(nft.chain, nft.contractType),
                    "tgype"
                );
                if (nft.contractType === "721") {
                    let estimated = await getCreateNftContract(
                        nft.chain,
                        nft.contractType
                    )
                        .methods.approve(
                            getAuctionContractAddress(
                                nft.chain,
                                nft.contractType
                            ),
                            nft.tokenId
                        )
                        .estimateGas({ from: address });
                    await getCreateNftContract(nft.chain, nft.contractType)
                        .methods.approve(
                            getAuctionContractAddress(
                                nft.chain,
                                nft.contractType
                            ),
                            nft.tokenId
                        )
                        .send({
                            from: address,
                            gas: estimated,
                            gasPrice: gasPrice,
                        });
                } else {
                    let estimated = await getCreateNftContract(
                        nft.chain,
                        nft.contractType
                    )
                        .methods.setApprovalForAll(
                            getAuctionContractAddress(
                                nft.chain,
                                nft.contractType
                            ),
                            nft.tokenId
                        )
                        .estimateGas({ from: address });
                    await getCreateNftContract(nft.chain, nft.contractType)
                        .methods.setApprovalForAll(
                            getAuctionContractAddress(
                                nft.chain,
                                nft.contractType
                            ),
                            nft.tokenId
                        )
                        .send({
                            from: address,
                            gas: estimated,
                            gasPrice: gasPrice,
                        });
                }

                const estimated = await getAuctionContract(
                    nft.chain,
                    nft.contractType
                )
                    .methods.createAuction(
                        getCreateNftContractAddress(
                            nft.chain,
                            nft.contractType
                        ),
                        nft.tokenId,
                        web3.utils.toWei(startBid.toString(), "ether"),
                        Number(duration)
                    )
                    .estimateGas({ from: address });
                let res: { events: { AuctionCreated: { returnValues: { auctionId: string; }; }; }; transactionHash: string; } ;
                if(nft.contractType === "721"){
                    res = await getAuctionContract(
                        nft.chain,
                        nft.contractType
                    )
                        .methods.createAuction(
                            getCreateNftContractAddress(
                                nft.chain,
                                nft.contractType
                            ),
                            nft.tokenId,
                            web3.utils.toWei(startBid.toString(), "ether"),
                            Number(duration),
                        )
                        .send({
                            from: address,
                            gas: estimated,
                            gasPrice: gasPrice,
                        });
                }
                else{
                    res = await getAuctionContract(
                        nft.chain,
                        nft.contractType
                    )
                        .methods.createAuction(
                            getCreateNftContractAddress(
                                nft.chain,
                                nft.contractType
                            ),
                            nft.tokenId,
                            web3.utils.toWei(startBid.toString(), "ether"),
                            Number(duration),
                            assetQuantity
                        )
                        .send({
                            from: address,
                            gas: estimated,
                            gasPrice: gasPrice,
                        });
                }


                obj.auctionId =
                    res.events.AuctionCreated.returnValues.auctionId;
                obj.auctionHash = res.transactionHash;
                await createAuctionApi(obj);
                setNftLoading(false);
            }
            await fetchItem();
            return toast.success("Auction created");
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e);
        }
    }

    async function buyItem() {
        try {
            if (Number(nft.chain) !== Number(localStorage.getItem("CHAIN"))) {
                throw new Error(
                    `Please login with ${capitalize(
                        getChainName(nft.chain)
                    )} Chain`
                );
            }
            setNftLoading(true);
            let address: String = localStorage.getItem("walletConnected");
            let transactionHash: any;
            if (nft.chain.toString() === nearChain()) {
                const wallet = localStorage.getItem("wallet");
                if (wallet === "Sender") {
                    const tx = {
                        receiverId: nearMarketAddress,
                        actions: [
                            {
                                methodName: "offer",
                                args: {
                                    token_id: nft.tokenId,
                                    nft_contract_id: nearNftAddress,
                                },
                                gas: "200000000000000",
                                deposit: parseNearAmount(
                                    (
                                        Number(auction.startBid) /
                                        getDecimal(nft.chain)
                                    ).toString()
                                ),
                            },
                        ],
                    };
                    // @ts-ignore
                    const res = await window.near.signAndSendTransaction(tx);
                    console.log(res, "response");
                    if (res?.error) {
                        throw new Error("User Rejected The Transaction!");
                    }
                    if (res?.response?.error) {
                        throw new Error("Sale not ended!");
                    } else {
                        await buyItemApi(
                            auction,
                            res.response[0].transaction.hash,
                            creator.name,
                            creator.id
                        );
                        toast.success("Bought Item");
                        setNftLoading(false);
                        navigate("/profile/created");
                    }
                } else {
                    await offerPrice(
                        nft.tokenId,
                        Number(auction.startBid) / getDecimal(nft.chain)
                    );
                    return;
                }
            } else if (nft.chain.toString() === solonaChain()) {
                const aucMintKey = await sellOrderSol(auction.auctionId);
                transactionHash = aucMintKey;
            } else if (nft.chain.toString() === tronChain()) {
                const itemInfo = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.idToMarketItem(auction.auctionId)
                    .call();
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
                if (success) {
                    transactionHash = res;
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice();
                const estimated = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.buyItem(auction.auctionId)
                    .estimateGas({
                        from: address,
                        value: auction.startBid,
                    });
                const res = await getMarketPlace(
                    auction.chain,
                    auction.nftId.contractType
                )
                    .methods.buyItem(auction.auctionId)
                    .send({
                        from: address,
                        value: auction.startBid,
                        gas: estimated,
                        gasPrice: gasPrice,
                    });
                transactionHash = res.transactionHash;
            }
            if (transactionHash) {
                await buyItemApi(
                    auction,
                    transactionHash,
                    creator.name,
                    creator.id
                );
                setNftLoading(false);
                navigate("/profile/created");
                return toast.success("Bought Item");
            }
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e);
        }
        setNftLoading(false);
    }

    async function placeBid() {
        try {
            if (Number(nft.chain) !== Number(localStorage.getItem("CHAIN"))) {
                throw new Error(
                    `Please login with ${capitalize(
                        getChainName(nft.chain)
                    )} Chain`
                );
            }
            setNftLoading(true);
            // const address = await connectWallet(
            //     auction.chain,
            //     publicKey,
            //     getSolWallet,
            //     connect,
            //     setVisible
            // );
            let address: String = localStorage.getItem("walletConnected");

            if (
                auction.lastBid
                    ? auction.lastBid / getDecimal(nft.chain.toString()) >=
                      Number(bid)
                    : auction.startBid / getDecimal(nft.chain.toString()) >=
                      Number(bid)
            ) {
                setNftLoading(false);
                toast.error(
                    "The new bid value should be more then the last bid!"
                );
                return;
            }

            if (nft.chain.toString() === nearChain()) {
                const wallet = localStorage.getItem("wallet");
                if (wallet === "Sender") {
                    const tx = {
                        receiverId: nearMarketAddress,
                        actions: [
                            {
                                methodName: "offer_bid",
                                args: {
                                    token_id: nft.tokenId,
                                    nft_contract_id: nearNftAddress,
                                },
                                gas: "200000000000000",
                                deposit: parseNearAmount(bid.toString()),
                            },
                        ],
                    };
                    // @ts-ignore
                    const res = await window.near.signAndSendTransaction(tx);
                    console.log(res, "response");
                    if (res?.error) {
                        throw new Error("User Rejected The Transaction!");
                    }
                    if (res?.response?.error) {
                        throw new Error("Bid Not Placecd!");
                    } else {
                        await placeBidApi(
                            auction,
                            res.response[0].transaction.hash,
                            (Number(bid) * getDecimal(nft.chain)).toFixed(0),
                            creator.name,
                            creator.email
                        );
                        toast("Bid placed Successful");
                        setNftLoading(false);
                    }
                } else {
                    localStorage.setItem("nearBid", bid.toString());
                    offerBid(nft.tokenId, Number(bid));
                    return;
                }
            } else if (nft.chain.toString() === solonaChain()) {
                const aucMintKey = await bidAuctionSol(auction.auctionId, bid);
                if (aucMintKey) {
                    await placeBidApi(
                        auction,
                        aucMintKey,
                        (Number(bid) * getDecimal(nft.chain)).toFixed(0),
                        creator.name,
                        creator.email
                    );
                    toast("Bid placed Successful");
                }
            } else if (nft.chain.toString() === tronChain()) {
                const amount = Number(bid) * getDecimal(tronChain());
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.placeBid(auction.auctionId)
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
                    );
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice();
                const estimated = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.placeBid(auction.auctionId)
                    .estimateGas({
                        from: address,
                        value: web3.utils.toWei(bid, "ether"),
                    });
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.placeBid(auction.auctionId)
                    .send({
                        from: address,
                        value: web3.utils.toWei(bid, "ether"),
                        gas: estimated,
                        gasPrice: gasPrice,
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
                    );
                }
            }
            setNftLoading(false);
            await fetchItem();
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e);
        }
    }

    async function endSale() {
        try {
            if (Number(nft.chain) !== Number(localStorage.getItem("CHAIN"))) {
                throw new Error(
                    `Please login with ${capitalize(
                        getChainName(nft.chain)
                    )} Chain`
                );
            }
            setNftLoading(true);
            // const address = await connectWallet(
            //     auction.chain,
            //     publicKey,
            //     getSolWallet,
            //     connect,
            //     setVisible
            // );
            let address: String = localStorage.getItem("walletConnected");
            if (nft.chain.toString() === nearChain()) {
                const wallet = localStorage.getItem("wallet");
                if (wallet === "Sender") {
                    const tx = {
                        receiverId: nearMarketAddress,
                        actions: [
                            {
                                methodName: "remove_sale",
                                args: {
                                    token_id: nft.tokenId,
                                    nft_contract_id: nearNftAddress,
                                },
                                gas: "200000000000000",
                                deposit: "1",
                            },
                        ],
                    };
                    // @ts-ignore
                    const res = await window.near.signAndSendTransaction(tx);
                    console.log(res, "response");
                    if (res?.error) {
                        throw new Error("User Rejected The Transaction!");
                    }
                    if (res?.response?.error) {
                        throw new Error("Sale not ended!");
                    } else {
                        await endSaleApi(
                            auction,
                            res.response[0].transaction.hash,
                            creator.name
                        );
                        toast.success("Sale Ended");
                        setNftLoading(false);
                    }
                } else {
                    removeSale(nft.tokenId);
                    return;
                }
            } else if (Number(nft.chain) === Number(solonaChain())) {
                const aucMintKey = await removeSaleSol(auction.auctionId);
                if (aucMintKey) {
                    await endSaleApi(auction, aucMintKey, creator.name);
                    toast.success("Sale Ended");
                    setNftLoading(false);
                    navigate("/profile/created");
                }
            } else if (Number(nft.chain) === Number(tronChain())) {
                const res = await getMarketPlace(
                    auction.chain,
                    nft.contractType
                )
                    .methods.EndSale(auction.auctionId)
                    .send({ from: address });
                if (res) {
                    await endSaleApi(auction, res, creator.name);
                    toast.success("Sale Ended");
                    setNftLoading(false);
                    navigate("/profile/created");
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice();
                const estimated = await getMarketPlace(
                    auction.chain,
                    nft.contractType
                )
                    .methods.EndSale(auction.auctionId)
                    .estimateGas({ from: address });
                const res = await getMarketPlace(
                    auction.chain,
                    nft.contractType
                )
                    .methods.EndSale(auction.auctionId)
                    .send({
                        from: address,
                        gas: estimated,
                        gasPrice: gasPrice,
                    });
                console.log("res: ", res);
                if (res?.transactionHash) {
                    await endSaleApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    );

                    // navigate("/profile/created");
                    setNftLoading(false);
                }
            }
            await fetchItem();
            return toast.success("Sale Ended");
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e);
        }
    }

    async function endAuction() {
        try {
            if (Number(nft.chain) !== Number(localStorage.getItem("CHAIN"))) {
                throw new Error(
                    `Please login with ${capitalize(
                        getChainName(nft.chain)
                    )} Chain`
                );
            }
            setNftLoading(true);

            // if (new Date() < auction.duration) {
            //   toast.error("Auction is ongoing. Try cancelling.");
            //   return console.log("Auction Not ended Yet");
            // }
            console.log(auction);

            let address: String = localStorage.getItem("walletConnected");
            if (auction.chain.toString() === nearChain()) {
                const wallet = localStorage.getItem("wallet");
                if (wallet === "Sender") {
                    const tx = {
                        receiverId: nearMarketAddress,
                        actions: [
                            {
                                methodName: "process_auction_purchase",
                                args: {
                                    token_id: nft.tokenId,
                                    nft_contract_id: nearNftAddress,
                                },
                                gas: "200000000000000",
                                deposit: "0",
                            },
                        ],
                    };
                    // @ts-ignore
                    const res = await window.near.signAndSendTransaction(tx);
                    console.log(res, "response");
                    if (res?.error) {
                        throw new Error("User Rejected The Transaction!");
                    }
                    if (res?.response?.error) {
                        throw new Error("Auction Not Ended!");
                    } else {
                        await endSaleApi(
                            auction,
                            res.response[0].transaction.hash,
                            creator.name
                        );
                        setNftLoading(false);
                        return toast.success("Auction Ended!");
                    }
                } else {
                    processPurchase(nft.tokenId);
                    return;
                }
            } else if (nft.chain.toString() === solonaChain()) {
                const aucMintKey = await auctionResolveSol(auction.auctionId);
                if (aucMintKey) {
                    await endSaleApi(auction, aucMintKey, creator.name);
                    toast.success("Sale Ended");
                    setNftLoading(false);
                    navigate("/profile/created");
                }
            } else if (nft.chain.toString() === tronChain()) {
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.endAuction(auction.auctionId)
                    .send({ from: address });
                if (res) {
                    await endSaleApi(auction, res, creator.name);
                    setNftLoading(false);
                    navigate("/profile/created");
                    return toast.success("Sale Ended");
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice();
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
                    .send({
                        from: address,
                        gas: estimated,
                        gasPrice: gasPrice,
                    });
                if (res?.transactionHash) {
                    await endSaleApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    );
                    setNftLoading(false);
                    navigate("/profile/created");
                    return toast.success("Sale Ended");
                }
            }
        } catch (e) {
            console.log(e);
            setNftLoading(false);
            getRPCErrorMessage(e);
        }
    }

    async function cancelAuction() {
        try {
            if (Number(nft.chain) !== Number(localStorage.getItem("CHAIN"))) {
                throw new Error(
                    `Please login with ${capitalize(
                        getChainName(nft.chain)
                    )} Chain`
                );
            }
            setNftLoading(true);

            let address: String = localStorage.getItem("walletConnected");
            if (auction.chain.toString() === nearChain()) {
                const wallet = localStorage.getItem("wallet");
                if (wallet === "Sender") {
                    const tx = {
                        receiverId: nearMarketAddress,
                        actions: [
                            {
                                methodName: "remove_auction",
                                args: {
                                    token_id: nft.tokenId,
                                    nft_contract_id: nearNftAddress,
                                },
                                gas: "200000000000000",
                                deposit: "1",
                            },
                        ],
                    };
                    // @ts-ignore
                    const res = await window.near.signAndSendTransaction(tx);
                    console.log(res, "response");
                    if (res?.error) {
                        throw new Error("User Rejected The Transaction!");
                    }
                    if (res?.response?.error) {
                        throw new Error("Auction not Cancelled!");
                    } else {
                        await cancelAuctionApi(
                            auction,
                            res.response[0].transaction.hash,
                            creator.name
                        );
                        toast.success("Auction Cancelled");
                        setNftLoading(false);
                    }
                } else {
                    removeAuction(nft.tokenId);
                    return;
                }
            } else if (nft.chain.toString() === solonaChain()) {
                const aucMintKey = await cancelAuctionSol(auction.auctionId);
                if (aucMintKey) {
                    await cancelAuctionApi(auction, aucMintKey, creator.name);
                    toast.success("Auction Cancelled");
                    setNftLoading(false);
                }
            } else if (nft.chain.toString() === tronChain()) {
                const res = await getAuctionContract(
                    auction.chain,
                    nft.contractType
                )
                    .methods.cancelAuction(auction.auctionId)
                    .send({ from: address });
                if (res) {
                    await cancelAuctionApi(auction, res, creator.name);
                    toast.success("Auction Cancelled");
                    setNftLoading(false);
                }
            } else {
                const gasPrice = await web3.eth.getGasPrice();
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
                    .send({
                        from: address,
                        gas: estimated,
                        gasPrice: gasPrice,
                    });
                if (res?.transactionHash) {
                    await cancelAuctionApi(
                        auction,
                        res.transactionHash,
                        creator.name
                    );

                    setNftLoading(false);
                }
            }
            await fetchItem();
            return toast.success("Auction Cancelled");
        } catch (e) {
            setNftLoading(false);
            getRPCErrorMessage(e);
        }
    }

    const getButtonName = () => {
        const userInfo = getUserInfo();

        if (userInfo) {
            if (userInfo._id === nft.owner) {
                if (nft.nftStatus === 2) {
                    return "End Sale";
                } else if (nft.nftStatus === 3) {
                    if (new Date() < new Date(auction?.auctionTimer)) {
                        return "Cancel Auction";
                    } else {
                        return "End Auction";
                    }
                } else if (nft.nftStatus === 1) {
                    console.log("HERE");
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
            setChainConnected(false);
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
                    return toast("NFT is not for sale yet");
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
        if (isChainConnected(pageChain)) {
            setChainConnected(pageChain);
            setChainChangeMessage("");
        } else {
            // setChainChangeMessage(
            //     `You are on ${getChainName(pageChain)}, Please switch to ${getChainName(
            //         pageChain
            //     )}`
            // );
        }
    };
    const handleDateChange = (e: Dayjs | null) => {
        console.log("e: ", e["$d"]);
        const remainingSeconds: any = getRemainingSeconds(e["$d"]);
        console.log("remainingSeconds: ", remainingSeconds);
        setNewTime(e["$d"]);
        setDuration(remainingSeconds);
    };

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
                            });
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "remove_sale"
                        ) {
                            endSaleApi(auction, txhash, creator.name).then(
                                (res) => {
                                    toast.success("Sale Ended");
                                    navigate("/profile");
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
                            });
                        } else if (
                            res.data.result.transaction.actions[0].FunctionCall
                                .method_name === "process_auction_purchase"
                        ) {
                            endSaleApi(auction, txhash, creator.name).then(
                                (res) => {
                                    toast.success("Auction Ended");
                                    navigate("/profile");
                                }
                            );
                        }
                    });
            }
        })();
        window.scrollTo(0, 0);
        checkChain();
    }, []);
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
    useEffect(() => {
        if (localStorage.getItem("walletConnected")) {
            checkChain();
        }
    }, [localStorage.getItem("walletConnected")]);

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
                                title={
                                    getChainSymbol(nft.chain)
                                        ? `Asset Price (${getChainSymbol(
                                              nft.chain
                                          )})`
                                        : "Asset Price"
                                }
                                placeholder="Enter Asset Price"
                                state={startBid}
                                setState={setStartBid}
                                number
                            />
                            <div className="mt-2"></div>
                            {
                                nft && nft.contractType == '1155' && <Input
                                title={"Quantity"}
                                placeholder="Enter Asset Quantity"
                                state={assetQuantity}
                                setState={setAssetQuantity}
                                customChange={(e) => {
                                    if(e.target.value > 0 && e.target.value <= nft.quantity) {
                                        setAssetQuantity(e.target.value)
                                    }
                                }}
                                min={1}
                                max={nft.quantity}
                                number
                            />
                            }

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
                                            {/* @ts-ignore */}
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <MobileDatePicker
                                                    inputFormat="MM/DD/YYYY"
                                                    value={newTime}
                                                    onChange={handleDateChange}
                                                    disablePast={true}
                                                    minDate={getTomorrowDate()}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            sx={{
                                                                input: {
                                                                    color: "white",
                                                                },
                                                                label: {
                                                                    color: "white",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                    className="date-picker"
                                                />
                                            </LocalizationProvider>
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
                <div className="text-sm mb-4">
                    #Token ID:{" "}
                    <span className="ml-2 tokenId text-sm">{nft?.tokenId}</span>
                </div>
                {auction && (
                    <div className="nft-price">
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
                    </div>
                )}
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
                        <span>{trimString(creator?.username)}</span>
                    </div>
                </div>
                <div className="more-info">
                    <div className="filters">
                        {filters.map((filter: any) =>
                            filter !== "Bids" ? (
                                <button
                                    key={uuid()}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`filter-btn mr-2 ${
                                        filter === activeFilter ? "active" : ""
                                    }`}
                                >
                                    {filter}
                                </button>
                            ) : (
                                nft &&
                                nft.nftStatus === 3 && (
                                    <button
                                        key={uuid()}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`filter-btn mr-2 ${
                                            filter === activeFilter
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                )
                            )
                        )}
                    </div>
                    {activeFilter === "Info" && <NftInfo_ data={nft} />}

                    {activeFilter === "Properties" && (
                        <Properties tags={nft.tags} />
                    )}
                    {activeFilter === "History" && (
                        <History data={historyData} />
                    )}

                    {activeFilter === "Bids" && (
                        <Bids bids={bids} nftChain={nft?.chain} />
                    )}
                </div>
                {/* <Alert
                        sx={{
                            backgroundColor: "inherit",
                            color: "white",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                        }}
                        severity="info"
                    >
                        Auction ends in 
                    </Alert> */}
                <div className="bid-buy-box">
                    <div className="user-info">
                        <div>
                            {auction && (
                                <div className="price-info">
                                    <span className="blue-head">
                                        {auction?.lastBid &&
                                        auction?.lastBid !== 0
                                            ? (
                                                  auction?.lastBid /
                                                  getDecimal(nft.chain)
                                              ).toFixed(4)
                                            : (
                                                  auction?.startBid /
                                                  getDecimal(nft.chain)
                                              ).toFixed(4)}{" "}
                                        {getChainSymbol(nft.chain)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="btn-box">
                        {chainConnected ? (
                            getUserInfo()._id &&
                            getUserInfo()._id === nft.owner &&
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
                                onClick={() => {
                                    localStorage.setItem("CHAIN", pageChain);
                                    setChain(getChainName(pageChain));
                                    setWalletModal(true);
                                }}
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                    {chainChangeMessage && <span>{chainChangeMessage}</span>}
                    <span className="service-fee">Service fees 5%</span>
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
                        <div className="info">
                            From {trimString(history.from)}
                        </div>
                        <div className="info">To {trimString(history.to)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
const NftInfo_ = ({ data }) => {
    const [isCopied, setIsCopied] = useState(false);

    async function copyTextToClipboard(text: any) {
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand("copy", true, text);
        }
    }
    const handleCopyClick = (copyText: string) => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="nft-history-box">
            <div
                key={uuid()}
                className="nft-history flex flex-col justify-start items-start"
            >
                <div className="flex justify-center">
                    <div className="text-sm font-medium mr-2">
                        Contract Address:
                    </div>
                    <Tooltip title={isCopied ? "Copied" : data.contractAddress}>
                        <div className="info mb-0 cursor-pointer">
                            {trimString(data.contractAddress)}{" "}
                            <ContentPasteIcon
                                onClick={() =>
                                    handleCopyClick(data.contractAddress)
                                }
                                fontSize="small"
                                className="h-2"
                            />
                        </div>
                    </Tooltip>
                </div>
                {data && data.quantity && <div className="flex justify-center">
                    <div className="text-sm font-medium mr-2">Available Asset:</div>
                    <div className="info mb-0">{data?.quantity}</div>
                </div>}
                
                <div className="flex justify-center">
                    <div className="text-sm font-medium mr-2">Contract Type:</div>
                    <div className="info mb-0">ERC-{data?.contractType}</div>
                </div>
                {data && data.externalLink && <div className="flex justify-center">
                    <div className="text-sm font-medium mr-2">More info:</div>
                    <Tooltip title={isCopied ? "Copied" : data.externalLink}>
                    <div className="info mb-0 cursor-pointer"><a href={data?.externalLink} target="_blank">{data?.externalLink?.length>20 ? data?.externalLink?.slice(0,19) + "..." + data?.externalLink?.slice(-4) : data?.externalLink}</a> <ContentPasteIcon
                                onClick={() =>
                                    handleCopyClick(data.externalLink)
                                }
                                fontSize="small"
                                className="h-2"
                            /></div></Tooltip>
                </div>}
            </div>
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
    return (
        <div className="nft-bids-box">
            {bids?.length > 0 ? (
                bids.map((bid: any) => (
                    <Bid nftChain={nftChain} key={uuid()} bidInfo={bid} />
                ))
            ) : (
                <div>No offers yet</div>
            )}
        </div>
    );
};

const Bid = ({ bidInfo, key, nftChain }) => {
    return (
        <div id={key} className="bidInfo-bid">
            <div className="bid-user">
                <img src={nftImg} alt="" />
            </div>
            <div className="bid-info">
                <div className="bid-head">
                    Bid {bidInfo.bidValue / getDecimal(nftChain)}{" "}
                    {bidInfo.bidCurrency}
                </div>
                <div className="bid-sub">
                    By {bidInfo.bidder} {getCompleteDate(bidInfo.createdAt)}
                </div>
            </div>
        </div>
    );
};

export default NftInfo;
