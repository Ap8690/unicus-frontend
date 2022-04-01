import {useSelector} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import AddForm from '../Components/Nft/AddForm/AddForm'
import CreateNFTBanner from '../Components/Nft/CreateNFTBanner/CreateNFTBanner'
import { useEffect } from 'react'

const CreateNft = (props: any) => {
  const {userInfo} = useSelector((state: any) => state.profile)

  useEffect(() => {
    console.log(userInfo.length > 0 && localStorage.getItem("userInfo"))
    if (!(userInfo.length > 0) && !localStorage.getItem("userInfo")) {
      props.history.push('/market-place')
    }
  }, [userInfo, localStorage.getItem("userInfo")])
  
  return (
    <div>
      {/* <CreateNFTBanner title='Create new item' tagline='NFT' /> */}
      <AddForm />
    </div>
  )
}

export default withRouter(CreateNft)
