import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import {
    Container,
    Nav,
    Image,
    Navbar,
    OverlayTrigger,
    Popover,
    Button,
} from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ReactComponent as BsWallet2 } from '../../Assets/react-icons/BsWallet2.svg'
import WalletsPopup from '../Modals/WalletsPopup/WalletsPopup'
import CreateNFTModal from '../Modals/CreateNFTModal/CreateNFTModal'
import DefaultErrorModal from '../Modals/DefaultErrorModal'
import { Avatar } from '@mui/material'
import { backendUrl, tronChain } from '../../config'

// Svgs
import Logo from '../../Assets/LandingPage/logo_white.png'
import eth from '../../Assets/ethereum.svg'
import Bnb from '../../Assets/bnb.svg'
import polygon from '../../Assets/polygon.svg'
import tron from "../../Assets/trx.svg"
import web3 from '../../web3'
import { useLocation, withRouter } from 'react-router-dom'

// redux imports
import { useSelector, useDispatch } from 'react-redux'
import DisConnect from '../Modals/DisConnect/DisConnect'
import {
    AddNetworks,
    getNetwork,
    getRegisterWallet,
    getUserInfo,
    getaccessToken,
    getuserAddress,
} from '../../Redux/Profile/actions'
import { getMetamaskProvider } from '../../Redux/Blockchain/contracts'
import RegisterWallet from '../Modals/Auth/RegisterWallet'
import ProfileDropDown from '../ProfileDropDown/ProfileDropDown'
import axios from 'axios'
import MaterialSwitch from '../Toggle/MaterialSwitch'
import { bscChain, ethChain, polygonChain } from '../../config'
import { toast } from 'react-toastify';
import { selectNetwork } from '../../Utilities/Util';

