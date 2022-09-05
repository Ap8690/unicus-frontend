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
import { toast } from "react-toastify";
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
    getWalletChain
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
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    createInitializeMintInstruction,
    MINT_SIZE,
    createAssociatedTokenAccountInstruction,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import Loader from "../../components/Loading/Loader";
import * as anchor from "@project-serum/anchor";
import { Program, getProvider, Provider, Wallet } from "@project-serum/anchor";
import web3 from "../../web3";

import {
    clusterApiUrl,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import SolMintNftIdl from "../../utils/sol_mint_nft.json";
import {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
} from "@metaplex-foundation/js";
import validator from "validator";
import { getBase64, blobUrlToFile } from "../../utils/imageConvert";
import uuid from 'react-uuid'
import { decodeParams } from "../../utils/helpers";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";

const CreateNftSingle = () => {
    const [name, setName] = useState("");
    const [extLink, setExtlink] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("art");
    const [price, setPrice] = useState("0.00");
    const [chain, setChain] = useState(ethChain);
    const [contractType, setContractType] = useState("721");
    const [supply, setSupply] = useState(1);
    const [unlockContent, setUnlockContent] = useState("");
    const [unlockable, setUnlockable] = useState(false);
    const [collection, setCollection] = useState<any>("");
    const [royalty, setRoyalty] = useState<any>(5);
    const [royaltyError, setRoyaltyError] = useState<boolean>(false);
    const [explicit, setExplicit] = useState(false);
    const [displayImage,setDisplayImage] = useState('')
    const [openProp, setOpenProp] = useState(false);
    const [openStats, setOpenStats] = useState(false);
    const [openLevels, setOpenLevels] = useState(false);
    const [fileSrc, setFileSrc] = useState<any>();
    const [AddNFTModalOpen, setAddNFTModalOpen] = useState<boolean>(false);
    const [nftModalMessage, setNftModalMessage] = useState("");
    const [nftLoading, setNftLoading] = useState<boolean>(false);
    const [MetamaskNotFound, setMetamaskNotFound] = useState(false);
    const [defaultErrorModal, setdefaultErrorModal] = useState<any>(false);
    const [defaultErrorMessage, setdefaultErrorMessage] = useState<any>("");
    const inputFile = useRef(null);
    const navigate = useNavigate();

    const {loginWallet,fullLoading} = useContext(ConnectWalletContext);

    const { connection } = useConnection();

    const { wallet, connect, publicKey, sendTransaction } = useWallet();
    const { setVisible } = useWalletModal();

    const anWallet = useAnchorWallet();

    const getSolWallet = () => {
        return wallet;
    };

    const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
    );

    const SOL_MINT_NFT_PROGRAM_ID = new anchor.web3.PublicKey(
        "EJ16q9rhttCaukJP89WZyKs7dnEBTmzAixLLqCV8gUUs"
    );

    const NFT_SYMBOL = "unicus-nft";

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

    const handleChange = (event: any) => {
        setChain(event.target.value);
    };
    const handleCategoryChange = (event: any) => {
        setCategory(event.target.value);
    };
    const handleChangeColllection = (event: any) => {
        setCollection(event.target.value);
    };
    const handleClickOpen = () => {
        setOpenProp(true);
    };
    const handleClickOpenStats = () => {
        setOpenStats(true);
    };
    const handleClickOpenLevels = () => {
        setOpenLevels(true);
    };

    const handleClose = (value: any) => {
        setOpenProp(false);
        setOpenStats(false);
        setOpenLevels(false);
    };

    const handleRoyaltyChange = (e: any) => {
        setRoyalty(e);
    };

    const uploadFile = async (e: any) => {
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
    const supportedImg = ["jpg", "jpeg", "png", "svg", "gif"];
    const supportedVid = ["mp4", "webm"];
    const supportedAud = ["mp3", "wav", "ogg"];
    const supported3d = ["gltf, glb"];

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
            navigate("/connect-wallet/create-nft");
            toast.warn("Please Login!");
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
            return toast.error("Solana wallet not detected!");
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

        try {
            const signature = await sendTransaction(mint_tx, connection, {
                signers: [mintKey],
            });
            const latestBlockhash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                signature: signature,
            });
        } catch {
            return false;
        }
        const metadataAddress = await getMetadata(mintKey.publicKey);
        try {
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

            const signature = await sendTransaction(tx, connection);
            const latestBlockhash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                signature: signature,
            });
            const metaplex = new Metaplex(connection);
            //Fetch all nfts of by owner
            //the returned NFTs may be Metadatas
            const myNfts = await metaplex
                .nfts()
                .findByMint(mintKey.publicKey)
                .run();
            return mintKey.publicKey.toBase58();
        } catch {
            return false;
        }
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
            setAddNFTModalOpen(false);
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
            if (chain === tronChain && !window.tronWeb) {
                toast.error("Tron wallet not detected!");
                setNftLoading(false);
                setMetamaskNotFound(true);
                return null;
            }
            await connectWallet(
                chain,
                publicKey,
                getSolWallet,
                connect,
                setVisible,
            )
                .then(async (address) => {
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
                    let formData = new FormData();
                    formData.append("name", name);
                    formData.append("royalty", royalty + "");
                    formData.append("image", fileSrc);
                    // formData.append('imageUrl', "kdakjadkjakjd")
                    formData.append("description", description);
                    formData.append("category", category);

                    formData.append("attributes", JSON.stringify(properties));

                    try {
                        toast.info("Uploading the metadata...");
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
                        setNftLoading(false);
                        toast.success("Metadata Uploaded...");
                        setNftModalMessage(
                            "An Awesome Asset is getting Minted"
                        );
                        let user = userInfo;
                        if (!user) {
                            user = localStorage.getItem("userInfo");
                        }
                        const nftObj = {
                            name,
                            royalty,
                            description,
                            category,
                            jsonIpfs: tokenUri,
                            nftType: fileSrc.type,
                            chain,
                            contractAddress,
                            owner: user._id,
                            uploadedBy: user._id,
                            mintedBy: user._id,
                            mintedInfo: user.username,
                            userInfo: user.username,
                            cloudinaryUrl: imageUrl,
                            tokenId,
                            tags: properties,
                        };
                        if (chain === nearChain) {
                            nftObj.tokenId = uuid();
                            localStorage.setItem(
                                "nearNftObj",
                                JSON.stringify(nftObj)
                            );
                            if (!nftObj.tokenId) {
                                return;
                            }
                            await mintAssetToNft(
                                nftObj.tokenId,
                                name,
                                description,
                                tokenUri,
                                imageUrl
                            );
                            return;
                        } else if (chain === solonaChain) {
                            const mintKey = await mintSolana(
                                name,
                                description,
                                tokenUri
                            );
                            nftObj.tokenId = mintKey;
                            await createNft(nftObj);
                            navigate("/profile/created");
                        } else if (chain === tronChain) {
                            setNftLoading(true);
                            toast.info("Minting The Asset");
                            const createNFT = getCreateNftContract(
                                chain,
                                contractType
                            );

                            let res: any;
                            if (contractType === "721") {
                                res = await createNFT.methods
                                    .batchMint([tokenUri], [royalty])
                                    .send({
                                        from: address,
                                    });
                                if (res?.transactionHash) {
                                    nftObj.tokenId =
                                        res.events.Minted.returnValues._NftId; //returnValues NFTId
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
                                    nftObj.tokenId =
                                        res.events.Minted.returnValues._id; //returnValues NFTId
                                }
                            } else {
                                toast.error("Contract not found");
                                return;
                            }
                            setNftModalMessage(
                                "Waiting for transaction confirmation.(It can take upto a min to confirm)"
                            );
                            const success = await setNotification(res);
                            let tokenId = await decodeParams(['uint256'],"0x"+success?.log[0]?.topics[3],false)
                            tokenId = tronWeb.toDecimal(tokenId[0]._hex)
                            if (!success) {
                                tranIsSuccess = false;
                                throw Error("Tron Transaction Failed");
                            } else {
                                tranIsSuccess = true;
                                nftObj.tokenId = tokenId;
                            }
                            setNftLoading(false);
                            toast.success("Asset Minted");
                            await createNft(nftObj);
                            navigate("/profile/created");
                        } else {
                            setNftLoading(true);
                            toast.info("Minting The Asset");
                            const gasPrice = await web3.eth.getGasPrice()
                            const createNFT = getCreateNftContract(
                                chain,
                                contractType
                            );

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
                                        from: address ,gas:estimated, gasPrice:gasPrice
                                    });
                                if (res?.transactionHash) {
                                    nftObj.tokenId =
                                        res.events.Minted.returnValues._NftId; //returnValues NFTId
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
                                        from: address 
                                    });
                                res = await createNFT.methods
                                    .mintNFT(
                                        tokenUri,
                                        supply,
                                        address,
                                        parseInt(royalty)
                                    )
                                    .send({
                                        from: address ,gas:estimated, gasPrice:gasPrice
                                    });
                                if (res?.transactionHash) {
                                    nftObj.tokenId =
                                        res.events.Minted.returnValues._id; //returnValues NFTId
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
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Mint failed.");
                });
        } catch (e) {
            console.log(e);
            setNftLoading(false);
        }
        setNftLoading(false);
    };
    const convertToFile = async () => {
        try {
            const file: any = await blobUrlToFile(JSON.parse(localStorage.getItem("fileSrc")),"newUpload")
            console.log("URL Create Object Url: ",URL.createObjectURL(file))
            setFileSrc(file)
        }
        catch(err) {
            console.log(err)
        }
    }
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
        if (localStorage.getItem("category")) {
            setCategory(JSON.parse(localStorage.getItem("category")));
        }
        if (localStorage.getItem("chain")) {
            setChain(JSON.parse(localStorage.getItem("chain")));
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
        if (
            localStorage.getItem("fileSrc") &&
            Object.keys(JSON.parse(localStorage.getItem("fileSrc"))).length !==
                0
        ) {
            convertToFile()
        }
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
    }, []);

    return (
        <>
            {modals.map((e:any) => (
                <AddProperties
                    key={uuid()}
                    description={e.description}
                    open={e.open}
                    onClose={e.onClose}
                    type={e.type}
                    inputs={e.state}
                    setInputs={e.setState}
                />
            ))}
            {nftLoading || fullLoading ? (
                <Loader />
            ) : (
                <div className="create-nft-single-page">
                    <div className="head">
                        <div className="blue-head">Create single item</div>
                        <div className="head-text">
                            Image, Video, Audio, or 3D Model. File types
                            supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                            OGG, GLB, GLTF. Max size: 100 MB
                        </div>
                    </div>
                    <div className="body">
                        <div className="input-fields">
                            <div className="upload-file">
                                <div className="field-title">Upload File</div>
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
                                <Input
                                    title="Name"
                                    placeholder={"Item Name"}
                                    state={name}
                                    setState={setName}
                                />
                                <Input
                                    title="External Link"
                                    placeholder={
                                        "https://www.youtube.com/watch?v=Oz9zw7-_vhM"
                                    }
                                    state={extLink}
                                    setState={setExtlink}
                                />
                                <Input
                                    title="Description (Word limit 240)"
                                    multi
                                    placeholder={
                                        "Provide a detailed description of your item."
                                    }
                                    state={description}
                                    setState={setDescription}
                                />
                            </div>
                            <div className="blockchain">
                                <div className="field-title">Blockchain</div>
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
                                            value={chain}
                                            onChange={handleChange}
                                            label="Chain"
                                        >
                                            <MenuItem value={ethChain}>
                                                Ethereum
                                            </MenuItem>
                                            <MenuItem value={polygonChain}>
                                                Polygon
                                            </MenuItem>
                                            <MenuItem value={bscChain}>
                                                Binance
                                            </MenuItem>
                                            <MenuItem value={avalancheChain}>
                                                Avalanche
                                            </MenuItem>
                                            <MenuItem value={tronChain}>
                                                Tron
                                            </MenuItem>
                                            <MenuItem value={nearChain}>
                                                Near
                                            </MenuItem>
                                            <MenuItem value={solonaChain}>
                                                Solana
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                {chain === ethChain && (
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
                                <div className="field-title">Category</div>
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
                                            value={category}
                                            onChange={handleCategoryChange}
                                            label="Category"
                                        >
                                            <MenuItem value={"funny"}>
                                                Funny
                                            </MenuItem>
                                            <MenuItem value={"art"}>
                                                Art
                                            </MenuItem>
                                            <MenuItem value={"nature"}>
                                                Nature
                                            </MenuItem>
                                            <MenuItem value={"animal"}>
                                                Animal
                                            </MenuItem>
                                            <MenuItem value={"sports"}>
                                                Sports
                                            </MenuItem>
                                            <MenuItem value={"photography"}>
                                                Photography
                                            </MenuItem>
                                            <MenuItem value={"music"}>
                                                Music
                                            </MenuItem>
                                            <MenuItem value={"metaverse"}>
                                                Metaverse
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
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
                                        setState={handleRoyaltyChange}
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
                                        title={"Collection Name (optional)"}
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
                            {getWalletChain() == "Near" && chain === nearChain ? <button
                                className="btn create-btn"
                                onClick={() => cryptoPayment()}
                            >
                                Create
                            </button> :
                            <button
                            className="btn create-btn"
                            onClick={() => loginWallet("near")}
                        >
                            Connect Wallet
                        </button>}
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
                    </div>
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
