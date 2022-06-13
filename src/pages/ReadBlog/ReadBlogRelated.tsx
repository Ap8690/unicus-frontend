// Images
import { Link } from "react-router-dom";
import blogImg from "../../assets/images/Rectangle 8.png";

const RelatedBlog = ({ blog }) => {
  return (
    <div className="related-blog">
      <div className="related-blog-image">
        <img src={blog.image} alt={blog.title} />
      </div>
      <div className="related-blog-category">{blog.category}</div>
      <h3 className="related-blog-heading">{blog.title}</h3>
      <div className="related-blog-text">{blog.text}</div>
      <div className="related-blog-read-more">
        <div className="related-blog-read-more-line"></div>
        <Link
          className="related-blog-read-more-text"
          to={`/readblog/${blog.id}`}
        >
          Read More
        </Link>
        <div className="related-blog-read-more-line"></div>
      </div>
    </div>
  );
};

const ReadBlogRelated = ({ category }) => {
  // get blogs having same category basically
  const blogs = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      category: category,
      time: 1,
      date: "25th April, 2022",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      category: category,
      time: 2,
      date: "25th April, 2022",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      category: category,
      time: 3,
      date: "25th April, 2022",
    },
  ];
  return (
    <div className="read-blog-related">
      <h3 className="read-blog-related-heading">Related Blogs</h3>
      <div className="read-blog-related-blogs">
        {blogs.map((blog) => (
          <RelatedBlog blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default ReadBlogRelated;
