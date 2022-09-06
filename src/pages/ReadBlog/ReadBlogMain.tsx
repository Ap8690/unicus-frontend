// Logos
import twitterLogo from "../../assets/svgs/shareBlogTwitter.svg";
import instagramLogo from "../../assets/svgs/shareBlogInstagram.svg";
import facebookLogo from "../../assets/svgs/shareBlogFacebook.svg";
import uuid from "react-uuid";

// Paragraph for Read Blog
const ReadBlogPara = ({ para }) => {
  return <p className="read-blog-para">{para}</p>;
};

const ReadBlogMain = ({ blog, author }) => {
  return (
    <div className="read-blog-main">
      <div className="read-blog-image">
        <img src={blog.image} alt={blog.title} />
      </div>

      <div className="read-blog-lower">
        <div className="read-blog-text">
          <h3 className="read-blog-heading">{blog.title}</h3>
          {blog.text.map((para:any) => (
            <ReadBlogPara para={para} key={uuid()} />
          ))}
        </div>
        <div className="read-blog-author">
          <div className="read-blog-author-info">
            <div className="read-blog-author-image">
              <img src={author.image} alt={author.name} />
            </div>
            <div className="read-blog-author-info-text">
              <div className="read-blog-author-name">{author.name}</div>
              <a
                href={author.profile}
                className="read-blog-author-profile-link"
              >
                View Profile
              </a>
            </div>
          </div>
          <div className="share-blog-holder">
            <h3 className="share-blog-heading">Share this Blog</h3>
            <div className="share-blog-links">
              <a href="#" className="share-blog-link">
                <img src={twitterLogo} alt="Twitter" />
              </a>
              <a href="#" className="share-blog-link">
                <img src={instagramLogo} alt="Instagram" />
              </a>
              <a href="#" className="share-blog-link">
                <img src={facebookLogo} alt="facebook" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBlogMain;
