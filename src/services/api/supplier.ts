import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config";
import { IAdvance } from "../../models/Advance";
import { IAppearance } from "../../models/Appearance";
import { IGeneral } from "../../models/General";
import { ACCESS_TOKEN } from "../../utils/constants";
import { getChainSymbol, userInfo ,getChainId, getUserInfo} from "../../utils/utils";

export const getAccessToken =()=>{
  return Cookies.get(ACCESS_TOKEN);
}

export const axiosConfig = () => {
  const accessToken = getAccessToken()
  return {headers: {
    Authorization: `Bearer ${accessToken}`,
  }}
};
export const getUserId = () => {
  return JSON.parse(Cookies.get('userInfo'))._id
}

export async function getFeaturedNft(number: number,chain: any) {
  return await axios.get(`${BASE_URL}/nft/getFeaturedNfts/${number}/${getChainId(chain)}`,
  axiosConfig());
}

export async function getTrendingNft(number: number, category: string,chain: any) {
  return await axios.get(
    `${BASE_URL}/nft/getTrendingNfts/${number}/${category}/${getChainId(chain)}`,
    axiosConfig()
  );
}

export async function getAuctions(number: number, auctionType: string,chain: any) {
  return await axios.get(
    `${BASE_URL}/auction/getAuctions/${number}/${auctionType}/${getChainId(chain)}`,
    axiosConfig()
  );
}

export async function getMarketplaceNfts(
  skip: any,
  networkID: any,
  sortBy: string,
  currentFilter: string
) {
  return await axios.get(
    `${BASE_URL}/auction/getAllExplore/${skip}/${networkID}/${encodeURIComponent(
      JSON.stringify(sortBy)
    )}/${currentFilter}`,
    axiosConfig()
  );
}

export async function getNftById(chain: any, contractAddress: any, nftId: any) {
  return await axios.get(
    `${BASE_URL}/nft/getNftById/${chain}/${contractAddress}/${nftId}`,
    axiosConfig()
  );
}

export async function getNftByUserId(skip:any) {
  return await axios.get(
    `${BASE_URL}/nft/getNFTByUserId/${skip}`,
    axiosConfig()
  );
}

export async function uploadToPinata(formData: FormData) {
  return await axios.post(
    `${BASE_URL}/nft/upload-pinata`,
    formData,
    axiosConfig()
  );
}

export async function createNft(nftObj: {}) {
  return await axios.post(`${BASE_URL}/nft/create`, nftObj, axiosConfig());
}

export async function createSellApi(createObj: any) {
  return await axios.post(`${BASE_URL}/auction/sell`, createObj, axiosConfig());
}

export async function createAuctionApi(createObj:any){
  return await axios
    .post(`${BASE_URL}/auction/create`, createObj, axiosConfig())
    
}

export async function buyItemApi(
  auction: any,
  hash: string,
  username: string,
  userId: string
) {
  return await axios.post(
    `${BASE_URL}/auction/buy`,
    {
      nftId: auction.nftId,
      name: auction.name,
      auctionId: auction._id,
      owner: userId,
      endAuctionHash: hash,
      userInfo: username,
    },
    axiosConfig()
  );
}

export async function placeBidApi(
  auction: any,
  hash: string,
  bid: any,
  username: string,
  email: string
) {
  return await axios.post(
    `${BASE_URL}/auction/placeBid`,
    {
      nftId: auction.nftId,
      auctionId: auction._id,
      bidValue: bid,
      bidCurrency: getChainSymbol(auction.chain),
      bidHash: hash,
      username,
      email,
      bidSuccess: true,
      bidObj: {},
    },
    axiosConfig()
  );
}

export async function endSaleApi(
  auction: any,
  hash: string,
  username: string,
) {
  return await axios.post(
    `${BASE_URL}/auction/end`,
    {
      nftId: auction.nftId,
      auctionId: auction._id,
      userInfo: username,
      endAuctionHash: hash,
    },
    axiosConfig()
  );
}

export async function cancelAuctionApi(
  auction: any,
  hash: string,
  username: string,
) {
  return await axios.post(
    `${BASE_URL}/auction/cancel`,
    {
      nftId: auction.nftId,
      auctionId: auction._id,
      userInfo: username,
      transactionHash: hash,
    },
    axiosConfig()
  );
}

