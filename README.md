# AI Book Guide - Proof of Concept

A minimal Proof of Concept application for generating personalized book recommendations using OpenAI's o4-mini model.

## Features

- Input your reading preferences
- Track books you've read with ratings
- List books you're not interested in
- Generate personalized book recommendations
- View recommendations with plot summaries and justifications

## Getting Started

### Prerequisites

- Node.js (v16+)
- An OpenAI API key with access to the o4-mini model

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   (You can copy the `.env.example` file and rename it to `.env`)

### Running the Application

Start the development server:
```
npm run dev
```

Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173/).

## Usage

1. Enter your reading preferences in the first text area
2. Add books you've read with ratings in JSON format
3. Add books you're not interested in with JSON format
4. Click "Get Recommendation" to generate a personalized book suggestion
5. View the recommendation with book details, plot summary, and justification

### Example Inputs

#### Reading Preferences
```
I enjoy science fiction with complex world-building and philosophical themes. I prefer character-driven stories with morally ambiguous protagonists. I'm fascinated by books that explore the impact of technology on society, particularly AI and virtual reality.
```

#### Read Books (JSON format)
```json
[
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "language": "English",
    "rating": "up"
  },
  {
    "title": "Neuromancer",
    "author": "William Gibson",
    "language": "English",
    "rating": "up"
  },
  {
    "title": "The Three-Body Problem",
    "author": "Liu Cixin",
    "language": "English",
    "rating": "down"
  }
]
```

#### Rejected Books (JSON format)
```json
[
  {
    "title": "Ready Player One",
    "author": "Ernest Cline",
    "language": "English"
  },
  {
    "title": "The Hunger Games",
    "author": "Suzanne Collins",
    "language": "English"
  }
]
```

## Project Structure

- `src/components/` - React components
- `src/services/` - API integration
- `src/types/` - TypeScript types
- `src/utils/` - Utility functions

## Additional Notes

- This is a Proof of Concept application and doesn't include persistent storage
- Your data is saved in session storage and will persist between page refreshes
- The application requires an OpenAI API key to function