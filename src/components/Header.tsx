import React from 'react';
import { BookOpenCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-content">
        <BookOpenCheck className="header-logo" size={28} />
        <h1>AI Book Guide</h1>
      </div>
    </header>
  );
};

export default Header;