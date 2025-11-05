require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// ==================== CORS CONFIGURATION ====================
// Allow requests from both development and production
const corsOptions = {
  origin: function (origin, callback) {
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:5173',           // Local development
      'http://localhost:3000',           // Alternative local
      'https://infohub-frontend-wqak.onrender.com',  // Your Render frontend URL
      'https://infohub-frontend.onrender.com',       // Generic Render URL
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// ==================== HEALTH CHECK ENDPOINT ====================
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

// ==================== QUOTE API ENDPOINT ====================
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

app.get('/api/quote', async (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * quotesDatabase.length);
    const randomQuote = quotesDatabase[randomIndex];
    
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

// ==================== WEATHER API ENDPOINT ====================
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'Hyderabad';
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false,
        error: 'Weather API key is not configured.' 
      });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(weatherUrl);
    
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

// ==================== CURRENCY API ENDPOINT ====================
app.get('/api/currency', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 100;
    
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide a valid amount.' 
      });
    }

    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
    
    const rates = response.data.rates;
    
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

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`✅ InfoHub Backend Server is running on port ${PORT}`);
  console.log(`📍 Available endpoints:`);
  console.log(`   - GET /api/quote`);
  console.log(`   - GET /api/weather?city=YourCity`);
  console.log(`   - GET /api/currency?amount=100`);
  console.log(`🌐 CORS enabled for:`);
  console.log(`   - http://localhost:5173`);
  console.log(`   - https://infohub-frontend-wqak.onrender.com`);
});
