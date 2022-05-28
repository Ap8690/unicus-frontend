// Sass File
import "./Blog.scss";

// Images
import blogImg from "../../assets/images/Rectangle 8.png";

const BlogRecommendedMain = ({ text, image, time, date, title }) => {
  return (
    <div className="blog-recommended-main">
      <div className="blog-recommended-image">
        <img src={image} alt="Blog Image" />
      </div>
      <div className="blog-info">
        <div className="blog-info-element">{time} mins read</div>
        <div className="blog-info-element">{date}</div>
      </div>

      <h3 className="blog-recommended-main-heading">{title}</h3>
      <p className="blog-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sed saepe
        odio deserunt. Quasi consectetur deleniti culpa asperiores omnis at
        expedita explicabo. Temporibus, eos commodi! Veniam fugiat aut aliquid
        neque!
      </p>
    </div>
  );
};

const BlogRecommendedSide = ({ text, title, image, time, date }) => {
  return (
    <div className="blog-recommended-side">
      <div className="blog-recommended-image">
        <img src={image} alt="Blog Image" />
      </div>
      <div className="blog-info">
        <div className="blog-info-element">{time} mins read</div>
        <div className="blog-info-element">{date}</div>
      </div>
      <h3 className="blog-recommended-side-heading">{title}</h3>
      <p className="blog-description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        perspiciatis consequatur itaque velit hic omnis quia at debitis
        temporibus accusamus, recusandae neque totam officiis, a nostrum officia
        veniam, optio quos?
      </p>
    </div>
  );
};
const Blog = ({}) => {
  return (
    <div className="blog">
      <div className="blog-recommended">
        <h2 className="blog-heading">Recommended</h2>
        <div className="blog-recommended-holder">
          <BlogRecommendedMain
            image={blogImg}
            time={3}
            date="25th April, 2021"
            title={"How to become rich"}
          />
          <BlogRecommendedSide
            image={blogImg}
            time={3}
            date="25th April, 2021"
            title={"How to become rich"}
          />
          <BlogRecommendedSide
            image={blogImg}
            time={3}
            date="25th April, 2021"
            title={"How to become rich"}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
