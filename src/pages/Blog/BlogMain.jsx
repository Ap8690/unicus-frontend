// Sass File
import "./Blog.scss";

// Components
import BlogRecommended from "./BlogRecommended";
import BlogRecent from "./BlogRecent";

const Blog = ({}) => {
  return (
    <div className="blog">
      <BlogRecommended />
      <BlogRecent />
    </div>
  );
};

export default Blog;
