import { useEffect, useRef } from 'react';

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

export default PokedexButtons;
