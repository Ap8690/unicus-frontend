import axios from 'axios';

export async function getFeaturedNft(number: number) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/nft/getFeaturedNfts/${number}`);
} 

export async function getTrendingNft(number: number, category: string) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/nft/getTrendingNfts/${number}/${category}`);
} 

export async function getAuctions(number:number, auctionType:string) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auction/getAuctions/${number}/${auctionType}`);
}