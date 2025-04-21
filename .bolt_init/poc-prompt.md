# AI Book Guide - Proof of Concept Generator Prompt

## Overview
Create a minimal Proof of Concept for the AI Book Guide application that focuses exclusively on the core recommendation functionality. The PoC should test if we can effectively generate personalized book recommendations based on user preferences and reading history.

## Scope
Develop a single-page web application with the following features:
- A text area for user reading preferences (max 1000 characters)
- A text area for listing read books with ratings in JSON format
- A text area for listing rejected book suggestions in JSON format
- A "Get Recommendation" button that generates a suggestion using OpenAI's o4-mini model
- Display of the recommendation with a brief plot summary and justification

## Technical Requirements
- Frontend: React + basic CSS (no need for TypeScript, Tailwind or component libraries)
- AI: OpenAI API with o4-mini model using an OpenAI token for authentication
- No user authentication for this PoC
- No persistent storage required (session storage is sufficient)

## Example Input Formats

### User Preferences (Plain Text)
```
I enjoy science fiction with complex world-building and philosophical themes. I prefer character-driven stories with morally ambiguous protagonists. I'm fascinated by books that explore the impact of technology on society, particularly AI and virtual reality. I dislike overly romantic plots but appreciate subtle romantic subplots. I read in English and Polish.
```

### Read Books List (JSON)
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

### Rejected Books List (JSON)
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

## Out of Scope
- User registration/login
- Multiple recommendation generation
- Persistent book lists
- Mobile optimization
- Social features
- Book categorization/tagging

## Implementation Plan
Before writing any code, please:
1. Create a detailed technical plan with component structure
2. Describe the API integration approach for OpenAI's o4-mini model
3. Present a simple wireframe/mockup of the UI
4. Outline the prompt engineering strategy for generating recommendations

Wait for my explicit approval of your plan before proceeding with implementation.

## Deliverables
After approval, create:
1. A functioning single-page application
2. Necessary API integration code
3. Simple, clean UI with basic styling
4. Documentation on how to run the PoC locally
5. Sample prompts that demonstrate the recommendation capability

## Success Criteria
The PoC will be considered successful if:
- It can generate relevant book recommendations based on user input
- Recommendations include brief plot summaries without spoilers
- Recommendations provide justification based on user preferences
- The application is responsive and intuitive to use 