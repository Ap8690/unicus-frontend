import { Form, Image } from "react-bootstrap";
import { ReactComponent as BsFillHandbagFill } from "../../Assets/react-icons/BsFillHandbagFill.svg";
import { ReactComponent as BsFillTagFill } from "../../Assets/react-icons/BsFillTagFill.svg";
import { ReactComponent as AiFillEye } from "../../Assets/react-icons/AiFillEye.svg";
import DefaultErrorModal from "../Modals/DefaultErrorModal";
import { getUserInfo } from "../../Redux/Profile/actions";
import web3 from "../../web3";
import { backendUrl, tronChain } from "../../config";
// svg
// import image from '../../../Assets/nft/nft__img.jpg'
import { Link } from "react-router-dom";
// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import getContracts, {
  setNotification,
} from "../../Redux/Blockchain/contracts";
import NFTCreateLoading from "../Modals/NFTCreateLoading/NFTCreateLoading";
import NFTCreateSuccess from "../Modals/NFTCreateSuccess/NFTCreateSuccess";
import DefaultModal from "../Modals/DefaultModal/DefaultModal";
import axios from "axios";
import { userInfo } from "os";
import ViewModal from "../Modals/ViewModal/ViewModal";
import { bscChain, ethChain, polygonChain } from "../../config";
// import {getNftType} from '../../../Redux/Profile/actions'
import { getUserWallet, connectWallet, selectNetwork } from "../../Utilities/Util";
import WalletNotFound from "../Modals/MetaMaskNotFound/WalletNotFound";
import { createNFTAddressT } from "../../Redux/Blockchain/Tron/createNFT";
import { createNFTAddressP } from "../../Redux/Blockchain/Polygon/createNFT";
import { createNFTAddressB } from "../../Redux/Blockchain/Binance/createNFT";
import { createNFTAddressE } from "../../Redux/Blockchain/Ethereum/createNFT";

