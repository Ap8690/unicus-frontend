// Library
import { Link } from "react-router-dom";

// Some Hardcoded Data
import blogImg from "../../assets/images/Rectangle 8.png";

const BlogRecommendedMain = ({ blog }) => {
  return (
    <div className="blog-recommended-main">
      <div className="blog-recommended-image">
        <img src={blog.image} alt="Blog Image" />
      </div>
      <div className="blog-info">
        <div className="blog-info-element left">{blog.time} mins read</div>
        <div className="blog-info-element right">{blog.date}</div>
      </div>

      <Link
        to={`/readblog/${blog.id}`}
        className="blog-recommended-main-heading"
      >
        {blog.title}
      </Link>
      <p className="blog-description">{blog.text}</p>
    </div>
  );
};

const BlogRecommendedSide = ({ blog }) => {
  return (
    <div className="blog-recommended-side">
      <div className="blog-recommended-image">
        <img src={blog.image} alt="Blog Image" />
      </div>
      <div className="blog-info">
        <div className="blog-info-element left">{blog.time} mins read</div>
        <div className="blog-info-element right">{blog.date}</div>
      </div>
      <Link
        to={`/readblog/${blog.id}`}
        className="blog-recommended-side-heading"
      >
        {blog.title}
      </Link>
      <p className="blog-description">{blog.text}</p>
    </div>
  );
};

// Recommended Blogs
const BlogRecommended = () => {
  const blogsTemp = [
    {
      id: -1,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi voluptatem delectus maxime? Beatae officia, enim obcaecati, et error praesentium corrupti eos officiis dignissimos, voluptas repellat quas quod recusandae ut amet?",
      image: blogImg,
      time: 1,
      date: "25th April, 2022",
    },
    {
      id: -2,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 2,
      date: "25th April, 2022",
    },
    {
      id: -3,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 3,
      date: "25th April, 2022",
    },
  ];
  return (
    <div className="blog-recommended">
      <h2 className="blog-heading">Recommended</h2>
      <div className="blog-recommended-holder">
        <BlogRecommendedMain blog={blogsTemp[0]} />
        <BlogRecommendedSide blog={blogsTemp[1]} />
        <BlogRecommendedSide blog={blogsTemp[2]} />
      </div>
    </div>
  );
};

export default BlogRecommended;
