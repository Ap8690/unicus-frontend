// Images
import chevronDown from "../../assets/svgs/chevronDown.svg";
import chevronLeft from "../../assets/svgs/chevronLeft.svg";
import chevronRight from "../../assets/svgs/chevronRight.svg";
import blogImg from "../../assets/images/Rectangle 8.png";

// Library
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Filter for Recent Blogs
const BlogRecentFilter = ({ setBlogFilter }) => {
  return (
    <div className="blog-recent-filter">
      <p>Categories</p>
      <button>
        <img src={chevronDown} alt="Expand Categories" />
      </button>
    </div>
  );
};

const BlogRecentSwitcherElement = ({ currentPage, page, updatePage }) => {
  const onClick = () => updatePage(page);
  if (page === currentPage) {
    return (
      <div className="blog-recent-switcher-element current" onClick={onClick}>
        {page + 1}
      </div>
    );
  } else {
    return (
      <div className="blog-recent-switcher-element" onClick={onClick}>
        {page + 1}
      </div>
    );
  }
};

// Switcher for Recent Blogs
const BlogRecentSwitcher = ({ currentPage, length, setCurrentPage }) => {
  const [displayPageNo, setDisplayPageNo] = useState(0);
  const pagesList = [];
  for (let i = displayPageNo; i < displayPageNo + 4 && i < length; ++i)
    pagesList.push(i);

  const updateDisplayPage = (newPage) => {
    setDisplayPageNo(newPage);
  };

  const updatePage = (page) => {
    setCurrentPage(page);
  };

  // Can't go anymore left with this condition
  const ifLeftDisable = displayPageNo === 0;

  // Can't go anymore right with this condition
  const ifRightDisable = displayPageNo + 4 >= length;

  return (
    <div className="blog-recent-switcher">
      <button
        className="blog-recent-switcher-button"
        onClick={() => updateDisplayPage(Math.max(0, displayPageNo - 4))}
        disabled={ifLeftDisable}
      >
        <img src={chevronLeft} alt="Left Arrow" />
      </button>
      {pagesList.map((page) => (
        <BlogRecentSwitcherElement
          page={page}
          updatePage={updatePage}
          currentPage={currentPage}
          key={page}
        />
      ))}
      <button
        className="blog-recent-switcher-button"
        onClick={() =>
          updateDisplayPage(Math.min(length - 1, displayPageNo + 4))
        }
        disabled={ifRightDisable}
      >
        <img src={chevronRight} alt="Left Arrow" />
      </button>
    </div>
  );
};
// Element of recent blogs
const BlogRecentElement = ({ blog }) => {
  return (
    <div className="blog-recent-element">
      <div className="blog-recent-element-image">
        <img src={blog.image} alt="Blog Image" />
      </div>
      <div className="blog-recent-element-info">
        <div className="blog-info-element left">{blog.time} mins read</div>
        <Link
          to={`/readblog/${blog.id}`}
          className="blog-recent-element-heading"
        >
          {blog.title}
        </Link>
        <p className="blog-description">{blog.text}</p>
        <div className="blog-info-element left">{blog.date}</div>
      </div>
    </div>
  );
};

// Recent Blogs
const BlogRecent = () => {
  const [blogList, setBlogList] = useState([
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 1,
      date: "25th April, 2022",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 2,
      date: "25th April, 2022",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 3,
      date: "25th April, 2022",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 4,
      date: "25th April, 2022",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 5,
      date: "25th April, 2022",
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 6,
      date: "25th April, 2022",
    },
    {
      id: 7,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 7,
      date: "25th April, 2022",
    },
    {
      id: 8,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 8,
      date: "25th April, 2022",
    },
    {
      id: 9,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 9,
      date: "25th April, 2022",
    },
    {
      id: 10,
      title: "Lorem ipsum dolor sit amet, conse  adipiscing elit. se venena",
      text: "This is just a placeholder, will be replaced soon enough",
      image: blogImg,
      time: 10,
      date: "25th April, 2022",
    },
  ]);
  const [blogFilter, setBlogFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [blogDisplayList, setBlogDisplayList] = useState([]);

  // For handling when page no is changed
  useEffect(() => {
    setBlogDisplayList(blogList.slice(currentPage * 6, currentPage * 6 + 6));
  }, [currentPage]);

  // When Blog List Changes
  useEffect(() => {
    setBlogDisplayList(blogList.slice(0, 5));
  }, [blogList]);
  return (
    <div className="blog-recent">
      <div className="blog-recent-header">
        <h2 className="blog-heading">Recent Blogs</h2>
        <BlogRecentFilter setBlogFilter={setBlogFilter} />
      </div>
      <div className="blog-recent-element-holder">
        {blogDisplayList.map((blog, i) => (
          <BlogRecentElement blog={blog} key={blog.id} />
        ))}
      </div>
      <BlogRecentSwitcher
        currentPage={currentPage}
        length={Math.ceil(blogList.length / 6)}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BlogRecent;
