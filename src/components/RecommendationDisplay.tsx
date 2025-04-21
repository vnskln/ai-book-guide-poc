import React from 'react';
import { BookRecommendation } from '../types/Book';

interface RecommendationDisplayProps {
  recommendation: BookRecommendation | null;
  isLoading: boolean;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendation, isLoading }) => {
  return (
    <div className="recommendation-container">
      <h2>Your Personalized Recommendation</h2>
      
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Finding your next favorite book...</p>
        </div>
      )}
      
      {!isLoading && !recommendation && (
        <div className="placeholder-message">
          <p>Enter your preferences and book history, then click "Get Recommendation" to receive a personalized book suggestion.</p>
        </div>
      )}
      
      {!isLoading && recommendation && (
        <div className="recommendation-content">
          <h3 className="book-title">{recommendation.title}</h3>
          <p className="book-author">by {recommendation.author}</p>
          
          <div className="recommendation-section">
            <p className="section-title">Plot Summary</p>
            <p>{recommendation.plotSummary}</p>
          </div>
          
          <div className="recommendation-section">
            <p className="section-title">Why You Might Like This</p>
            <p>{recommendation.justification}</p>
          </div>
          
          {recommendation.additionalInfo && (
            <div className="recommendation-section">
              <p className="section-title">Additional Information</p>
              <p>{recommendation.additionalInfo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationDisplay;