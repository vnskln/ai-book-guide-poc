import React from 'react';

interface BookListsProps {
  readBooks: string;
  rejectedBooks: string;
  onReadBooksChange: (books: string) => void;
  onRejectedBooksChange: (books: string) => void;
}

const BookLists: React.FC<BookListsProps> = ({
  readBooks,
  rejectedBooks,
  onReadBooksChange,
  onRejectedBooksChange
}) => {
  const handleReadBooksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onReadBooksChange(e.target.value);
  };

  const handleRejectedBooksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onRejectedBooksChange(e.target.value);
  };

  return (
    <>
      <div className="form-section">
        <h2>Books You've Read</h2>
        <p>
          Enter books you've read with your rating (up/down) in JSON format. Include title, author, and language.
        </p>
        <textarea
          value={readBooks}
          onChange={handleReadBooksChange}
          placeholder={`[
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
  }
]`}
        />
      </div>

      <div className="form-section">
        <h2>Books You're Not Interested In</h2>
        <p>
          Enter books you've rejected or aren't interested in reading in JSON format.
        </p>
        <textarea
          value={rejectedBooks}
          onChange={handleRejectedBooksChange}
          placeholder={`[
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
]`}
        />
      </div>
    </>
  );
};

export default BookLists;