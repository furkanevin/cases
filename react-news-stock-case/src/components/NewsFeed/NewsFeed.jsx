import React from 'react';
import './NewsFeed.css';
import { useNavigate } from 'react-router-dom';

const NewsFeed = ({ singleNews }) => {
  const { title, time_published, authors, summary, banner_image, url } =
    singleNews;

  const navigate = useNavigate();
  const year = parseInt(time_published.substring(0, 4));
  const month = parseInt(time_published.substring(4, 6)) - 1; // Month is zero-based
  const day = parseInt(time_published.substring(6, 8));
  const hour = parseInt(time_published.substring(9, 11));
  const minute = parseInt(time_published.substring(11, 13));
  const second = parseInt(time_published.substring(13, 15));

  const publishedDate = new Date(year, month, day, hour, minute, second);

  const formattedPublishedDate =
    publishedDate.toString() !== 'Invalid Date'
      ? publishedDate.toLocaleString()
      : 'Unknown Date';

  return (
    <div
      className="news-wrapper"
      onClick={() => navigate(`/newsDetail/${singleNews.id}`)}
    >
      <img className="news-img" src={banner_image} />
      <h2 className="news-title">{title}</h2>
      <p>{summary}</p>
      <p className="news-extra">
        <span>{formattedPublishedDate}</span> || {authors}
      </p>
    </div>
  );
};

export default NewsFeed;
