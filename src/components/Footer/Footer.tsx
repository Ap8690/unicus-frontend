// Logos
import UnicusLogo from "../../assets/images/Unicus-logo.png";
import GmailLogo from "../../assets/svgs/gmailFooter.svg";
import TwitterLogo from "../../assets/svgs/twitterFooter.svg";
import InstagramLogo from "../../assets/svgs/instagramFooter.svg";
import TelegramLogo from "../../assets/svgs/telegramFooter.svg";
import MediumLogo from "../../assets/svgs/mediumFooter.svg";

// Libraries
import { Link } from "react-router-dom";

// Sass
import "./Footer.scss";

const SocialElement = ({ social }) => {
  const href = social.name === "Mail" ? `mailto:${social.link}` : social.link;
  return (
    <a
      href={href}
      className="footer-social-link"
      target="_blank"
      rel="noreferrer"
    >
      <img src={social.logo} alt={social.name} />
    </a>
  );
};
const Footer = () => {
  const socials = [
    {
      name: "Twitter",
      link: "https://twitter.com/BlokMinersHQ?t=BQDQxvJOpKMevjyBpR_I9g&s=09",
      logo: TwitterLogo,
    },
    {
      name: "Medium",
      link: "#",
      logo: MediumLogo,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/blokminers/?igshid=YmMyMTA2M2Y=",
      logo: InstagramLogo,
    },
    {
      name: "Telegram",
      link: "#",
      logo: TelegramLogo,
    },
    {
      name: "Mail",
      link: "info@blokminers.io",
      logo: GmailLogo,
    },
  ];
  return (
    <footer>
      <Link to={"/"} className="footer-logo">
        <img src={UnicusLogo} alt="Unicus One" />
      </Link>
      <h3 className="footer-intro">
        Worlds first Multi Chain WaaS (Web3 as a Service) Platform for
        Metaverse, Gaming, and NFT Economy
      </h3>
      <nav className="footer-nav-bar">
        <div className="footer-nav-links">
          <Link to={"/about"} className="footer-nav-link">
            About
          </Link>
          <Link to={"/for-creator"} className="footer-nav-link">
            For Creators
          </Link>
          <Link to={"/token"} className="footer-nav-link">
            Token
          </Link>
          <Link to={"/blog"} className="footer-nav-link">
            Blog
          </Link>
          <Link to={"/create-store"} className="footer-nav-link">
            Create Store
          </Link>
          <Link to={"/launchpad"} className="footer-nav-link">
            Launchpad
          </Link>
          <Link to={"/marketplace"} className="footer-nav-link">
            Marketplace
          </Link>
        </div>
      </nav>
      <div className="footer-social-links">
        {socials.map((social) => (
          <SocialElement social={social} key={social.name} />
        ))}
      </div>
      <div className="footer-copyright">
        Copyright © {new Date().getFullYear()}. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
