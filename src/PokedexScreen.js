import Loader from './Loader';

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

export default PokedexScreen;
