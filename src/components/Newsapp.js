import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
  const [search, setSearch] = useState("");  
  const [newsData, setNewsData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('all');

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  const getData = async (cat = category, query = search) => {
    let q = query.trim();

    if(cat === 'trending') {
      q = 'trending';
    } else if(cat === 'all') {
      q = "news";
    }

    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${q}&apiKey=${API_KEY}`);
      const jsonData = await response.json();

      if(jsonData.articles) {
        setNewsData(jsonData.articles.slice(0, 10));
      } else {
        setNewsData([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setNewsData([]);
    }
  };

  useEffect(() => {
    getData('all'); 
  }, []);

  const handleInput = (e) => setSearch(e.target.value);

  const handleSearchClick = () => {
    if(search.trim() !== "") {
      setCategory('search');  
      getData('search', search);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearch("");

    if(cat === 'all') getData('all');
    else if(cat === 'trending') getData('trending');

    setMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo"><h1>Trendy News</h1></div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <span>&times;</span> : <span>&#9776;</span>}
        </button>

        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <li><a href="#!" onClick={() => handleCategoryChange('all')}>All News</a></li>
          <li><a href="#!" onClick={() => handleCategoryChange('trending')}>Trending</a></li>
        </ul>

        <div className={`searchBar ${menuOpen ? 'show' : ''}`}>
          <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </nav>

      <div><p className='head'>Stay Updated with TrendyNews</p></div>

      <div className='categoryBtn'>
        {["sports", "politics", "entertainment", "health", "fitness"].map(cat => (
          <button key={cat} onClick={() => { setCategory('search'); setSearch(cat); getData('search', cat); }}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {newsData ? <Card data={newsData} /> : <p className='loading'>Loading...</p>}
      </div>
    </div>
  );
};

export default Newsapp;
