# 📱 InfoHub - All-in-One Utility Application

A modern Single Page Application (SPA) that seamlessly integrates three everyday utilities into a unified interface.

## ✨ Features

- **🌤️ Real-time Weather Display**: Get current weather, temperature, humidity, and wind speed for any city
- **💱 Currency Converter**: Convert INR to USD and EUR with live exchange rates
- **✨ Motivational Quote Generator**: Get inspired with random motivational quotes

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework with Hooks
- **Vite** - Lightning-fast development server & build tool
- **Axios** - Promise-based HTTP client
- **CSS3** - Advanced styling with responsive design and animations

### Backend
- **Node.js** - Server runtime environment
- **Express.js** - Minimal and flexible web application framework
- **Axios** - Server-side API requests
- **dotenv** - Environment variable management

### External APIs
- **OpenWeatherMap API** - Real-time weather data (1,000 free calls/day)
- **ExchangeRate-API** - Free currency conversion rates
- **Quotable API** - Motivational quotes (or mock data)

## 📂 Project Structure

InfoHub-Challenge/
├── client/ # React SPA Frontend
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/
│ │ │ ├── WeatherModule.jsx # Weather utility component
│ │ │ ├── CurrencyConverter.jsx # Currency conversion component
│ │ │ └── QuoteGenerator.jsx # Quote display component
│ │ ├── App.jsx # Main app with tab navigation
│ │ ├── App.css # Complete styling
│ │ ├── index.css # Global styles
│ │ └── main.jsx # React entry point
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js # Vite config with API proxy
│ ├── .gitignore
│ └── eslint.config.js
│
├── server/ # Node.js/Express Backend
│ ├── server.js # Main server with API endpoints
│ ├── .env # Environment variables (not in git)
│ ├── .gitignore
│ ├── package.json
│ └── node_modules/
│
├── .gitignore # Root gitignore
├── README.md # This file
├── vercel.json # Vercel deployment config
└── package.json # Root package (optional)



## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
git clone https://github.com/madhunayani/ByteXL-Assignment.git
cd InfoHub-Challenge


2. **Setup Backend**
cd server
npm install



4. **Setup Frontend**
cd ../client
npm install


5. **Configure API Key**
- Create `server/.env` file:
  ```
  PORT=3001
  OPENWEATHER_API_KEY=your_api_key_here
  ```
- Get free API key: https://openweathermap.org/api

5. **Start Backend** (Terminal 1)
cd server

npm start


7. **Start Frontend** (Terminal 2)
cd client

npm run dev


9. **Open in Browser**
http://localhost:5173


## 📡 API Endpoints

All endpoints return JSON with `success` flag and appropriate data.

| Endpoint | Method | Description | Parameters | Response |
|----------|--------|-------------|-----------|----------|
| `/api/weather` | GET | Current weather data | `city` (string, optional) | Temperature, condition, humidity, wind speed |
| `/api/currency` | GET | INR to USD/EUR conversion | `amount` (number, required) | Converted amounts, exchange rates |
| `/api/quote` | GET | Random motivational quote | None | Quote text, author |

### Example Requests (Postman)

**Quote API:**
GET http://localhost:3001/api/quote


**Weather API:**
GET http://localhost:3001/api/weather?city=Hyderabad


**Currency API:**
GET http://localhost:3001/api/currency?amount=1000



## 🎨 Features Implemented

✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
✅ **Tab Navigation** - Easy switching between three modules
✅ **Loading States** - User feedback during API calls
✅ **Error Handling** - Graceful error messages
✅ **Real-time Data** - Live weather and currency rates
✅ **React Hooks** - Modern state management with useState, useEffect
✅ **Axios Integration** - Promise-based API calls
✅ **Professional UI** - Gradient design with smooth animations
✅ **Vite Configuration** - API proxy for local development
✅ **Production Build** - Optimized build with Vite

## 🧪 Testing Checklist

- [ ] Backend server runs without errors
- [ ] Frontend dev server starts on localhost:5173
- [ ] All three API endpoints return data
- [ ] Weather tab loads and searches work
- [ ] Currency converter auto-converts on amount change
- [ ] Quote generator displays different quotes
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile

## 🌐 Deployment

### Deploy on Render

1. **Push to GitHub**
git add .
git commit -m "Initial commit: InfoHub utility app"
git push -u origin main


2. **Create Render Account**
- Go to https://render.com
- Sign up with GitHub
- Authorize Render to access your GitHub account

3. **Deploy Backend**
- In Render dashboard, click **"New +"**
- Select **"Web Service"**
- Connect GitHub repository
- Configure:
  - **Name**: `infohub-backend`
  - **Root Directory**: `server`
  - **Runtime**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Environment Variables**: 
    - `OPENWEATHER_API_KEY`: Your API key
- Deploy!

4. **Deploy Frontend**
- In Render dashboard, click **"New +"**
- Select **"Static Site"**
- Connect same GitHub repository
- Configure:
  - **Name**: `infohub-frontend`
  - **Root Directory**: `client`
  - **Build Command**: `npm install && npm run build`
  - **Publish Directory**: `dist`
- Deploy!

5. **Connect Frontend to Backend**
- Get backend URL from Render (e.g., `https://infohub-backend.onrender.com`)
- In frontend, update API calls to use backend URL
- Redeploy frontend

6. **Access Your App**
- Frontend URL: `https://infohub-frontend.onrender.com`
- Backend API: `https://infohub-backend.onrender.com/api/quote`




## 📝 Development Notes

### Backend Architecture
- Express server runs on port 3001
- Three route handlers for weather, currency, and quotes
- Error handling with try-catch blocks
- Secure API keys via environment variables

### Frontend Architecture
- Single-page application with tab-based navigation
- Three independent component modules
- Vite proxy routes `/api` calls to backend
- Responsive CSS Grid and Flexbox layouts

### API Integration
- Axios for HTTP requests from both frontend and backend
- Frontend communicates via relative paths (handled by proxy)
- Backend makes external API calls to weather and currency services

## 🐛 Troubleshooting

### Port Already in Use
Kill process on port 3001
lsof -ti:3001 | xargs kill -9

Kill process on port 5173
lsof -ti:5173 | xargs kill -9


### CORS Errors
- Ensure `vite.config.js` proxy is configured
- Restart frontend dev server
- Check backend CORS middleware is enabled

### API Returns 404
- Verify backend server is running
- Check API key is set in `.env`
- Ensure frontend is proxying to correct backend URL

### Build Errors
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Node version should be 20.19+ or 22.12+

## 📚 Learning Resources

- React Hooks: https://react.dev/reference/react
- Vite Guide: https://vitejs.dev/guide/
- Express.js: https://expressjs.com/
- Axios: https://axios-http.com/

## 👤 Author

**Madhu Nayani** - Full Stack Developer | MERN Stack | Generative AI

---

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

## 🙏 Acknowledgments

- ByteXL Assignment - Motivation
- OpenWeatherMap - Weather API
- ExchangeRate-API - Currency Rates
- Quotable API - Quote Data

---

**Made with ❤️ for ByteXL Assignment**

Last Updated: November 6, 2025
