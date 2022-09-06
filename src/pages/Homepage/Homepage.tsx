// Libraries
import { Link } from "react-router-dom";
import messageImg from "../../assets/svgs/message-sent.svg";
import Input from "../../components/InputBordered/InputBordered";

// Sass
import "./Homepage.scss";

// Images
import bannerImg from "../../assets/images/Group 1.png";
import starImg from "../../assets/svgs/star.svg";
import dollarImg from "../../assets/svgs/dollar.svg";
import frameImg from "../../assets/svgs/frame.svg";
import shopImg from "../../assets/svgs/shop.svg";
import anchorImg from "../../assets/svgs/anchor.svg";
import solutionImg from "../../assets/svgs/solution.svg";
import soln1Img from "../../assets/images/Rectangle 734.png";
import soln2Img from "../../assets/images/Rectangle 691.png";
import soln3Img from "../../assets/images/Rectangle 695.png";
import tokenImg from "../../assets/images/token.png";
import roadmapImg from "../../assets/svgs/roadmap.svg";
import blog1Img from "../../assets/images/Rectangle 8 (1).png";
import blog2Img from "../../assets/images/Rectangle 8 (2).png";
import blog3Img from "../../assets/images/Rectangle 8.png";

// Background Images
import one from "../../assets/svgs/01.svg";
import two from "../../assets/svgs/02.svg";
import three from "../../assets/svgs/03.svg";
import circlesImg from "../../assets/svgs/circles.svg";

// Components
import HomepageBackground from "./HomepageBackground";
import { Helmet } from "react-helmet";
import uuid from "react-uuid";

const Homepage = () => {
  return (
    <div className="homepage">
      <Helmet>
                <meta charSet="utf-8" />
                <title>UnicusOne - Marketplace</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
      <HomepageBackground />
      <Circles />
      <TopBanner />
      <UnicusEcosystem />
      <Solutions />
      <Roadmap />
      <Token />
      <Blogs />
      <Testimonials />
      <StayInLoop />
    </div>
  );
};

const Circles = () => {
  return (
    <img
      className="top-banner-circles"
      src={circlesImg}
      alt="circles background"
    />
  );
};

const TopBanner = () => {
  return (
    <section className="topBanner">
      <div>
        <p>Unlocking The Potential Of Web 3.0 Economy</p>
        <div className="largeText">
          Worlds first Multi Chain WaaS (Web3 as a Service) Platform for
          Metaverse, Gaming, and NFT Economy
        </div>
        <p>
          A 360 degree ‘mild code’ solution for Gaming, Metaverse or NFT
          projects to integrate all their Web 3.0 needs in click of few buttons
        </p>
      </div>
      <div>
        <img src={bannerImg} alt="banner" />
      </div>
    </section>
  );
};

