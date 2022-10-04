import "./login.scss"

import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Input from "../../components/Input/Input"

import { Helmet } from "react-helmet";
import { emailLogin } from "../../services/api/supplier"
import { getaccessToken, getUserInfo } from "../../Redux/Profile/actions"
import { useDispatch } from "react-redux"
import axios from "axios"
import Cookies from "js-cookie"
import { ACCESS_TOKEN } from "../../utils/constants"
import toast from 'react-hot-toast';

import { cookieDomain } from "../../config"

const Login = ({}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e:any) {
        e.preventDefault()
        if (!email || !password) {
            setError("Fields should not be empty")
        } else {
            emailLogin(email, password)
                .then(async (res: any) => {
                    Cookies.set(ACCESS_TOKEN, res.data.accessToken, {
                      domain: cookieDomain,
                      expires: 30,
                    });
                    Cookies.set("userInfo", JSON.stringify(res.data.user), {
                      domain: cookieDomain,
                      expires: 30,
                    });
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(res.data.user)
                    )
                    // Cookies.set("accessToken", res.data.accessToken, {
                    //     domain: "unicus.one",
                    // })
                    // Cookies.set("userInfo", JSON.stringify(res.data.user), {
                    //     domain: "unicus.one",
                    // })
                    toast.success("Login successful")
                    navigate("/home", {replace:true})
                })
                .catch((err) => {
                    console.log(err.response.data);
                    toast.error(err.response.data.msg)
                })
        }
    }
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>UnicusOne - Login</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div className="login-page mt-[40px]">
                <div className="login-wrapper">
                    <div className="blue-head">LOGIN</div>
                    <form onSubmit={handleLogin}>
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
                        <button type="submit" className="btn large-btn login-btn">
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
                    {/* <div className="social-login">
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
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Login;