export async function createStore(generals:any){
  let userData = getUserInfo()
  return await axios.post(
    `${BASE_URL}/store/create`,
    { store: generals, user: userData },
    axiosConfig()
  );
}

export async function getStoreApi() {
  return await axios.get(`${BASE_URL}/store`);
}

export async function saveGenerals(generals:IGeneral){
  return await axios.post(`${BASE_URL}/general`, generals, axiosConfig());
}
export async function saveAdvance(advance: IAdvance) {
  return await axios.post(`${BASE_URL}/advance`, advance, axiosConfig());
}
export async function saveAppearance(appearance: IAppearance) {
  return await axios.post(`${BASE_URL}/appearance`, appearance, axiosConfig());
}
export async function saveAdvanceInfo(advances:any) {
  return await axios.post(`${BASE_URL}/advance`, advances, axiosConfig());
}
export async function getStoreByUser(){
  return await axios.get(`${BASE_URL}/store/getStoreByUser`, axiosConfig());
}

export async function emailRegister(email: string, password: string, username:string) {
  return await axios.post(`${BASE_URL}/auth/register`, {
    email: email,
    password: password,
    username
  },axiosConfig());
}

export async function emailLogin(email: string, password: string) {
  return await axios.post(`${BASE_URL}/auth/login`, {
    email: email,
    password: password,
  },axiosConfig());
}

// export async function walletLogin(walletAddress: string) {
//   return await axios.post(`${BASE_URL}/auth/login`, {
//     walletAddress,
//   });
// }

export async function walletLogin(walletAddress: string,token: string,walletNetwork: string,message: string) {
  return await axios.post(`${BASE_URL}/auth/wallet-connect`, {
    walletAddress,
    token,
    walletNetwork,
    message
  });
}

export async function verifyEmailApi(token: string, email: string) {
  return await axios.get(
    `${BASE_URL}/auth/verify-email?token=${
      token
    }&email=${email}`
  );
}
export async function resetPasswordApi(email: string, password: string, token:string) {
  return await axios.post(`${BASE_URL}/auth/reset-password`, {
    token,
    email: email,
    password: password,
  },axiosConfig());
}

export async function changePasswordApi(
  email: string,
  password: string,
) {
  return await axios.post(`${BASE_URL}/auth/change-password`, {
    email: email,
    password: password,
  },axiosConfig());
}

export async function addWalletAdd(userWallet: string) {
  return await axios.get(
    `${BASE_URL}/users/addWallet/${userWallet}`,
    axiosConfig()
  );
}

export async function updateProfile(username: string, bio: string) {
  return await axios.post(
    `${BASE_URL}/users/update/updateUser`,
    {
      // displayname: updateUserProfile.displayName,
      username: username,
      bio: bio,
    },
    axiosConfig()
  );
}

export async function updateProfileSocial(instagram, facebook, twitter, discord, linkedIn) {
  return await axios.post(
    `${BASE_URL}/users/update/updateUser`,
    {
      instagram: instagram,
      facebook: facebook,
      twitter: twitter,
      discord: discord,
      linkedIn: linkedIn,
    },
    axiosConfig()
  );
}
export async function updateProfilePic(url:string) {
  const _id = getUserId()
  return await axios.post(
    `${BASE_URL}/users/update/profilePicture`,
    {
      userId: _id,
      cloudinaryUrl: url,
    },
    axiosConfig()
  );
}
export async function updateProfileBg(url: string) {
  const _id = getUserId()
  return await axios.post(
    `${BASE_URL}/users/update/backgroundPicture`,
    {
      userId: _id,
      cloudinaryUrl: url,
    },
    axiosConfig()
  );
}
export async function getCollectionsByUser() {
  return await axios.post(
    `${BASE_URL}/nft/getCollectionsByUser`,
    axiosConfig()
  );
}
export async function getNftByCollection(collection: string) {
  return await axios.get(
    `${BASE_URL}/nft/getNftByCollections/${collection}`,
    axiosConfig()
  );
}