import PokedexButtons from './PokedexButtons';
import PokedexInfoScreen from './PokedexInfoScreen';
import PokedexSearch from './PokedexSearch';

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

export default PokedexRight;
