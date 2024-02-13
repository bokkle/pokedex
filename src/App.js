import { useEffect, useRef, useState } from 'react';
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
  const [hp, setHp] = useState(0);
  const [atk, setAtk] = useState(0);
  const [def, setDef] = useState(0);
  const [id, setId] = useState(0);
  const [position, setPosition] = useState(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(sprite);

  const handleSearch = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    if (id === 0) return;
    if (id <= 1025) {
      setPosition(id - 1);
    }
    if (id >= 10001) {
      setPosition(id - 8976);
    }
  }, [id]);

  const handlePrev = () => {
    if (position === 0) return;
    setPosition((prev) => prev - 1);
  };

  const handleNext = () => {
    if (position === 1301) return;
    setPosition((prev) => prev + 1);
  };

  // TODO: !!!!!  blinking lights & refactor

  useEffect(() => {
    const getPokemonList = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
        );
        const data = await res.json();
        setSearch(data.results[position].name);
        console.log(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getPokemonList();
  }, [position]);

  useEffect(() => {
    if (!search) return;
    setError(false);

    const getPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

        if (!res.ok) throw new Error('Something went wrong');

        const data = await res.json();

        if (!data) throw new Error('Pokemon not found');

        setName(data.name);
        setId(data.id);
        setHp(data.stats[0].base_stat);
        setAtk(data.stats[1].base_stat);
        setDef(data.stats[2].base_stat);
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
      } catch (err) {
        setError(true);
        setAnimated('');
        setSprite('');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    getPokemon();
  }, [search, id]);

  return (
    <div className="pokedex">
      <PokedexLeft
        sprite={sprite}
        animated={animated}
        loading={loading}
        hp={hp}
        atk={atk}
        def={def}
        error={error}
      />
      <PokedexRight
        onHandleSearch={handleSearch}
        onHandleNext={handleNext}
        onHandlePrev={handlePrev}
        type={type}
        search={search}
        name={name}
        id={id}
        position={position}
        loading={loading}
        error={error}
      />
    </div>
  );
};

const PokedexLeft = ({ sprite, animated, loading, hp, atk, def, error }) => {
  return (
    <div className="pokedex-left">
      <PokedexLights loading={loading} />
      <PokedexScreen sprite={sprite} animated={animated} loading={loading} />
      <PokedexControls />
      <PokedexSmallScreen
        hp={hp}
        atk={atk}
        def={def}
        loading={loading}
        error={error}
      />
    </div>
  );
};

const PokedexLights = ({ loading }) => {
  const lightOneRef = useRef(null);
  const lightTwoRef = useRef(null);
  const lightThreeRef = useRef(null);

  useEffect(() => {
    // Change box shadow when loading prop changes
    if (loading) {
      lightOneRef.current.classList.add = 'blink';
      lightTwoRef.current.classList.add = 'blink';
      lightThreeRef.current.classList.add = 'blink';
    }
  }, [loading]);

  return (
    <div className="pokedex-lights-container">
      <div className="pokedex-lights-lg" />
      <div className="pokedex-lights-sm-container">
        <div ref={lightOneRef} className="pokedex-lights-sm-light one" />
        <div ref={lightTwoRef} className="pokedex-lights-sm-light two" />
        <div ref={lightThreeRef} className="pokedex-lights-sm-light three" />
      </div>
    </div>
  );
};

const PokedexScreen = ({ sprite, animated, loading }) => {
  return (
    <>
      <div className="pokedex-screen-cut" />
      <div className="pokedex-screen">
        <div className="pokedex-screen-top">
          <div className="pokedex-screen-light" />
          <div className="pokedex-screen-light" />
        </div>
        <div className="pokedex-screen-image-container">
          {loading ? (
            <Loader />
          ) : (
            <img
              className="pokedex-screen-image"
              src={
                animated
                  ? animated
                  : sprite
                  ? sprite
                  : 'https://imgs.search.brave.com/f7FjotSM3giUdQRbFTMwB0GTUp7vbNeHkMQtcEheF9o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMi9RdWVz/dGlvbi1NYXJrLVRy/YW5zcGFyZW50LnBu/Zw'
              }
              alt="pokemon sprite"
            />
          )}
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

const Loader = () => {
  return <div className="ball"></div>;
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

const PokedexSmallScreen = ({ hp, atk, def, error, loading }) => {
  return (
    <div className="pokedex-smallScreen">
      <div className="pokedex-smallscreen-text-container">
        {loading ? (
          <p>Loading...</p>
        ) : !error ? (
          <>
            <p>HP: {hp}</p>
            <p>ATK: {atk}</p>
            <p>DEF: {def}</p>
          </>
        ) : (
          <p>Error</p>
        )}
      </div>
    </div>
  );
};

const PokedexRight = ({
  onHandleSearch,
  type,
  search,
  id,
  position,
  name,
  onHandleNext,
  onHandlePrev,
  loading,
  error,
}) => {
  return (
    <div className="pokedex-right">
      <PokedexSearch onHandleSearch={onHandleSearch} />
      <PokedexInfoScreen
        type={type}
        search={search}
        id={id}
        name={name}
        loading={loading}
        error={error}
      />
      <PokedexButtons
        onHandleNext={onHandleNext}
        onHandlePrev={onHandlePrev}
        position={position}
      />
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

const PokedexInfoScreen = ({ type, id, name, loading, error }) => {
  return (
    <div className="pokedex-info-container">
      {loading ? (
        <h2 className="pokemon-name">Loading...</h2>
      ) : !error ? (
        <>
          <h2 className="pokemon-name">
            {name.charAt(0).toUpperCase() + name.slice(1)}{' '}
            {id > 0 ? `#${id}` : null}
          </h2>
          <ul className="pokemon-types">
            <li>{type[0]}</li>
            {type[1] ? <li>{type[1]}</li> : null}
          </ul>
        </>
      ) : (
        <h2 className="pokemon-name">Error: not found</h2>
      )}
    </div>
  );
};

const PokedexButtons = ({ onHandleNext, onHandlePrev, position }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (position <= 0) {
      prevRef.current.innerHTML = '...';
      nextRef.current.innerHTML = 'Next';
    } else if (position >= 1301) {
      nextRef.current.innerHTML = '...';
      prevRef.current.innerHTML = 'Prev';
    } else {
      nextRef.current.innerHTML = 'Next';
      prevRef.current.innerHTML = 'Prev';
    }
  });

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
        <button
          ref={prevRef}
          className="pokedex-blackButton"
          onClick={onHandlePrev}
        >
          prev
        </button>
        <button
          ref={nextRef}
          className="pokedex-blackButton"
          onClick={onHandleNext}
        >
          next
        </button>
      </div>
    </>
  );
};

export default App;
