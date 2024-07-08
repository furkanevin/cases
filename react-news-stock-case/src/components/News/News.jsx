import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsFeed from "../NewsFeed/NewsFeed";
import ReactPaginate from "react-paginate";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3050/feed")
      .then((res) => setNews(res.data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const [itemOffset, setItemOffset] = useState(0);

  // items per page
  const itemsPerPage = 3;

  // last element
  const endOffset = itemOffset + itemsPerPage;

  // data slice
  const currentItems = news.slice(itemOffset, endOffset);

  // total page
  const pageCount = Math.ceil(news.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <h1>News</h1>
      {currentItems.map((singleNews, index) => (
        <NewsFeed key={index} singleNews={singleNews} />
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=""
        className="pagination"
      />
    </div>
  );
};

export default News;
