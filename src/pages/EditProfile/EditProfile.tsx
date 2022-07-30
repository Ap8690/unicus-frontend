// import userImg from "../../images/Unsplash-Avatars_0004s_0007_nathan-dumlao-Ju--S80ezyU-unsplash.png";
// import verifiedUserImg from "../../images/verified-user.svg";
// import twitterImg from '../../images/twitter1.svg'
// import facebookImg from '../../images/facebook1.svg'
// import instagramImg from '../../images/instagram1.svg'
// import { useEffect, useState } from "react";
// import TextInput from "../../components/TextInput/TextInput";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import WalletAdd from "../../components/Wallet/WalletAdd";
// import axios from "axios";
// import {toast} from 'react-toastify'
// import {useNavigate} from 'react-router-dom'
// import { BASE_URL } from "../../config";

// const EditProfile = (props) => {
//   const [active, setActive] = useState("general");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [user, setUser]= useState()
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const getUserProfile = async () => {
//     const res = await axios.get(
//       `${BASE_URL}/users/getMyProfile`,
//       {
//         headers: {
//           Authorization:"Bearer " + `${props.isLogin}`,
//           "Content-Type":
//             "multipart/form-data;boundary=<calculated when request is sent>",
//         },
//       }
//     );
//     setUser(res.data.data.user);
//     console.log(res.data.data.user)
//   };
//   useEffect(() => {
//     getUserProfile()
//    }, [])
  
//   return (
//     <div className="mt-[70px] px-24 pb-12 screen7:pt-0 screen18:px-12 screen3:px-8">
//       <div className="bg-white w-full pt-12">
//         <div className="flex gap-8 screen11:flex-col">
//           <div className="relative felx justify-center items-center screen11:flex-col screen11:ml-0">
//             <div className="w-32 h-32 relative rounded-full overflow-hidden m-auto">
//               <img src={user && user.profilePic? user.profilePic: userImg} alt="user" className="h-full w-full object-cover" />
//             </div>
//             <img
//               src={verifiedUserImg}
//               alt="verified user"
//               className="w-8 relative left-[35%] top-[-1.3rem] m-auto screen11:left-auto"
//             />
//           </div>
//           <div className="flex justify-between w-full screen11:flex-col screen11:justify-center screen11:items-center">
//             <div className="flex flex-col items-start gap-2 relative mt-4">
//               <span className="text-lg w-full screen11:text-center font-semibold">
//                 {user
//                   ? user.username
//                     ? user.username
//                     : user.email
//                   : "Loading..."}
//               </span>
//               <span className="text-DarkColor w-full screen11:text-center">
//                 {user && user.wallets.length > 0
//                   ? user.wallets[0]
//                   : "No wallet added"}{" "}
//               </span>
//               {/* <span className="text-DarkColor w-full screen11:text-center">
//                 {user ? `Joined. ${user.createdAt}` : ""}
//               </span> */}
//               <div className="mt-2 flex gap-4 items-center">
//                 <img
//                   src={twitterImg}
//                   alt="socials"
//                   className="h-6 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
//                 />
//                 <img
//                   src={facebookImg}
//                   alt="socials"
//                   className="h-8 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
//                 />
//                 <img
//                   src={instagramImg}
//                   alt="socials"
//                   className="h-8 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
//                 />
//               </div>
//             </div>
//             <div className="my-4 mr-16 screen11:mr-0 d-none">
//               <button className="bg-GreyButton p-2 text-sm font-semibold rounded-md mr-4">
//                 Edit Profile
//               </button>
//               <button
//                 onClick={handleClick}
//                 className="bg-GreyButton p-2 text-sm font-semibold rounded-md d-none"
//               >
//                 ...
//               </button>
//               <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 MenuListProps={{
//                   "aria-labelledby": "basic-button",
//                 }}
//               >
//                 <MenuItem onClick={handleClose}>
//                   <span
//                     onClick={() => setActive("general")}
//                     className={`font-semibold cursor-pointer ${
//                       active === "general"
//                         ? "text-black underline"
//                         : "text-DarkColor"
//                     }`}
//                   >
//                     General
//                   </span>
//                 </MenuItem>
//                 {/* <MenuItem onClick={handleClose}>
//                   <span
//                     onClick={() => setActive("editProfile")}
//                     className={`font-semibold cursor-pointer ${
//                       active === "editProfile"
//                         ? "text-black underline"
//                         : "text-DarkColor"
//                     }`}
//                   >
//                     Edit Profile
//                   </span>
//                 </MenuItem> */}
//                 <MenuItem onClick={handleClose}>
//                   <span
//                     onClick={() => setActive("password")}
//                     className={`font-semibold cursor-pointer ${
//                       active === "password"
//                         ? "text-black underline"
//                         : "text-DarkColor"
//                     }`}
//                   >
//                     Password
//                   </span>
//                 </MenuItem>
//                 <MenuItem onClick={handleClose}>
//                   <span
//                     onClick={() => setActive("social")}
//                     className={`font-semibold cursor-pointer ${
//                       active === "social"
//                         ? "text-black underline"
//                         : "text-DarkColor"
//                     }`}
//                   >
//                     Add Social Links
//                   </span>
//                 </MenuItem>
//                 <MenuItem onClick={handleClose}>
//                   <span
//                     onClick={() => setActive("walletAddress")}
//                     className={`font-semibold cursor-pointer ${
//                       active === "walletAddress"
//                         ? "text-black underline"
//                         : "text-DarkColor"
//                     }`}
//                   >
//                     Wallet Address
//                   </span>
//                 </MenuItem>
//               </Menu>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex gap-12 mt-8">
//         <div className="flex flex-col gap-4 screen7:hidden">
//           <span
//             onClick={() => setActive("general")}
//             className={`font-semibold cursor-pointer ${
//               active === "general" ? "text-black underline" : "text-DarkColor"
//             }`}
//           >
//             General
//           </span>
//           {/* <span
//             onClick={() => setActive("editProfile")}
//             className={`font-semibold cursor-pointer ${
//               active === "editProfile"
//                 ? "text-black underline"
//                 : "text-DarkColor"
//             }`}
//           >
//             Edit Profile
//           </span> */}
//           <span
//             onClick={() => setActive("password")}
//             className={`font-semibold cursor-pointer ${
//               active === "password" ? "text-black underline" : "text-DarkColor"
//             }`}
//           >
//             Password
//           </span>
//           <span
//             onClick={() => setActive("social")}
//             className={`font-semibold cursor-pointer ${
//               active === "social" ? "text-black underline" : "text-DarkColor"
//             }`}
//           >
//             Add Social Links
//           </span>
//           <span
//             onClick={() => setActive("walletAddress")}
//             className={`font-semibold cursor-pointer ${
//               active === "walletAddress"
//                 ? "text-black underline"
//                 : "text-DarkColor"
//             }`}
//           >
//             WalletAddress
//           </span>
//         </div>
//         <div className="w-full">
//           {active === "general" && (
//             <GeneralSettings isLogin={props.isLogin} resUser={user} />
//           )}
//           {active === "password" && <ChangePassword isLogin={props.isLogin} />}
//           {active === "social" && <AddSocials isLogin={props.isLogin} />}
//           {active === "walletAddress" && <WalletAdd isLogin={props.isLogin} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// const GeneralSettings = (isLogin, resUser) => {
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [bio, setBio] = useState("");
//   let navigate = useNavigate();
//   const getUserProfile = async () => {
//     setUserName(resUser.username)
//     setEmail(resUser.email)
//     setBio(resUser.bio)
//   };
//   const updateProfile = async () => {
//     try {
//       const res = await updateDetails({ username, bio }, isLogin);
//       toast.success("Profile updated Successfully", {
//         position: "bottom-center",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(err);
//     }
//   };
//   useEffect(() => {
//     getUserProfile()
//   }, [resUser])
  

//   return (
//     <div className="flex flex-col gap-4">
//       <TextInput
//         title="Username"
//         placeholder="Enter your name"
//         isPass={false}
//         value={username}
//         setValue={setUserName}
//       />
//       <TextInput
//         title="Email"
//         placeholder="Enter your Email"
//         isPass={false}
//         value={email}
//         setValue={setEmail}
//         disabled={true}
//       />
//       <TextInput
//         title="Bio"
//         placeholder="Enter your Bio"
//         multi
//         isPass={false}
//         value={bio}
//         setValue={setBio}
//       />

//       <div className="flex justify-between">
//         <button onClick={() => navigate('/dashboard')} className="bg-GreyButton text-blue rounded-md px-3 py-2">
//           Cancel
//         </button>
//         <button
//           className="bg-BlueButton text-white rounded-md px-3 py-2"
//           onClick={updateProfile}
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// const ChangePassword = (isLogin) => {
//   const [oldPass, setOldPass] = useState("");
//   const [newPass, setNewPass] = useState("");
//   const [confirmPass, setConfirmPass] = useState("");

//   const changePass = async () => {
//     try {
//       const res = await changePassword(oldPass, newPass, isLogin);
//       toast.success("Password changed Successfully", {
//         position: "bottom-center",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(err);
//     }
//   };
//   return (
//     <div className="flex flex-col gap-4">
//       <TextInput
//         title="Current Password"
//         placeholder="Enter current password"
//         isPass={true}
//         value={oldPass}
//         setValue={setOldPass}
//       />
//       <TextInput
//         title="New Password"
//         placeholder="Enter new password"
//         isPass={true}
//         value={newPass}
//         setValue={setNewPass}
//       />
//       <TextInput
//         title="Confirm Password"
//         placeholder="Confirm new password"
//         isPass={true}
//         value={confirmPass}
//         setValue={setConfirmPass}
//       />
//       <div className="flex justify-between">
//         <button className="bg-GreyButton text-blue rounded-md px-3 py-2">
//           Cancel
//         </button>
//         <button
//           className="bg-BlueButton text-white rounded-md px-3 py-2"
//           onClick={changePass}
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// const AddSocials = (isLogin, resUser) => {
//   const [twitter, setTwitter] = useState('')
//   const [facebook, setFacebook] = useState('')
//   const [instagram, setInstagram] = useState('')

//  const getUserProfile = async () => {
//    setTwitter(resUser.twitterLink);
//    setFacebook(resUser.facebookLink);
//    setInstagram(resUser.instagramLink);
//  };
//   const updateProfile = async () => {
//       try {
//         const res = await updateDetails({ facebookLink: facebook, twitterLink: twitter, instagramLink:instagram }, isLogin);
//         toast.success("Socials Updated Successfully", {
//           position: "bottom-center",
//         });
//       } catch (err) {
//         console.log(err);
//         toast.error(err);
//       }
//     };

//     useEffect(() => {
//       getUserProfile();
//     }, [resUser]);

//   return     <div className="flex flex-col gap-4">
//   <TextInput
//     title="Add Twitter"
//     placeholder="Enter Twitter link"
//     value={twitter}
//     setValue={setTwitter}
//   />
//   <TextInput
//     title="Add Facebook"
//     placeholder="Enter facebook link"
//     value={facebook}
//     setValue={setFacebook}
//   />
//   <TextInput
//     title="Add Instagram"
//     placeholder="Enter Instagram link"
//     value={instagram}
//     setValue={setInstagram}
//   />
//   <div className="flex justify-between">
//     <button className="bg-GreyButton text-blue rounded-md px-3 py-2">
//       Cancel
//     </button>
//     <button
//       className="bg-BlueButton text-white rounded-md px-3 py-2" onClick={()=>updateProfile()}
//     >
//       Save Changes
//     </button>
//   </div>
// </div>
// }

// export default EditProfile;
export {}
