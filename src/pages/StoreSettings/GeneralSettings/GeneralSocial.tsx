import { useState } from "react"
import Input from "../../../components/Input/Input"
import { IGeneral } from "../../../models/General";

const GeneralSocial = (general: IGeneral) => {
  const [facebook, setFacebook] = useState("");
  const [behance, setBehance] = useState("");
  const [instagram, setInstagram] = useState("");
  const [dribble, setDribble] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [discord, setDiscord] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [youtube, setYoutube] = useState("");
  const [stack, setStack] = useState("");
  const [telegram, setTelegram] = useState("");
  const [reddit, setReddit] = useState("");
  const [pinterest, setPinterest] = useState("");
  const socials = [
    {
      name: "Facebook",
      value: facebook,
      setValue: setFacebook,
    },
    {
      name: "Behance",
      value: behance,
      setValue: setBehance,
    },
    {
      name: "Instagram",
      value: instagram,
      setValue: setInstagram,
    },
    {
      name: "Dribbble",
      value: dribble,
      setValue: setDribble,
    },
    {
      name: "Twitter",
      value: twitter,
      setValue: setTwitter,
    },
    {
      name: "LinkedIn",
      value: linkedIn,
      setValue: setLinkedIn,
    },
    {
      name: "Discord",
      value: discord,
      setValue: setDiscord,
    },
    {
      name: "Portfolio",
      value: portfolio,
      setValue: setPortfolio,
    },
    {
      name: "Youtube",
      value: youtube,
      setValue: setYoutube,
    },
    {
      name: "Stack Overflow",
      value: stack,
      setValue: setStack,
    },
    {
      name: "Telegram",
      value: telegram,
      setValue: setTelegram,
    },
    {
      name: "Reddit",
      value: reddit,
      setValue: setReddit,
    },
    {
      name: "Pinterest",
      value: pinterest,
      setValue: setPinterest,
    },
  ];

  return (
    <div className="general-social">
      <div className="socialInputs">
        {socials.map((social) => (
          <Input
            key={social.name}
            title={social.name}
            placeholder={`Enter ${social.name} url`}
            state={social.value}
            setState={social.setValue}
          />
        ))}
      </div>
      <button className="btn">Save Changes</button>
    </div>
  );
};

export default GeneralSocial
