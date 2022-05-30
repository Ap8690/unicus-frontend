// Images
import blogImg from "../../assets/images/Rectangle 8.png";

const RelatedBlog = ({ blog }) => {
  return <div className="read-blog-related-blog">
  </div>;
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
      <div className="read-blog-related-blogs"></div>
    </div>
  );
};

export default ReadBlogRelated;
