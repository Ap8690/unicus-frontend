import './register.scss'

import { useState } from 'react'
import Input from '../../components/Input/Input'
import { Link } from 'react-router-dom'


const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [conPassword, setConPassword] = useState('')
  const [password, setPassword] = useState('')
  return (
      <div className="register-page">
        <div className="register-wrapper">
        <div className="blue-head">REGISTER</div>
        <form>
            <Input
              title={"Username"}
              state={username}
              placeholder="Create Username"
              setState={setUsername}
              required
            />
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
              required
            />
            <Input
              title={"Confirm Password"}
              state={conPassword}
              placeholder="Confirm Password"
              setState={setConPassword}
              password
              required
            />
            {/* <Input
              title={"Wallet Key"}
              state={walletKey}
              placeholder="Enter Wallet Key"
              setState={setWalletKey}
            /> */}
            <button className="btn large-btn login-btn">REGISTER</button>
            <div className="terms">
              By continuing you are agreeing to our{" "}
              <Link to={"/"}>Terms of use</Link>
            </div>
            <div className="new-user">
              Already a User? <Link to={"/login"}>Login here</Link>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Register