// Sass File
import "./Blog.scss";

// Components
import BlogRecommended from "./BlogRecommended";
import BlogRecent from "./BlogRecent";
import BlogBackground from "./BlogBackground";

const Blog = () => {
  return (
    <div className="blog">
      <BlogBackground />
      <BlogRecommended />
      <BlogRecent />
    </div>
  );
};

export default Blog;
