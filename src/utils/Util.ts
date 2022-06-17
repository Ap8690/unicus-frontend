import { store } from '../Redux/Store';
import web3 from '../web3';
import { toast } from 'react-toastify';
import { bscChain, ethChain, tronChain } from '../config';
import {  getNetwork } from '../Redux/Profile/actions';

// export const selectNetwork = (id: string) => {
//   const type =
//     id.toString() === bscChain
//       ? "Binance"
//       : id.toString() === ethChain
//       ? "ETH"
//       : id.toString() === tronChain
//       ? "TRX"
//       : "Matic";
//   //@ts-ignore
//   store.dispatch(AddNetworks(type));
//   //@ts-ignore
//   store.dispatch(getNetwork(id));
//   toast(`Your are now on ${type} chain`, {
//     className: "toast-custom",
//   });
// };