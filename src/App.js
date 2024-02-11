import { useEffect, useState } from 'react';
import './index.css';

function App() {
  return <Pokedex />;
}

const Pokedex = () => {
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [sprite, setSprite] = useState('');
  const [animated, setAnimated] = useState('');
  const [type, setType] = useState([]);
  const [id, setId] = useState(0);

  const handleSearch = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    if (!search) return;
    try {
      const getPokemon = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

        if (!res.ok) throw new Error('Something went wrong fetching pokemon');

        const data = await res.json();

        if (!data) throw new Error('Pokemon not found');
        console.log(data);

        setName(data.name);
        setId(data.id);
        setSprite(data.sprites.front_default);
        setAnimated(
          data['sprites']['versions']['generation-v']['black-white'][
            'animated'
          ]['front_default']
        );
        setType([
          data.types[0].type.name,
          data.types[1] ? data.types[1].type.name : null,
        ]);
      };
      getPokemon();
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }, [search]);

  return (
    <div className="pokedex">
      <PokedexLeft sprite={sprite} animated={animated} />
      <PokedexRight
        onHandleSearch={handleSearch}
        type={type}
        search={search}
        name={name}
        id={id}
      />
    </div>
  );
};

const PokedexLeft = ({ sprite, animated }) => {
  return (
    <div className="pokedex-left">
      <PokedexLights />
      <PokedexScreen sprite={sprite} animated={animated} />
      <PokedexControls />
      <PokedexSmallScreen />
    </div>
  );
};

const PokedexLights = () => {
  return (
    <div className="pokedex-lights-container">
      <div className="pokedex-lights-lg" />
      <div className="pokedex-lights-sm-container">
        <div className="pokedex-lights-sm-light one" />
        <div className="pokedex-lights-sm-light two" />
        <div className="pokedex-lights-sm-light three" />
      </div>
    </div>
  );
};

const PokedexScreen = ({ sprite, animated }) => {
  return (
    <>
      <div className="pokedex-screen-cut" />
      <div className="pokedex-screen">
        <div className="pokedex-screen-top">
          <div className="pokedex-screen-light" />
          <div className="pokedex-screen-light" />
        </div>
        <div className="pokedex-screen-image-container">
          <img
            className="pokedex-screen-image"
            src={animated ? animated : sprite}
          />
        </div>
        <div className="pokedex-screen-bottom">
          <div className="pokedex-screen-button" />
          <div className="pokedex-screen-vents">
            <div className="pokedex-screen-vent" />
            <div className="pokedex-screen-vent" />
            <div className="pokedex-screen-vent" />
            <div className="pokedex-screen-vent" />
          </div>
        </div>
      </div>
    </>
  );
};

const PokedexControls = () => {
  return (
    <>
      <div className="pokedex-controls">
        <div className="pokedex-controls-button" />
        <div className="pokedex-controls-longButton redButton" />
        <div className="pokedex-controls-longButton blueButton" />
      </div>
      <div className="pokedex-pad">
        <div className="pokedex-pad-middle">
          <div className="pokedex-pad-middle-circle" />
        </div>
        <div className="pokedex-pad-v" />
        <div className="pokedex-pad-h" />
      </div>
    </>
  );
};

const PokedexSmallScreen = () => {
  return <div className="pokedex-smallScreen" />;
};

const PokedexRight = ({ onHandleSearch, type, search, id, name }) => {
  return (
    <div className="pokedex-right">
      <PokedexSearch onHandleSearch={onHandleSearch} />
      <PokedexInfoScreen type={type} search={search} id={id} name={name} />
      <PokedexButtons />
    </div>
  );
};

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

const PokedexInfoScreen = ({ type, id, name }) => {
  return (
    <div className="pokedex-info-container">
      <h2 className="pokemon-name">
        {name.charAt(0).toUpperCase() + name.slice(1)}{' '}
        {id > 0 ? `#${id}` : null}
      </h2>
      <ul className="pokemon-types">
        <li>{type[0]}</li>
        {type[1] ? <li>{type[1]}</li> : null}
      </ul>
    </div>
  );
};

const PokedexButtons = () => {
  return (
    <>
      <div className="pokedex-buttons-shadow" />
      <div className="pokedex-buttons">
        <div className="pokedex-button first" />
        <div className="pokedex-button" />
        <div className="pokedex-button" />
        <div className="pokedex-button" />
        <div className="pokedex-button fifth" />
        <div className="pokedex-button sixth" />
        <div className="pokedex-button" />
        <div className="pokedex-button" />
        <div className="pokedex-button" />
        <div className="pokedex-button tenth" />
      </div>
      <div className="pokedex-longButtons">
        <div className="pokedex-longButton" />
        <div className="pokedex-longButton" />
      </div>
      <div className="pokedex-dualButtons-shadow" />
      <div className="pokedex-dualButtons">
        <div className="pokedex-dualButton first" />
        <div className="pokedex-dualButton second" />
      </div>
      <div className="pokedex-goldButton" />
      <div className="pokedex-blackButtons">
        <button className="pokedex-blackButton">prev</button>
        <button className="pokedex-blackButton">next</button>
      </div>
    </>
  );
};

export default App;
