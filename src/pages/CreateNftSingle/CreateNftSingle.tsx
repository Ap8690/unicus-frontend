import "./singlenft.scss";
import listImg from "../../assets/svgs/list.svg";
import uploadImg from "../../assets/svgs/uploadImage.svg";
import { Image } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Input from "../../components/Input/Input";
import { useContext, useEffect, useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import AddProperties from "../../components/modals/Add Properties/AddProperties";
import axios from "axios";
import toast from 'react-hot-toast';
import {AssetCategory} from "../../utils/AssetCategory"

import {
    tronChain,
    bscChain,
    ethChain,
    polygonChain,
    nearChain,
    solonaChain,
    avalancheChain,
} from "../../config";
import { setNotification } from "../../Redux/Blockchain/contracts";
import {
    connectWallet,
    getChainName,
    getChainSymbol,
    getCreateNftContract,
    getCreateNftContractAddress,
    nearWalletConnection,
    tronWeb,
    userInfo,
    getWalletChain,
    ChainIdUsingWalletName,
    SwitchNetwork,
} from "../../utils/utils";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from "@solana/wallet-adapter-react";
import {
    addWalletAdd,
    createNft,
    getAccessToken,
    uploadToPinata,
} from "../../services/api/supplier";
import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { useNavigate } from "react-router-dom";
import {
    getAssociatedTokenAddress,
    createInitializeMintInstruction,
    MINT_SIZE,
    createAssociatedTokenAccountInstruction,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import PageLoader from "../../components/Loading/PageLoader";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import web3 from "../../web3";
import {AssetList} from "../../utils/AssetList"
import SolMintNftIdl from "../../utils/sol_mint_nft.json";
import validator from "validator";
import { getBase64, blobUrlToFile } from "../../utils/imageConvert";
import uuid from "react-uuid";
import { decodeParams } from "../../utils/helpers";
import Cookies from "js-cookie";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";
import { ChainContext } from "../../context/ChainContext";

const CreateNftSingle = () => {
    const supportedImg = ["jpg", "jpeg", "png", "svg", "gif"];
    const supportedVid = ["mp4", "webm"];
    const supportedAud = ["mp3", "wav", "ogg"];
    const supported3d = ["gltf, glb"];
    // let chain_name = ChainIdUsingWalletName(localStorage.getItem("walletChain"))
    const [name, setName] = useState("");
    const [extLink, setExtlink] = useState("");
    const [description, setDescription] = useState("");
    // const [category, setCategory] = useState("art");
    
    const [price, setPrice] = useState("0.00");
    const [chain, setChain] = useState(ethChain());
    const [contractType, setContractType] = useState("721");
    const [supply, setSupply] = useState(1);
    const [collection, setCollection] = useState<any>("");
    const [royalty, setRoyalty] = useState<any>(5);
    const [royaltyError, setRoyaltyError] = useState<boolean>(false);
    const [openProp, setOpenProp] = useState(false);
    const [openStats, setOpenStats] = useState(false);
    const [openLevels, setOpenLevels] = useState(false);
    const [fileSrc, setFileSrc] = useState<any>();
    const [nftModalMessage, setNftModalMessage] = useState("");
    const [nftLoading, setNftLoading] = useState<boolean>(false);
    const [MetamaskNotFound, setMetamaskNotFound] = useState(false);
    const [defaultErrorModal, setdefaultErrorModal] = useState<any>(false);
    const [defaultErrorMessage, setdefaultErrorMessage] = useState<any>("");
    const inputFile = useRef(null);
    const navigate = useNavigate();
    const { fullLoading } = useContext(ConnectWalletContext);
    const { category,setCategory } = useContext(ChainContext);
    console.log("category ",category)
    
    const { connection } = useConnection();
    const { sendTransaction } = useWallet();
    const anWallet = useAnchorWallet();
    const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
    );
    const SOL_MINT_NFT_PROGRAM_ID = new anchor.web3.PublicKey(
        "AvrGQ538bsHRfqJpyfEZumVxLfde3GcBw4AH4JLT3Wyu"
    );
    //sol Nft mint
    const [properties, setProperties] = useState([
        {
            property: "",
            value: "",
        },
    ]);
    const [stats, setStats] = useState([
        {
            property: "",
            value: "",
            total: "",
        },
    ]);
    const [levels, setLevels] = useState([
        {
            property: "",
            value: "",
            total: "",
        },
    ]);

    const propDescription = {
        properties:
            "Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.",
        levels: "Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar.",
        stats: "Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar.",
    };

    const handleCategoryChange = (event: any) => {
        setCategory(event.target.value);
    };
    const handleClickOpen = () => {
        setOpenProp(true);
    };


    const handleClose = (value: any) => {
        setOpenProp(false);
        setOpenStats(false);
        setOpenLevels(false);
    };

    const handleRoyaltyChange = (e: any) => {
        if (e.target.value < 0 || e.target.value > 100) {
            return;
        }
        setRoyalty(e.target.value);
    };

    const uploadFile = async (e: any) => {
        if(category.toLowerCase() === "music" && !supportedVid.includes(
            e.target.files[0].name.split(".").pop()
        )) {
            return toast.error("Please upload supported file types only!")
        }
        setFileSrc(e.target.files[0]);
        try {
            const im = await getBase64(e.target.files[0]);
            localStorage.setItem("fileSrc", JSON.stringify(im));
        } catch (err) {
            console.log(err);
        }
    };
    const validateUrl = (url: string) => {
        if (!validator.isURL(url)) {
            return false;
        }
        return true;
    };
    

    const {
        utils: {
            format: { parseNearAmount },
        },
    } = nearAPI;

    useEffect(() => {
        if (Number(royalty) < 100 && royalty !== "") {
            setRoyaltyError(false);
        } else {
            setRoyaltyError(true);
        }
    }, [royalty]);

    useEffect(() => {
        if (!getAccessToken()) {
            navigate("/explore");
            toast.error("Please Login!");
        }
    }, []);

    const modals = [
        {
            type: "properties",
            state: properties,
            setState: setProperties,
            open: openProp,
            onClose: handleClose,
            description: propDescription.properties,
        },
        {
            type: "stats",
            state: stats,
            setState: setStats,
            open: openStats,
            onClose: handleClose,
            description: propDescription.stats,
        },
        {
            type: "levels",
            state: levels,
            setState: setLevels,
            open: openLevels,
            onClose: handleClose,
            description: propDescription.levels,
        },
    ];

    const mintSolana = async (title: any, description: any, fileUrl: any) => {
        if (!anWallet) {
            throw new Error("Solana wallet not detected!");
        }
        const provider = new anchor.AnchorProvider(connection, anWallet, {
            commitment: "processed",
        });
        anchor.setProvider(provider);

        const program = new Program(
            // @ts-ignore
            SolMintNftIdl,
            SOL_MINT_NFT_PROGRAM_ID,
            provider
        );

        const lamports =
            await program.provider.connection.getMinimumBalanceForRentExemption(
                MINT_SIZE
            );

        const getMetadata = async (mint: any) => {
            return (
                await anchor.web3.PublicKey.findProgramAddress(
                    [
                        Buffer.from("metadata"),
                        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                        mint.toBuffer(),
                    ],
                    TOKEN_METADATA_PROGRAM_ID
                )
            )[0];
        };

        const mintKey = anchor.web3.Keypair.generate();

        const nftTokenAccount = await getAssociatedTokenAddress(
            mintKey.publicKey,
            provider.wallet.publicKey
        );

        const mint_tx = new anchor.web3.Transaction().add(
            anchor.web3.SystemProgram.createAccount({
                fromPubkey: provider.wallet.publicKey,
                newAccountPubkey: mintKey.publicKey,
                space: MINT_SIZE,
                programId: TOKEN_PROGRAM_ID,
                lamports,
            }),
            createInitializeMintInstruction(
                mintKey.publicKey,
                0,
                provider.wallet.publicKey,
                provider.wallet.publicKey
            ),
            createAssociatedTokenAccountInstruction(
                provider.wallet.publicKey,
                nftTokenAccount,
                provider.wallet.publicKey,
                mintKey.publicKey
            )
        );
        let blockhashObj = await connection.getLatestBlockhash();
        mint_tx.recentBlockhash = blockhashObj.blockhash;

        let signature = await sendTransaction(mint_tx, connection, {
            signers: [mintKey],
        });
        let latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: signature,
        });

        const metadataAddress = await getMetadata(mintKey.publicKey);
            const tx = program.transaction.mintNft(
                mintKey.publicKey,
                title,
                description,
                fileUrl, //metadatauri
                {
                    accounts: {
                        mintAuthority: provider.wallet.publicKey,
                        mint: mintKey.publicKey,
                        tokenAccount: nftTokenAccount,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        metadata: metadataAddress,
                        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                        payer: provider.wallet.publicKey,
                        systemProgram: anchor.web3.SystemProgram.programId,
                        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                    },
                }
            );

            signature = await sendTransaction(tx, connection);
            latestBlockhash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                signature: signature,
            });
            // const metaplex = new Metaplex(connection);
            //Fetch all nfts of by owner
            //the returned Assets may be Metadatas
            // const myNfts = await metaplex.nfts().findByMint(mintKey.publicKey)
            //     .run();
            return mintKey.publicKey.toBase58();
    };
    // NEAR Protocol Minting
    const mintAssetToNft = async (
        tokenId: any,
        name: any,
        description: any,
        tokenUri: any,
        imageUrl: any
    ) => {
        let functionCallResult = await nearWalletConnection
            .account()
            .functionCall({
                contractId: "nft.subauction.testnet",
                methodName: "nft_mint",
                args: {
                    token_id: `${tokenId}`,
                    metadata: {
                        title: `${name}`,
                        description: `${description}`,
                        media: `${imageUrl}`,
                        reference: `${tokenUri}`,
                        //extra: `${extLink}`,
                    },
                    gas: "200000000000000",
                    receiver_id: nearWalletConnection.getAccountId(),
                },
                attachedDeposit: new BN(parseNearAmount("1")),
            });

        if (functionCallResult) {
            console.log("nft created: ", functionCallResult);
        } else {
            console.log("nft not created");
        }
    };
    const cryptoPayment = async () => {
        try {
            //@ts-ignore
            if (!window.ethereum) {
                setNftLoading(false);
                setMetamaskNotFound(true);
                return null;
            }
            if (extLink && !validateUrl(extLink)) {
                return toast.error("Please enter a valid external link");
            }
            //@ts-expect-error
            if (chain.toString() === tronChain() && !window.tronWeb) {
                toast.error("Tron wallet not detected!");
                setNftLoading(false);
                setMetamaskNotFound(true);
                return null;
            }

            const wallet = localStorage.getItem('walletType')
           
        
            let address = localStorage.getItem("walletConnected")
            if (!address) {
                toast.error("Wallet connection failed");
                return;
            }
            const contractAddress = getCreateNftContractAddress(
                chain,
                contractType
            );

            setNftModalMessage("Uploading the metadata.");
            setNftLoading(true);
            if(wallet === 'Metamask'){
                await SwitchNetwork(chain)
            }
            let formData = new FormData();
            formData.append("name", name);
            formData.append("royalty", royalty + "");
            formData.append("image", fileSrc);
            // formData.append('imageUrl', "kdakjadkjakjd")
            formData.append("description", description);
            formData.append("category", category);
            formData.append("attributes", JSON.stringify(properties));

            try {
                toast.success("Uploading the metadata...");
                const response: any = await uploadToPinata(formData);
                if (!response) {
                    setdefaultErrorMessage("Network Error");
                    return;
                }
                var tokenHash = response.data;
                var tokenUri =
                    "https://unicus.mypinata.cloud/ipfs/" + tokenHash;
                let imageUrl: any;
                let tokenId: any;
                let tranIsSuccess = false;

                await axios.get(tokenUri).then((val) => {
                    imageUrl = val.data.image;
                });
                toast.success("Metadata Uploaded...");
                let user = userInfo;
                if (!user) {
                    user = JSON.parse(localStorage.getItem("userInfo"));
                }

                let nftObj:any = new FormData();
                nftObj.append('name',name)
                nftObj.append('royalty',royalty)
                nftObj.append('description',description)
                nftObj.append('category',category)
                nftObj.append('jsonIpfs',tokenUri)
                nftObj.append('nftType',fileSrc.type)
                nftObj.append('chain',chain)
                nftObj.append('contractAddress',contractAddress)
                nftObj.append('owner',user._id)
                nftObj.append('uploadedBy',user._id)
                nftObj.append('mintedBy',user._id)
                nftObj.append('mintedInfo',user.username)
                nftObj.append('userInfo',user.username)
                nftObj.append('image',fileSrc)
                nftObj.append('tags',properties)
           
                if (chain.toString() === nearChain()) {
                    const wallet = localStorage.getItem("wallet")
                    if(wallet === "Sender"){
                        nftObj.append('tokenId',uuid())
                        localStorage.setItem("nearNftObj", JSON.stringify(nftObj));
                       
                        // @ts-ignore
                        const accountId =  window.near.getAccountId();
                        const tx = {
                            receiverId: "nft.subauction.testnet",
                            actions: [
                              {
                                methodName: 'nft_mint',
                                args: {
                                  token_id: `${nftObj.tokenId}`,
                                  metadata: {
                                    title: `${nftObj.name}`,
                                    description: `${description}`,
                                    media: `${imageUrl}`,
                                    reference: `${tokenUri}`,
                                  //extra: `${extLink}`,
                                     },
                                  receiver_id: accountId,
                                   },
                                gas: "200000000000000",
                                deposit: parseNearAmount('1'),
                            }]
                          }
                        // @ts-ignore
                        const res = await window.near.signAndSendTransaction(tx)
                        // let functionCallResult = await nearWalletConnection
                        // .account()
                        // .functionCall();
                        console.log(res)
                        if(res?.response?.error){
                            throw new Error("Nft not minted!")
                        }
                        toast.success("Asset Minted");
                        nftObj.append('contractAddress', "nft.subauction.testnet")
                        await createNft(nftObj);
                        navigate("/profile/created");
                    }
                    else{
                        const uid = uuid()
                        nftObj.append('tokenId',uid)

                        localStorage.setItem("nearNftObj", JSON.stringify(nftObj));
                        // if (!nftObj.tokenId) {
                        //     return;
                        // }
                        await mintAssetToNft(
                            uid,
                            name,
                            description,
                            tokenUri,
                            imageUrl
                        );
                        return;
                    }
                    
                } else if (chain.toString() === solonaChain()) {
                    console.log(chain,"chain")
                    const mintKey = await mintSolana(
                        name,
                        description,
                        tokenUri
                    );
                    console.log(mintKey,"mintKey")
                    nftObj.append('tokenId',mintKey)
                    nftObj.append('contractAddress',SOL_MINT_NFT_PROGRAM_ID.toBase58())

                    await createNft(nftObj);
                    navigate("/profile/created");
                } else if (chain.toString() === tronChain()) {
                    setNftLoading(true);
                    toast.success("Minting The Asset");
                    const createNFT = getCreateNftContract(chain, contractType);
                    let res: any;
                    if (contractType === "721") {
                        res = await createNFT.methods
                            .batchMint([tokenUri], [royalty])
                            .send({
                                from: address,
                            });
                        if (res?.transactionHash) {
                        //returnValues NFTId
                                nftObj.append('tokenId',res.events.Minted.returnValues._NftId)
                        }
                    } else if (contractType === "1155") {
                        res = await createNFT.methods
                            .mintNFT(
                                tokenUri,
                                supply,
                                address,
                                parseInt(royalty)
                            )
                            .send({
                                from: address,
                            });
                        if (res?.transactionHash) {
                            nftObj.append('tokenId',res.events.Minted.returnValues._id)
                             //returnValues NFTId
                        }
                    } else {
                        toast.error("Contract not found");
                        return;
                    }
                    setNftModalMessage(
                        "Waiting for transaction confirmation.(It can take upto a min to confirm)"
                    );
                    const success = await setNotification(res);
                    let tokenId = await decodeParams(
                        ["uint256"],
                        "0x" + success?.log[0]?.topics[3],
                        false
                    );
                    tokenId = tronWeb.toDecimal(tokenId[0]._hex);
                    if (!success) {
                        tranIsSuccess = false;
                        throw Error("Tron Transaction Failed");
                    } else {
                        tranIsSuccess = true;
                        nftObj.append('tokenId',tokenId)
                    }
                    
                    toast.success("Asset Minted!");
                    await createNft(nftObj);
                    navigate("/profile/created");
                    setNftLoading(false);
                } else {
                    setNftLoading(true);
                    toast.success("Minting The Asset");
                    const gasPrice = await web3.eth.getGasPrice();
                    const createNFT = getCreateNftContract(chain, contractType);

                    let res: any;
                    let estimated: any;
                    if (contractType === "721") {
                        estimated = await createNFT.methods
                            .batchMint([tokenUri], [royalty])
                            .estimateGas({
                                from: address,
                            });
                        res = await createNFT.methods
                            .batchMint([tokenUri], [royalty])
                            .send({
                                from: address,
                                gas: estimated,
                                gasPrice: gasPrice,
                            });
                        if (res?.transactionHash) {
                             //returnValues NFTId
                                nftObj.append('tokenId',res.events.Minted.returnValues._NftId)
                        }
                    } else if (contractType === "1155") {
                        estimated = await createNFT.methods
                            .mintNFT(
                                tokenUri,
                                supply,
                                address,
                                parseInt(royalty)
                            )
                            .estimateGas({
                                from: address,
                            });
                        res = await createNFT.methods
                            .mintNFT(
                                tokenUri,
                                supply,
                                address,
                                parseInt(royalty)
                            )
                            .send({
                                from: address,
                                gas: estimated,
                                gasPrice: gasPrice,
                            });
                        if (res?.transactionHash) {
                            //returnValues NFTId
                            nftObj.append('tokenId',res.events.Minted.returnValues._id)
                        }
                    } else {
                        toast.error("Contract type is not ERC721 or ERC1155!");
                        return;
                    }

                    setNftLoading(false);
                    toast.success("Asset Minted");
                    await createNft(nftObj);
                    navigate("/profile/created");
                }
            } catch (error) {
                toast.error("Minting Failed");
                console.log(error, error.message);
                setdefaultErrorMessage(error);
                setNftLoading(false);
                toast.dismiss();
                if (error.message) {
                    setdefaultErrorMessage(error.message);
                }
                setdefaultErrorModal(true);
            }
        } catch (e) {
            console.log(e);
            setNftLoading(false);
        }
        setNftLoading(false);
    };
    const convertToFile = async () => {
        try {
            const file: any = await blobUrlToFile(
                JSON.parse(localStorage.getItem("fileSrc")),
                "newUpload"
            );
            setFileSrc(file);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("properties")) {
            setProperties(JSON.parse(localStorage.getItem("properties")));
        }
        if (localStorage.getItem("name")) {
            setName(JSON.parse(localStorage.getItem("name")));
        }
        if (localStorage.getItem("extLink")) {
            setExtlink(JSON.parse(localStorage.getItem("extLink")));
        }
        if (localStorage.getItem("description")) {
            setDescription(JSON.parse(localStorage.getItem("description")));
        }
        // if (localStorage.getItem("category")) {
        //     setCategory(JSON.parse(localStorage.getItem("category")));
        // }
        if (localStorage.getItem("CHAIN")) {
            setChain(JSON.parse(localStorage.getItem("CHAIN")));
        }
        if (localStorage.getItem("price")) {
            setPrice(JSON.parse(localStorage.getItem("price")));
        }
        if (localStorage.getItem("collection")) {
            setCollection(JSON.parse(localStorage.getItem("collection")));
        }
        if (localStorage.getItem("royalty")) {
            setRoyalty(JSON.parse(localStorage.getItem("royalty")));
        }
        // if (
        //     localStorage.getItem("fileSrc") &&
        //     Object.keys(JSON.parse(localStorage.getItem("fileSrc"))).length !==
        //         0
        // ) {
        //     convertToFile();
        // }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        localStorage.setItem("properties", JSON.stringify(properties));
    }, [properties]);
    useEffect(() => {
        localStorage.setItem("name", JSON.stringify(name));
    }, [name]);
    useEffect(() => {
        localStorage.setItem("extLink", JSON.stringify(extLink));
    }, [extLink]);
    useEffect(() => {
        localStorage.setItem("description", JSON.stringify(description));
    }, [description]);
    useEffect(() => {
        localStorage.setItem("category", JSON.stringify(category));
    }, [category]);
    useEffect(() => {
        localStorage.setItem("chain", JSON.stringify(chain));
    }, [chain]);
    useEffect(() => {
        localStorage.setItem("price", JSON.stringify(price));
    }, [price]);
    useEffect(() => {
        localStorage.setItem("collection", JSON.stringify(collection));
    }, [collection]);
    useEffect(() => {
        localStorage.setItem("royalty", JSON.stringify(royalty));
    }, [royalty]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const txhash = urlParams.get("transactionHashes");

        const errorCode = urlParams.get("errorCode");
        if (urlParams.has("errorCode")) urlParams.delete("errorCode");
        const errMsg = urlParams.get("errorMessage");
        if (urlParams.has("errorMessage")) urlParams.delete("errorMessage");
        if (errorCode) {
            toast.error(errorCode);
        } else if (txhash !== null) {
            const obj = JSON.parse(localStorage.getItem("nearNftObj"));
            toast("Storing details");
            if (!nftLoading) {
                setNftLoading(true);
                createNft(obj)
                    .then(() => {
                        localStorage.removeItem("nearNftObj");
                        navigate("/profile/created");
                        setNftLoading(false);
                    })
                    .catch((e) => {
                        console.log(e);
                        setNftLoading(false);
                    });
            }
        }
        if(localStorage.getItem("walletChain") === "Tron") {
            setChain(tronChain())
        }
        else if(localStorage.getItem("walletChain") === "Solana") {
            setChain(solonaChain())
        }
        else if(localStorage.getItem("walletChain") === "Near") {
            setChain(nearChain())
        }
        
    }, []);

    return (
        <>
            {modals.map((e: any, i) => (
                <AddProperties
                    key={i + "property"}
                    description={e.description}
                    open={e.open}
                    onClose={e.onClose}
                    type={e.type}
                    inputs={e.state}
                    setInputs={e.setState}
                />
            ))}
            {nftLoading || fullLoading ? (
                <PageLoader info={'Keep Patience.. Your awesome track is being tokenised on Blockchain'}/>
            ) : (
                <div className="create-nft-single-page">
                    <div className="head">
                        <div className="blue-head capitalize">Tokenise {category}</div>
                        {/* <div className="head-text">
                            Image, Video, Audio, or 3D Model. File types
                            supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                            OGG, GLB, GLTF. Max size: 100 MB
                        </div> */}
                    </div> 
                    {category && <div className="body">
                        <div className="input-fields">
                            <div className="upload-file">
                                <div className="field-title">{AssetCategory[category.toLowerCase()]['FieldTitle']}</div>
                                <button
                                    className="field"
                                    onClick={() => inputFile?.current.click()}
                                >
                                    {fileSrc &&
                                    fileSrc !== "undefined" &&
                                    supportedVid.includes(
                                        fileSrc.name.split(".").pop()
                                    ) ? (
                                        <video width="100%">
                                            <source
                                                src={
                                                    fileSrc
                                                        ? URL.createObjectURL(
                                                              fileSrc
                                                          )
                                                        : ""
                                                }
                                                type="video/mp4"
                                            />
                                        </video>
                                    ) : fileSrc &&
                                      supportedImg.includes(
                                          fileSrc.name.split(".").pop()
                                      ) ? (
                                        <Image
                                            src={URL.createObjectURL(fileSrc)}
                                            alt=""
                                        />
                                    ) : (
                                        fileSrc &&
                                        supportedAud.includes(
                                            fileSrc.name.split(".").pop()
                                        ) && (
                                            <audio
                                                src={URL.createObjectURL(
                                                    fileSrc
                                                )}
                                            />
                                        )
                                    )}
                                    {!fileSrc && (
                                        <img src={uploadImg} alt="Upload" />
                                    )}
                                </button>
                                <input
                                    type="file"
                                    id="file"
                                    ref={inputFile}
                                    onChange={(e) => uploadFile(e)}
                                    className="d-none"
                                />{" "}
                            </div>
                            <div className="basic-info">
                                <div className="mt-2"></div>
                                <Input
                                    title={AssetCategory[category.toLowerCase()]['AssetName']}
                                    placeholder={AssetCategory[category.toLowerCase()]['AssetNamePlaceholder']}
                                    state={name}
                                    setState={setName}
                                />
                                <div className="mt-8"></div>
                                <Input
                                    title={AssetCategory[category.toLowerCase()]['AssetLink']}
                                    placeholder={
                                        "https://www.youtube.com/watch?_your_link..."
                                    }
                                    state={extLink}
                                    setState={setExtlink}
                                />
                                <div className="mt-8"></div>
                                <Input
                                    title={AssetCategory[category.toLowerCase()]['AssetInfo']}
                                    multi
                                    placeholder={AssetCategory[category.toLowerCase()]['AssetInfoPlaceholder']}
                                    state={description}
                                    setState={setDescription}
                                />
                            </div>
                            <div className="blockchain">
                                
                                {chain === ethChain() && (
                                    <>
                                        <div className="field-title">
                                            Contract Type
                                        </div>
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
                                                    labelId="category-select-label"
                                                    id="chain-select"
                                                    defaultValue="art"
                                                    value={contractType}
                                                    onChange={(e) =>
                                                        setContractType(
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Category"
                                                >
                                                    <MenuItem value={"721"}>
                                                        ERC 721
                                                    </MenuItem>
                                                    <MenuItem value={"1155"}>
                                                        ERC 1155
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </>
                                )}
                                
                                <div className="set-price">
                                    {contractType === "1155" && (
                                        <Input
                                            title={"Supply"}
                                            placeholder=""
                                            state={supply}
                                            setState={setSupply}
                                            number
                                        />
                                    )}
                                    <Input
                                        title={"Royalty"}
                                        placeholder="0 - 99 %"
                                        state={royalty}
                                        setState={setRoyalty}
                                        number
                                    />
                                    {royaltyError && (
                                        <span
                                            style={{
                                                marginTop: "5px",
                                                fontSize: "12px",
                                                color: "red",
                                            }}
                                        >
                                            Royalty Should be between 0 - 99 %
                                        </span>
                                    )}
                                </div>

                                <div className="select-collection">
                                    <Input
                                        title={AssetCategory[category.toLowerCase()]['AssetCollectionName']}
                                        placeholder="Collection#1"
                                        state={collection}
                                        setState={setCollection}
                                        text
                                    />
                                </div>
                                <div className="set-attributes">
                                    <button
                                        className="btn-outline"
                                        onClick={handleClickOpen}
                                    >
                                        <div className="btn-text">
                                            <img src={listImg} alt="dollar" />
                                            <span>Properties</span>
                                        </div>
                                        <AddRoundedIcon />
                                    </button>
                                </div>
                            </div>
                            <button
                                className="btn create-btn"
                                onClick={() => cryptoPayment()}
                            >
                                {AssetCategory[category.toLowerCase()]['AssetButton']}
                            </button>
                        </div>
                        <div className="preview-field">
                            <div className="field-title">Preview</div>
                            <div className="preview-card">
                                <div className="img-box">
                                    {fileSrc &&
                                    supportedVid.includes(
                                        fileSrc.name.split(".").pop()
                                    ) ? (
                                        <video width="100%">
                                            <source
                                                src={
                                                    fileSrc
                                                        ? URL.createObjectURL(
                                                              fileSrc
                                                          )
                                                        : ""
                                                }
                                                type="video/mp4"
                                            />
                                        </video>
                                    ) : fileSrc &&
                                      supportedImg.includes(
                                          fileSrc.name.split(".").pop()
                                      ) ? (
                                        <Image
                                            src={URL.createObjectURL(fileSrc)}
                                            alt=""
                                        />
                                    ) : (
                                        fileSrc &&
                                        supportedAud.includes(
                                            fileSrc.name.split(".").pop()
                                        ) && (
                                            <audio
                                                src={URL.createObjectURL(
                                                    fileSrc
                                                )}
                                                style={{ width: "90%" }}
                                            />
                                        )
                                    )}
                                    {!fileSrc && (
                                        <img src={uploadImg} alt="Upload" />
                                    )}
                                </div>
                                <div className="nft-info">
                                    <div className="titles">
                                        <span>Name</span>
                                        <span>Price</span>
                                    </div>
                                    <div className="info">
                                        <span>{name}</span>
                                        <span>
                                            {price} {getChainSymbol(chain)}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="btn-box hidden
              "
                                >
                                    <button className="texture-btn">
                                        Buy Now
                                    </button>
                                    <div className="likes">
                                        <FavoriteBorderIcon />
                                        27
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            )}
        </>
    );
};

const IOSSwitch = styled((props: any) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "dark" ? "#A7A9FA" : "#A7A9FA",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#A7A9FA",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

export default CreateNftSingle;
