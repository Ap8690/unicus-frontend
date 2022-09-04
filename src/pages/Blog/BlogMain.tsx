// Sass File
import "./Blog.scss";

// Components
import BlogRecommended from "./BlogRecommended";
import BlogRecent from "./BlogRecent";
import BlogBackground from "./BlogBackground";
import { Helmet } from "react-helmet";
const Blog = () => {
    return (
        <div className="blog">
            <Helmet>
                <meta charSet="utf-8" />
                <title>UnicusOne - Blog</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <BlogBackground />
            <BlogRecommended />
            <BlogRecent />
        </div>
    );
};

export default Blog;
