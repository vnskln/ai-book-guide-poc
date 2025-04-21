import React, { useState, useEffect } from 'react';

interface PreferencesFormProps {
  preferences: string;
  onPreferencesChange: (preferences: string) => void;
}

const MAX_CHARS = 1000;

const PreferencesForm: React.FC<PreferencesFormProps> = ({ preferences, onPreferencesChange }) => {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(preferences.length);
  }, [preferences]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      onPreferencesChange(value);
    }
  };

  return (
    <div className="form-section">
      <h2>Your Reading Preferences</h2>
      <p>
        Describe what you enjoy in books: genres, themes, writing styles, character types, etc.
        Also mention any languages you read in and what you dislike in books.
      </p>
      <textarea
        value={preferences}
        onChange={handleChange}
        placeholder="I enjoy science fiction with complex world-building and philosophical themes. I prefer character-driven stories with morally ambiguous protagonists..."
        maxLength={MAX_CHARS}
      />
      <div className={`character-counter ${charCount >= MAX_CHARS ? 'limit-reached' : ''}`}>
        {charCount}/{MAX_CHARS} characters
      </div>
    </div>
  );
};

export default PreferencesForm;