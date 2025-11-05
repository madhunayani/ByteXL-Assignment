import { useState } from 'react';
import axios from 'axios';

export default function QuoteGenerator() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/quote');
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch quote');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a quote when component mounts
  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div className="module-container quote-module">
      <h2>✨ Motivational Quote Generator</h2>
      
      <button onClick={handleNewQuote} className="quote-btn">
        {data ? 'Get Another Quote' : 'Get Quote'}
      </button>

      {isLoading && <p className="loading">Loading...</p>}
      
      {error && <p className="error">❌ {error}</p>}
      
      {data && !error && (
        <div className="quote-card">
          <blockquote>
            <p className="quote-text">"{data.quote}"</p>
            <footer className="quote-author">— {data.author}</footer>
          </blockquote>
        </div>
      )}
    </div>
  );
}
