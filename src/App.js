import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [search, setSearch] = useState('');
  const [pokeName, setPokeName] = useState('');
  const [pokeImg, setPokeImg] = useState('');
  const [evolutionChain, setEvolutionChain] = useState('');

  console.log(evolutionChain)

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokeName(search.toLowerCase());
  };

  // GET POKE FORM BY NAME
  useEffect(() => {
    if (!pokeName) return;
    const pokemon = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-form/${pokeName}/`
      );
      const data = await res.json();
      setPokeImg(data.sprites.front_default);
      console.log(data);
    };
    pokemon();
  }, [pokeName]);

  // GET EVOLUTION CHAIN URL
  useEffect(() => {
    if (!pokeName) return;

    const getEvolutionChain = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokeName}/`
      );
      const data = await res.json();
      console.log(data);
      setEvolutionChain(data.evolution_chain.url)
    };
    getEvolutionChain();
  }, [pokeName]);

  // GET EVOLUTIONS
  useEffect(() => {
    if (!evolutionChain) return;

    const getEvolutions = async () => {
      const res = await fetch(evolutionChain);
      const data = await res.json();
      console.log(data);
    };
    getEvolutions()
  }, [evolutionChain]);

  return (
    <div className="app">
      <div className="search-results">
        <ul className="list">
          <List pokeName={pokeName} pokeImg={pokeImg} search={search} />
        </ul>
      </div>
      <div className="container">
        <div className="scene">
          <img src="/pokemon.gif" alt="Pokemon scene" />
          <Search onHandleSearch={handleSearch} onHandleSubmit={handleSubmit} />
          <Pokemon pokeImg={pokeImg} />
        </div>
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

const List = ({ pokeName, pokeImg }) => {
  return (
    <>
      <li className="list-item">
        {pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}
        <img src={pokeImg} alt="Pokemon card" />
      </li>
      <li className="list-item">{pokeName}</li>
      <li className="list-item">{pokeName}</li>
      <li className="list-item">{pokeName}</li>
    </>
  );
};

export default App;
