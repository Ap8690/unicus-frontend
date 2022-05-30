// Libraries
import { useLocation } from "react-router-dom";

// Images
import blogImg from "../../assets/images/Rectangle 695.png";
import authorImg from "../../assets/images/createselector1.png";
import twitterLogo from "../../assets/svgs/shareBlogTwitter.svg";
import instagramLogo from "../../assets/svgs/shareBlogInstagram.svg";
import facebookLogo from "../../assets/svgs/shareBlogFacebook.svg";

// Sass
import "./ReadBlog.scss";

// Return Id from the given location
const getId = (location) =>
  parseInt(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));

// Paragraph for Read Blog
const ReadBlogPara = ({ para }) => {
  return <p className="read-blog-para">{para}</p>;
};
// Component for opening a blog
const ReadBlog = () => {
  const location = useLocation();
  const id = getId(location);

  // Now we need to get the required data somehow
  // Leave that part for now
  const blog = {
    id: 1,
    title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
    text: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque cras feugiat in augue suspendisse sed egestas. Cursus quis et, orci ac porttitor blandit etiam mattis. Gravida cursus volutpat fermentum fermentum, erat sem. Quam sed dignissim ullamcorper nibh sit. Amet velit, dignissim commodo, hendrerit fringilla lacus. Maecenas et massa, aliquet scelerisque.Ac ornare facilisi integer egestas mauris, odio interdum feugiat pharetra. Senectus in consectetur et vulputate. Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing consectetur sollicitudin sed. Et diam quis vulputate tellus facilisis pharetra. Massa, eget odio orci felis viverra ac gravida vel. Auctor volutpat varius est egestas est massa in vitae, molestie.Est euismod potenti vel viverra id phasellus turpis. Maecenas volutpat aenean sed fames commodo. Id donec sodales etiam lectus risus aenean egestas rhoncus gravida. Nec phasellus egestas praesent nullam. Neque amet orci nunc, pulvinar ante pretium sed. Nisi, accumsan amet, magna eu sapien. Nullam fusce commodo, nec aliquam risus. . Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing. nec aliquam risus. . Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing. acilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing.`,
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque cras feugiat in augue suspendisse sed egestas. Cursus quis et, orci ac porttitor blandit etiam mattis. Gravida cursus volutpat fermentum fermentum, erat sem. Quam sed dignissim ullamcorper nibh sit. Amet velit, dignissim commodo, hendrerit fringilla lacus. Maecenas et massa, aliquet scelerisque.Ac ornare facilisi integer egestas mauris, odio interdum feugiat pharetra. Senectus in consectetur et vulputate. Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing consectetur sollicitudin sed. Et diam quis vulputate tellus facilisis pharetra. Massa, eget odio orci felis viverra ac gravida vel. Auctor volutpat varius est egestas est massa in vitae, molestie.Est euismod potenti vel viverra id phasellus turpis. Maecenas volutpat aenean sed fames commodo. Id donec sodales etiam lectus risus aenean egestas rhoncus gravida. Nec phasellus egestas praesent nullam. Neque amet orci nunc, pulvinar ante pretium sed. Nisi, accumsan amet, magna eu sapien. Nullam fusce commodo, nec aliquam risus. . Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing consectetur sollicitudin sed. Et diam quis vulputate tellus facilisis pharetra. Massa, eget odio orci felis viverra ac gravida vel. Auctor volutpat varius est egestas est massa in vitae, molestie.Est euismod potenti vel viverra id phasellus turpis. Maecenas volutpat aenean. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque cras feugiat in augue suspendisse sed egestas. Cursus quis et, orci ac porttitor blandit etiam mattis. Gravida cursus volutpat fermentum fermentum, erat sem. Quam sed dignissim ullamcorper nibh sit. Amet velit, dignissim commodo, hendrerit fringilla lacus. Maecenas et massa, aliquet scelerisque.Ac ornare facilisi integer egestas mauris, odio interdum feugiat pharetra. Senectus in consectetur et vulputate. Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing consectetur sollicitudin sed. Et diam quis vulputate tellus facilisis pharetra. Massa, eget odio orci felis viverra ac gravida vel. Auctor volutpat varius est egestas est massa in vitae, molestie.Est euismod potenti vel viverra id phasellus turpis. Maecenas volutpat aenean sed fames commodo. Id donec sodales etiam lectus risus aenean egestas rhoncus gravida. Nec phasellus egestas praesent nullam. Neque amet orci nunc, pulvinar ante pretium sed. Nisi,`,
      `Nec aliquam risus. . Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing consectetur sollicitudin sed. Et diam quis vulputate tellus facilisis pharetra. Massa, eget odio orci felis viverra ac gravida vel. Auctor volutpat varius est egestas est massa in vitae, molestie.Est euismod potenti vel viverra id phasellus turpis. Maecenas volutpat aenean. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque cras feugiat in augue suspendisse sed egestas. Cursus quis et, orci ac porttitor blandit etiam mattis. Gravida cursus volutpat fermentum fermentum, erat sem. Quam sed dignissim ullamcorper nibh sit. Amet velit, dignissim commodo, hendrerit fringilla lacus. Maecenas et massa, aliquet scelerisque.Ac ornare facilisi integer egestas mauris, odio interdum feugiat pharetra. Senectus in consectetur et vulputate. Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing consectetur sollicitudin sed. Et diam quis vulputate tellus facilisis pharetra. Massa, eget odio orci felis viverra ac gravida vel. Auctor volutpat varius est egestas est massa in vitae, molestie.Est euismod potenti vel viverra id phasellus turpis. Maecenas volutpat aenean sed fames commodo. Id donec sodales etiam lectus risus aenean egestas rhoncus gravida. Nec phasellus egestas praesent nullam. Neque amet orci nunc, pulvinar ante pretium sed. Nisi, accumsan amet, magna eu sapien. Nullam fusce commodo, nec aliquam risus. . Facilisis iaculis pellentesque arcu quisque non ac. Laoreet ornare volutpat adipiscing consectetur sollicitudin sed. Et diam quis vulputate tellus facilisis pharetra. Massa, eget odio orci felis viverra ac gravida vel. Auctor volutpat varius est egestas est massa in vitae, molestie.Est euismod potenti vel viverra id phasellus turpis. Maecenas volutpat aenean. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque cras feugiat in augue suspendisse sed egestas. Cursus quis et, orci ac porttitor blandit etiam mattis. Gravida cursus volutpat fermentum fermentum, erat sem. Quam sed dignissim ullamcorper nibh sit. Amet velit, dignissim commodo, hendrerit fringilla lacus. Maecenas et massa, aliquet scelerisque.Ac ornare facilisi integer egestas mauris, odio interdum feugiat pharetra. Senectus in consectetur et vulputate.`,
    ],
    image: blogImg,
    time: 1,
    date: "25th April, 2022",
  };

  // author
  const author = {
    name: "Solo Tomato",
    image: authorImg,
    profile: "#",
  };
  return (
    <div className="read-blog">
      <div className="read-blog-main">
        <div className="read-blog-image">
          <img src={blogImg} alt={blog.title} />
        </div>

        <div className="read-blog-lower">
          <div className="read-blog-text">
            <h3 className="read-blog-heading">{blog.title}</h3>
            {blog.text.map((para, i) => (
              <ReadBlogPara para={para} key={`${i}${para}`} />
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
      <div className="read-blog-related"></div>
    </div>
  );
};

export default ReadBlog;
