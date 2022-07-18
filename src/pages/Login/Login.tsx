import "./login.scss"

import { useState } from "react"
import { Link } from "react-router-dom"
import Input from "../../components/Input/Input"

import googleLogo from "../../assets/svgs/google.svg"
import facebookLogo from "../../assets/svgs/facebook.svg"
import twitterLogo from "../../assets/svgs/twitter.svg"
import { emailLogin } from "../../services/api/supplier"
import { getaccessToken, getUserInfo } from "../../Redux/Profile/actions"
import { useDispatch } from "react-redux"
import axios from "axios"
import Cookies from "js-cookie"

const Login = ({}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    async function handleLogin(e:any) {
        e.preventDefault()
        if (!email || !password) {
            setError("Fields should not be empty")
        } else {
            emailLogin(email, password)
                .then(async (res: any) => {
                    console.log("in")
                    dispatch(getaccessToken(res.data.accessToken) as any)
                    axios.defaults.headers.common["Authorization"] =
                        "Bearer" + res.data.accessToken
                    localStorage.setItem("accessToken", res.data.accessToken)
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(res.data.user)
                    )
                    Cookies.set("accessToken", res.data.accessToken, {
                        domain: "unicus.one",
                    })
                    Cookies.set("userInfo", JSON.stringify(res.data.user), {
                        domain: "unicus.one",
                    })

                    alert("LOGIN SUCCESS")
                })
                .catch((err) => {
                    console.log(err.response.data);
                    setError(err.response.data.msg)
                })
        }
    }
    return (
        <>
            <div className="login-page">
                <div className="login-wrapper">
                    <div className="blue-head">LOGIN</div>
                    <form>
                        <Input
                            title={"Email"}
                            state={email}
                            placeholder="Enter Email"
                            setState={setEmail}
                            email
                            required
                        />
                        <Input
                            title={"Password"}
                            state={password}
                            placeholder="Enter Password"
                            setState={setPassword}
                            password
                            forgetPass
                            required
                        />
                        <button type="submit" className="btn large-btn login-btn" onClick={handleLogin}>
                            LOGIN
                        </button>
                        <div className="terms">
                            By continuing you are agreeing to our{" "}
                            <Link to={"/"}>Terms of use</Link>
                        </div>
                        <div className="new-user">
                            New User?{" "}
                            <Link to={"/register"}>Register here</Link>
                        </div>
                    </form>
                    <div className="connect-using">or connect using</div>
                    <div className="social-login">
                        <button className="large-btn-outline">
                            <img src={googleLogo} alt="google login" />
                            <span>Google</span>
                        </button>
                        <button className="large-btn-outline">
                            <img src={facebookLogo} alt="google login" />
                            <span>Facebook</span>
                        </button>
                        <button className="large-btn-outline">
                            <img src={twitterLogo} alt="google login" />
                            <span>Twitter</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
