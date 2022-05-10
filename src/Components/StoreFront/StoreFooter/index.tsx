import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { AiFillFacebook, AiFillInstagram, AiFillBehanceCircle, AiFillLinkedin, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { FaDiscord, FaPinterest, FaReddit, FaTelegram, FaDribbbleSquare, FaStackOverflow } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../../config';
import { IGeneral } from '../../../Models/General';

const StoreFooter = (general: IGeneral) => {
  //@ts-ignore
  const [socialLinks, setSocialLinks] = useState<ISocialLinks>({});
  const size = "1.8em";
  const socials = [
    {
      title: "facebook",
      link: socialLinks && socialLinks.facebook ? socialLinks.facebook : "",
      placeholder: "Enter Facebook url",
      logo: <AiFillFacebook size={size} />,
    },
    {
      title: "instagram",
      link: socialLinks && socialLinks.instagram ? socialLinks.instagram : "",
      placeholder: "Enter Instagram url",
      logo: <AiFillInstagram size={size} />,
    },
    {
      title: "discord",
      link: socialLinks && socialLinks.discord ? socialLinks.discord : "",
      placeholder: "Enter Discord url",
      logo: <FaDiscord size={size} />,
    },
    {
      title: "pinterest",
      link: socialLinks && socialLinks.pinterest ? socialLinks.pinterest : "",
      placeholder: "Enter Pinterest url",
      logo: <FaPinterest size={size} />,
    },
    {
      title: "reddit",
      link: socialLinks && socialLinks.reddit ? socialLinks.reddit : "",
      placeholder: "Enter Reddit url",
      logo: <FaReddit size={size} />,
    },
    {
      title: "behance",
      link: socialLinks && socialLinks.behance ? socialLinks.behance : "",
      placeholder: "Enter Behnace url",
      logo: <AiFillBehanceCircle size={size} />,
    },
    {
      title: "telegram",
      link: socialLinks && socialLinks.telegram ? socialLinks.telegram : "",
      placeholder: "Enter Telegram url",
      logo: <FaTelegram size={size} />,
    },
    {
      title: "linkedIn",
      link: socialLinks && socialLinks.linkedIn ? socialLinks.linkedIn : "",
      placeholder: "Enter LinkedIn url",
      logo: <AiFillLinkedin size={size} />,
    },
    {
      title: "twitter",
      link: socialLinks && socialLinks.twitter ? socialLinks.twitter : "",
      placeholder: "Enter Twitter url",
      logo: <AiFillTwitterCircle size={size} />,
    },
    {
      title: "portfolio",
      link: socialLinks && socialLinks.portfolio ? socialLinks.portfolio : "",
      placeholder: "Enter Portfolio url",
      logo: <CgWebsite size={size} />,
    },
    {
      title: "youtube",
      link: socialLinks && socialLinks.youtube ? socialLinks.youtube : "",
      placeholder: "Enter Youtube url",
      logo: <AiFillYoutube size={size} />,
    },
    {
      title: "dribble",
      link: socialLinks && socialLinks.dribble ? socialLinks.dribble : "",
      placeholder: "Enter Dribble url",
      logo: <FaDribbbleSquare size={size} />,
    },
    {
      title: "stackoverflow",
      link:
        socialLinks && socialLinks.stackoverflow
          ? socialLinks.stackoverflow
          : "",
      placeholder: "Enter Stackoverflow url",
      logo: <FaStackOverflow size={size} />,
    },
  ];
  useEffect(() => {
    getSocialLinks();
  }, []);
  const getSocialLinks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/general/socialLinks`);
      if (res.data) {
        setSocialLinks(res.data.result);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div>
      <Row className="mt-5 FooterCol">
        <Col className="" lg={3}>
          <div className="">
            <p id="Unicus">{general.storeName}</p>
            <br></br>
            <p id="TheBestPara" className="pe-5">
              World's first Web 3.0 as a Service (WaaS) platform.
            </p>
          </div>
        </Col>
        <Col lg={3}>
          <div className="">
            <p id="Unicus">About</p>
            <br></br>
            <p id="TheBestPara">
              <a href="/privacy-policy">Privacy Policy</a>
              <br></br>
              <br></br>
              <a href="/terms-conditions">Term & Condition</a>
              <br></br>
              <br></br>
            </p>
          </div>
        </Col>

        <Col lg={3}>
          <div className="">
            <p id="Unicus">Useful Links</p>
            <br></br>
            <p id="TheBestPara">
              <a href="/about-us">About Us</a>
              <br></br>
              <br></br>
              <a href="/for-creator">Creators</a>
              <br></br>
              <br></br>
            </p>
          </div>
        </Col>
        <Col lg={3}>
          {general.showContactUs ? (
            <div className="">
              <p id="Unicus">Contact</p>
              <br></br>
              <p id="TheBestPara">
                <a href="#">{general.phone ? general.phone : ""}</a>
                <br></br>
                <br></br>
                <a href="#">{general.contactEmail}</a>
                <br></br>
                <br></br>
                <a href="#">{general.address ? general.address : ""}</a>
              </p>
            </div>
          ) : (
            ""
          )}
          <Row>
            <Col lg={9}>
              {!general.showContactUs && socialLinks? (
                <div>
                  <p id="Unicus">Social Media</p>
                  <br></br>
                
                </div>
              ) : (
                ""
              )}
              {socials.map((item) =>
                item.link && item.link != "" ? (
                  <a href={`https://${item.link}`} className="pe-2 pt-3" target="_blank">
                    {item.logo}
                  </a>
                ) : (
                  ""
                )
              )}
            </Col>
          </Row>
        </Col>
        <Row>
          <Col lg={6}></Col>
        </Row>
        <a href="https://unicus.one/" className="CopyRight mt-4 mb-2">
          Powered By Unicus One | All Right Reserved!
        </a>
      </Row>
    </div>
  );
};

export default StoreFooter