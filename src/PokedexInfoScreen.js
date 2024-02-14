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

export default PokedexInfoScreen;