const Header = (props: any) => {
    // redux state
    const dispatch = useDispatch()
    const { networkID, provider, userInfo, registerWallet } = useSelector(
        (state: any) => state.profile
    )
    const { pathname } = useLocation()

    const [showScroll, setShowScroll] = useState(false)
    const [registeredWallet, setregisteredWallet] = useState(false)
    const [CreateNFTModalOpen, setCreateNFTModalOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [globalModalPopup, setglobalModalPopup] = useState(false)
    const [globalModal, setglobalModal] = useState([])
    const [openDisconnectModal, setOpenDisconnectModal] = useState(false)
    const [header, setHeader] = useState(true)
    const [defaultErrorModal, setdefaultErrorModal] = useState<any>(false)
    const [defaultErrorMessage, setdefaultErrorMessage] = useState<any>('')
    const [globalSearch, setglobalSearch] = useState<any>('')
    const [redirectUrl,setRedirectUrl] = useState("/")
    const [storeRegistration, setStoreRegistration] = useState(false);

    const handledefaultErrorModal = () => {
        setdefaultErrorModal(false)
    }

    useEffect(() => {
        window.addEventListener('click', (event: any) => {
            if (event.target.name !== 'title') {
                setglobalModalPopup(false)
            }
        })        
    }, [])

    const handleGlobalSearch = (e: any) => {
        e.preventDefault()
        props.history.push(`/search/${globalSearch}`)
        setglobalModalPopup(false)
    }

    const handleGlobalLink = (e: any, item: any) => {
        e.preventDefault()
        setglobalModalPopup(false)
        if (e.target.id == 'globalNft') {
            props.history.push(`/nft/${item.nftId}`)
        } else {
            props.history.push(`/artist/${item.name.trim()}`)
        }
    }

    const handleGlobalModal = async (e: any) => {
        e.preventDefault()
        setglobalSearch(e.target.value)
        if (e.target.value.length > 2) {
            await axios
                .get(
                    `${backendUrl}/users/globalSearch/${e.target.value}`
                )
                .then((res: any) => {
                    setglobalModalPopup(true)
                    var metadata: any = []
                    for (let i = 0; i < res.data.nfts.length; i++) {
                        metadata.push({
                            name: res.data.nfts[i].name,
                            nftId: res.data.nfts[i].nftId,
                            cloudinaryUrl: res.data.nfts[i].cloudinaryUrl,
                        })
                    }
                    for (let i = 0; i < res.data.users.length; i++) {
                        metadata.push({
                            name: res.data.users[i].username,
                            profileUrl: res.data.users[i].profileUrl,
                        })
                    }
                    setglobalModal(metadata)
                })
        } else {
            setglobalModalPopup(false)
        }
    }

    // header color
    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset >= 10) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 10) {
            setShowScroll(false)
        }
    }
    window.addEventListener('scroll', checkScrollTop)

    // wallet popup
    useEffect(() => {
        if (userInfo) {
            setOpen(false)
        }
    }, [userInfo])

    const [netID, setNetID] = useState<any>(null)

    

    const popover = (
      <Popover id="popover-basic" className="networks_modal">
        <div className="popover-header">Networks</div>
        <div className="popover-body gfg">
          <div
            className="net"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              selectNetwork(ethChain);
            }}
          >
            <img style={{ width: "70%" }} src={eth} alt="" />
          </div>
          <div
            className="net"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              selectNetwork(bscChain);
            }}
          >
            <img style={{ width: "70%" }} src={Bnb} alt="" />
          </div>
          <div
            className="net"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              selectNetwork(polygonChain);
            }}
          >
            <img style={{ width: "70%" }} src={polygon} alt="" />
          </div>
          <div
            className="net"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              selectNetwork(tronChain);
            }}
          >
            <img style={{ width: "70%" }} src={tron} alt="" />
          </div>
        </div>
      </Popover>
    );

    useEffect(() => {
        setregisteredWallet(registerWallet)
    }, [registerWallet])

    useEffect(() => {
        dispatch(getMetamaskProvider())
        const userInfo: any = localStorage.getItem('userInfo')
        const accessToken = localStorage.getItem('accessToken')
        
        if (userInfo) {
            dispatch(getUserInfo(JSON.parse(userInfo)))
        }
        if (accessToken) {
            dispatch(getaccessToken(accessToken))
        }
        web3.eth
            .getAccounts()
            .then((account) => {
                if (account[0]) {
                    dispatch(getuserAddress(account[0]))
                }
            })
            .catch(() => {
                console.log('Web3 Not Found!')
            })
        const get = localStorage.getItem('networkID')
        if (get == polygonChain) {
            dispatch(AddNetworks('polygon'))
        } else if (get == ethChain) {
            dispatch(AddNetworks('ethereum'))
        } else {
            dispatch(AddNetworks('bnb'))
        }
    }, [provider])

    useEffect(() => {
        setNetID(networkID)
    }, [networkID])

    useEffect(() => {
        if (
            pathname === '/info' ||
            pathname === '/login' ||
            pathname === '/about' ||
            pathname === '/community' ||
            pathname === '/token'
        ) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }, [pathname])

    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          fixed="top"
          className={
            showScroll
              ? "navbar navbar-expand-lg navbar-dark fixed-top navbar__bg"
              : "navbar navbar-expand-lg navbar-dark fixed-top"
          }
        >
          <Container fluid>
            <div className="network_select mode">
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                rootClose={true}
              >
                <div className="img_net">
                  <Image
                    src={
                      netID === polygonChain
                        ? polygon
                        : netID === bscChain
                        ? Bnb
                        : netID === ethChain
                        ? eth
                        : ""
                    }
                    alt=""
                  />
                </div>
              </OverlayTrigger>
            </div>
            <a
              href="https://unicus.one"
              style={{
                width: "150px",
                paddingTop: "0.3125rem",
                paddingBottom: "0.3125rem",
                marginRight: "1rem",
              }}
            >
              <Image
                src={Logo}
                alt=""
                className="d-inline-block align-top"
                style={{
                  filter: showScroll ? "invert(0)" : "",
                  width: "100%",
                  height: "100%",
                }}
              />
            </a>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto nav__ mx-auto">
                <div className="navbar__left">
                  <a href="https://unicus.one">
                    <span
                      style={{
                        color: showScroll ? "#fff" : "",
                      }}
                    >
                      Home
                    </span>
                  </a>
                  {/* <LinkContainer to="/"> */}
                  <Nav.Link as={NavLink} exact to="/">
                    <span
                      style={{
                        color: showScroll ? "#fff" : "",
                      }}
                    >
                      Explore
                    </span>
                  </Nav.Link>
                  {/* </LinkContainer> */}
                  {/* <LinkContainer to="/collections">
                    <Nav.Link>
                      <span
                        style={{
                          color: showScroll ? "#fff" : "",
                        }}
                      >
                        Collections
                      </span>
                    </Nav.Link>
                  </LinkContainer> */}
                  {header ? (
                    <>
                      {/* <LinkContainer to="/about"> */}
                      <Nav.Link as={NavLink} exact to="/about">
                        <span
                          style={{
                            color: showScroll ? "#fff" : "",
                          }}
                        >
                          About
                        </span>
                      </Nav.Link>
                      {/* </LinkContainer> */}
                      {/* <LinkContainer to="/community"> */}
                      <Nav.Link as={NavLink} exact to="/community">
                        <span
                          style={{
                            color: showScroll ? "#fff" : "",
                          }}
                        >
                          Community
                        </span>
                      </Nav.Link>
                      {/* </LinkContainer> */}
                      {/* <LinkContainer to="/token"> */}
                      <Nav.Link as={NavLink} exact to="/token">
                        <span
                          style={{
                            color: showScroll ? "#fff" : "",
                          }}
                        >
                          Unicus Token
                        </span>
                      </Nav.Link>
                      {/* </LinkContainer> */}
                    </>
                  ) : (
                    <>
                      {!userInfo ? (
                        <Nav.Link
                          onClick={() => {
                            setOpen(true);
                            setStoreRegistration(false);
                          }}
                        >
                          <span
                            style={{
                              color: showScroll ? "#fff" : "",
                            }}
                          >
                            Create NFT
                          </span>
                        </Nav.Link>
                      ) : (
                        <Nav.Link as={NavLink} exact to="/create-nft">
                          <span
                            style={{
                              color: showScroll ? "#fff" : "",
                            }}
                          >
                            Create NFT
                          </span>
                        </Nav.Link>
                      )}
                      {/* <LinkContainer to="/auctions"> */}
                      <Nav.Link as={NavLink} exact to="/auctions">
                        <span
                          style={{
                            color: showScroll ? "#fff" : "",
                          }}
                        >
                          Auctions
                        </span>
                      </Nav.Link>
                      {/* </LinkContainer> */}
                      {/* <LinkContainer to="/artists"> */}
                      <Nav.Link as={NavLink} exact to="/artists">
                        <span
                          style={{
                            color: showScroll ? "#fff" : "",
                          }}
                        >
                          Artists
                        </span>
                      </Nav.Link>
                      {/* </LinkContainer> */}
                    </>
                  )}
                  <form
                    style={{ position: "relative" }}
                    onSubmit={handleGlobalSearch}
                  >
                    <Form.Group style={{ paddingLeft: "15px" }}>
                      <Form.Control
                        style={{
                          paddingLeft: "33px",
                          backgroundColor: "inherit",
                          borderColor: showScroll
                            ? "#86b7fe"
                            : "var(--searchInputBorder)",
                          color: "var(--searchInputTextColor) !important",
                        }}
                        type="text"
                        placeholder="Search..."
                        className={
                          showScroll
                            ? "shadow-none form-control globalSearch form__scroll_down__white"
                            : "shadow-none form-control globalSearch form__Search__all__header"
                        }
                        name="title"
                        value={globalSearch}
                        autoComplete="off"
                        onChange={handleGlobalModal}
                      />
                    </Form.Group>
                    {globalModalPopup && (
                      <div
                        style={{ background: "#002885" }}
                        className="globalModal"
                      >
                        <div>
                          {globalModal
                            .sort((a: any, b: any) => {
                              return a.name
                                .toLowerCase()
                                .trim()
                                .indexOf(globalSearch.toLowerCase()) -
                                b.name
                                  .toLowerCase()
                                  .trim()
                                  .indexOf(globalSearch.toLowerCase()) ==
                                0
                                ? a.name.toLowerCase().trim() -
                                    b.name.toLowerCase().trim()
                                : a.name
                                    .toLowerCase()
                                    .trim()
                                    .indexOf(globalSearch.toLowerCase()) -
                                    b.name
                                      .toLowerCase()
                                      .trim()
                                      .indexOf(globalSearch.toLowerCase());
                            })
                            .slice(0, 8)
                            .map((item: any) => {
                              return (
                                <a
                                  id={
                                    item.cloudinaryUrl
                                      ? "globalNft"
                                      : "globalUser"
                                  }
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    margin: "0.4rem 0.5rem",
                                    paddingLeft: "0",
                                  }}
                                  onClick={(e) => {
                                    handleGlobalLink(e, item);
                                  }}
                                  href={
                                    item.cloudinaryUrl
                                      ? `/nft/${item.nftId}`
                                      : `/artist/${item.name.trim()}`
                                  }
                                >
                                  {!item.cloudinaryUrl &&
                                    (item.profileUrl ? (
                                      <img
                                        id="globalUser"
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                          objectFit: "fill",
                                          borderRadius: "100%",
                                        }}
                                        src={item.profileUrl}
                                      />
                                    ) : (
                                      <Avatar
                                        id="globalUser"
                                        sx={{
                                          width: 30,
                                          height: 30,
                                          color: "#fff",
                                          background: "#bebebe",
                                        }}
                                      ></Avatar>
                                    ))}
                                  {item.cloudinaryUrl && (
                                    <img
                                      id={
                                        item.cloudinaryUrl
                                          ? "globalNft"
                                          : "globalUser"
                                      }
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        objectFit: "fill",
                                        borderRadius: "100%",
                                      }}
                                      src={item.cloudinaryUrl}
                                    />
                                  )}
                                  <span
                                    id={
                                      item.cloudinaryUrl
                                        ? "globalNft"
                                        : "globalUser"
                                    }
                                  >
                                    {item.name}
                                  </span>
                                </a>
                              );
                            })}
                        </div>
                        {globalModal.length === 0 && (
                          <p
                            className="no_result_found__p"
                            style={{
                              marginBottom: "0px",
                            }}
                          >
                            No result found
                          </p>
                        )}
                      </div>
                    )}
                  </form>
                </div>
                <div className="navbar__right">
                  {/* <Toggle /> */}
                  {/* {!userInfo &&  */}
                  {props.store && Object.keys(props.store).length !== 0 ? (
                    <a
                      href={
                        props.store.domain && props.store.domain.length > 0
                          ? `https://${props.store.domain[0]}`
                          : ""
                      }
                      target="_blank"
                    >
                      <Button
                        variant="outline-light"
                        className="me-4"
                        style={{
                          color: showScroll ? "#fff" : "",
                        }}
                      >
                        Go to My Store
                      </Button>
                    </a>
                  ) : !userInfo ? (
                    <Nav.Link
                      onClick={() => {
                        setOpen(true);
                        setRedirectUrl("/create-store");
                        setStoreRegistration(true);
                      }}
                    >
                      <Button
                        variant="outline-light"
                        className="me-3"
                        style={{
                          color: showScroll ? "#fff" : "",
                        }}
                      >
                        Create Store
                      </Button>
                    </Nav.Link>
                  ) : (
                    <LinkContainer to="/create-store">
                      <Nav.Link>
                        <Button
                          variant="outline-light"
                          className="me-3"
                          style={{
                            color: showScroll ? "#fff" : "",
                          }}
                        >
                          Create Store
                        </Button>
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  <MaterialSwitch />
                  {/* } */}
                  <div className="network_select desk">
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      overlay={popover}
                      rootClose={true}
                    >
                      <div className="img_net">
                        <Image
                          src={
                            netID === polygonChain
                              ? polygon
                              : netID === bscChain
                              ? Bnb
                              : netID === ethChain
                              ? eth
                              : netID === tronChain
                              ? tron
                              : ""
                          }
                          alt=""
                        />
                      </div>
                    </OverlayTrigger>
                  </div>
                  {!userInfo ? (
                    <button
                      className="btn_brand btn_outlined"
                      onClick={() => {
                        setOpen(true);
                        setStoreRegistration(false);
                      }}
                    >
                      <BsWallet2 />
                      Connect
                    </button>
                  ) : (
                    <ProfileDropDown
                      setOpenDisconnectModal={setOpenDisconnectModal}
                      userName={
                        userInfo.username && userInfo.username.substring(0, 1)
                      }
                      general={undefined}
                    />
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <CreateNFTModal
          CreateNFTModalShow={CreateNFTModalOpen}
          CreateNFTModalHandleClose={() => setCreateNFTModalOpen(false)}
        />
        <WalletsPopup
          show={open}
          storeRegistration={storeRegistration}
          handleClose={() => {
            setOpen(false);
            setStoreRegistration(false);
          }}
          redirectUrl={redirectUrl}
        />
        <DisConnect
          show={openDisconnectModal}
          handleClose={() => setOpenDisconnectModal(false)}
        />
        <RegisterWallet
          RegisterWalletShow={registeredWallet}
          RegisterWalletClose={() => dispatch(getRegisterWallet(false))}
        />
        <DefaultErrorModal
          DefaultErrorModalShow={defaultErrorModal}
          DefaultErrorModalClose={() => handledefaultErrorModal()}
          DefaultErrorMessage={defaultErrorMessage}
        />
      </>
    );
}

export default withRouter(Header)