import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { ReactComponent as BiWalletAlt } from "../../Assets/react-icons/BiWalletAlt.svg";
import { ReactComponent as HiMenuAlt2 } from "../../Assets/react-icons/HiMenuAlt2.svg";
import { ReactComponent as RsAuctionFill } from "../../Assets/react-icons/RsAuctionFill.svg";
import { ReactComponent as BsTag } from "../../Assets/react-icons/BsTag.svg";
import { ReactComponent as Share } from "../../Assets/react-icons/Share.svg";
import DefaultErrorModal from "../Modals/DefaultErrorModal";
import { backendUrl, tronChain } from "../../config";
import ShareProfile from "../Modals/Share/Share";
import { NavLink, withRouter } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { ReactComponent as CgClose } from "../../Assets/react-icons/CgClose.svg";
import { ReactComponent as AiOutlineMenuUnfold } from "../../Assets/react-icons/AiOutlineMenuUnfold.svg";
import { ReactComponent as AiOutlineShoppingCart } from "../../Assets/react-icons/AiOutlineShoppingCart.svg";
import { ReactComponent as RiPriceTag2Fill } from "../../Assets/react-icons/RiPriceTag2Fill.svg";
import { ReactComponent as BiFoodMenu } from "../../Assets/react-icons/BiFoodMenu.svg";
import { ReactComponent as CgArrowsExchangeV } from "../../Assets/react-icons/CgArrowsExchangeV.svg";
import { ReactComponent as SiBinance } from "../../Assets/react-icons/SiBinance.svg";
import { ReactComponent as BsCartPlus } from "../../Assets/react-icons/BsCartPlus.svg";
import { useParams } from "react-router-dom";
import DefaultModal from "../Modals/DefaultModal/DefaultModal";
import { useLocation } from "react-router-dom";
import {
    bscChain,
    ethChain,
    polygonChain,
} from "../../config";

// img
import getContracts from "../../Redux/Blockchain/contracts";
import axios from "axios";
import CountDown from "../Countdown/CountDown";
import NFTCreateSuccess from "../Modals/NFTCreateSuccess/NFTCreateSuccess";
import NFTCreateLoading from "../Modals/NFTCreateLoading/NFTCreateLoading";
import WalletsPopup from "../Modals/WalletsPopup/WalletsPopup";
import DisConnect from "../Modals/DisConnect/DisConnect";
// import { createNFTAddress } from '../../Redux/Blockchain/Abi/createNFT''

// Accordion Material UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
// import { createNFTAddress } from '../../Redux/Blockchain/Abi/createNFT'
import { getUserInfo } from "../../Redux/Profile/actions";
import { useDispatch } from "react-redux";

import { connectWallet, getUserWallet } from "../../Utilities/Util";
import WalletNotFound from "../Modals/MetaMaskNotFound/WalletNotFound";

