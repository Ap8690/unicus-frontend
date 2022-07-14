import axios from 'axios';
import { BASE_URL } from "../../config";

export async function getFeaturedNft(number: number) {
  return await axios.get(`${BASE_URL}/nft/getFeaturedNfts/${number}`);
} 

export async function getTrendingNft(number: number, category: string) {
  return await axios.get(
    `${BASE_URL}/nft/getTrendingNfts/${number}/${category}`
  );
} 

export async function getAuctions(number:number, auctionType:string) {
  return await axios.get(
    `${BASE_URL}/auction/getAuctions/${number}/${auctionType}`
  );
}

export async function getMarketplaceNfts(skip:any,networkID:number,sortBy:string) {
  return await axios.get(
    `${BASE_URL}/auction/getAllExplore/${skip}/${networkID}/${encodeURIComponent(
      JSON.stringify(sortBy)
    )}`
  );
}

export async function uploadToPinata(formData: FormData, axiosConfig:any) {
  return await axios.post(
    `${BASE_URL}/nft/upload-pinata`,
    formData,
    axiosConfig
  );
}

export async function createNft(nftObj: {}, axiosConfig: any) {
  return await axios.post(`${BASE_URL}/nft/create`, nftObj, axiosConfig);
}



export async function emailLogin(email:string, password: string) {
  return await axios.post(`${BASE_URL}/auth/login`, {
    email: email,
    password: password,
  });
}

export async function walletLogin(walletAddress: string) {
  return await axios.post(`${BASE_URL}/auth/login`, {
    walletAddress
  });
}

export async function addWalletAdd(userWallet: string, axiosConfig: any) {
  return await axios.get(
    `${BASE_URL}/users/addWallet/${userWallet}`,
    axiosConfig
  );

}