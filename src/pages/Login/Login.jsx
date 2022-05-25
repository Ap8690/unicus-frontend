import "./login.scss";

import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";

import googleLogo from "../../assets/svgs/google.svg";
import facebookLogo from "../../assets/svgs/facebook.svg";
import twitterLogo from "../../assets/svgs/twitter.svg";

const Login = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <button className="btn large-btn login-btn">LOGIN</button>
            <div className="terms">
              By continuing you are agreeing to our{" "}
              <Link to={"/"}>Terms of use</Link>
            </div>
            <div className="new-user">
              New User? <Link to={"/register"}>Register here</Link>
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
