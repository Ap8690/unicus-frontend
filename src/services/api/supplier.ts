import axios from 'axios';
import {backendUrl} from "../../config";

export async function getFeaturedNft(number: number) {
  return await axios.get(`${backendUrl}/nft/getFeaturedNfts/${number}`);
} 

export async function getTrendingNft(number: number, category: string) {
  return await axios.get(`${backendUrl}/nft/getTrendingNfts/${number}/${category}`);
} 

export async function getAuctions(number:number, auctionType:string) {
  return await axios.get(`${backendUrl}/auction/getAuctions/${number}/${auctionType}`);
}

export async function getMarketplaceNfts(skip:any,networkID:number,sortBy:string) {
  return await axios
          .get(
            `${backendUrl}/auction/getAllExplore/${skip}/${networkID}/${encodeURIComponent(JSON.stringify(sortBy))}`
          )
}

export async function authLogin(email:string, password: string) {
  return await axios.post(`${backendUrl}/auth/login`, {
    email: email,
    password: password,
  })
}