// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration for both development and production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL || 'https://infohub-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Rest of your server code...
// Mock quotes data (you can replace with external API later)
const quotesDatabase = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" }
];

// ==================== API ENDPOINTS ====================

// 1. Quote API Endpoint - /api/quote
app.get('/api/quote', async (req, res) => {
  try {
    // Random selection from mock data
    const randomIndex = Math.floor(Math.random() * quotesDatabase.length);
    const randomQuote = quotesDatabase[randomIndex];
    
    // You can also use external API like Quotable:
    // const response = await axios.get('https://api.quotable.io/random');
    // res.json(response.data);
    
    res.json({
      success: true,
      quote: randomQuote.text,
      author: randomQuote.author
    });
  } catch (error) {
    console.error('Error fetching quote:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Could not fetch quote data.' 
    });
  }
});

// 2. Weather API Endpoint - /api/weather
app.get('/api/weather', async (req, res) => {
  try {
    // Get city from query params or use default
    const city = req.query.city || 'Hyderabad';
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false,
        error: 'Weather API key is not configured.' 
      });
    }

    // Call OpenWeatherMap API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(weatherUrl);
    
    // Extract only necessary data
    const weatherData = {
      success: true,
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Could not fetch weather data. Please check the city name and try again.' 
    });
  }
});

// 3. Currency Converter API Endpoint - /api/currency
app.get('/api/currency', async (req, res) => {
  try {
    // Get amount from query params
    const amount = parseFloat(req.query.amount) || 100;
    
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide a valid amount.' 
      });
    }

    // Using exchangerate-api.com (no API key required for basic usage)
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
    
    const rates = response.data.rates;
    
    // Calculate conversions
    const conversions = {
      success: true,
      amount: amount,
      from: 'INR',
      conversions: {
        USD: (amount * rates.USD).toFixed(2),
        EUR: (amount * rates.EUR).toFixed(2)
      },
      rates: {
        USD: rates.USD.toFixed(4),
        EUR: rates.EUR.toFixed(4)
      },
      lastUpdated: response.data.date
    };
    
    res.json(conversions);
  } catch (error) {
    console.error('Error fetching currency rates:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Could not fetch currency conversion data.' 
    });
  }
});

// Root endpoint - Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'InfoHub API is running!',
    endpoints: {
      quote: '/api/quote',
      weather: '/api/weather?city=YourCity',
      currency: '/api/currency?amount=100'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ InfoHub Backend Server is running on http://localhost:${PORT}`);
  console.log(`📍 Available endpoints:`);
  console.log(`   - GET /api/quote`);
  console.log(`   - GET /api/weather?city=YourCity`);
  console.log(`   - GET /api/currency?amount=100`);
});
