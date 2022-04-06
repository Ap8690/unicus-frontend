import {useSelector} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import CreateNFTBanner from '../Components/Nft/CreateNFTBanner/CreateNFTBanner'
import Dashboard from '../Components/Portfolio/Dashboard/Dashboard'
import { useEffect } from 'react'

const Portfolio = (props: any) => {
  const {userInfo} = useSelector((state: any) => state.profile)

  useEffect(() => {
    console.log(userInfo.length > 0 && localStorage.getItem("userInfo"))
    if (!(userInfo.length > 0) && !localStorage.getItem("userInfo")) {
      props.history.push('/')
    }
  }, [userInfo, localStorage.getItem("userInfo")])
  
  return (
    <div>
      {/* <CreateNFTBanner title='Portfolio' tagline='My Collections' /> */}
      <Dashboard />
    </div>
  )
}

export default withRouter(Portfolio)
