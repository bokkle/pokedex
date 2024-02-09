import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [search, setSearch] = useState('');
  const [pokeName, setPokeName] = useState('');
  const [pokeImg, setPokeImg] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokeName(search.toLowerCase());
  };

  useEffect(() => {
    const pokemon = async () => {
      if (!pokeName) return;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-form/${pokeName}/`
      );
      const data = await res.json();
      setPokeImg(data.sprites.front_default);
    };
    pokemon();
  }, [pokeName]);

  return (
    <div className="container">
      <div className="scene">
        <img src="/pokemon.gif" alt="Pokemon scene" />
        <Search onHandleSearch={handleSearch} onHandleSubmit={handleSubmit} />
        <Pokemon pokeImg={pokeImg} />
      </div>
    </div>
  );
}

const Search = ({ onHandleSearch, onHandleSubmit }) => {
  return (
    <div className="search">
      <form onSubmit={(e) => onHandleSubmit(e)}>
        <input
          type="text"
          placeholder="Search pokemon"
          onChange={(e) => onHandleSearch(e)}
        />
      </form>
    </div>
  );
};

const Pokemon = ({ pokeImg }) => {
  return (
    <div className="pokemon__container">
      {pokeImg && <img src={pokeImg} alt="searched pokemon" />}
    </div>
  );
};

export default App;
