import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="cardContainer">
      {data.map((article, index) => (
        <div className="card" key={index}>
          <img src={article.urlToImage} alt="news" />
          <div className="content">
            <a href={article.url} className="title" target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
            <p className="date">
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <button> <a  href={article.url} className="title" target="_blank">Read More</a></button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Card;