const UnicusEcosystem = () => {
  const data = [
    {
      img: starImg,
      title: "NFT Marketplace",
      info: "A multi-chain NFT Marketplace supporting both ERC 721 and 1155 standards and a variety of asset classes, supporting payments through both credit cards and cryptocurrencies",
    },
    {
      img: frameImg,
      title: "Seamless to Metaverse",
      info: "We offer seamless integration with UnicusOne Web 3.0 modules like Generative Art Engine, Whitelisting & Airdrops, NFT Reveal, and Token Swap for Metaverse and Gaming Projects",
    },
    {
      img: dollarImg,
      title: "Web 3.0 Payment Gateway",
      info: "This module of ours can quickly integrate support of Web3.0 wallets for crypto payments to support and Web2.0 eCommerce Platform",
    },
    {
      img: solutionImg,
      title: "Widget Based Solution",
      info: "UnicusOne widgets will allow any developer to integrate Web 3.0 utilities to their Web 2.0 application hassle-free, within 15 minutes",
    },
    {
      img: anchorImg,
      title: "Partner APIs and SDKs",
      info: "Easy to use APIs and SDKs for partners that convert digital asset platforms to NFT marketplaces",
    },
    {
      img: shopImg,
      title: "Whitelabel NFT Storefronts",
      info: "An option for partners to Instantly build their own NFT Marketplace instantly using UnicusOne's NFT infrastructure",
    },
  ];
  return (
    <section className="unicusEcosystem">
      <div className="blue-head">UnicusOne Web 3.0 Ecosystem</div>
      <p>
        UnicusOne comes with some of the most advanced features for the Web 3.0
        Economy
      </p>
      <div className="ecosystemGrid">
        {data && data.map((item:any) => (
          <div key={uuid()} className="gridData">
            <img src={item.img} alt="ecosystem" />
            <p className="itemMid">{item.title}</p>
            <p>{item.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
const Solutions = () => {
  return (
    <section className="solutions">
      <div className="blue-head">Solutions Provided By UnicusOne</div>
      <Solution1 />
      <Solution2 />
      <Solution3 />
    </section>
  );
};

const Solution1 = () => {
  return (
    <div className="soln-1">
      <div className="soln-head">
        <img src={one} alt="One" className="background-particle-number" />
        Partner with us to unlock the true potential of Web 3.0 Economy
      </div>
      <div className="soln-info1">
        <img src={soln1Img} alt="solution1" />
        <div className="soln-info">
          <p className="title">
            Set Up “Decentralized, Scalable, Secure, Branded” Web 3.0
            Applications with UnicusOne
          </p>
          <p>
            If you are a Web 2.0 developer or a project owner, you no longer
            need to find Blockchain developers to write smart contracts and
            build APIs for you. UnicusOne is your Go-To platform. We help you
            transform into a Web 3.0 ready application with our ‘mild code’
            solution, in a matter of a few minutes. In addition, Our Storefront
            offering will enable you to create your Custom, Secured, ,
            Decentralized NFT marketplace in a DIY format. You can create,
            preview, publish, and monetize your NFT collections using the
            customized templates and also benefit from the smart contract
            management of our scalable marketplace. Our auction architecture is
            completely decentralized and multi-threaded thus facilitating the
            scalability feature to millions of users across the world!
          </p>
        </div>
      </div>
      <div className="soln-grid">
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
      </div>
    </div>
  );
};
const Solution2 = () => {
  return (
    <div className="soln-2">
      <div className="soln-head">
        <img src={two} alt="two" className="background-particle-number" />
        Mint, auction and trade your valuable creations
      </div>
      <div className="soln-info2">
        <img src={soln2Img} alt="solution2" />
        <div className="soln-info">
          <p className="title">
            Explore One-of-a-Kind, Next Generation NFT Marketplace
          </p>
          <p>
            An multi-chain marketplace enabling NFT traders to go on a no-bar
            trading binge, UnicusOne enables you to hook into the full potential
            of NFTs. A string of sophisticated tools, backed by fully audited
            contracts, allows you to discover, mint, buy or sell NFTs with
            alacrity and convenience. You cannot just transfer tokens to other
            blockchains with ease but also explore the full history of NFTs. In
            an ecosystem contoured by limitations, UnicusOne brings in complete
            transparency and seamless functional efficiency.
          </p>
        </div>
      </div>
      <div className="soln-grid">
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
      </div>
    </div>
  );
};
const Solution3 = ({}) => {
  return (
    <div className="soln-3">
      <div className="soln-head">
        <img src={three} alt="three" className="background-particle-number" />
        360° Web 3.0 Solutions for Metaverse & Gaming Projects
      </div>
      <div className="soln-info3">
        <img src={soln3Img} alt="solution3" />
        <div className="soln-info">
          <p className="title">
            Empowering Metaverse & Gaming Economy With Web 3.0 As A Service
          </p>
          <p>
            In the 24/7 hustling crypto economy where time is the most important
            resource to be utilised, UnicusOne brings you full scale WaaS suite
            for Metaverse and Gaming projects. The bouquet of Web 3.0 as a
            Service modules can help you seamlessly integrate services like
            Generative Art, Airdrops & Whitelisting, Reveals, and even Token
            Swap features. All this plugged in within 1 hour with our ‘mild
            code’ solution offering.
          </p>
        </div>
      </div>
      <div className="soln-grid">
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
        <div className="grid-data">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          iure, inventore exercitationem ullam aut rem laborum laboriosam.
          Facilis nisi asperiores ad officiis accusamus nobis, dolorem dolores
          nemo repellendus ipsum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi quae iure, inventore exercitationem ullam
          aut rem laborum laboriosam. Facilis nisi asperiores ad officiis
          accusamus nobis, dolorem dolores nemo repellendus ipsum.
        </div>
      </div>
    </div>
  );
};

const Roadmap = () => {
  return (
    <section className="roadmap">
      <div className="blue-head">Roadmap</div>
      <p>
        Planning to develop a NFT marketplace? You have landed at the right
        place. We at UnicusOne will help you develop a customized NFT
        marketplace with your preferred blockchain network. Our seasoned team
        will give shape to your ideas to help them turn into reality soon.{" "}
      </p>
      <div className="roadmap-img">
        <img src={roadmapImg} alt="roadmap" />
        <div className="roadmap-info">
          <div>
            <div className="blue-head">Stage</div>
            <p>info</p>
          </div>
          <div>
            <div className="blue-head">Stage</div>
            <p>info</p>
          </div>
          <div>
            <div className="blue-head">Stage</div>
            <p>info</p>
          </div>
          <div>
            <div className="blue-head">Stage</div>
            <p>info</p>
          </div>
          <div>
            <div className="blue-head">Stage</div>
            <p>info</p>
          </div>
          <div>
            <div className="blue-head">Stage</div>
            <p>info</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Token = () => {
  return (
    <div className="token">
      <div className="blue-head">UnicusOne Token</div>
      <p>
        UnicusOne tokens have multiple use cases, these can be used as security,
        utility and governance tokens. Try and Understand how much an asset
        might be worth in the future.
      </p>
      <div className="token-info">
        <img src={tokenImg} alt="token" />
        <div>
          <span>
            The UnicusOne Token called “UI” is deployed on the Binance Smart
            Chain
          </span>
          <span>The total supply is 150 Million Tokens</span>
          <span>Token Use Cases:</span>
          <ul>
            <li>LiquidityMining - Incentivizes Users on the platform</li>
            <li>Staking Reward - Such as unlocking access to new markets</li>
            <li>On-chain Platform Governance</li>
            <li>Access to generated market’s Transaction Fees</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  return (
    <div className="blogs">
      <div className="blue-head">Blog</div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet,
        aliquid. Quaerat atque libero natus possimus provident voluptatibus
        obcaecati laboriosam suscipit.
      </p>
      <div className="blog-grid">
        <BlogCard
          img={blog1Img}
          title={"Lorem ipsum dolor, sit amet consectetur adipisicing elit."}
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          category="Category"
        />
        <BlogCard
          img={blog2Img}
          title={"Lorem ipsum dolor, sit amet consectetur adipisicing elit."}
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          category="Category"
        />
        <BlogCard
          img={blog3Img}
          title={"Lorem ipsum dolor, sit amet consectetur adipisicing elit."}
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          category="Category"
        />
      </div>
    </div>
  );
};

const BlogCard = (props) => {
  return (
    <div className="blog-card">
      <img src={props.img} alt="blog" className="blog-img" />
      <span className="category">{props?.category || "Category"}</span>
      <span className="title">{props.title}</span>
      <span className="desc">{props.description}</span>
      <Link to={"/"} className="read-more">
        READ MORE
      </Link>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="testimonials">
      <div className="blue-head">Testimonials</div>
      <p>
        We leave no stone unturned to to make our partners and users satisfied
      </p>
      <div className="testimonial-grid">
        <TestimonialCard
          img={blog1Img}
          testimonial={
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          }
          name="Name"
          profession="Profession"
        />
        <TestimonialCard
          img={blog2Img}
          testimonial={
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          }
          name="Name"
          profession="Profession"
        />
        <TestimonialCard
          img={blog3Img}
          testimonial={
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          }
          name="Name"
          profession="Profession"
        />
      </div>
    </div>
  );
};

const TestimonialCard = ({ img, testimonial, name, profession }) => {
  return (
    <div className="testimonial-card">
      <img src={img} alt={name} />
      <div className="name">{name}</div>
      <div className="profession">{profession}</div>
      <div className="testimonial">{testimonial}</div>
    </div>
  );
};

const StayInLoop = () => {
  return (
    <div className="stay-in-loop">
      <div>
        <h2>Stay in Loop</h2>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare
          ut lobortis sit erat morbi.
        </span>
        <form className="inputs">
          <Input placeholder={"Email"} />
          <button className="btn">Subscribe</button>
        </form>
      </div>
      <img src={messageImg} alt="stay in touch" />
    </div>
  );
};

export default Homepage;
