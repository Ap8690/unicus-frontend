import React, { useState, useEffect, useRef } from "react";
import "./pay-now.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// import { cashfreeSandbox } from "cashfree-dropjs";
import { cashfreeSandbox } from "cashfree-dropjs";
// API CALL
import {
  ticketLockedIncrement,
  ticketLockedDecrement,
  getMaticPrice,
} from "../../api/api-client.js";

import LoadingModal from "../../Modals/Loading Modal/LoadingModal.jsx";
import MessageModal from "../../Modals/Message Modal/MessageModal.jsx";
import MessageModal2 from "../../Modals/Message Modal/MessageModal2.jsx";

// redux
import { useDispatch } from "react-redux";
import TicketBuyLoading from "../../Loading/TicketBuyLoading.js";

const getArrayIndex = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id == id) {
      return arr[i];
    }
  }
  return -1;
};

const PayNow = ({ isLogin, setSignIn }) => {
  const ROYALTIES = 10;
  const [orderToken, setOrderToken] = useState("");
  const [renderComponent, setRenderComponent] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [showFullLoading, setShowFullLoading] = useState(false);
  const [payTab, setPayTab] = useState(2);
  const [currentPay, setCurrentPay] = useState("crypto");
  const [paymentMode, setPaymentMode] = useState("CRYPTO");

  const [payMessage, setPayMessage] = useState("Please Wait");
  const [showWalletAdded, setShowWalletAdded] = useState(false);

  const [isMetamaskConnected, setIsMetamaskConnected] = useState(
    localStorage.getItem("isMetamaskConnected")
  );

  const [metamaskWallet, setMetamaskWallet] = useState("");
  const [maticPrice, setMaticPrice] = useState(2.5);

  const [modalTitle, setModalTitle] = useState("Message");
  const [modalShow, setModalShow] = useState(false);

  const [messageModal, setMessageModal] = useState(false);
  const [messageModalDesc, setMessageModalDesc] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const [messageModal2, setMessageModal2] = useState(false);
  const [messageModalDesc2, setMessageModalDesc2] = useState(
    "You have successfully booked your ticket"
  );

  const selectedTickets = JSON.parse(localStorage.getItem("selectedTickets"))

  const connectToMetamask = async () => {
    if (!window.ethereum) {
      return window.alert("Please install metamask");
    }
    setShowFullLoading(true);
    // setModalShow(true);
    try {
      // const accounts = await web3.eth.getAccounts()
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // //console.log(accounts[0]);
      // setMetaWalletAddress(accounts[0])
      localStorage.setItem("METAMASK_WALLET", accounts[0]);

      if (accounts[0]) {
        localStorage.setItem("isMetamaskConnected", true);
        setIsMetamaskConnected(true);
        setMetamaskWallet(accounts[0]);

        // if wallet not mapped
        var walletMapped = true;
        var existWalletArr = [];
        existWalletArr.push(
          JSON.parse(localStorage.getItem("user-data")).wallets
        );
        for (let i = 0; i < existWalletArr.length; i++) {
          if (existWalletArr[i] !== accounts[0]) {
            walletMapped = false;
            break;
          }
        }
        if (!walletMapped) {
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/users/add-address`,
              {
                publicAddress: accounts[0],
              },
              {
                headers: {
                  Authorization: `${isLogin}`,
                },
              }
            )
            .then((res) => {
              // //console.log(res);
              setShowFullLoading(false);
              setShowWalletAdded(true);
            })
            .catch((err) => {
              // //console.log(err.response);
              setShowFullLoading(false);
            });
        } else {
          setShowFullLoading(false);
        }
      }
    } catch (err) {
      // //console.log(err.response);
      setShowFullLoading(false);
    }
    // setModalShow(false)
  };
  const eventData = useSelector((state) => state.eventReducer.getEvents);

  // ---------------------------------------------
  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // CRYPTO Payment
  var paySuccess = 0;

  let axiosConfig = {
    headers: {
      "Content-Type":
        "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    },
  };
  var tokenHash;
  var tokenUri;

  const getDropName = (ticketId, index) => {
    if (ticketId == "627ea2bd14a38824d673de34") {
      return "silver";
    } else if (ticketId == "627ea2bd14a38824d673de38") {
      return "gold";
    } else if (ticketId == "627ea2be14a38824d673de3c") {
      if (index == 0) {
        return "platinum";
      } else if (index == 1) {
        return "actor";
      } else if (index == 2) {
        return "jacquline";
      }
    } else if (ticketId == "627ea2be14a38824d673de40") {
      if (index == 0) {
        return "diamond";
      } else if (index == 1) {
        return "actor";
      } else if (index == 2) {
        return "jacquline";
      }
    }
  };
  const getDropUrl = (ticketId, index) => {
    if (ticketId == "627ea2bd14a38824d673de34") {
      return "https://res.cloudinary.com/dhmglymaz/video/upload/v1653140818/Blocktickets/fdh56tfi3u2ld2y3rdtn.mp4";
    } else if (ticketId == "627ea2bd14a38824d673de38") {
      return "https://res.cloudinary.com/dhmglymaz/video/upload/v1653140820/Blocktickets/ue4cz8uso3iddblnn5lk.mp4";
    } else if (ticketId == "627ea2be14a38824d673de3c") {
      if (index == 0) {
        return "https://res.cloudinary.com/dhmglymaz/video/upload/v1653140821/Blocktickets/ehtoapw6jeak7m9ufqcq.mp4";
      } else if (index == 1) {
        return "https://res.cloudinary.com/dhmglymaz/video/upload/v1653140819/Blocktickets/hwuwdsnxnycwiamg1qie.mp4";
      } else if (index == 2) {
        return "https://res.cloudinary.com/dhmglymaz/video/upload/v1653140819/Blocktickets/hzj3oizsikzm7h6ki6td.mp4";
      }
    } else if (ticketId == "627ea2be14a38824d673de40") {
      if (index == 0) {
        return "https://res.cloudinary.com/dhmglymaz/video/upload/v1653140820/Blocktickets/mygqba4obitho2ozjii9.mp4";
      } else if (index == 1) {
        return "https://res.cloudinary.com/dhmglymaz/video/upload/v1653140819/Blocktickets/hwuwdsnxnycwiamg1qie.mp4";
      } else if (index == 2) {
        return "https://res.cloudinary.com/dhmglymaz/video/upload/v1653140819/Blocktickets/hzj3oizsikzm7h6ki6td.mp4";
      }
    }
  };
  const dropNfts = async (event, ticketQuantity, ticketInfo) => {
    try {
      const dropNums = event.Minted.length - ticketQuantity;
      let j = 0;
      if (dropNums > 0) {
        for (let i = ticketQuantity; i < event.Minted.length; i++) {
          const nftDrop = {
            event: ticketInfo.Event,
            ticket: ticketInfo._id,
            dropTokenId: event.Minted[i].returnValues._NftId,
            dropName: getDropName(ticketInfo._id, j),
            dropUrl: getDropUrl(ticketInfo._id, j),
          };
          console.log("drop", nftDrop);
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/nftDrop/create`,
            nftDrop,
            {
              headers: {
                Authorization: `${isLogin}`,
                Accept: "application/json",
              },
            }
          );
          console.log("drop res", res);
          j++;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newcbs = (data) => {
    const selectedTickets = JSON.parse(localStorage.getItem("selectedTickets"));
    if (
      (data.order && data.order.status == "PAID") ||
      data.order.status == "ACTIVE"
    ) {
      //order is paid
      //verify order status by making an API call to your server
      // using data.order.orderId
      // console.log("orderId ", data.order.orderId);
      console.log("Success");
      setShowFullLoading(true);
      setPayMessage(
        "Your transaction is successful. Please wait while we book your ticket"
      );

      //if event is Vikrant Rona
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}/payment/cashfree-verify`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          orderId: data.order.orderId,
        }),
      };

      axios(config)
        .then(function (response) {
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/ticket/book-ticket`,
              JSON.stringify({
                orderId: data.order.orderId,
              }),
              {
                headers: {
                  Authorization: `Bearer ${isLogin}`,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((val) => {
              setRenderComponent(false);
              setShowFullLoading(false);
              setMessageModal2(true);
              setMessageModalDesc2(
                "You have successfully booked your NFT Ticket. Once minted your NFT ticket will be visible in My Tickets section."
              );
              // navigate("/my-tickets");
            })
            .catch((err) => {
              console.log("err", err);
              const decreaseCounter = ticketLockedDecrement(
                selectedTickets,
                isLogin
              );
              setRenderComponent(false);
              setShowFullLoading(false);
              setMessageModal(true);
              // setMessageModalDesc(
              //   "Tickets not Booked. Contact support for refund details"
              // );
              setMessageModalDesc(
                "You have successfully booked your NFT Ticket. Once minted your NFT ticket will be visible in My Tickets section."
              );
            });
        })
        .catch(function (error) {
          console.log("err", error);

          const decreaseCounter = ticketLockedDecrement(
            selectedTickets,
            isLogin
          );
          setRenderComponent(false);
          setShowFullLoading(false);
          setMessageModal(true);
          setMessageModalDesc(
            "Tickets not Booked. Contact support for refund details"
          );
        });
    } else {
      //order is still active and payment has failed
      console.log("failure");
      setRenderComponent(false);
      setMessageModal(true);
      setShowFullLoading(false);
      setMessageModalDesc("Payment Error 110: Payment Failed...");
    }
  };
  const cbf = async (data) => {
    // alert("order is paid. Call api to verify");
    const selectedTickets = JSON.parse(localStorage.getItem("selectedTickets"));
    console.log("error", data);
    setRenderComponent(false);
    setMessageModal(true);
    setShowFullLoading(false);
    setMessageModalDesc("Payment Error 109: Payment Failed...");
    const decreaseCounter = await ticketLockedDecrement(
      selectedTickets,
      isLogin
    );
  };
  const renderDropin = (resultOrderToken) => {
    if (resultOrderToken === "") {
      alert("Order Token is empty");
      return;
    }
    setRenderComponent(true);

    let parent = document.getElementById("drop_in_container");
    parent.innerHTML = "";
    let cashfree = new cashfreeSandbox.Cashfree();

    console.log("before Initialisation");
    // console.log(resultOrderToken);
    cashfree.initialiseDropin(parent, {
      orderToken: resultOrderToken,
      onSuccess: newcbs,
      onFailure: cbf,
      components: ["order-details", "card", "netbanking", "upi"],
      style: {
        //to be replaced by the desired values
        backgroundColor: "#ffffff",
        color: "#f15a22",
        fontFamily: "Lato",
        fontSize: "14px",
        errorColor: "#ff0000",
        theme: "light", //(or dark)
      },
    });
    console.log("after Initialisation");
  };
  const createPay = async () => {
    const selectedTickets = JSON.parse(localStorage.getItem("selectedTickets"));
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
    };
    setPayMessage(
      "Your special NFT Ticket & Airdrops is being minted on Blockchain"
    );
    setShowFullLoading(true);
    // let phone = JSON.parse(localStorage.getItem("user-data")).phoneNumber;
    if (!userPhoneNumber && userPhoneNumber.length !== 10) {
      setMessageModal(true);
      setShowFullLoading(false);
      setMessageModalDesc("Please enter your 10 digit phone number");
      return;
    }
    const userInfo = {
      email: JSON.parse(localStorage.getItem("user-data")).email,
      userId: JSON.parse(localStorage.getItem("user-data")).userId,
      phone: userPhoneNumber,
    };
    const increaseCounter = await ticketLockedIncrement(
      selectedTickets,
      isLogin
    );
    if (increaseCounter && increaseCounter.status === 200) {
      await axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/payment/cashfree-get-order-token`,
              {
                selectedTickets,
                type: "event",
                userInfo,
                network: 56,
              },
              headers
            )
            .then((response) => {
              const { status } = response;
              // console.log("RES", response);
              setShowFullLoading(false);
              return response.data;
            })
            .then((result) => {
              // console.log("result ", result);
              setOrderToken(result.orderToken);
              renderDropin(result.orderToken);
            })
            .catch(async (err) => {
              console.log(err);
              const decreaseCounter = await ticketLockedDecrement(
                selectedTickets,
                isLogin
              );
              setShowFullLoading(false);
              setMessageModal(true);
              setMessageModalDesc(
                "ERR CGOT:Your Ticket was not booked some error occurred, Please Try again"
              );
            });
      
    } else {
      const decreaseCounter = await ticketLockedDecrement(
        selectedTickets,
        isLogin
      );
      setShowFullLoading(false);
      setMessageModal(true);
      setMessageModalDesc(
        "ERR INC_C:Your Ticket was not booked some error occurred, Please Try again"
      );
    }
  };

  const payToggleTab = (index) => {
    setPayTab(index);
  };
  const cancelPayment = async () => {
    navigate(`/event-details/${eventData.data.Event._id}`);
    window.location.reload();
  };
  useEffect(() => {
    document.body.scrollTop = 0;
    getMaticPrice().then((res) => {
      setMaticPrice(res.data["matic-network"].usd);
    });
    if (
      JSON.parse(localStorage.getItem("user-data")) &&
      JSON.parse(localStorage.getItem("user-data")).phoneNumber
    ) {
      setUserPhoneNumber(
        JSON.parse(localStorage.getItem("user-data")).phoneNumber
      );
    }
  }, []);

  useEffect(() => {
    if (payTab === 1) {
      setCurrentPay("crypto");
      setPaymentMode("CRYPTO");
    } else if (payTab === 2) {
      setCurrentPay("fiat");
      setPaymentMode("CARD");
    }
  }, [payTab]);

  useEffect(() => {
    setIsMetamaskConnected(localStorage.getItem("isMetamaskConnected"));
  }, [localStorage.getItem("isMetamaskConnected"), metamaskWallet]);
  let payRef = useRef();
  useEffect(() => {
    let handler = async (event) => {
      if (payRef && payRef.current && !payRef.current.contains(event.target)) {
        setRenderComponent(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div className="pay-now-details">
      <LoadingModal visibility={modalShow} title={modalTitle} />
      <MessageModal
        show={messageModal}
        setShow={setMessageModal}
        title={modalTitle}
        message={messageModalDesc}
      />
      <MessageModal2
        show={messageModal2}
        setShow={setMessageModal2}
        title="Payment Success"
        message={messageModalDesc2}
      />
      <div
        className={
          renderComponent ? "dropin-container-show" : "dropin-container-hide"
        }
      >
        <div
          ref={payRef}
          className="dropin-parent"
          id="drop_in_container"
          style={{ minHeight: "600px" }}
        >
          Your component will come here
        </div>
      </div>
      {showFullLoading && <TicketBuyLoading message={payMessage} />}
      {/* <div
                className="wd-header-image"
                style={{ background: `url(${wdHeaderImage})` }}
            >
                <h2>A new frontier to events & entertainment</h2>
                <h3 className="wd-h3">Pay through your linked wallet</h3>
            </div> */}
      {/* <div className="pay-now-confirm">
                {currentPay === "crypto" ? (
                    <h2>Pay through Crypto Currency</h2>
                ) : (
                    <h2>Pay through Credit/Debit Card </h2>
                )}
            </div> */}
      <div className="pay-now-container">
        <div className="pay-now-tabs">
          {/* <div
                        className={
                            payTab === 1
                                ? "pay-crypto active-tab"
                                : "pay-crypto"
                        }
                        onClick={() => payToggleTab(1)}
                    >
                        Crypto
                    </div> */}
          <div
            className={
              payTab === 2 ? "pay-fiat active-tab" : "pay-fiat active-tab"
            }
            onClick={() => payToggleTab(2)}
            style={{ width: "100%" }}
          >
            Payment Details
          </div>
        </div>

        <div className="pay-now-tab-content">
          <div
            className={
              payTab === 1 ? "content-crypto active-content" : "content-crypto"
            }
          >
            {/* Your wallet address */}
            <div className="p-wallet-address-items-input">
              <label htmlFor="wallet-address">
                Your Wallet Address
                <span className="wallet-asterik">*</span>
              </label>
              <input
                type="text"
                placeholder={
                  metamaskWallet && metamaskWallet.length > 0
                    ? metamaskWallet
                    : "Connect your wallet"
                }
                id="wallet-address"
                name="wallet-address"
                disabled={true}
              />
              <i className="far fa-copy copy-icon"></i>
            </div>

            <div className="p-wallet-address-items-get-token">
              {/* <div className="get-token">
                <label htmlFor="wallet-get">
                  Pay
                  <span className="wallet-asterik">*</span>
                </label>
                <input
                  type="number"
                  placeholder={
                    (ticketBooking.quantity * ticketInfo.price) / maticPrice
                  }
                  id="wallet-get"
                  name="wallet-get"
                  disabled={true}
                />
              </div>  */}

              <div className="get-token-coin">
                <label htmlFor="wallet-token">
                  Currency
                  <span className="wallet-asterik">*</span>
                </label>
                <input
                  type="text"
                  placeholder="MATIC"
                  id="wallet-token"
                  name="wallet-token"
                  disabled={true}
                />
              </div>
            </div>

            {/* <div className="warn-info">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Proin sed erat velit. Duis facilisis, tortor
                            id pharetra maximus, diam justo suscipit lorem, eget
                            molestie tellus arcu ac tellus. Aenean convallis
                            commodo eros, at egestas.
                        </div> */}

            {isLogin ? (
              metamaskWallet && metamaskWallet.length > 0 ? (
                <div>
                  <button
                    className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                    // onClick={() => TicketBookAfterPayment()}
                  >
                    Pay Now
                  </button>
                  <button
                    className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                    onClick={() => cancelPayment()}
                  >
                    Cancel
                  </button>
                  {showWalletAdded && (
                    <p className="wallet_added">
                      *Wallet added successfully to your account...
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                    onClick={() => connectToMetamask()}
                  >
                    Connect Wallet
                  </button>
                  <button
                    className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                    onClick={() => cancelPayment()}
                  >
                    Cancel
                  </button>
                </div>
              )
            ) : (
              <div>
                <button
                  className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                  onClick={() => setSignIn(true)}
                >
                  Login to Buy Ticket
                </button>
                <button
                  className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                  onClick={() => cancelPayment()}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* fiat currency tab */}
          <div
            className={
              payTab === 2 ? "content-crypto active-content" : "content-crypto"
            }
          >
            {/* Your wallet address */}

            <div className="fiat-pay">
              <form>
                <div className="fiat-pay-input-a">
                  <label htmlFor="ename">
                    Event name<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="ename"
                    name="ename"
                    placeholder={eventData.data.Event.eventTitle}
                    disabled={true}
                  />
                </div>
                <div className="fiat-pay-input-a">
                  <label htmlFor="tickname">
                    Ticket Name & Number<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="tickname"
                    name="tickname"
                    placeholder={selectedTickets[0].ticketName}
                    disabled={true}
                  />
                </div>
                <div className="fiat-pay-input-a" style={{ width: "100%" }}>
                  <label htmlFor="cardname">
                    Quantity<span>*</span>
                  </label>
                  <input
                    type="number"
                    className="special-placeholder"
                    id="cardname"
                    name="cardname"
                    placeholder={selectedTickets
                      .map((item) => item.quantity)
                      .reduce((prev, next) => prev + next)}
                    disabled={true}
                  />
                </div>
                <div className="fiat-pay-input-a">
                  <label htmlFor="cardname">
                    Phone Number(10 digit)<span>*</span>
                  </label>
                  <input
                    type="tel"
                    className="special-placeholder"
                    id="cardname"
                    name="cardname"
                    placeholder="Please enter you phone number"
                    disabled={false}
                    onChange={(e) => setUserPhoneNumber(e.target.value)}
                    value={userPhoneNumber}
                  />
                </div>
              </form>
            </div>
            {/* {isLogin ? ( */}
            <div>
              {/* <div className="warn-info">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Proin sed erat velit. Duis
                                facilisis, tortor id pharetra maximus, diam
                                justo suscipit lorem, eget molestie tellus arcu
                                ac tellus. Aenean convallis commodo eros, at
                                egestas.
                            </div> */}

              {/* fiat currency tab */}

              <div
                className={
                  payTab === 2
                    ? "content-crypto active-content"
                    : "content-crypto"
                }
              >
                {/* multiplied by 100 for rupees */}
                {isLogin ? (
                  <button
                    className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                    style={{
                      width: "100%",
                      margin: "20px 0 5px 0",
                    }}
                    onClick={createPay}
                  >
                    Buy Ticket ₹{" "}
                    {(selectedTickets
                      .map((item) => (item.quantity * item.price))
                      .reduce((prev, next) => (prev + next).toFixed(2)) * 1.02).toFixed(2)}
                  </button>
                ) : (
                  <div>
                    <button
                      className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                      onClick={() => setSignIn(true)}
                    >
                      Login to Buy Ticket
                    </button>
                    <button
                      className="w-full bg-BlueButton text-white text-lg font-medium py-3 mb-2 rounded-md"
                      onClick={() => cancelPayment()}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <WalletBack /> */}

        {/* </div> */}
      </div>
    </div>
  );
};

export default PayNow;
