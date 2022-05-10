import React, { useState , useEffect} from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import fbLogo from "./../../../../../Assets/MyStore/fb-logo.svg"
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillBehanceCircle,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import {CgWebsite} from "react-icons/cg";
import {
  FaDiscord,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaDribbbleSquare,
  FaStackOverflow,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { ISocialLinks } from "../../../../../../Models/SocialLink";
import { BASE_URL } from "../../../../../../Utilities/Util";
const SocialLink = () => {
  //@ts-ignore
  const [socialLinks, setSocialLinks] = useState<ISocialLinks>({})
  const size = "2.5em"
  const social1 = [
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
  ];
  const social2 = [
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
      title:"dribble",
      link: socialLinks && socialLinks.dribble ? socialLinks.dribble : "",
      placeholder: "Enter Dribble url",
      logo: <FaDribbbleSquare size={size} />,
    },
    {
      title:"stackoverflow",
      link:
        socialLinks && socialLinks.stackoverflow
          ? socialLinks.stackoverflow
          : "",
      placeholder: "Enter Stackoverflow url",
      logo: <FaStackOverflow size={size} />,
    },
  ];
useEffect(() => {
     getSocialLinks()
   }, []) 
   const getSocialLinks=async()=>{
     try{
     const res = await axios.get(`${BASE_URL}/general/socialLinks`)
     if(res.data){
       setSocialLinks(res.data.result)
     }
    }catch(err){
      toast.error(err)
    }
   }
   const handleSocialLink = (title, link)=>{
     setSocialLinks({...socialLinks, [title]: link})
   }
    const handleSave = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/general/socialLinks`, socialLinks);
        if (res) {
          toast.success("Saved Changes");
        } else {
          throw "Failed";
        }
      } catch (err) {
        console.log("err", err);
        if (err.response) {
          toast.error(err.response.data.err);
        } else {
          toast.error(err.message);
        }
      }
    };
    return (
      <div>
        <Row>
          <Col lg={12}>
            <Row>
              <Col lg={12}>
                <h4>Social Links</h4>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Form>
                  {social1.map((item) => (
                    <Form.Group className="mb-4 d-flex">
                      {item.logo}
                      <Form.Control
                        type="text"
                        placeholder={item.placeholder}
                        value={item.link}
                        onChange={(e) =>
                          handleSocialLink(item.title, e.target.value)
                        }
                        className="ms-3"
                      />
                    </Form.Group>
                  ))}
                </Form>
              </Col>
              <Col md={6}>
                <Form>
                  {social2.map((item) => (
                    <Form.Group className="mb-4 d-flex">
                      {item.logo}
                      <Form.Control
                        type="text"
                        placeholder={item.placeholder}
                        value={item.link}
                        className="ms-3"
                        onChange={(e) =>
                          handleSocialLink(item.title, e.target.value)
                        }
                      />
                    </Form.Group>
                  ))}
                </Form>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col lg={12}>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>{" "}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
}

export default SocialLink;