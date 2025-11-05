import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CurrencyConverter() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(1000);

  const fetchCurrency = async (amountValue) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/currency?amount=${amountValue}`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch currency data');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrency(amount);
  }, [amount]); // Only 'amount' as dependency

  return (
    <div className="module-container currency-module">
      <h2>💱 Currency Converter</h2>
      
      <div className="input-box">
        <label htmlFor="amount">Amount (INR):</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
          placeholder="Enter amount"
          min="0"
        />
      </div>

      {isLoading && <p className="loading">Loading...</p>}
      
      {error && <p className="error">❌ {error}</p>}
      
      {data && !error && (
        <div className="currency-card">
          <h3>Conversion Rates</h3>
          <div className="conversion-result">
            <p>₹ {data.amount} INR</p>
          </div>
          <div className="currency-results">
            <div className="currency-item">
              <h4>USD</h4>
              <p className="result">${data.conversions.USD}</p>
              <p className="rate">Rate: 1 INR = {data.rates.USD}</p>
            </div>
            <div className="currency-item">
              <h4>EUR</h4>
              <p className="result">€{data.conversions.EUR}</p>
              <p className="rate">Rate: 1 INR = {data.rates.EUR}</p>
            </div>
          </div>
          <p className="last-updated">Last Updated: {data.lastUpdated}</p>
        </div>
      )}
    </div>
  );
}