const NFTById = (props: any) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isHighestBidder, setIsHighestBidder] = useState<boolean>(false);
    const [paymentMode, setpaymentMode] = useState<any>("");
    const {
        walletType,
        userAddress,
        nftCardType,
        networkID,
        userInfo,
        accessToken,
    } = useSelector((state: any) => state.profile);
    // const [web3, setWeb3] = useState<any>(null)
    const [open, setOpen] = useState(false);
    const [openShareProfile, setopenShareProfile] = useState(false);
    const [openDisconnectModal, setOpenDisconnectModal] = useState(false);
    // wallet popup
    useEffect(() => {
        if (userAddress) {
            setOpen(false);
        }
    }, [userInfo]);
    const [done, setDone] = useState(false);
    const { web3, marketPlace, auction, createNFT } = getContracts(
        walletType,
        networkID
    );
    const { id }: any = useParams();
    const [nftInfo, setnftInfo] = useState<any>({});
    const [nftStates, setnftStates] = useState<any>([]);
    const [price, setprice] = useState("");
    const [nftBids, setnftBids] = useState<any>([]);
    const [disableButton, setdisableButton] = useState<boolean>(false);
    const [MetamaskNotFound, setMetamaskNotFound] = useState<boolean>(false);
    const [defaultErrorModal, setdefaultErrorModal] = useState<boolean>(false);
    const [defaultErrorMessage, setdefaultErrorMessage] = useState("");
    const [auctionInfo, setauctionInfo] = useState<any>([]);
    const [paymentMethod, setpaymentMethod] = useState<any>("");
    const [loadingMessage, setloadingMessage] = useState<any>("");
    const [popUpShow, setPopUpShow] = useState(false);
    const [endDate, setendDate] = useState<any>({});
    const [dateArray, setdateArray] = useState<any>([]);
    const [dateHours, setdateHours] = useState<any>(0);
    const [dateZone, setdateZone] = useState<any>("");
    const [mintedBy, setmintedBy] = useState<any>("");
    const [nowDate, setnowDate] = useState<any>({});
    const [AddNFTModalOpen, setAddNFTModalOpen] = useState<boolean>(false);
    const [time, setTime] = useState<any>(0);
    const [bid, setbid] = useState<any>("");
    const [product, setproduct] = useState<any>({});
    const [nftLoading, setNftLoading] = useState<boolean>(false);
    const [nftSuccess, setNftSuccess] = useState<boolean>(false);
    const [hash, setHash] = useState<any>("");
    const [successTitle, setSuccessTitle] = useState<string>("");
    const [priceHistory, setpriceHistory] = React.useState("");
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange2 = (event: any) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = ["Minted", "Sale", "Auction"];

    function getStyles(name: any, personName: any, theme: any) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    // Use the image with public ID, 'docs/colored_pencils'

    async function fetchItem() {
        if (location.pathname.split("/")[1] === "sale") {
            console.log("Sale")
            await axios
                .get(
                    `${backendUrl}/auction/getAuctionById/${location.pathname
                        .split("/")
                        .pop()}/${location.pathname.split("/")[2]}`
                )
                .then(async (res: any) => {
                    console.log("res: ", res);
                    setauctionInfo(res.data[0]);
                    await axios
                        .get(
                            `${backendUrl}/nft/getNftById/${location.pathname.split("/")[2]}/${res.data[0].nftId.contractAddress}/${
                                res.data[0].tokenId
                            }`
                        )
                        .then(async (res: any) => {
                            setnftInfo(res.data.nft);
                            console.log(
                                sessionStorage.getItem(res.data.nft._id),
                                sessionStorage.getItem(res.data.nft._id) ===
                                    "true"
                            );
                            if (res.data.nft.chain === Number(ethChain)) {
                                setprice("Eth");
                            } else if (
                                res.data.nft.chain === Number(polygonChain)
                            ) {
                                setprice("Matic");
                            } else {
                                setprice("BNB");
                            }
                            setnftStates(res.data.nftStates);
                            setnftBids(res.data.bids);
                            setmintedBy(res.data.mintedUser.username);
                            sessionStorage.setItem(res.data.nft._id, "true");
                            console.log(sessionStorage.getItem(nftInfo._id));
                        });
                });
        } else if (location.pathname.split("/")[1] === "nft") {
            console.log("NFT",location.pathname)
            await axios
                .get(
                    `${backendUrl}/nft/getNftById/${location.pathname.split("/")[2]}/${location.pathname.split("/")[3]}/${location.pathname
                        .split("/")
                        .pop()}`
                )
                .then(async (res: any) => {
                    setnftInfo(res.data.nft);
                    setauctionInfo(res.data.auction ? res.data.auction : []);
                    if (res.data.auction) {
                        setendDate(new Date(res.data.auction.auctionTimer));
                        setnowDate(new Date());
                        setdateArray(
                            new Date(res.data.auction.auctionTimer)
                                .toString()
                                .split(" ")
                        );
                        setdateHours(
                            new Date(res.data.auction.auctionTimer)
                                .toString()
                                .split(" ")[4]
                                .split(":")
                        );
                        console.log(
                            new Date(res.data.auction.auctionTimer)
                                .toString()
                                .split("(")[1]
                                .split(")")[0]
                                .split(" ")
                        );
                        var timeZone = "";
                        // for(let i = 0; i< new Date(res.data.auction.auctionTimer).toString().split('(')[1].split(')')[0].split(' ').length; i++) {
                        //     new Date(res.data.auction.auctionTimer).toString().split('(')[1].split(')')[0].split(' ')[i]
                        //     timeZone = timeZone + new Date(res.data.auction.auctionTimer).toString().split('(')[1].split(')')[0].split(' ')[i][0]
                        // }
                        setdateZone(timeZone);
                    }
                    if (res.data.nft.chain === Number(ethChain)) {
                        setprice("Eth");
                    } else if (res.data.nft.chain === Number(polygonChain)) {
                        setprice("Matic");
                    } else {
                        setprice("BNB");
                    }
                    setnftStates(res.data.nftStates);
                    setnftBids(res.data.bids);
                    setmintedBy(res.data.mintedUser.username);
                    sessionStorage.setItem(res.data.nft._id, "true");
                });
        } else {
            console.log("Else,",location.pathname.split("/"))
            await axios
                .get(
                    `${backendUrl}/auction/getAuctionById/${location.pathname
                        .split("/")
                        .pop()}/${location.pathname.split("/")[2]}`
                )
                .then(async (res: any) => {
                    setauctionInfo(res.data[0]);
                    setendDate(new Date(res.data[0].auctionTimer));
                    setnowDate(new Date());
                    setdateArray(
                        new Date(res.data[0].auctionTimer).toString().split(" ")
                    );
                    setdateHours(
                        new Date(res.data[0].auctionTimer)
                            .toString()
                            .split(" ")[4]
                            .split(":")
                    );
                    console.log(
                        new Date(res.data[0].auctionTimer)
                            .toString()
                            .split("(")[1]
                            .split(")")[0]
                            .split(" ")
                    );
                    var timeZone = "";
                    // for(let i = 0; i< new Date(res.data[0].auctionTimer).toString().split('(')[1].split(')')[0].split(' ').length; i++) {
                    //     new Date(res.data[0].auctionTimer).toString().split('(')[1].split(')')[0].split(' ')[i]
                    //     timeZone = timeZone + new Date(res.data[0].auctionTimer).toString().split('(')[1].split(')')[0].split(' ')[i][0]
                    // }
                    setdateZone(timeZone);
                    await axios
                        .get(
                            `${backendUrl}/nft/getNftById/${location.pathname.split("/")[2]}/${location.pathname.split("/")[3]}/${
                                res.data[0].tokenId
                            }`
                        )
                        .then(async (res: any) => {
                            setnftInfo(res.data.nft);
                            console.log(
                                res.data.nft.chain,
                                typeof res.data.nft.chain
                            );
                            if (res.data.nft.chain === Number(ethChain)) {
                                setprice("Eth");
                            } else if (
                                res.data.nft.chain === Number(polygonChain)
                            ) {
                                setprice("Matic");
                            } else {
                                setprice("BNB");
                            }
                            setnftStates(res.data.nftStates);
                            setnftBids(res.data.bids);
                            setmintedBy(res.data.mintedUser.username);
                            sessionStorage.setItem(res.data.nft._id, "true");
                        });
                });
        }
    }

    useEffect(() => {
        fetchItem();
    }, [location.pathname.split("/").pop()]);

    const handleBidChange = (e: any) => {
        setbid(e.target.value);
    };

    const axiosConfig: any = {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    };

    useEffect(() => {
        async function buyItem() {
            setloadingMessage("Adding this amazing asset to your portfolio");
            try {
                if (paymentMode === "StripeBuyItem") {
                    setdisableButton(true);
                    setNftLoading(true);

                    var token;
                    if (networkID === bscChain) {
                        token = "BNB";
                    } else if (networkID === ethChain) {
                        token = "ETH";
                    } else if (networkID === polygonChain) {
                        token = "Matic";
                    }

                    var data = {
                        amount: auctionInfo.startBid,
                        id: auctionInfo.auctionId,
                        tokenId: auctionInfo.tokenId,
                        network: networkID,
                    };
                    console.log(data);

                    const gasPrice = await axios
                        .post(
                            "https://batchmint.herokuapp.com/forbuyitem",
                            data
                        )
                        .then((response) => {
                            console.log(response.data);
                        });

                    const product = {
                        name: token,
                        price: gasPrice,
                        productBy: "UnicusOne",
                    };
                    setproduct(product);

                    const body: any = {
                        token,
                        product,
                    };

                    const headers = {
                        "Content-Type": "application/json",
                    };

                    return fetch(
                        `https://stripeusnicus.herokuapp.com/payment`,
                        {
                            method: "POST",
                            headers,
                            body: JSON.stringify(body),
                        }
                    ).then(async (stripeRes: any) => {
                        const { status } = stripeRes;
                        if (status === 200) {
                            console.log("STATUS ", status);

                            axios
                                .post(
                                    "https://batchmint.herokuapp.com/buyitem",
                                    data
                                )
                                .then((createSaleAPI: any) => {
                                    console.log(createSaleAPI.data);
                                    axios
                                        .post(
                                            `${backendUrl}/auction/buy`,
                                            {
                                                nftId: auctionInfo.nftId,
                                                name: auctionInfo.name,
                                                auctionId:
                                                    auctionInfo.auctionId,
                                                owner: userInfo && userInfo._id,
                                                endAuctionHash:
                                                    "endAuctionHash",
                                                userInfo: userAddress
                                                    ? userAddress
                                                    : userInfo.username,
                                            },
                                            axiosConfig
                                        )
                                        .then((res) => {
                                            console.log(res.data);
                                        });

                                    setNftSuccess(true);
                                    setNftLoading(false);
                                    setdisableButton(false);
                                    setpaymentMode("");
                                    props.history.push("/portfolio");
                                    window.location.reload();
                                })
                                .catch((error) => {
                                    setNftLoading(false);
                                    setdisableButton(false);
                                    console.log(error);
                                });
                        }
                    });
                } else if (paymentMode === "MetaMaskBuyItem") {
                    setdisableButton(true);
                    setNftLoading(true);
                    if (!window.ethereum) {
                        setNftLoading(false);
                        setdisableButton(false);
                        setpaymentMode("");
                        setMetamaskNotFound(true);
                        return null;
                    }
                    //@ts-expect-error
                    if(networkID === tronChain && !window.tronWeb){
                        setNftLoading(false);
                        setdisableButton(false);
                        setpaymentMode("");
                        setMetamaskNotFound(true);
                        return null;
                    }
                    // await getAccount();
                    connectWallet(networkID).then(async () => {
                        const accounts = await getUserWallet(networkID);
                        if (
                            userInfo.wallets.length === 0 ||
                            !userInfo.wallets.includes(accounts[0])
                        ) {
                            console.log(accounts[0]);
                            const axiosConfig: any = {
                                headers: {
                                    Authorization: "Bearer " + accessToken,
                                },
                            };
                            await axios
                                .get(
                                    `${backendUrl}/users/addWallet/${accounts[0]}`,
                                    axiosConfig
                                )
                                .then(async (res: any) => {
                                    console.log(res);
                                    dispatch(getUserInfo(res.data.user));
                                    localStorage.setItem(
                                        "userInfo",
                                        JSON.stringify(res.data.user)
                                    );
                                })
                                .catch((err) => {
                                    console.log(err);
                                    setNftLoading(false);
                                    setdisableButton(false);
                                    setpaymentMode("");
                                    setdefaultErrorMessage(
                                        "Current Metamask account is not linked with this user"
                                    );
                                    setdefaultErrorModal(true);
                                    throw "Wallet already in use";
                                });
                        }
                        console.log(auctionInfo?.startBid / Math.pow(10, 18));
                        const startBid =
                            auctionInfo?.startBid / Math.pow(10, 18);
                        const value = await web3.utils.toWei(
                            startBid.toString()
                        );
                        console.log("----------->", value);
                        const res = await marketPlace.methods
                            .buyItem(auctionInfo.auctionId)
                            .send({
                                from: accounts[0],
                                value: value,
                            });
                        if (res?.transactionHash) {
                            axios
                                .post(
                                    `${backendUrl}/auction/buy`,
                                    {
                                        nftId: auctionInfo.nftId,
                                        name: auctionInfo.name,
                                        auctionId: auctionInfo._id,
                                        owner: userInfo && userInfo._id,
                                        endAuctionHash: res?.transactionHash,
                                        userInfo: userInfo.username,
                                    },
                                    axiosConfig
                                )
                                .then((res) => {
                                    console.log(res.data);
                                });
                            setNftLoading(false);
                            setdisableButton(false);
                            setNftSuccess(true);
                            setHash(res?.transactionHash);
                            setSuccessTitle("NFT Bought Successfully!");
                            setpaymentMode("");
                            props.history.push("/portfolio");
                            window.location.reload();
                        }
                    });
                }
            } catch (error) {
                console.log(error);
                setNftLoading(false);
                setdisableButton(false);
                setpaymentMode("");
            }
        }
        if (
            paymentMode === "MetaMaskBuyItem" ||
            paymentMode === "StripeBuyItem"
        ) {
            buyItem();
        }
    }, [paymentMode]);

    useEffect(() => {
        async function placeBid() {
            console.log("----------------->");
            setloadingMessage("Placing Bid on the Asset");
            setPopUpShow(false);
            try {
                if (paymentMode === "StripePlaceBid") {
                    setNftLoading(true);
                    setdisableButton(true);
                    console.log(nowDate, endDate, nowDate < endDate);
                    console.log(
                        nowDate && endDate && nowDate < endDate
                            ? "Make Offer"
                            : "Claim NFT"
                    );
                    var token;
                    if (networkID === bscChain) {
                        token = "BNB";
                    } else if (networkID === ethChain) {
                        token = "ETH";
                    } else if (networkID === polygonChain) {
                        token = "Matic";
                    }

                    var data = {
                        auctionId: auctionInfo.auctionId,
                        amount: web3.utils.toWei(bid, "ether"),
                        tokenId: auctionInfo.tokenId,
                        network: networkID,
                    };
                    console.log(data);

                    const gasPrice = await axios
                        .post(
                            "https://batchmint.herokuapp.com/forplacebid",
                            data
                        )
                        .then((response) => {
                            console.log(response.data);
                        });

                    const product = {
                        name: token,
                        price: gasPrice,
                        productBy: "UnicusOne",
                    };
                    setproduct(product);

                    const body: any = {
                        token,
                        product,
                    };

                    const headers = {
                        "Content-Type": "application/json",
                    };

                    return fetch(
                        `https://stripeusnicus.herokuapp.com/payment`,
                        {
                            method: "POST",
                            headers,
                            body: JSON.stringify(body),
                        }
                    ).then(async (stripeRes: any) => {
                        const { status } = stripeRes;
                        if (status === 200) {
                            console.log("STATUS ", status);
                            axios
                                .post(
                                    "https://batchmint.herokuapp.com/placebid",
                                    data
                                )
                                .then((createSaleAPI: any) => {
                                    console.log(createSaleAPI.data);
                                    axios
                                        .post(
                                            `${backendUrl}/auction/placeBid`,
                                            {
                                                nftId: props.location.state
                                                    .message.nftId,
                                                auctionId:
                                                    props.location.state.message
                                                        .auctionId,
                                                bidValue: web3.utils.toWei(
                                                    bid,
                                                    "ether"
                                                ),
                                                bidCurrency: "BNB",
                                                bidHash: "4754",
                                                username:
                                                    userInfo &&
                                                    userInfo.username,
                                                email:
                                                    userInfo && userInfo.email,
                                                bidSuccess: true,
                                                bidObj: {},
                                            },
                                            axiosConfig
                                        )
                                        .then((res) => {
                                            console.log(res.data);
                                        });

                                    setNftSuccess(true);
                                    setNftLoading(false);
                                    setdisableButton(false);
                                    setpaymentMode("");
                                    window.location.reload();
                                })
                                .catch((error) => {
                                    setNftLoading(false);
                                    setdisableButton(false);
                                    console.log(error);
                                    setpaymentMode("");
                                });
                        }
                    });
                } else if (paymentMode === "MetaMaskPlaceBid") {
                    setNftLoading(true);
                    setdisableButton(true);
                    if (!window.ethereum) {
                        setNftLoading(false);
                        setdisableButton(false);
                        setpaymentMode("");
                        setMetamaskNotFound(true);
                        return null;
                    }
                    //@ts-expect-error
                    if (networkID === tronChain && !window.tronWeb) {
                      setNftLoading(false);
                      setdisableButton(false);
                      setpaymentMode("");
                      setMetamaskNotFound(true);
                      return null;
                    }
                    // await getAccount();
                    connectWallet(networkID).then(async () => {
                        const accounts = await getUserWallet(networkID);
                        if (
                            userInfo.wallets.length === 0 ||
                            !userInfo.wallets.includes(accounts[0])
                        ) {
                            console.log(accounts[0]);
                            const axiosConfig: any = {
                                headers: {
                                    Authorization: "Bearer " + accessToken,
                                },
                            };
                            await axios
                                .get(
                                    `${backendUrl}/users/addWallet/${accounts[0]}`,
                                    axiosConfig
                                )
                                .then(async (res: any) => {
                                    console.log(res);
                                    dispatch(getUserInfo(res.data.user));
                                    localStorage.setItem(
                                        "userInfo",
                                        JSON.stringify(res.data.user)
                                    );
                                })
                                .catch((err) => {
                                    console.log(err);
                                    setNftLoading(false);
                                    setdisableButton(false);
                                    setpaymentMode("");
                                    setdefaultErrorMessage(
                                        "Current Metamask account is not linked with this user"
                                    );
                                    setdefaultErrorModal(true);
                                    throw "Wallet already in use";
                                });
                        }
                        const res = await auction.methods
                            .placeBid(auctionInfo.auctionId)
                            .send({
                                from: accounts[0],
                                value: web3.utils.toWei(bid, "ether"),
                            });
                        if (res?.transactionHash) {
                            axios
                                .post(
                                    `${backendUrl}/auction/placeBid`,
                                    {
                                        nftId: auctionInfo.nftId,
                                        auctionId: auctionInfo._id,
                                        bidValue: web3.utils.toWei(
                                            bid,
                                            "ether"
                                        ),
                                        bidCurrency: "BNB",
                                        bidHash: res?.transactionHash,
                                        username: userInfo && userInfo.username,
                                        email: userInfo && userInfo.email,
                                        bidSuccess: true,
                                        bidObj: {},
                                    },
                                    axiosConfig
                                )
                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            setNftLoading(false);
                            setdisableButton(false);
                            setNftSuccess(true);
                            setHash(res?.transactionHash);
                            setPopUpShow(false);
                            setSuccessTitle("NFT Bid Placed Successfully!");
                            setpaymentMode("");
                        }
                        window.location.reload();
                    });
                }
            } catch (error) {
                console.log(error);
                setNftLoading(false);
                setdisableButton(false);
                setpaymentMode("");
            }
        }
        if (
            paymentMode === "MetaMaskPlaceBid" ||
            paymentMode === "StripePlaceBid"
        ) {
            placeBid();
        }
    }, [paymentMode]);

    async function endSale(e: any) {
        setloadingMessage("Ending Sale");
        e.preventDefault();
        try {
            setNftLoading(true);
            setdisableButton(true);

            var token;
            if (networkID === bscChain) {
                token = "BNB";
            } else if (networkID === ethChain) {
                token = "ETH";
            } else if (networkID === polygonChain) {
                token = "Matic";
            }

            var data = {
                saleId: auctionInfo.auctionId,
                tokenId: auctionInfo.tokenId,
                network: networkID,
            };
            console.log(data);

            const body: any = {
                token,
                product,
            };

            const headers = {
                "Content-Type": "application/json",
            };

            if (nftInfo.uploadedBy === "61e559cb515235e5d16373fe") {
                const gasPrice = await axios
                    .post("https://batchmint.herokuapp.com/forendsale", data)
                    .then((response) => {
                        console.log(response.data);
                    });

                const product = {
                    name: token,
                    price: gasPrice,
                    productBy: "UnicusOne",
                };
                setproduct(product);

                return fetch(`https://stripeusnicus.herokuapp.com/payment`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                }).then(async (stripeRes: any) => {
                    const { status } = stripeRes;
                    if (status === 200) {
                        console.log("STATUS ", status);

                        axios
                            .post(
                                "https://batchmint.herokuapp.com/endsale",
                                data
                            )
                            .then((createSaleAPI: any) => {
                                console.log(createSaleAPI.data);
                                axios
                                    .post(
                                        `${backendUrl}/auction/end`,
                                        {
                                            nftId: auctionInfo.nftId,
                                            auctionId: auctionInfo._id,
                                            userInfo: userAddress
                                                ? userAddress
                                                : userInfo.username,
                                            endAuctionHash: "endAuctionHash",
                                        },
                                        axiosConfig
                                    )
                                    .then((res) => {
                                        console.log(res.data);
                                    });

                                setNftSuccess(true);
                                setdisableButton(false);
                                setNftLoading(false);
                                props.history.push("/portfolio");
                                window.location.reload();
                            })
                            .catch((error) => {
                                setNftLoading(false);
                                setdisableButton(false);
                                console.log(error);
                            });
                    }
                });
            } else {
              if (!window.ethereum) {
                setdisableButton(false);
                setNftLoading(false);
                setMetamaskNotFound(true);
                return null;
              }
              //@ts-expect-error
              if (networkID === tronChain && !window.tronWeb) {
                setNftLoading(false);
                setdisableButton(false);
                setpaymentMode("");
                setMetamaskNotFound(true);
                return null;
              }
              connectWallet(networkID)
                .then(async () => {
                  const accounts = await getUserWallet(networkID);
                  if (
                    userInfo.wallets.length === 0 ||
                    !userInfo.wallets.includes(accounts[0])
                  ) {
                    console.log(accounts[0]);
                    const axiosConfig: any = {
                      headers: {
                        Authorization: "Bearer " + accessToken,
                      },
                    };
                    await axios
                      .get(
                        `${backendUrl}/users/addWallet/${accounts[0]}`,
                        axiosConfig
                      )
                      .then(async (res: any) => {
                        console.log(res);
                        dispatch(getUserInfo(res.data.user));
                        localStorage.setItem(
                          "userInfo",
                          JSON.stringify(res.data.user)
                        );
                      })
                      .catch((err) => {
                        setNftLoading(false);
                        setdisableButton(false);
                        setdefaultErrorMessage(
                          "Current Metamask account is not linked with this user"
                        );
                        setdefaultErrorModal(true);
                        throw "Wallet already in use";
                      });
                  }
                  const res = await marketPlace.methods
                    .EndSale(auctionInfo.auctionId)
                    .send({ from: accounts[0] });
                  if (res?.transactionHash) {
                    axios
                      .post(
                        `${backendUrl}/auction/end`,
                        {
                          nftId: auctionInfo.nftId,
                          auctionId: auctionInfo._id,
                          userInfo: userInfo.username,
                          endAuctionHash: res.transactionHash,
                        },
                        axiosConfig
                      )
                      .then((res) => {
                        console.log(res.data);
                      });
                    setNftLoading(false);
                    setNftSuccess(true);
                    setHash(res?.transactionHash);
                    setSuccessTitle("NFT Sale Ended");
                    setdisableButton(false);
                    props.history.push("/portfolio");
                    window.location.reload();
                  }
                })
                .catch((walletError) => {
                  setNftLoading(false);
                  setdisableButton(false);
                  setdefaultErrorMessage(walletError.message);
                  setdefaultErrorModal(true);
                  throw walletError;
                });
            }
        } catch (error) {
            console.log(error);
            setNftLoading(false);
            setdisableButton(false);
        }
    }

    async function endAuction(e: any) {
        setloadingMessage("Ending Auction");
        e.preventDefault();
        try {
            setNftLoading(true);
            setdisableButton(true);
            // if (nowDate < endDate) {
            //     setNftLoading(false)
            //     console.log(nowDate, endDate)
            //     console.log(nowDate > endDate)
            //     setdisableButton(false)
            //     setdefaultErrorMessage("Auction Not Ended Yet")
            //     setdefaultErrorModal(true)
            //     return console.log('Auction Not ended Yet')
            // }
            var token;
            if (networkID === bscChain) {
                token = "BNB";
            } else if (networkID === ethChain) {
                token = "ETH";
            } else if (networkID === polygonChain) {
                token = "Matic";
            }

            var data = {
                auctionId: auctionInfo.auctionId,
                tokenId: auctionInfo.tokenId,
                network: networkID,
            };
            console.log(data);

            const body: any = {
                token,
                product,
            };

            const headers = {
                "Content-Type": "application/json",
            };

            if (nftInfo.uploadedBy === "61e559cb515235e5d16373fe") {
                const gasPrice = await axios
                    .post("https://batchmint.herokuapp.com/forendauction", data)
                    .then((response) => {
                        console.log(response.data);
                    });

                const product = {
                    name: token,
                    price: gasPrice,
                    productBy: "UnicusOne",
                };
                setproduct(product);

                return fetch(`https://stripeusnicus.herokuapp.com/payment`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                }).then(async (stripeRes: any) => {
                    const { status } = stripeRes;
                    if (status === 200) {
                        console.log("STATUS ", status);

                        axios
                            .post(
                                "https://batchmint.herokuapp.com/endauction",
                                data
                            )
                            .then((createSaleAPI: any) => {
                                console.log(createSaleAPI.data);
                                axios
                                    .post(
                                        `${backendUrl}/auction/end`,
                                        {
                                            nftId: auctionInfo.nftId,
                                            name: auctionInfo.name,
                                            auctionId: auctionInfo.auctionId,
                                            userInfo: userAddress
                                                ? userAddress
                                                : userInfo.username,
                                            endAuctionHash: "endAuctionHash",
                                        },
                                        axiosConfig
                                    )
                                    .then((res) => {
                                        console.log(res.data);
                                    });

                                setNftSuccess(true);
                                setNftLoading(false);
                                setdisableButton(false);
                                props.history.push("/portfolio");
                                window.location.reload();
                            })
                            .catch((error) => {
                                setNftLoading(false);
                                setdisableButton(false);
                                console.log(error);
                            });
                    }
                });
            } 
            else {
              if (!window.ethereum) {
                setdisableButton(false);
                setNftLoading(false);
                setMetamaskNotFound(true);
                return null;
              }
              //@ts-expect-error
              if (networkID === tronChain && !window.tronWeb) {
                setNftLoading(false);
                setdisableButton(false);
                setpaymentMode("");
                setMetamaskNotFound(true);
                return null;
              }

              connectWallet(networkID)
                .then(async () => {
                  const accounts = await getUserWallet(networkID);
                  if (
                    userInfo.wallets.length === 0 ||
                    !userInfo.wallets.includes(accounts[0])
                  ) {
                    console.log(accounts[0]);
                    const axiosConfig: any = {
                      headers: {
                        Authorization: "Bearer " + accessToken,
                      },
                    };
                    await axios
                      .get(
                        `${backendUrl}/users/addWallet/${accounts[0]}`,
                        axiosConfig
                      )
                      .then(async (res: any) => {
                        console.log(res);
                        dispatch(getUserInfo(res.data.user));
                        localStorage.setItem(
                          "userInfo",
                          JSON.stringify(res.data.user)
                        );
                      })
                      .catch((err) => {
                        setNftLoading(false);
                        setdisableButton(false);
                        setdefaultErrorMessage(
                          "Current Metamask account is not linked with this user"
                        );
                        setdefaultErrorModal(true);
                        throw "Wallet already in use";
                      });
                  }
                  const res = await auction.methods
                    .endAuction(auctionInfo.auctionId)
                    .send({ from: accounts[0] });
                  if (res?.transactionHash) {
                    axios
                      .post(
                        `${backendUrl}/auction/end`,
                        {
                          nftId: auctionInfo.nftId,
                          name: auctionInfo.name,
                          auctionId: auctionInfo._id,
                          userInfo: userInfo.username,
                          endAuctionHash: res.transactionHash,
                        },
                        axiosConfig
                      )
                      .then((res) => {
                        console.log(res.data);
                      });
                    setNftLoading(false);
                    setdisableButton(false);
                    setNftSuccess(true);
                    setHash(res?.transactionHash);
                    setSuccessTitle("NFT Auction Ended");
                    props.history.push("/portfolio");
                    window.location.reload();
                  }
                })
                .catch((walletError) => {
                  setNftLoading(false);
                  setdisableButton(false);
                  setdefaultErrorMessage(walletError.message);
                  setdefaultErrorModal(true);
                  throw walletError;
                });
            }
        } catch (error) {
            console.log(error);
            setNftLoading(false);
            setdisableButton(false);
        }
    }

    async function cancelAuction(e: any) {
        setloadingMessage("Auction is getting cancelled");
        e.preventDefault();
        try {
            setNftLoading(true);
            setdisableButton(true);

            var token;
            if (networkID === bscChain) {
                token = "BNB";
            } else if (networkID === ethChain) {
                token = "ETH";
            } else if (networkID === polygonChain) {
                token = "Matic";
            }

            var data = {
                auctionId: auctionInfo.auctionId,
                tokenId: auctionInfo.tokenId,
                network: networkID,
            };
            console.log(data);

            const body: any = {
                token,
                product,
            };

            const headers = {
                "Content-Type": "application/json",
            };

            if (nftInfo.uploadedBy === "61e559cb515235e5d16373fe") {
                const gasPrice = await axios
                    .post(
                        "https://batchmint.herokuapp.com/forcancelauction",
                        data
                    )
                    .then((response) => {
                        console.log(response.data);
                    });

                const product = {
                    name: token,
                    price: gasPrice,
                    productBy: "UnicusOne",
                };
                setproduct(product);

                return fetch(`https://stripeusnicus.herokuapp.com/payment`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                }).then(async (stripeRes: any) => {
                    const { status } = stripeRes;
                    if (status === 200) {
                        console.log("STATUS ", status);

                        axios
                            .post(
                                "https://batchmint.herokuapp.com/cancelauction",
                                data
                            )
                            .then((createSaleAPI: any) => {
                                console.log(createSaleAPI.data);
                                axios
                                    .post(
                                        `${backendUrl}/auction/cancel`,
                                        {
                                            nftId: auctionInfo.nftId,
                                            auctionId: auctionInfo.auctionId,
                                            userInfo: userAddress
                                                ? userAddress
                                                : userInfo.username,
                                            transactionHash: "transactionHash",
                                        },
                                        axiosConfig
                                    )
                                    .then((res) => {
                                        console.log(res.data);
                                    });

                                setNftSuccess(true);
                                setNftLoading(false);
                                setdisableButton(false);
                                props.history.push("/portfolio");
                                window.location.reload();
                            })
                            .catch((error) => {
                                setNftLoading(false);
                                setdisableButton(false);
                                console.log(error);
                            });
                    }
                });
            } 
            else {
              if (!window.ethereum) {
                setdisableButton(false);
                setNftLoading(false);
                setMetamaskNotFound(true);
                return null;
              }
              //@ts-expect-error
              if (networkID === tronChain && !window.tronWeb) {
                setNftLoading(false);
                setdisableButton(false);
                setpaymentMode("");
                setMetamaskNotFound(true);
                return null;
              }

              connectWallet(networkID)
                .then(async () => {
                  const accounts = await getUserWallet(networkID);
                  if (
                    userInfo.wallets.length === 0 ||
                    !userInfo.wallets.includes(accounts[0])
                  ) {
                    console.log(accounts[0]);
                    const axiosConfig: any = {
                      headers: {
                        Authorization: "Bearer " + accessToken,
                      },
                    };
                    await axios
                      .get(
                        `${backendUrl}/users/addWallet/${accounts[0]}`,
                        axiosConfig
                      )
                      .then(async (res: any) => {
                        console.log(res);
                        dispatch(getUserInfo(res.data.user));
                        localStorage.setItem(
                          "userInfo",
                          JSON.stringify(res.data.user)
                        );
                      })
                      .catch((err) => {
                        setNftLoading(false);
                        setdisableButton(false);
                        setdefaultErrorMessage(
                          "Current Metamask account is not linked with this user"
                        );
                        setdefaultErrorModal(true);
                        throw "Wallet already in use";
                      });
                  }
                  const res = await auction.methods
                    .cancelAuction(auctionInfo.auctionId)
                    .send({ from: accounts[0] });
                  if (res?.transactionHash) {
                    axios
                      .post(
                        `${backendUrl}/auction/cancel`,
                        {
                          nftId: auctionInfo.nftId,
                          auctionId: auctionInfo._id,
                          userInfo: userInfo.username,
                          transactionHash: res.transactionHash,
                        },
                        axiosConfig
                      )
                      .then((res) => {
                        console.log(res.data);
                      });
                    setNftLoading(false);
                    setNftSuccess(true);
                    setdisableButton(false);
                    setHash(res?.transactionHash);
                    setSuccessTitle("NFT Auction Cancelled");
                    props.history.push("/portfolio");
                    window.location.reload();
                  }
                })
                .catch((walletError) => {
                  setNftLoading(false);
                  setdisableButton(false);
                  setdefaultErrorMessage(walletError.message);
                  setdefaultErrorModal(true);
                  throw walletError;
                });
            }
        } catch (error) {
            console.log(error);
            setNftLoading(false);
            setdisableButton(false);
        }
    }
    useEffect(() => {
        if (time?.timeleft > 0) {
            setDone(false);
        }
    }, [time, userInfo]);

    const ClaimCheckNFT = async () => {
        try {
            if (done) {
                const res = await auction.methods.isHighestBidder(id).call();
                if (res.toLowerCase() === userAddress.toLowerCase()) {
                    setIsHighestBidder(true);
                }
            }
        } catch (error: any) {
            console.log(error?.message);
        }
    };

    const [expanded, setExpanded] = React.useState("panel");

    const handleChangeExpanded = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        if (userAddress && done) {
            ClaimCheckNFT();
        }
    }, [userInfo, done]);

    const claimNFT = async () => {
        setloadingMessage("Adding this amazing asset to your portfolio");
        try {
            setNftLoading(true);
            setdisableButton(true);

            var token;
            if (networkID === bscChain) {
                token = "BNB";
            } else if (networkID === ethChain) {
                token = "ETH";
            } else if (networkID === polygonChain) {
                token = "Matic";
            }

            var data = {
                auctionId: auctionInfo.auctionId,
                network: networkID,
            };
            console.log(data);

            const gasPrice = await axios
                .post("https://batchmint.herokuapp.com/forclaimnft", data)
                .then((response) => {
                    console.log(response.data);
                });

            const product = {
                name: token,
                price: gasPrice,
                productBy: "UnicusOne",
            };
            setproduct(product);

            const body: any = {
                token,
                product,
            };

            const headers = {
                "Content-Type": "application/json",
            };

            if (nftInfo.uploadedBy === "61e559cb515235e5d16373fe") {
                return fetch(`https://stripeusnicus.herokuapp.com/payment`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                }).then(async (stripeRes: any) => {
                    const { status } = stripeRes;
                    if (status === 200) {
                        console.log("STATUS ", status);

                        axios
                            .post(
                                "https://batchmint.herokuapp.com/claimnft",
                                data
                            )
                            .then((createSaleAPI: any) => {
                                console.log(createSaleAPI.data);
                                axios
                                    .post(
                                        `${backendUrl}/auction/end`,
                                        {
                                            nftId: auctionInfo.nftId,
                                            auctionId: auctionInfo.auctionId,
                                            endAuctionHash: "endAuctionHash",
                                        },
                                        axiosConfig
                                    )
                                    .then((res) => {
                                        console.log(res.data);
                                    });

                                setNftSuccess(true);
                                setNftLoading(false);
                                setdisableButton(false);
                                props.history.push("/portfolio");
                                window.location.reload();
                            })
                            .catch((error) => {
                                setNftLoading(false);
                                setdisableButton(false);
                                console.log(error);
                            });
                    }
                });
            } else {
              if (!window.ethereum) {
                setdisableButton(false);
                setNftLoading(false);
                setMetamaskNotFound(true);
                return null;
              }
              //@ts-expect-error
              if (networkID === tronChain && !window.tronWeb) {
                setNftLoading(false);
                setdisableButton(false);
                setpaymentMode("");
                setMetamaskNotFound(true);
                return null;
              }

              connectWallet(networkID).then(async () => {
                const accounts = await getUserWallet(networkID);
                if (
                  userInfo.wallets.length === 0 ||
                  !userInfo.wallets.includes(accounts[0])
                ) {
                  console.log(accounts[0]);
                  const axiosConfig: any = {
                    headers: {
                      Authorization: "Bearer " + accessToken,
                    },
                  };
                  await axios
                    .get(
                      `${backendUrl}/users/addWallet/${accounts[0]}`,
                      axiosConfig
                    )
                    .then(async (res: any) => {
                      console.log(res);
                      dispatch(getUserInfo(res.data.user));
                      localStorage.setItem(
                        "userInfo",
                        JSON.stringify(res.data.user)
                      );
                    })
                    .catch((err) => {
                      setNftLoading(false);
                      setdisableButton(false);
                      setdefaultErrorMessage(
                        "Current Metamask account is not linked with this user"
                      );
                      setdefaultErrorModal(true);
                      throw "Wallet already in use";
                    });
                }
                const res = await auction.methods.claimNft(id).send({
                  from: accounts[0],
                });
                if (res?.transactionHash) {
                  setNftLoading(false);
                  setdisableButton(false);
                  setNftSuccess(true);
                  setHash(res?.transactionHash);
                  setSuccessTitle("NFT Claimed Succesfully");
                  props.history.push("/portfolio");
                  window.location.reload();
                }
              });
            }
        } catch (error) {
            console.log(error);
            setNftLoading(false);
            setdisableButton(false);
        }
    };

    return (
        <>
            <div className="single_nft">
                <Container>
                    <Row>
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={5}
                            xl={5}
                            className="mb-3"
                        >
                            <div className="nft__image">
                                <a
                                    href={nftInfo && nftInfo.cloudinaryUrl}
                                    target="_blank"
                                >
                                    {nftInfo &&
                                    nftInfo.cloudinaryUrl &&
                                    nftInfo.cloudinaryUrl.split(".").pop() ==
                                        "mp4" ? (
                                        <video
                                            style={{
                                                width: "100%",
                                                maxHeight: "100%",
                                            }}
                                            autoPlay
                                            loop
                                        >
                                            <source
                                                src={
                                                    nftInfo &&
                                                    nftInfo.cloudinaryUrl
                                                }
                                                type="video/mp4"
                                            />
                                        </video>
                                    ) : (
                                        <img
                                            src={
                                                nftInfo && nftInfo.cloudinaryUrl
                                            }
                                            style={{ borderRadius: "8px" }}
                                        />
                                    )}
                                </a>
                            </div>
                            <div className="nft__right nft__normal">
                                <Accordion className="accordion">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{
                                            background:
                                                "rgba(196, 196, 196, 0.1)",
                                            border: "1px solid #0b203e66",
                                        }}
                                    >
                                        <Typography className="flex">
                                            <RiPriceTag2Fill /> Properties
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className="pt-10"
                                        style={{
                                            background:
                                                "rgba(196, 196, 196, 0.1)",
                                            border: "1px solid #0b203e66",
                                        }}
                                    >
                                        <div className="detailsGrid">
                                            {nftInfo &&
                                                nftInfo.tags &&
                                                nftInfo.tags.length > 0 &&
                                                nftInfo.tags.map((tag: any) => {
                                                    return (
                                                        <div className="gridBbox">
                                                            <h6>
                                                                {
                                                                    tag.propertyType
                                                                }
                                                            </h6>
                                                            <h6>
                                                                {
                                                                    tag.propertyName
                                                                }
                                                            </h6>
                                                        </div>
                                                    );
                                                })}

                                            {nftInfo && nftInfo.tokenId && (
                                                <div className="gridBbox">
                                                    <h6>Token ID:</h6>
                                                    <h6>{nftInfo.tokenId}</h6>
                                                </div>
                                            )}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                
                                <Accordion
                                    className="accordion"
                                    style={{
                                        background: "rgba(196, 196, 196, 0.1)",
                                        border: "1px solid #0b203e66",
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{
                                            background:
                                                "rgba(196, 196, 196, 0.1)",
                                            border: "1px solid #0b203e66",
                                        }}
                                    >
                                        <Typography className="flex">
                                            <BiFoodMenu /> Details
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className="pt-10 pb-5"
                                        style={{
                                            background:
                                                "rgba(196, 196, 196, 0.1)",
                                            border: "1px solid #0b203e66",
                                        }}
                                    >
                                        <div className="flex justify-content-between">
                                            <h6>Contract Address</h6>
                                            {price &&
                                                (price === "BNB" ? (
                                                    <a href="https://bscscan.com/address/0x2f376c69feEC2a4cbb17a001EdB862573898E95a#code">
                                                        0x2f37...98E95a
                                                    </a>
                                                ) : price === "Eth" ? (
                                                    ""
                                                ) : (
                                                    price === "Matic" && (
                                                        <a href="https://polygonscan.com/address/0x1549EabD2a47762413ee1A11e667E67A5825ff44#code">
                                                            0x1549...25ff44
                                                        </a>
                                                    )
                                                ))}
                                        </div>
                                        <div className="flex justify-content-between">
                                            <h6>Token ID</h6>
                                            <h6>{nftInfo.tokenId}</h6>
                                        </div>
                                        <div className="flex justify-content-between">
                                            <h6>Token Standard</h6>
                                            <h6>ERC-721</h6>
                                        </div>
                                        <div className="flex justify-content-between">
                                            <h6>Blockchain</h6>
                                            <h6>
                                                {price &&
                                                    (price === "BNB"
                                                        ? "Binance"
                                                        : price === "Eth"
                                                        ? "Ethereum"
                                                        : price === "Matic" &&
                                                          "Polygon")}
                                            </h6>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={7}
                            xl={7}
                            className="mb-3"
                        >
                            <div className="nft__right">
                                <div className="header">
                                    <h4>{nftInfo && nftInfo.name}</h4>
                                    <p>
                                        Owned By{" "}
                                        {auctionInfo.auctionStatus == 3 ? (
                                            <NavLink
                                                to={
                                                    nftInfo &&
                                                    `/artist/${nftInfo.userInfo}`
                                                }
                                            >
                                                {nftInfo && nftInfo.userInfo}
                                            </NavLink>
                                        ) : (
                                            <NavLink
                                                to={
                                                    auctionInfo &&
                                                    auctionInfo.sellerInfo
                                                        ? `/artist/${auctionInfo.sellerInfo}`
                                                        : nftInfo &&
                                                          `/artist/${nftInfo.userInfo}`
                                                }
                                            >
                                                {auctionInfo &&
                                                auctionInfo.sellerInfo
                                                    ? auctionInfo.sellerInfo
                                                    : nftInfo &&
                                                      nftInfo.userInfo}
                                            </NavLink>
                                        )}{" "}
                                    </p>
                                    <p>
                                        Minted By{" "}
                                        <NavLink
                                            to={`/artist/${
                                                nftInfo.mintedInfo
                                                    ? nftInfo.mintedInfo
                                                    : mintedBy
                                            }`}
                                        >
                                            {nftInfo.mintedInfo
                                                ? nftInfo.mintedInfo
                                                : mintedBy}
                                        </NavLink>{" "}
                                    </p>
                                    <p>
                                        {nftInfo.nftStatus !== 1 &&
                                        auctionInfo.auctionType !== "Sale" &&
                                        endDate - nowDate > 0
                                            ? `Auction Ends ${dateArray[1]} ${
                                                  dateArray[2]
                                              }, ${dateArray[3]} at ${
                                                  dateHours[0] > 12
                                                      ? dateHours[0] - 12
                                                      : dateHours[0]
                                              }:${dateHours[1]}${
                                                  dateHours[0] > 12
                                                      ? "pm"
                                                      : "am"
                                              } ${dateZone}`
                                            : auctionInfo.auctionStatus === 3 &&
                                              (userInfo && userInfo._id) ===
                                                  (auctionInfo &&
                                                      auctionInfo.sellerId)
                                            ? "Auction Ended"
                                            : auctionInfo.auctionStatus === 4 &&
                                              "Auction Canceled"}
                                    </p>
                                </div>
                                <div
                                    className="price_section"
                                    style={{ position: "relative" }}
                                >
                                    <h6>Current Price</h6>
                                    <button
                                        onClick={() => {
                                            setopenShareProfile(true);
                                        }}
                                        className="learn-more"
                                        style={{
                                            width: 0,
                                            position: "absolute",
                                            top: "-10px",
                                            right: "35px",
                                        }}
                                    >
                                        <span
                                            className="circle"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#2d61db",
                                            }}
                                            aria-hidden="true"
                                        >
                                            <Share
                                                style={{
                                                    color: "white",
                                                    width: "40%",
                                                    height: "40%",
                                                }}
                                            />
                                        </span>
                                    </button>
                                    {auctionInfo.length == 0 ? (
                                        <h2>Not for Sale</h2>
                                    ) : (
                                        <h2>
                                            {auctionInfo?.lastBid
                                                ? (
                                                      auctionInfo?.lastBid /
                                                      Math.pow(10, 18)
                                                  ).toFixed(4)
                                                : (
                                                      auctionInfo?.startBid /
                                                      Math.pow(10, 18)
                                                  ).toFixed(4)}{" "}
                                            {price}
                                        </h2>
                                    )}
                                    {/* <div className='sale_buttons'> */}

                                    {nftCardType === 1 &&
                                        !done &&
                                        time?.timeleft > 0 && (
                                            <CountDown
                                                timeInMilisecs={
                                                    time?.timeleft * 1000
                                                }
                                                setDone={setDone}
                                            />
                                        )}
                                    {!(userInfo && userInfo._id) ? (
                                        <div className="sale_buttons">
                                            <button
                                                className="btn_brand"
                                                onClick={() => setOpen(true)}
                                            >
                                                Connect Wallet
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {(location.pathname.split(
                                                "/"
                                            )[1] === "sale" ||
                                                location.pathname.split(
                                                    "/"
                                                )[1] === "nft") &&
                                            auctionInfo &&
                                            auctionInfo.auctionType ===
                                                "Sale" ? (
                                                <div className="sale_buttons">
                                                    {auctionInfo &&
                                                        auctionInfo.auctionStatus !==
                                                            3 &&
                                                        !(
                                                            (userInfo &&
                                                                userInfo._id) ===
                                                            (auctionInfo &&
                                                                auctionInfo.sellerId)
                                                        ) && (
                                                            <div>
                                                                <button
                                                                    className={
                                                                        !(
                                                                            (userInfo &&
                                                                                userInfo._id) ===
                                                                            auctionInfo.sellerId
                                                                        )
                                                                            ? "btn_brand"
                                                                            : "btn_brand"
                                                                    }
                                                                    onClick={() =>
                                                                        setAddNFTModalOpen(
                                                                            true
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        disableButton
                                                                    }
                                                                >
                                                                    <BiWalletAlt />{" "}
                                                                    Buy now
                                                                </button>
                                                            </div>
                                                        )}
                                                    {auctionInfo.auctionStatus !==
                                                        3 &&
                                                        (userInfo &&
                                                            userInfo._id) ===
                                                            (auctionInfo &&
                                                                auctionInfo.sellerId) && (
                                                            <button
                                                                className="btn_brand"
                                                                onClick={
                                                                    endSale
                                                                }
                                                                disabled={
                                                                    disableButton
                                                                }
                                                            >
                                                                End Sale
                                                            </button>
                                                        )}
                                                    {auctionInfo.auctionStatus ===
                                                        3 && (
                                                        <button className="btn_brand">
                                                            Sale Ended
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (location.pathname.split(
                                                  "/"
                                              )[1] === "auction" ||
                                                  location.pathname.split(
                                                      "/"
                                                  )[1] === "nft") &&
                                              auctionInfo.auctionType ===
                                                  "Auction" ? (
                                                <div
                                                    className="sale_buttons"
                                                    style={{
                                                        justifyContent:
                                                            "flex-start",
                                                    }}
                                                >
                                                    {(done ||
                                                        !(
                                                            (userInfo &&
                                                                userInfo._id) ===
                                                            auctionInfo.sellerId
                                                        )) && (
                                                        <button
                                                            className="btn_brand"
                                                            onClick={() => {
                                                                if (
                                                                    nowDate &&
                                                                    endDate &&
                                                                    nowDate <
                                                                        endDate
                                                                ) {
                                                                    setPopUpShow(
                                                                        true
                                                                    );
                                                                } else {
                                                                    if (
                                                                        (userInfo &&
                                                                            userInfo._id) ===
                                                                        auctionInfo.highestBidder
                                                                    ) {
                                                                        claimNFT();
                                                                    }
                                                                }
                                                            }}
                                                            disabled={
                                                                disableButton
                                                            }
                                                        >
                                                            <BsTag />{" "}
                                                            {nowDate &&
                                                            endDate &&
                                                            nowDate < endDate
                                                                ? "Make Offer"
                                                                : (userInfo &&
                                                                      userInfo._id) ===
                                                                  auctionInfo.highestBidder
                                                                ? "Claim NFT"
                                                                : "Auction Ended"}
                                                        </button>
                                                    )}

                                                    {auctionInfo.auctionStatus ===
                                                        2 &&
                                                        (userInfo &&
                                                            userInfo._id) ===
                                                            (auctionInfo &&
                                                                auctionInfo.sellerId) && (
                                                            <button
                                                                className="btn_brand"
                                                                onClick={
                                                                    endAuction
                                                                }
                                                                disabled={
                                                                    disableButton
                                                                }
                                                            >
                                                                End Auction
                                                            </button>
                                                        )}
                                                    {auctionInfo.auctionStatus ===
                                                        2 &&
                                                        (userInfo &&
                                                            userInfo._id) ===
                                                            (auctionInfo &&
                                                                auctionInfo.sellerId) && (
                                                            <button
                                                                className="btn_brand"
                                                                onClick={
                                                                    cancelAuction
                                                                }
                                                                disabled={
                                                                    disableButton
                                                                }
                                                            >
                                                                Cancel Auction
                                                            </button>
                                                        )}
                                                    {auctionInfo.auctionStatus ===
                                                        3 && (
                                                        <button className="btn_brand">
                                                            Auction Ended
                                                        </button>
                                                    )}
                                                    {auctionInfo.auctionStatus ===
                                                        4 && (
                                                        <button className="btn_brand">
                                                            Auction Canceled
                                                        </button>
                                                    )}
                                                </div>
                                            ) : null}
                                        </>
                                    )}

                                    {/* </div>  */}
                                </div>
                                <div className="description">
                                    <h5>
                                        <span>
                                            <HiMenuAlt2 />{" "}
                                        </span>
                                        <span>Description</span>
                                    </h5>
                                    <p>{nftInfo && nftInfo.description}</p>
                                </div>
                            </div>
                            <div className="nft__right">
                                {/* <Accordion className="accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><AiOutlineRise /> Price History</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="pt-10">
                    <div className="accordionDetails">
                      <FormControl className="w-25">
                        <InputLabel id="demo-simple-select-label">History</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={priceHistory}
                          label="History"
                          onChange={handleChange}
                        >
                          <MenuItem value={"Last 7 Days"}>Last 7 Days</MenuItem>
                          <MenuItem value={"Last 14 Days"}>Last 14 Days</MenuItem>
                          <MenuItem value={"Last 30 Days"}>Last 30 Days</MenuItem>
                          <MenuItem value={"Last Year"}>Last Year</MenuItem>
                          <MenuItem value={"All Time"}>All Time</MenuItem>
                        </Select>
                      </FormControl>
                      <div>
                        <h6>All Time Avg. Price</h6>
                        <div className="flex"><HiOutlineMenuAlt3 /> 1.77</div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion> */}
                                {/* <Accordion className="accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><BsFillTagsFill /> Listings</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="pb-0">
                    <div className="accordionGrid pl-15">
                      <h6>
                        Price
                      </h6>
                      <h6>
                        USD Price
                      </h6>
                      <h6>
                        Expiration
                      </h6>
                      <h6>
                        From
                      </h6>
                    </div>
                    <div className="upperGrid">
                      <div className="accordionGrid">
                        <h6 className="flex">
                          <SiBinance /> 111 ETH
                        </h6>
                        <h6>
                          $ 466,824.93
                        </h6>
                        <h6>
                          in 5 months
                        </h6>
                        <h6>
                          comfygang
                        </h6>
                        <button>
                          Buy
                        </button>
                      </div>
                      <div className="accordionGrid">
                        <h6 className="flex">
                          <SiBinance /> 111 ETH
                        </h6>
                        <h6>
                          $ 466,824.93
                        </h6>
                        <h6>
                          in 5 months
                        </h6>
                        <h6>
                          comfygang
                        </h6>
                        <button>
                          Buy
                        </button>
                      </div>
                      <div className="accordionGrid">
                        <h6 className="flex">
                          <SiBinance /> 111 ETH
                        </h6>
                        <h6>
                          $ 466,824.93
                        </h6>
                        <h6>
                          in 5 months
                        </h6>
                        <h6>
                          comfygang
                        </h6>
                        <button>
                          Buy
                        </button>
                      </div>
                      <div className="accordionGrid">
                        <h6 className="flex">
                          <SiBinance /> 111 ETH
                        </h6>
                        <h6>
                          $ 466,824.93
                        </h6>
                        <h6>
                          in 5 months
                        </h6>
                        <h6>
                          comfygang
                        </h6>
                        <button>
                          Buy
                        </button>
                      </div>
                      <div className="accordionGrid">
                        <h6 className="flex">
                          <BsCartPlus /> 111 ETH
                        </h6>
                        <h6>
                          $ 466,824.93
                        </h6>
                        <h6>
                          in 5 months
                        </h6>
                        <h6>
                          comfygang
                        </h6>
                        <button>
                          Buy
                        </button>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion> */}
                                <Accordion className="accordion">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{
                                            background:
                                                "rgba(196, 196, 196, 0.1)",
                                            border: "1px solid #0b203e66",
                                        }}
                                    >
                                        <Typography>
                                            <AiOutlineMenuUnfold /> Offers
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className="pb-0"
                                        style={{
                                            background:
                                                "rgba(196, 196, 196, 0.1)",
                                            border: "1px solid #0b203e66",
                                        }}
                                    >
                                        <div className="accordionGridOffers pl-15">
                                            <h6>Price</h6>
                                            <h6>From</h6>
                                            <h6>Date</h6>
                                        </div>
                                        <div className="upperGrid">
                                            {nftBids &&
                                                nftBids.map((nftBid: any) => {
                                                    return (
                                                        <div className="accordionGridOffers">
                                                            <h6 className="flex">
                                                                {nftBid.bidValue && (
                                                                    <SiBinance />
                                                                )}{" "}
                                                                {nftBid.bidValue &&
                                                                    nftBid.bidValue /
                                                                        Math.pow(
                                                                            10,
                                                                            18
                                                                        )}
                                                            </h6>
                                                            <h6>
                                                                {nftBid.username
                                                                    .length > 15
                                                                    ? nftBid.username.substring(
                                                                          0,
                                                                          7
                                                                      )
                                                                    : nftBid.username}
                                                                {nftBid.username
                                                                    .length >
                                                                    15 && "..."}
                                                                {nftBid.username
                                                                    .length >
                                                                    15 &&
                                                                    nftBid.username.substring(
                                                                        nftBid
                                                                            .username
                                                                            .length -
                                                                            7
                                                                    )}
                                                            </h6>
                                                            <h6>
                                                                {
                                                                    nftBid.createdAt.split(
                                                                        "T"
                                                                    )[0]
                                                                }
                                                            </h6>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Col>
                        <div className="nft__normal nft__right nft__normal">
                            <Accordion
                                className="accordion"
                                expanded={expanded === "panel"}
                                onChange={handleChangeExpanded("panel")}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{
                                        background: "rgba(196, 196, 196, 0.1)",
                                        border: "1px solid #0b203e66",
                                    }}
                                >
                                    <Typography>
                                        <CgArrowsExchangeV />
                                        NFT Ownership Trail
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    className="pb-0 pt-10"
                                    style={{
                                        background: "rgba(196, 196, 196, 0.1)",
                                        border: "1px solid #0b203e66",
                                    }}
                                >
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-multiple-chip-label">
                                                Filter
                                            </InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple
                                                value={personName}
                                                onChange={handleChange2}
                                                input={
                                                    <OutlinedInput
                                                        id="select-multiple-chip"
                                                        label="Chip"
                                                    />
                                                }
                                                renderValue={(selected) => (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        {selected.map(
                                                            (value) => (
                                                                <Chip
                                                                    key={value}
                                                                    label={
                                                                        value
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {names.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(
                                                            name,
                                                            personName,
                                                            theme
                                                        )}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div
                                        className="accordionGrid pl-15"
                                        style={{
                                            paddingLeft: "15px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <h6>Event</h6>
                                        <h6>Price</h6>
                                        <h6>From</h6>
                                        <h6>To</h6>
                                        <h6>Date</h6>
                                    </div>
                                    <div className="upperGrid">
                                        {nftStates &&
                                            nftStates.map((nftState: any) => {
                                                return (
                                                    <div
                                                        className="accordionGrid"
                                                        style={{
                                                            paddingLeft: "15px",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <h6
                                                            className="flex"
                                                            style={{
                                                                justifyContent:
                                                                    "left",
                                                            }}
                                                        >
                                                            {nftState.state ===
                                                            "Minted" ? (
                                                                <BsCartPlus />
                                                            ) : nftState.state ===
                                                              "Auction" ? (
                                                                <RsAuctionFill />
                                                            ) : (
                                                                <AiOutlineShoppingCart />
                                                            )}{" "}
                                                            {nftState.state}
                                                        </h6>
                                                        <h6
                                                            className="flex"
                                                            style={{
                                                                justifyContent:
                                                                    "left",
                                                            }}
                                                        >
                                                            {nftState.price && (
                                                                <SiBinance />
                                                            )}{" "}
                                                            {nftState.price &&
                                                                nftState.price /
                                                                    Math.pow(
                                                                        10,
                                                                        18
                                                                    )}
                                                        </h6>
                                                        <h6>
                                                            {nftState.from
                                                                .length > 15
                                                                ? nftState.from.substring(
                                                                      0,
                                                                      7
                                                                  )
                                                                : nftState.from}
                                                            {nftState.from
                                                                .length > 15 &&
                                                                "..."}
                                                            {nftState.from
                                                                .length > 15 &&
                                                                nftState.from.substring(
                                                                    nftState
                                                                        .from
                                                                        .length -
                                                                        7
                                                                )}
                                                        </h6>
                                                        <h6>
                                                            {nftState.to
                                                                .length > 15
                                                                ? nftState.to.substring(
                                                                      0,
                                                                      7
                                                                  )
                                                                : nftState.to}
                                                            {nftState.to
                                                                .length > 15 &&
                                                                "..."}
                                                            {nftState.to
                                                                .length > 15 &&
                                                                nftState.to.substring(
                                                                    nftState.to
                                                                        .length -
                                                                        7
                                                                )}
                                                        </h6>
                                                        <h6>
                                                            {nftState.date &&
                                                                nftState.date.split(
                                                                    "T"
                                                                )[0]}
                                                        </h6>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="nft__normal nft__right nft__normal">
                            {/* <Accordion className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="flex"><BsFillGrid3X2GapFill />More from this collection</Typography>
                </AccordionSummary>
                <AccordionDetails className="pt-10">
                  <div className="collection pt-10">
                    <div className='nft_card'>
                      <div className='nft_card_image_wrapper'>
                        <div className='nft_card_image'>
                          <Image src="https://th.bing.com/th/id/OIP.T3GvdTwZyeJUiQZcM45xvAHaEo?pid=ImgDet&rs=1" alt='' />
                        </div>
                        <div className='user_image'>
                          <Image src="https://th.bing.com/th/id/OIP.T3GvdTwZyeJUiQZcM45xvAHaEo?pid=ImgDet&rs=1" alt='' />
                        </div>
                      </div>
                      <h6 >{"Dummy"}</h6>
                      <h6>15000 ETH</h6>
                      <div>
                        <a>
                          <button
                            className='btn_brand btn_outlined'
                          >
                            <BsFillHandbagFill />
                            Buy now
                          </button>
                        </a>
                      </div>
                    </div>
                    <div className='nft_card'>
                      <div className='nft_card_image_wrapper'>
                        <div className='nft_card_image'>
                          <Image src="https://th.bing.com/th/id/OIP.T3GvdTwZyeJUiQZcM45xvAHaEo?pid=ImgDet&rs=1" alt='' />
                        </div>
                        <div className='user_image'>
                          <Image src="https://th.bing.com/th/id/OIP.T3GvdTwZyeJUiQZcM45xvAHaEo?pid=ImgDet&rs=1" alt='' />
                        </div>
                      </div>
                      <h6 >{"Dummy"}</h6>
                      <h6>15000 ETH</h6>
                      <div>
                        <a>
                          <button
                            className='btn_brand btn_outlined'
                          >
                            <BsFillHandbagFill />
                            Buy now
                          </button>
                        </a>
                      </div>
                    </div>
                    <div className='nft_card'>
                      <div className='nft_card_image_wrapper'>
                        <div className='nft_card_image'>
                          <Image src="https://th.bing.com/th/id/OIP.T3GvdTwZyeJUiQZcM45xvAHaEo?pid=ImgDet&rs=1" alt='' />
                        </div>
                        <div className='user_image'>
                          <Image src="https://th.bing.com/th/id/OIP.T3GvdTwZyeJUiQZcM45xvAHaEo?pid=ImgDet&rs=1" alt='' />
                        </div>
                      </div>
                      <h6 >{"Dummy"}</h6>
                      <h6>15000 ETH</h6>
                      <div>
                        <a>
                          <button
                            className='btn_brand btn_outlined'
                          >
                            <BsFillHandbagFill />
                            Buy now
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion> */}
                        </div>
                    </Row>
                </Container>
            </div>
            <DefaultModal
                title={"Bid NFT"}
                show={popUpShow}
                handleClose={() => setPopUpShow(false)}
                type="fail"
            >
                <div className="success__body">
                    <Form className="mt-5 input_price">
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="tel"
                                className="form-control shadow-none"
                                placeholder="0.00 BNB"
                                onChange={handleBidChange}
                            />
                            {bid <
                                (auctionInfo?.lastBid
                                    ? auctionInfo?.lastBid / Math.pow(10, 18)
                                    : auctionInfo?.startBid /
                                      Math.pow(10, 18)) && (
                                <span
                                    className="text-danger"
                                    style={{
                                        fontSize: "11px",
                                        textAlign: "center",
                                    }}
                                >
                                    Bid Price Should be more than Actual Price
                                </span>
                            )}
                        </Form.Group>
                        <button
                            disabled={
                                bid <
                                (auctionInfo?.lastBid
                                    ? auctionInfo?.lastBid / Math.pow(10, 18)
                                    : auctionInfo?.startBid / Math.pow(10, 18))
                            }
                            type="submit"
                            className={
                                bid <
                                (auctionInfo?.lastBid
                                    ? auctionInfo?.lastBid / Math.pow(10, 18)
                                    : auctionInfo?.startBid / Math.pow(10, 18))
                                    ? "btn_brand_disabled btn_brand"
                                    : "btn_brand"
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                setPopUpShow(true);
                                setAddNFTModalOpen(true);
                            }}
                        >
                            Place a Bid
                        </button>
                    </Form>
                </div>
            </DefaultModal>
            <DefaultModal
                show={nftLoading}
                handleClose={() => setNftLoading(false)}
                type="loading"
            >
                <NFTCreateLoading message={loadingMessage} />
            </DefaultModal>
            <DefaultModal
                show={nftSuccess}
                handleClose={() => setNftSuccess(false)}
                type="success"
            >
                <NFTCreateSuccess
                    title={true}
                    titleInfo={successTitle}
                    hash={hash}
                />
            </DefaultModal>
            <WalletsPopup show={open} handleClose={() => setOpen(false)} />
            <DisConnect
                show={openDisconnectModal}
                handleClose={() => setOpenDisconnectModal(false)}         />
            <Modal
                className="buy__token__modal successModal wallets nftmodal-dialog"
                show={AddNFTModalOpen}
                onHide={() => setAddNFTModalOpen(false)}
            >
                <div className="buy__cpt__modal">
                    <div className="buy__cpt__header">
                        <div className="buy__cpt__header__tile">
                            {/* <h4>Create Collectibles</h4> */}
                        </div>
                        <div
                            className="buy__cpt__header__close"
                            onClick={() => setAddNFTModalOpen(false)}
                        >
                            <CgClose />
                        </div>
                    </div>
                    <div className="success__body create_nft_modal">
                        <div
                            className="wallet nftmodal newChange"
                            onClick={(e: any) => {
                                setpaymentMethod("MetaMask");
                                if (
                                    location.pathname.split("/")[1] === "sale"
                                ) {
                                    setpaymentMode("MetaMaskBuyItem");
                                    console.log(
                                        location.pathname.split("/")[1] ===
                                            "sale"
                                    );
                                } else {
                                    setpaymentMode("MetaMaskPlaceBid");
                                    console.log(
                                        location.pathname.split("/")[1] ===
                                            "sale"
                                    );
                                }
                                setAddNFTModalOpen(false);
                            }}
                        >
                            {/* <img src={CreateSingle}/> */}
                            <h5>Pay Using Metamask</h5>
                        </div>
                        <div className="wallet nftmodal newChange commingSoon">
                            {/* <div className="wallet nftmodal newChange" onClick={(e: any) => {
                setpaymentMethod("Stripe")
                if(location.pathname.split('/')[1] === 'sale') {
                  setpaymentMode("StripeBuyItem")
                } else {
                  setpaymentMode("StripePlaceBid")
                }
                setAddNFTModalOpen(false)
                }}> */}
                            {/* <img src={CreateMultiple}/> */}
                            {/* <StripeCheckout
                stripeKey="pk_test_51KF19SSJRtNPAiEbsxmQzPakuJ5CJ8cMkEA0ckUvyh1TNEPHTfmqoaMVI7g7ekEgYSaVXpeB0OJmUjTh0zAhp86X00xQAoW1qJ"
                token={stripePayment}
                name="Create NFT"
                amount={product.price * 100}
                shippingAddress
                billingAddress
              > */}
                            <h5 className="insidecommingSoon">
                                Pay Using Stripe
                            </h5>
                            <h5 className="insidecommingNow">Coming Soon</h5>
                            {/* </StripeCheckout> */}
                        </div>
                    </div>
                </div>
            </Modal>
            <ShareProfile
                artistInfoLink={window.location.href}
                show={openShareProfile}
                handleClose={() => setopenShareProfile(false)}
            />
            <DefaultErrorModal
                DefaultErrorModalShow={defaultErrorModal}
                DefaultErrorModalClose={() => setdefaultErrorModal(false)}
                DefaultErrorMessage={defaultErrorMessage}
            />
            <WalletNotFound
                show={MetamaskNotFound}
                handleClose={() => setMetamaskNotFound(false)}
            />
        </>
    );
};

export default withRouter(NFTById);
