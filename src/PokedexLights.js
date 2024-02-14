import { useEffect, useRef } from 'react';

const PokedexLights = ({ loading }) => {
  const lightOneRef = useRef(null);
  const lightTwoRef = useRef(null);
  const lightThreeRef = useRef(null);

  useEffect(() => {
    // make lights blink when loading
    if (loading) {
      lightOneRef.current.classList.add('blink');
      lightTwoRef.current.classList.add('blink');
      lightThreeRef.current.classList.add('blink');
    } else {
      lightOneRef.current.classList.remove('blink');
      lightTwoRef.current.classList.remove('blink');
      lightThreeRef.current.classList.remove('blink');
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

export default PokedexLights;
