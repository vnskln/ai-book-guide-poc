import React, { useState, useEffect } from 'react';
import PreferencesForm from './components/PreferencesForm';
import BookLists from './components/BookLists';
import RecommendationDisplay from './components/RecommendationDisplay';
import { getRecommendation } from './services/openai';
import { loadFromStorage, saveToStorage } from './utils/storage';
import './App.css';
import { Book } from './types/Book';
import Header from './components/Header';

function App() {
  const [preferences, setPreferences] = useState('');
  const [readBooks, setReadBooks] = useState('[]');
  const [rejectedBooks, setRejectedBooks] = useState('[]');
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Load data from session storage on initial render
  useEffect(() => {
    const storedPreferences = loadFromStorage('preferences');
    const storedReadBooks = loadFromStorage('readBooks');
    const storedRejectedBooks = loadFromStorage('rejectedBooks');
    const storedRecommendation = loadFromStorage('recommendation');

    if (storedPreferences) setPreferences(storedPreferences);
    if (storedReadBooks) setReadBooks(storedReadBooks);
    if (storedRejectedBooks) setRejectedBooks(storedRejectedBooks);
    if (storedRecommendation) setRecommendation(JSON.parse(storedRecommendation));
  }, []);

  // Save data to session storage when it changes
  useEffect(() => {
    saveToStorage('preferences', preferences);
    saveToStorage('readBooks', readBooks);
    saveToStorage('rejectedBooks', rejectedBooks);
    if (recommendation) {
      saveToStorage('recommendation', JSON.stringify(recommendation));
    }
  }, [preferences, readBooks, rejectedBooks, recommendation]);

  const handleGetRecommendation = async () => {
    setError('');
    setIsLoading(true);

    try {
      // Validate JSON input
      let parsedReadBooks: Book[] = [];
      let parsedRejectedBooks: Book[] = [];
      
      try {
        parsedReadBooks = JSON.parse(readBooks);
        parsedRejectedBooks = JSON.parse(rejectedBooks);
      } catch (e) {
        throw new Error('Invalid JSON format in your book lists.');
      }

      // Check if preferences are entered
      if (!preferences.trim()) {
        throw new Error('Please enter your reading preferences.');
      }

      const result = await getRecommendation(
        preferences,
        parsedReadBooks,
        parsedRejectedBooks
      );

      setRecommendation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <div className="content-wrapper">
          <div className="form-container">
            <PreferencesForm 
              preferences={preferences} 
              onPreferencesChange={setPreferences} 
            />
            <BookLists 
              readBooks={readBooks}
              rejectedBooks={rejectedBooks}
              onReadBooksChange={setReadBooks}
              onRejectedBooksChange={setRejectedBooks}
            />
            <div className="button-container">
              <button 
                className="recommendation-button"
                onClick={handleGetRecommendation}
                disabled={isLoading}
              >
                {isLoading ? 'Finding the perfect book...' : 'Get Recommendation'}
              </button>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
          <RecommendationDisplay recommendation={recommendation} isLoading={isLoading} />
        </div>
      </main>
      <footer>
        <div className="footer-content">
          <p>AI Book Guide - Proof of Concept © 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;