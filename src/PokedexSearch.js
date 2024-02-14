import { useState } from 'react';

const PokedexSearch = ({ onHandleSearch }) => {
  const [input, setInput] = useState('');

  const searchValue = input.toLowerCase();

  return (
    <div className="search-container">
      <input
        className="search-box"
        type="text"
        placeholder="Enter a Pokemon..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="search-button"
        onClick={() => onHandleSearch(searchValue)}
      >
        <i className="material-icons icon search-icon">search</i>
      </button>
    </div>
  );
};

export default PokedexSearch;
