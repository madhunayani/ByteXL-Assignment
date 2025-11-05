import { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('Weather');

  const tabs = ['Weather', 'Currency', 'Quote'];

  return (
    <div className="app">
      <header className="app-header">
        <h1>📱 InfoHub - All-in-One Utility App</h1>
        <p>Your personal assistant for weather, currency, and motivation</p>
      </header>

      <nav className="tabs-navigation">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="content-container">
        {activeTab === 'Weather' && <WeatherModule />}
        {activeTab === 'Currency' && <CurrencyConverter />}
        {activeTab === 'Quote' && <QuoteGenerator />}
      </main>

      <footer className="app-footer">
        <p>© 2025 InfoHub | Built with React & Node.js</p>
      </footer>
    </div>
  );
}