const NFTCollection = ({ item, transID }: any) => {
  const {
    walletType,
    userAddress,
    profileLoading,
    networkID,
    userInfo,
    accessToken,
  } = useSelector((state: any) => state.profile);
  // console.log(item)
  // redux state
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: 'dhmglymaz'
  //   }
  // });

  // // Use the image with public ID, 'docs/colored_pencils'.
  // const myImage = cld.image(`Unicus_${networkID}/`+item.id);
  // myImage.resize(thumbnail().width(350).gravity(focusOn(FocusOn.face())))

  const dispatch = useDispatch();
  const [popUpShow, setPopUpShow] = useState(false);
  const [type, setType] = useState<any>(null);
  const { web3, marketPlace, auction, createNFT, marketAddress, createAddress } = getContracts(
    walletType,
    networkID
  );
  const [price, setprice] = useState<any>("");
  const [product, setproduct] = useState<any>({});
  const [auctionPrice, setAuctionPrice] = useState<any>("");
  const [duration, setduration] = useState<any>(null);

  const [nftLoading, setNftLoading] = useState<boolean>(false);
  const [disableButton, setdisableButton] = useState<boolean>(false);
  const [MetamaskNotFound, setMetamaskNotFound] = useState<boolean>(false);
  const [defaultErrorModal, setdefaultErrorModal] = useState<boolean>(false);
  const [viewModal, setviewModal] = useState<boolean>(false);
  const [defaultErrorMessage, setdefaultErrorMessage] = useState<any>("");
  const [nftSuccess, setNftSuccess] = useState<boolean>(false);
  const [hash, setHash] = useState<any>("");
  const [contractAddress, setcontractAddress] = useState("0");
  const [successTitle, setSuccessTitle] = useState<string>("");
  const [projectLoaded, setprojectLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const getType = (num: number) => {
    setType(num);
    setPopUpShow(true);
  };

  const axiosConfig: any = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  const createSaleForNFT = async (e: any) => {
    console.log(item);
    
    e.preventDefault();
    selectNetwork(item.chain)
    try {
      setNftLoading(true);
      setLoadingMessage("Your Asset is being added for SALE.");
      setPopUpShow(false);
      console.log(item);
      const SellPrice = web3.utils.toWei(price, "ether");

      var token;
      if (item.chain.toString() === bscChain) {
        token = "BNB";
      } else if (item.chain.toString() === ethChain) {
        token = "ETH";
      } else if (item.chain.toString() === polygonChain) {
        token = "Matic";
      } else if (item.chain.toString() === tronChain) {
        token = "Trx ";
      }

      var data = {
        price: SellPrice,
        tokenId: item.tokenId,
        network: item.chain,
      };
      console.log(data);

      const body: any = {
        token,
        product,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      console.log(item.uploadedBy);

      if (item.uploadedBy === "61e559cb515235e5d16373fe") {
        const gasPrice = await axios
          .post("https://batchmint.herokuapp.com/forcreatesale", data)
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

            await axios
              .post("https://batchmint.herokuapp.com/createsale", data)
              .then((createSaleAPI: any) => {
                console.log(createSaleAPI.data);
                axios
                  .post(
                    `${backendUrl}/auction/sell`,
                    {
                      nftId: item._id,
                      sellerInfo: userInfo.username,
                      auctionId:
                        createSaleAPI.data.events.saleCreated.returnValues
                          .itemId,
                      startBid: SellPrice,
                      auctionType: "Sale",
                      auctionHash: "Null",
                      tokenId: item.tokenId,
                      chain: networkID,
                      name: item.name,
                      cloudinaryUrl: item.cloudinaryUrl,
                      sellerWallet: userAddress,
                      sellerId: userInfo && userInfo._id,
                    },
                    axiosConfig
                  )
                  .then((res) => {
                    console.log(res.data);
                  });

                setNftSuccess(true);
                setNftLoading(false);
                window.location.reload();
              })
              .catch((error) => {
                setNftLoading(false);
                console.log(error);
              });
          }
        });
      } else {
        if (!window.ethereum) {
          setNftLoading(false);
          setMetamaskNotFound(true);
          return null;
        }
        //@ts-expect-error
        if (networkID === tronChain && !window.tronWeb) {
          setNftLoading(false);
          setMetamaskNotFound(true);
          return null;
        }

        connectWallet(item.chain)
          .then(async () => {
            const accounts = await getUserWallet(item.chain);
            console.log("acc", accounts[0]);

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
                  setdefaultErrorMessage(
                    "Current Metamask account is not linked with this user"
                  );
                  setdefaultErrorModal(true);
                  throw "Wallet already in use";
                });
            }
            console.log(marketPlace, marketAddress);
            
            await createNFT.methods
              .approve(marketAddress, item.tokenId)
              .send({ from: accounts[0] });

            const res = await marketPlace.methods
              .createSale(createAddress, item.tokenId, SellPrice)
              .send({ from: accounts[0] });

            let obj = {
              nftId: item._id,
              sellerInfo: userInfo.username,
              auctionId: "",
              startBid: SellPrice,
              auctionType: "Sale",
              auctionHash: "",
              tokenId: item.tokenId,
              chain: item.chain,
              name: item.name,
              cloudinaryUrl: item.cloudinaryUrl,
              sellerWallet: userAddress,
              sellerId: userInfo && userInfo._id,
            };
            if (networkID === tronChain) {
              setNftLoading(true);
              setLoadingMessage(
                "Waiting for transaction confirmation.(It can take upto a min to confirm)"
              );
              const success = await setNotification(res);
              if (success) {
                obj.auctionId = res;
                obj.auctionHash = res
              } else {
                throw Error("Transaction Failed");
              }
            }
            else if(res?.transactionHash){
              obj.auctionId = res.events.saleCreated.returnValues.itemId;
              obj.auctionHash = res.transactionHash
            }
            await axios
              .post(`${backendUrl}/auction/sell`, obj, axiosConfig)
              .then((res) => {
                console.log(res.data);
              });
            setNftSuccess(true);
            setNftLoading(false);
            if (networkID === tronChain) {
              setHash(res);
            } else {
              setHash(res?.transactionHash);
            }
            setSuccessTitle("Sale Created Successfully");
            window.location.reload();
          })
          .catch((err) => {
            setNftLoading(false);
            setdefaultErrorMessage(err.message);
            setdefaultErrorModal(true);
            throw err;
          });
      }
    } catch (error) {
      setNftLoading(false);
      console.log(error);
    }
  };

  const createAuctionForNFT = async (e: any) => {
    e.preventDefault();
    try {
      console.log("---------->> CLICKED");
      setLoadingMessage("Your asset is being added for auctions.");
      setNftLoading(true);
      setPopUpShow(false);
      console.log(item);
      const AuctionPrice = web3.utils.toWei(auctionPrice, "ether");

      var token;
      if (networkID === bscChain) {
        token = "BNB";
      } else if (networkID === ethChain) {
        token = "ETH";
      } else if (networkID === polygonChain) {
        token = "Matic";
      } else if (networkID === tronChain) {
        token = "Trx ";
      }

      var data = {
        price: AuctionPrice,
        tokenId: item.tokenId,
        duration: 360,
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

      if (item.uploadedBy === "61e559cb515235e5d16373fe") {
        const gasPrice = await axios
          .post("https://batchmint.herokuapp.com/forcreateauction", data)
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
            console.log("STATUS ", status, item);

            axios
              .post("https://batchmint.herokuapp.com/createauction", data)
              .then(async (createAuctionAPI: any) => {
                console.log(createAuctionAPI.data);
                await axios
                  .post(
                    `${backendUrl}/auction/create`,
                    {
                      nftId: item._id,
                      sellerInfo: userAddress ? userAddress : userInfo.username,
                      auctionId:
                        createAuctionAPI.data.events.AuctionCreated.returnValues
                          .auctionId,
                      startBid: AuctionPrice,
                      auctionType: "Auction",
                      duration: 360,
                      auctionHash: "4754",
                      tokenId: item.tokenId,
                      chain: networkID,
                      name: item.name,
                      cloudinaryUrl: item.cloudinaryUrl,
                      sellerWallet: userAddress,
                      sellerId: userInfo && userInfo._id,
                    },
                    axiosConfig
                  )
                  .then((res) => {
                    console.log(res.data);
                  });
                await axios
                  .post(
                    `${backendUrl}/auction/start`,
                    {
                      nftId: item._id,
                      auctionId:
                        createAuctionAPI.data.events.AuctionCreated.returnValues
                          .auctionId,
                      auctionHash: "4754",
                    },
                    axiosConfig
                  )
                  .then((res) => {
                    console.log(res.data);
                  });
                setNftSuccess(true);
                setNftLoading(false);
                window.location.reload();
              })
              .catch((error) => {
                setNftLoading(false);
                console.log(error);
              });
          }
        });
      } else {
        if (!window.ethereum) {
          setNftLoading(false);
          setMetamaskNotFound(true);
          return null;
        }
        //@ts-expect-error
        if (networkID === tronChain && !window.tronWeb) {
          setNftLoading(false);
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
                  setdefaultErrorMessage(
                    "Current Metamask account is not linked with this user"
                  );
                  setdefaultErrorModal(true);
                  throw "Wallet already in use";
                });
            }
            const auctionparam = await createNFT.methods
              .approve(auction._address, item.tokenId)
              .send({ from: accounts[0] });
            const res = await auction.methods
              .createAuction(
                createNFT._address,
                item.tokenId,
                AuctionPrice,
                duration
              )
              .send({ from: accounts[0] });
            console.log("First");
            let obj = {
                    nftId: item._id,
                    sellerInfo: userInfo.username,
                    auctionId: "",
                    startBid: AuctionPrice,
                    auctionType: "Auction",
                    duration: duration,
                    auctionHash: "",
                    tokenId: item.tokenId,
                    chain: networkID,
                    name: item.name,
                    cloudinaryUrl: item.cloudinaryUrl,
                    sellerWallet: userAddress,
                    sellerId: userInfo && userInfo._id,
                  }
                   if (networkID === tronChain) {
                     setNftLoading(true);
                     setLoadingMessage(
                       "Waiting for transaction confirmation.(It can take upto a min to confirm)"
                     );
                     const success = await setNotification(res);
                     if (success) {
                       obj.auctionId = res;
                       obj.auctionHash = res;
                     } else {
                       throw Error("Transaction Failed");
                     }
                   }
                   else if (res?.transactionHash){
                     obj.auctionId =
                       res.events.AuctionCreated.returnValues.auctionId;
                       obj.auctionHash = res.transactionHash
                   }
              await axios
                .post(
                  `${backendUrl}/auction/create`,obj
                  ,
                  axiosConfig
                )
                .then((res) => {
                  console.log(res.data);
                });
              await axios
                .post(
                  `${backendUrl}/auction/start`,
                  obj,
                  axiosConfig
                )
                .then((res) => {
                  console.log(res.data);
                });
              setNftSuccess(true);
              setNftLoading(false);
              if (networkID === tronChain) {
                setHash(res);
              } else {
                setHash(res?.transactionHash);
              }
              setSuccessTitle("Auction Created Successfully");
              window.location.reload();
            
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
      setNftLoading(false);
      console.log(error);
    }
  };

  // end sale integration
  async function endSale(e: any) {
    e.preventDefault();
    try {
      setNftLoading(true);
      // setdisableButton(true)/
      setLoadingMessage("Ending Sale...");
      var token;
      if (networkID === bscChain) {
        token = "BNB";
      } else if (networkID === ethChain) {
        token = "ETH";
      } else if (networkID === polygonChain) {
        token = "Matic";
      }
      else if (networkID === tronChain){
        token = "Trx"
      }

      var data = {
        saleId: item.auctionId,
        tokenId: item.tokenId,
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

      if (false) {
        // const gasPrice = await axios
        //     .post('https://batchmint.herokuapp.com/forendsale', data)
        //     .then((response) => {
        //         console.log(response.data)
        //     })
        // const product = {
        //     name: token,
        //     price: gasPrice,
        //     productBy: 'UnicusOne',
        // }
        // setproduct(product)
        // return fetch(`https://stripeusnicus.herokuapp.com/payment`, {
        //     method: 'POST',
        //     headers,
        //     body: JSON.stringify(body),
        // }).then(async (stripeRes: any) => {
        //     const { status } = stripeRes
        //     if (status === 200) {
        //         console.log('STATUS ', status)
        //         axios
        //             .post(
        //                 'https://batchmint.herokuapp.com/endsale',
        //                 data
        //             )
        //             .then((createSaleAPI: any) => {
        //                 console.log(createSaleAPI.data)
        //                 axios
        //                     .post(
        //                         `${backendUrl}/auction/end`,
        //                         {
        //                             nftId: item.nftId,
        //                             auctionId: item._id,
        //                             userInfo: userAddress
        //                                 ? userAddress
        //                                 : userInfo.username,
        //                             endAuctionHash: 'endAuctionHash',
        //                         },
        //                         axiosConfig
        //                     )
        //                     .then((res) => {
        //                         console.log(res.data)
        //                     })
        //                 setNftSuccess(true)
        //                 // setdisableButton(false)
        //                 setNftLoading(false)
        //                 // props.history.push('/portfolio')
        //                 window.location.reload()
        //             })
        //             .catch((error) => {
        //                 setNftLoading(false)
        //                 // setdisableButton(false)
        //                 console.log(error)
        //             })
        //     }
        // })
      } else {
        if (!window.ethereum) {
          // setdisableButton(false)
          setNftLoading(false);
          setMetamaskNotFound(true);
          return null;
        }
        //@ts-expect-error
        if (networkID === tronChain && !window.tronWeb) {
          setNftLoading(false);
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
                  // setdisableButton(false)
                  setdefaultErrorMessage(
                    "Current Metamask account is not linked with this user"
                  );
                  setdefaultErrorModal(true);
                  throw "Wallet already in use";
                });
            }
            const res = await marketPlace.methods
              .EndSale(item.auctionId)
              .send({ from: accounts[0] });

              let obj = {
                    nftId: item.nftId,
                    auctionId: item._id,
                    userInfo: userInfo.username,
                    endAuctionHash: "",
                  }
              if(networkID === tronChain){
                 setNftLoading(true);
                 setLoadingMessage(
                   "Waiting for transaction confirmation.(It can take upto a min to confirm)"
                 );
                 const success = await setNotification(res);
                 if (success) {
                   obj.endAuctionHash = res;
                 } else {
                   throw Error("Transaction Failed");
                 }
              }
            else if (res?.transactionHash) {
              obj.endAuctionHash = res.transactionHash
            }
              axios
                .post(
                  `${backendUrl}/auction/end`,obj
                  ,
                  axiosConfig
                )
                .then((res) => {
                  console.log(res.data);
                });
              setNftLoading(false);
              setNftSuccess(true);
              if (networkID === tronChain) {
                setHash(res);
              } else {
                setHash(res?.transactionHash);
              }
              setSuccessTitle("NFT Sale Ended");
              // setdisableButton(false)
              // props.history.push('/portfolio')
              window.location.reload();
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
    }
  }

  async function endAuction(e: any) {
    setLoadingMessage("Ending Auction...");

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
      else if (networkID === tronChain){
        token = "Trx"
      }

      var data = {
        auctionId: item.auctionId,
        tokenId: item.tokenId,
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
              .get(`${backendUrl}/users/addWallet/${accounts[0]}`, axiosConfig)
              .then(async (res: any) => {
                console.log(res);
                dispatch(getUserInfo(res.data.user));
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
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
            .endAuction(item.auctionId)
            .send({ from: accounts[0] });
             let obj = {
               nftId: item.nftId,
               name: item.name,
               auctionId: item._id,
               userInfo: item.username,
               endAuctionHash: res.transactionHash,
             };
             if (networkID === tronChain) {
               setNftLoading(true);
               setLoadingMessage(
                 "Waiting for transaction confirmation.(It can take upto a min to confirm)"
               );
               const success = await setNotification(res);
               if (success) {
                 obj.endAuctionHash = res;
               } else {
                 throw Error("Transaction Failed");
               }
             } else if (res?.transactionHash) {
               obj.endAuctionHash = res.transactionHash;
             }
            axios
              .post(
                `${backendUrl}/auction/end`,
                obj,
                axiosConfig
              )
              .then((res) => {
                console.log(res.data);
              });
            setNftLoading(false);
            setdisableButton(false);
            setNftSuccess(true);
            if (networkID === tronChain) {
              setHash(res);
            } else {
              setHash(res?.transactionHash);
            }
            setSuccessTitle("NFT Auction Ended");
            window.location.reload();
          
        })
        .catch((walletError) => {
          setNftLoading(false);
          setdisableButton(false);
          setdefaultErrorMessage(walletError.message);
          setdefaultErrorModal(true);
          throw walletError;
        });
    } catch (error) {
      console.log(error);
      setNftLoading(false);
      setdisableButton(false);
    }
  }

  const handlePriceChange = (e: any) => {
    console.log(item);
    
    const reg = /^[0-9]*\.?[0-9]*$/;
    if (reg.test(e.target.value)) {
      setprice(e.target.value);
    }
  };

  const handlePriceChangeTwo = (e: any) => {
      console.log(item);
    const reg = /^[0-9]*\.?[0-9]*$/;
    if (reg.test(e.target.value)) {
      setAuctionPrice(e.target.value);
    }
  };

  useEffect(() => {
    if (item.chain.toString() == bscChain) {
      setcontractAddress(createNFTAddressB);
    } else if (item.chain.toString() == ethChain) {
      setcontractAddress(createNFTAddressE);
    } else if (item.chain.toString() == polygonChain) {
      setcontractAddress(createNFTAddressP);
    } else if (item.chain.toString() === tronChain) {
      setcontractAddress(createNFTAddressT);
    }
  }, []);

  const handleDurationChange = (e: any) => {
    setduration(Number(e.target.value) * 86400);
  };

  return (
    <>
      <div
        className={
          item.sellerInfo && projectLoaded
            ? "auction_card nft_card loading"
            : projectLoaded
            ? "nft_card loading"
            : "nft_card"
        }
      >
        <Link
          to={
            item.sellerInfo
              ? `/nft/${item.chain}/${contractAddress}/${item.tokenId}`
              : `/nft/${item.chain}/${contractAddress}/${item.tokenId}`
          }
        >
          <div className="nft_card_image_wrapper">
            {!projectLoaded &&
              item && item?.cloudinaryUrl.split(".").pop() !== "mp4" && (
                <div className="nft_card_image skeleton"></div>
              )}
            {
              <div
                className="nft_card_image"
                style={
                  projectLoaded && item.cloudinaryUrl.split(".").pop() !== "mp4"
                    ? {}
                    : { display: "none" }
                }
              >
                <img
                  src={item.cloudinaryUrl}
                  onLoad={() => setprojectLoaded(true)}
                  alt={item.name}
                />
              </div>
            }
            {item.cloudinaryUrl.split(".").pop() == "mp4" && (
              <div className="nft_card_image">
                <video width="100%" autoPlay loop>
                  <source src={item.cloudinaryUrl} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            marginTop: "-0.25rem",
          }}
        >
          <h6 title={item?.name}>{item?.name}</h6>
          <span
            className="hover"
            onClick={() => setviewModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <AiFillEye /> {item.views}
          </span>
        </div>
        {item.sellerInfo ? (
          item.auctionType === "Sale" ? (
            <div className="d-flex align-items-center justify-content-between gap-20">
              <button onClick={endSale} className="btn_brand btn_outlined">
                <BsFillHandbagFill />
                End Sale
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-between gap-20">
              <button className="btn_brand btn_outlined" onClick={endAuction}>
                <BsFillHandbagFill />
                End Auction
              </button>
            </div>
          )
        ) : (
          <div className="d-flex align-items-center justify-content-between gap-20">
            <button
              className="btn_brand btn_outlined"
              onClick={() => getType(0)}
            >
              <BsFillHandbagFill />
              Sell
            </button>
            <button
              className="btn_brand btn_outlined"
              onClick={() => getType(1)}
            >
              <BsFillTagFill />
              Auction
            </button>
          </div>
        )}
      </div>
      <ViewModal
        show={viewModal}
        handleClose={() => setviewModal(false)}
        nftId={item.sellerInfo ? item.nftId : item._id}
      />
      <DefaultModal
        title={type === 0 ? "Input Price" : "Input Price and Time"}
        show={popUpShow}
        handleClose={() => setPopUpShow(false)}
        type="success"
      >
        <div className="success__body">
          {type === 0 ? (
            <>
              <Form className="mt-5 input_price">
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="tel"
                    className="form-control shadow-none"
                    placeholder={`0.00 ${
                      item.chain.toString() === bscChain
                        ? "BNB"
                        : item.chain.toString() === ethChain
                        ? "ETH"
                        : item.chain.toString() === tronChain
                        ? "TRX"
                        : "Matic"
                    }`}
                    value={price}
                    onChange={(e) => handlePriceChange(e)}
                  />
                </Form.Group>
                <button
                  type="submit"
                  className="btn_brand mt-3"
                  onClick={createSaleForNFT}
                >
                  Submit
                </button>
              </Form>
            </>
          ) : type === 1 ? (
            <>
              <Form className="mt-5 input_price">
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="tel"
                    className="form-control shadow-none"
                    placeholder={`0.00 ${
                      item.chain.toString() === bscChain
                        ? "BNB"
                        : item.chain.toString() === ethChain
                        ? "ETH"
                        : item.chain.toString() === tronChain
                        ? "Trx"
                        : "Matic"
                    }`}
                    value={auctionPrice}
                    onChange={(e) => handlePriceChangeTwo(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <select
                    className="shadow-none form-control"
                    onChange={handleDurationChange}
                  >
                    <option hidden={true}>Select Duration</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                    <option value="6">6 Days</option>
                    <option value="7">7 Days</option>
                    <option value="8">8 Days</option>
                    <option value="9">9 Days</option>
                    <option value="10">10 Days</option>
                  </select>
                </Form.Group>
                <button
                  type="submit"
                  className="btn_brand"
                  onClick={createAuctionForNFT}
                >
                  Submit
                </button>
              </Form>
            </>
          ) : null}
        </div>
      </DefaultModal>
      <DefaultModal
        show={nftLoading}
        handleClose={() => setNftLoading(false)}
        type="loading"
      >
        <NFTCreateLoading
          message={
            type === 1 ? "Creating Auction for your Asset" : loadingMessage
          }
        />
      </DefaultModal>
      <DefaultModal
        show={nftSuccess}
        handleClose={() => setNftSuccess(false)}
        type="success"
      >
        <NFTCreateSuccess title={true} titleInfo={successTitle} hash={hash} />
      </DefaultModal>
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

export default NFTCollection;
