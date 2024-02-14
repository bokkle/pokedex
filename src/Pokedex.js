import { useEffect, useState } from 'react';
import PokedexRight from './PokedexRight';
import PokedexLeft from './PokedexLeft';

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

  useEffect(() => {
    const getPokemonList = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
        );
        const data = await res.json();
        setSearch(data.results[position].name);
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

export default Pokedex;
