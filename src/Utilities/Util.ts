// export const getAddress = (address) => {
//   const add1 = address.substring(0, 2)
//   const add2 = address.substring(address.length - 4)
//   const finalAdd = `${add1}....${add2}`
//   return finalAdd
// }
import web3 from '../web3';
export const STOREFRONT_URL = "https://unicus-storefront-backend-qa.herokuapp.com";

//export const STOREFRONT_URL = "http://localhost:4000";

export const numberFormate = (number: number | string) => {
  return Number(number)?.toLocaleString(navigator.language, {
    minimumFractionDigits: 10,
  })
}

export const createBonus = (
  totalAmount: number | string,
  bonusRatio: number
) => {
  const bonus = (Number(totalAmount) / 100) * bonusRatio
  const result = (Number(totalAmount) + bonus)?.toFixed(2)
  return result
}

export const formateDate = (milliSeconds : number) => {
  const newDate = new Date(milliSeconds * 1000)
  const [years, months, days, hours, minutes, seconds] = [
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    newDate.getDate(),
    newDate.getHours(),
    newDate.getMinutes(),
    newDate.getSeconds(),
  ]
  return [years, months, days, hours, minutes, seconds]
}

export const calculatePercentage = (totalAmount : number | string, percentage: number) => {
  const percentageAmount = (Number(percentage) / 100) * Number(totalAmount)
  const result = Number(totalAmount) - percentageAmount
  return result
}

export const priceConversion = (type: string, formate:string, amount: number | string, web3:any) => {
  if (type === 'fromWei') {
    const price = web3.utils.fromWei(amount.toString(), formate)
    return price
  }
  if (type === 'toWei') {
    const price = web3.utils.toWei(amount.toString(), formate)
    return price
  }
}

export const gasPrice = async (web3: any, number: number) => {
  const gasPrice = await web3.eth.getGasPrice()
  if (number) {
    const newGasPrice = web3.utils.toHex(Number(gasPrice * number)?.toFixed(0))
    return newGasPrice
  } else {
    const newGasPrice = web3.utils.toHex(Number(gasPrice * 4.5)?.toFixed(0))
    return newGasPrice
  }
}

export const getTheTimeDifference = (sec: number) => {
  const timeInSec = Number(sec) * 1000
  const currentTimeInSec = new Date().getTime()
  const difference = timeInSec - currentTimeInSec
  if (difference > 0) {
    return true
  } else {
    return false
  }
}

export const connectWallet = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts;
}

export const getUserWallet = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts;
}