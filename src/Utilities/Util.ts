// export const getAddress = (address) => {
//   const add1 = address.substring(0, 2)
//   const add2 = address.substring(address.length - 4)
//   const finalAdd = `${add1}....${add2}`
//   return finalAdd
// }
import { toast } from 'react-toastify';
import { bscChain, ethChain, tronChain } from '../config';
import { IStore } from '../Models/Store';
import { tronWeb } from '../Redux/Blockchain/contracts';
import { AddNetworks, getNetwork } from '../Redux/Profile/actions';
import { store } from '../Redux/Store';
import web3 from '../web3';
// export const STOREFRONT_URL = "https://unicus-storefront-backend.herokuapp.com";

export const STOREFRONT_URL =
  process.env.REACT_APP_ENV === "local"
    ? "http://localhost:4000"
    : process.env.REACT_APP_ENV === "development"
    ? "https://unicus-storefront-backend-test.herokuapp.com"
    : process.env.REACT_APP_ENV === "staging"
    ? "https://backend.qa.unicu.one"
    : process.env.REACT_APP_ENV === "demo"
    ? "https://unicus-storefront-backend-demo.herokuapp.com"
    : "https://unicus-storefront-backend.herokuapp.com";
export const numberFormate = (number: number | string) => {
  return Number(number)?.toLocaleString(navigator.language, {
    minimumFractionDigits: 10,
  })
}
export const sslFix = (url: string) => {
  console.log("url", url);
  if (url) {
    const x = url.replace("http://", "https://");
    return x;
  }
};

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

export const connectWallet = async (network) => {
  let address;
  if(network.toString() === tronChain){

    // tronLink.request({ method: "tron_requestAccounts" });
    address = tronWeb.defaultAddress.base58
  }else{
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  address = accounts[0]
}
  return address;
}

export const getUserWallet = async (network) => {
  let accounts =[];
  if(network.toString() === tronChain){
    //@ts-ignore
      const address = window.tronWeb.defaultAddress.base58;
      accounts.push(address);
  }else{
    accounts = await web3.eth.getAccounts();
  }
  return accounts;
}

