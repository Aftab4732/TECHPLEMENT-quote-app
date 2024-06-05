
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [quote, setQuote] = useState({ content: '', author: '' });
    const [author, setAuthor] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchRandomQuote();
        const intervalId = setInterval(fetchRandomQuote, 5000); 
        return () => clearInterval(intervalId);
    }, []);

    const fetchRandomQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        setQuote(response.data);
      } catch (error) {
        console.error('Error fetching quote', error);
      }
    };

    const handleSearch = async (e) => {
      e.preventDefault();
  
      if (!author) {
  
        console.warn('Please enter an author name to search');
        return;
      }
  
      try {
        const searchUrl = `https://api.quotable.io/quotes?author=${author}`;
        const response = await axios.get(searchUrl);
        setSearchResults(response.data.results); 
      } catch (error) {
        console.error('Error searching quotes', error);
      }
    };
    return (
        <div className="app">
            <div className="title">Quote of the Day</div>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search by author" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="quote-container">
                <div className="quote" style={{ animation: 'fadeIn 1s ease-in-out' }}>
                    <p>"{quote.content}"</p>
                    <p>- {quote.author}</p>
                </div>
            </div>
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((result, index) => (
                        <div key={index} className="search-result">
                            <div className="quote">
                                <p>"{result.content}"</p>
                                <p>- {result.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
