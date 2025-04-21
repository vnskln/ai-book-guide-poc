import { Book, BookRecommendation } from '../types/Book';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function getRecommendation(
  preferences: string,
  readBooks: Book[],
  rejectedBooks: Book[]
): Promise<BookRecommendation> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      'OpenAI API key is missing. Please add your key to a .env file with the variable name VITE_OPENAI_API_KEY.'
    );
  }

  // Format the user's read books into a readable format for the prompt
  const readBooksFormatted = readBooks.map(book => 
    `- "${book.title}" by ${book.author} (${book.language}) - Rating: ${book.rating}`
  ).join('\n');

  // Format the user's rejected books into a readable format for the prompt
  const rejectedBooksFormatted = rejectedBooks.map(book => 
    `- "${book.title}" by ${book.author} (${book.language})`
  ).join('\n');

  // Construct the prompt for OpenAI
  const prompt = `
You are an expert literary recommendation system that suggests books based on user preferences and reading history.

USER PREFERENCES:
${preferences}

BOOKS THE USER HAS READ:
${readBooksFormatted || 'None provided.'}

BOOKS THE USER HAS REJECTED OR ISN'T INTERESTED IN:
${rejectedBooksFormatted || 'None provided.'}

Based on this information, suggest ONE book that the user would likely enjoy. The book should:
1. Match their stated preferences
2. Be different from books they've already read or rejected
3. Consider their language preferences if mentioned

Provide your response in the following JSON format:
{
  "title": "The Book Title",
  "author": "Author Name",
  "language": "Language",
  "plotSummary": "A brief, spoiler-free summary of the plot (2-3 sentences)",
  "justification": "Why you think the user will enjoy this book based on their preferences and reading history (3-4 sentences)",
  "additionalInfo": "Any other relevant information (optional)"
}

IMPORTANT: Ensure your response is in proper JSON format with no markdown or additional text.
`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful literary recommendation assistant that provides personalized book suggestions.'
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get recommendation from OpenAI');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No recommendation received from OpenAI');
    }

    // Extract the JSON object from the content
    try {
      // Find anything that looks like a JSON object in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const recommendation = JSON.parse(jsonMatch[0]);
        return recommendation;
      } else {
        throw new Error('Could not parse recommendation data');
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', content);
      throw new Error('Failed to parse recommendation data');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}