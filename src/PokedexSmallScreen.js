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

export default PokedexSmallScreen;
