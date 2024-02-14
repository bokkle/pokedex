import PokedexSmallScreen from './PokedexSmallScreen';
import PokedexControls from './PokedexControls';
import PokedexScreen from './PokedexScreen';
import PokedexLights from './PokedexLights';

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

export default PokedexLeft;
