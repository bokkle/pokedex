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

export default PokedexControls;