export const selectNetwork = (id: string) => {
  const type =
    id.toString() === bscChain
      ? "Binance"
      : id.toString() === ethChain
      ? "ETH"
      : id.toString() === tronChain
      ? "TRX"
      : "Matic";
  //@ts-ignore
  store.dispatch(AddNetworks(type));
  //@ts-ignore
  store.dispatch(getNetwork(id));
  toast(`Your are now on ${type} chain`, {
    className: "toast-custom",
  });
};
export interface WalletsPopupProps {
  show: boolean;
  handleClose: () => void;
}
export const defaultPrivacyText = `<p>Welcome to the User Privacy Policy of 1 (the “SaaS Platform”). This Privacy Policy is made available to you by Unicus One. (“Unicus”, “us”, “we”, or “our”). We highly value protection of your Personal Data (as defined below), and our teams are working tirelessly around the clock for its upkeep. As used herein, the term “User” or “You” (including any variant) refers to each individual user of Services, (the scope of “Services” as defined in our <a href="terms" target="_blank" rel="noopener">Terms of Use</a>), who enters into these Privacy Policy on such individual’s own behalf or any entity on behalf of which an individual enters into this Privacy Policy. This policy also aims to, provide you an insight on how we collect, use and share your personal and ancillary information in our access (“Personal Data”), and to help you in exercising the rights you have in relation to your Personal Data. Also, this Privacy Policy entails the categories of Personal Data that comes in our access from the usage of our Services.</p>
<p>By using any of the Services, you acknowledge, and agree with this Privacy Policy. In case you do not agree with our Privacy Policy it is highly advisable that you must refrain from any further usage of our Services. To understand how Unicus collects and uses your Personal Data, please read, understand and note the information.</p>
<p>Please Note that Unicus currently does not respond to ‘Do Not Track’ requests. Normally browsers these days come with a setting known as ‘Do Not Track’ which signals to the SaaS Platform that a User chooses or wishes not to be tracked.</p>
<p>In order to meet new requirements or for any other reason, that we deem fit and appropriate, Unicus may update this Privacy Policy from time to time. The user is entirely and solely responsible for staying updated with the new or amended Privacy Policy. We will notify the User of the changes made in the Privacy Policy by uploading the new and amended Privacy Policy at (<a href="https://www.Unicus.com/privacy-policy" target="_blank" rel="noopener">https://www.Unicus.com/privacy-policy</a>). The last date this Privacy Policy was updated is mentioned at the top of this page.</p>
<h3>I. Information Unicus gathers itself.</h3>
<p>When you sign up/in our Services or at any other prompted time, basic Personal Data that we may collect from you,includes but would not be limited to, your first, middle, last and maiden name, e-mail and mailing addresses, social media addresses, Contact numbers,addresses of Ethereum or other Blockchain or Crypto assets (“Assets”), login details (Username and password for the SaaS Platform), phone number, unique device ID number, or any other form of data that is ancillary to any of the data mentioned herein.</p>
<p>Note: Unicus <strong>DOES NOT</strong> collect the private key recovery phrase of your wallet in any manner or form, Unicus informs you to refrain from uploading or mentioning it anywhere.</p>
<h3>II. Information provided by the User.</h3>
<p>Unicus may gather all and/or any information that you knowingly opt to disclose, which may include but would not be limited to:</p>
<p>a. Two-factor authentication services or other allied services may require our collection of the User’s phone number. We may associate that phone number to your mobile device identification information.</p>
<p>b. When connecting to our Services through a service provider that uniquely identifies your mobile device, Unicus may receive this identification information and use it to extend or offer services.</p>
<p>c. Basic identification information and other ancillary information that is provided by the User at the account creation or any other registration process which is automatically prompted or opted for during the use of Services</p>
<p>d. The User may make a multitude of choices or preferences during the use of Services; safe search settings, notification settings, favourite widgets, or location settings. These preferences may then be attributed to the User or the devices that they are using, and are also allowed to be amended or changed by the User.</p>
<p>e. If the User is using the Services on mobile device, the unique identification number of the device and other ancillary information about the device.</p>
<p>f. If the User makes any correspondence with Unicus through email, all the contents of the email may be gathered for giving you a reply and quality assurance purposes.</p>
<p>g. Information about any purchase or transactions made on the Services. This includes payment information, such as your credit or debit card number and other card information; other account and authentication information; and billing, shipping, and contact details.</p>
<p>h. We also collect other types of Personal Data that you provide to us voluntarily, such as your operating system and version, product registration number, Ethereum address, and other requested information if you contact us via e-mail regarding support for the Services.</p>
<p>We may also collect Personal Data at other points in our Service that may or may not state that Personal Data is being collected.</p>
<h3>III. List of information Unicus automatically gathers.</h3>
<p>Unicus may be using tools or technologies that gather or collect information relating to your technological equipment, browsing actions and patterns on its own. This includes but is not limited to information collected by:</p>
<p>a. <strong>Servers.</strong> The servers used by Unicus (which may be hosted by a third- party service provider) are designed to make the Services offered by Unicus more interactive and useful for its Users. Servers gather data from you which comprises name of domain, browser kind, operating system Internet Protocol address type of wallet being used and/or the date and time of your visit.</p>
<p>b. <strong>Web Beacons.</strong> There are small files which are embedded in webpages, applications and emails (often referred to as, “pixel tags”, “clear GIFs”, “web bugs”, or “single-pixel gifs”). Web Beacons are sent for the purpose of gauging the User’s interest in the outgoing communication. This in turn helps Unicus to only send more relevant emails, or upload more relevant content and increase the effectiveness of Unicus's marketing.</p>
<p>c. <strong>Cookies.</strong> Unicus also uses cookies to provide a more interactive and tailored experience to its Users. Cookies are small pieces of information, which are sent for storage to the hard drive of the computer of the User (these stay on your computer until you delete them). This information is collected by Unicus to provide a more dedicated and tailored experience to all its Users.</p>
<p>d. <strong>Log Files.</strong> Information such as IP address, browser type, Internet service provider (“ISP”), referring/exit page(s), operating system, date/time stamp, and clickstream data, are all automatically collected and stored in log files by Unicus. This information also aids in providing the User with a more dedicated and tailored experience each time he uses the Services. These log files are also used to monitor trends, track movement of Users around the Services, put together demographic information about Unicus's User base as a whole and cater to the collective and/or larger needs of our Users.</p>
<p>e. <strong>Entity Tags.</strong> Entity Tags are HTTP code mechanisms that allow portions of SaaS Platform to be stored or "cached" within your browser and validates these caches when the SaaS Platform is opened, accelerating SaaS Platform performance since the web server does not need to send a full response if the content has not changed.</p>
<h3>IV. Children.</h3>
<p>Unicus does not intend to, and nor does it undertake to collect Personal Data belonging to children below the age of 13. If you are under the age of thirteen (13), please do not attempt to use or register for the Services or send any information about yourself to us, including your name, address, telephone number, a screen or user name that functions as online contact information, a persistent identifier that can be used to recognize a User over time and across different websites or online services, social security number, photograph, video, or audio file, where such file contains a child’s image or voice or email address, Geolocation information sufficient to identify street name and name of a city or town.</p>
<h3>V. Users from outside USA.</h3>
<p>The User(s) who are using the Services from outside the United States of America accept the use, collection and retention of Personal Data as set out in this Privacy Policy, by using the Services. Additionally, there may be less stringent privacy protection policies in effect in other countries from where you are using the services, and your Personal Data may be processed in countries other than where it was collected. By being a user of the Services, you consent to any such transfer of Personal Data.</p>
<h3>VI. Use of Personal Data.</h3>
<p>Personal Data that we collect is aimed to be used for your benefit. Accordingly, it may be used in a number of ways:</p>
<p>a. Identify you as a User in Unicus’s internal system or to fulfil any other purposes for which the user provides or we collect Personal Data.</p>
<p>b. Improve the quality of experience of the User’s interaction with Services and other.</p>
<p>c. Provide an interactive and comprehensive manner, to the User, of creation of a secure account on our Services.</p>
<p>d. Provide the requested services which intend to facilitate all sorts of transactions being conducted on our Services.</p>
<p>e. Keep the User updated, through e-mails, with the change in administrative, security and maintenance policies and other important or relevant information such as information about features, newsletters, offers, promotions, contests, and events, which might interest you.</p>
<p>f. Take part in effective communication with the User whenever required through multiple ways of communication, even for services provided by third parties.</p>
<p>g. To detect, prevent or investigate security breaches, fraud, and other unauthorized, prohibited or illegal activity.</p>
<p>h. For developing, testing and improving new products or services, by conducting surveys and research, and testing and troubleshooting new products and features.</p>
<p>i. For monitoring and analysing; trends, usage, and activities for more effective marketing or other advertising purposes</p>
<p>Unicus may also create anonymised or aggregated data based on the Personal Data collected from its users. However, this data does not contain personal information or contact details of the User such as their name, address, e-mail ID and more. Anonymised or aggregated data is collected to determine and examine the general usage patterns of our Services, which in turn enable us to enhance the content of our Services, improve the experience of our Users and tailoring our Services in general to fit the ever-changing and ever-growing needs of Users.</p>
<h3>VII. Retention of Personal Data.</h3>
<p>The Personal Data collected from the Users may be used for as long as it is necessary to fulfil the purposes outlined herein the Privacy Policy, especially for the period in which the User is using the Services. The process of closing your account with Unicus is laid out on the SaaS Platform. You can ask to close your account by contacting us as described above, and we will delete your Personal Data on request. We may, however, retain Personal Data for an additional period as is permitted or required under applicable laws, for legal, tax, or regulatory reasons, or for legitimate and lawful business purposes.</p>
<h3>VIII. Disclosure of Personal Data.</h3>
<p>Apart from sharing anonymized and aggregated data collected from Unicus’s Users, Unicus will not disclose the Personal Data collected from its Users in ways, other than that laid out below, and as already laid out in this Privacy Policy</p>
<p>a. For promotion and protection of lawful interests. If Unicus believes that disclosure will aid in protection of the rights, property, and safety, or prevention of crime, malicious activities, perpetuation of fraud and other illegal activities which involve or revolve around us, our Users, partners, affiliates, agents and others. Unicus may disclose Personal Data if it believes that such disclosure is necessary (a) in connection with any legal investigation; (b) to comply with relevant laws or to respond to subpoenas or warrants served on Unicus; (c) to protect or defend the rights or property of Unicus or its Users; and/or (d) to investigate or assist in preventing any violation or potential violation of the law, this Privacy Policy, or our Terms.</p>
<p>b. Unicus may share Personal Data with our affiliates, parent company, subsidiaries, joint ventures, or other entities which are under a common control with Unicus, in all such cases Unicus will require the recipients of Personal Data to honour this Privacy Policy.</p>
<p>c. Unicus may have to share its Personal Data when negotiating, or taking part in a merger, acquisition, sale transfer, divestiture, financing, or disclosure of all or a portion of Unicus's business or assets. If Unicus suffers from insolvency, bankruptcy, receivership, Personal Data may form part of the assets of Unicus. Nonetheless, Unicus will attempt to convince any recipient of Personal Data to honour this Privacy Policy in its spirit and form.</p>
<p>d. Unicus may share Personal Data with third party service providers to; provide our Users with services offered through our Services, conduct quality assurance testing, facilitate creation of or in support of any other resources or services made available through our Services.</p>
<p>e. Users may end up providing their Personal Data on the publicly accessible areas of our Services, in which case the User will be deemed to have consented for the disclosure of their Personal Information as this may result in the Personal Data of the User running into the access of any visitor of our Services and would not be immune from being collected, stored or misused.</p>
<p>f. Unicus may also disclose Personal Data to fulfil the purposes for which the User provides it, or for any other purpose disclosed by us when you provide it; or with your consent.</p>
<h3>IX. Accessibility of Personal Data.</h3>
<p>Unicus allows its Users to have access to,edit and delete their Personal Data for multiple reasons via the SaaS Platform. The Marketing or promotional notifications or related communication sent by us to our Users can also be opted out of at any time the User wishes to as provided on the SaaS Platform (follow the opt-out instructions). The User is asked for the communication of such marketing and promotional material at multiple points, thereby it is advised that the User should be vigilant when accepting the communication of any such material.</p>
<p>Users may also request for the deletion and/or collection of a copy of their Personal Data that Unicus has been collected, subject to this Privacy Policy. For deletion and collection process please visit the SaaS Platform.</p>
<h3>X. Third Party Services.</h3>
<p>Through the Services, Users may encounter links, content, advertising, or references by third parties leading to third-party services. The User is advised to be mindful that when they click and access any of these third-party services, any other entity might collect their Personal Data. Please be aware that we have absolutely no authority over any of these third-party services and cannot be accountable or responsible for what these third-party services might do with the Personal Data that they collect from our Users. The links to third party services are provided for our Users convenience and do not signify in any manner our endorsement of such third parties, their services or content.</p>
<p>NOTE: Unicus has no control or authority over third-party service providers and their respective privacy policies. Third-party service providers may have their own privacy policies available at their respective websites and platforms, which would be applicable to them. Users are strongly advised to visit those websites and platform to read, understand and note those privacy policies before using any of the services they provide.</p>
<h3>XI. Digital Wallets.</h3>
<p>Digital Wallets, especially, MetaMask or any other wallets, used by the user, provide us with information, including but not limited to, your Ethereum address and certain other information you choose to share with MetaMask or any other wallets. These third-party companies may supply us with Personal Data. We may add this to the information we have already collected from you via our Service in order to improve it. We do not collect Personal Data automatically, but we may tie the information.</p>
<h3>XII. KYC Vendors.</h3>
<p>Huge chunks of Personal Data may be collected by Know Your Customer (KYC) vendors. This collection of Personal Data is for the purposes of complying with the rules and regulations on Anti-money Laundering (AML) and combatting the financing of terrorism (CFT). KYC vendors do not collect this Personal Data without the consent of the user. Nonetheless, the user must be aware that Unicus has no control or authority over the collection, storing or security of Personal Data done by KYC vendors and any Personal Data provided by the User to the KYC vendor is subject to the Privacy Policy of the respective KYC vendor.</p>
<p>NOTE: We highly recommend that each User reads, understands, and notes the privacy policy of the KYC Vendor to which they opt to disclose their Personal Data.</p>
<h3>XIII. Options for Users.</h3>
<p>Users are provided with multiple choices for the use of Personal Data. Any User that wishes to not use or accept cookies from our Services for any reason may do so by changing the settings of their respective web browser to stop accepting cookies, or to prompt them before accepting. However, this might result in the User not being able to access or use the Services, partly or wholly. Users are advised to look up for the acceptance and rejection of cookies on the help menu provided in their respective web browsers and on the web, too.</p>
<p>Unicus, periodically sends its Users free of cost, opt-in features, newsletters, offers, promotions, contests, and events for marketing and awareness of its Services. At multiple steps during the use of Services, the User is requested or given the option, to choose whether they wish to receive any such communication(s) or not. The User may at any point opt-out of these communication(s) by contacting Unicus, even if they have signed up for them at an earlier stage. Nonetheless, some communication may still be sent to you which includes and is not limited to notices of update to Unicus's Privacy Policy or Terms.</p>
<h3>XIV. Protection of Data.</h3>
<p>All reasonable and practical steps are taken by Unicus to ensure the security of your Personal Data. Unicus proudly implements a plethora of safeguards – administrative, technological and physical – to preserve and enhance the security of your Personal Data. Unicus carefully analyses what types of information we need to provide our Services, and we try to limit the information we collect, to only what we really need. Also, wherever we get the chance to we anonymise your Personal Data. However, no means of electronic transmission of information can be one hundred percent secure, whereby we cannot guarantee the absolute security of your Personal Data.</p>
<h3>XV. Contacting Unicus.</h3>
<p>If there are any further questions, queries, concerns or complaints in relation to Unicus's Privacy Policy, please feel free to contact us at , you can contact us at support@Unicus.com.</p>
<p>NOTE: If you choose to visit the Services, your visit and/or any dispute over privacy is subject to this Privacy Policy and our Terms.</p>`;

export const METAMASK = "MetaMask";
export const TRONLINK = "TronLink";

export const UNICUS_STORE =
  process.env.REACT_APP_ENV === "local"
    ? "http://localhost:4000"
    : process.env.REACT_APP_ENV === "development"
    ? "marketplace.test.unicus.one"
    : process.env.REACT_APP_ENV === "staging"
    ? "marketplace.qa.unicus.one"
    : process.env.REACT_APP_ENV === "demo"
    ? "marketplace.test.unicus.one"
    : "marketplace.unicus.one";

export const getStoreName=()=> {
    const store = JSON.parse(localStorage.getItem("store")) as IStore;
    if (store && store.general.storeName != "") {
      return store.general.storeName;
    } else {
      return "Unicus";
    }
}


