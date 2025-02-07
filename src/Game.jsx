import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ranking } from "./Ranking";
import "./App.css";

export function Game() {
    const [types, setTypes] = useState([]);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [reveal, setReveal] = useState(0);


    const navigate = useNavigate();

    function checkWin(winOrLose) {
      navigate(`/checkwin`,
        {
          state:{
            winOrLose,
            name
          }});
  }

    useEffect(() => {
        info();
    }, []);

    function info() {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`)
            .then(response => response.json())
            .then(pokemon => {
                setTypes(pokemon.types);
                setImage(pokemon.sprites.other.home.front_default);
                setName(pokemon.name);
                console.log(pokemon.name);
                setAttempts(0);
                setReveal(60);
                setGuess('');
            });
    }

    function checkGuess() {
        if (guess.toLowerCase() === name.toLowerCase()) {
            checkWin(true);
        } else {
            if(attempts < 4) {
            setAttempts(attempts + 1);
            setReveal(prevReveal => (prevReveal < 100 ? prevReveal + 5 : 100)); // Aumenta la parte visible
            } else {
                checkWin(false);
            }
        }
    }

    function checkEnter(event) {
        if (event.key === "Enter") {
            checkGuess();
          }
    }

    return (
        <div className="Pokemons">
            <div className="contPoke">
                <div 
                    className="image-container"
                    style={{
                        clipPath: `inset(${100 - reveal}% ${100 - reveal}% round 20%)`
                    }}
                >
                    <img src={image} alt="Pokémon" className="pokemon-game-image" />
                </div>

                {attempts >= 3 && (
                    <div className="pistas">
                        <p>Pista (tipos del pokemon):</p>
                        {types.map((typeObj, index) => (
                            <p key={index}>{typeObj.type.name}</p>
                        ))}
                    </div>
                )}

                <div className="answer-cont">
                <input 
                    type="text"
                    className="gess-input"
                    value={guess} 
                    onChange={(e) => setGuess(e.target.value)} 
                    onKeyDown={checkEnter}
                    placeholder="¿Quién es este Pokémon?" 
                />
                <button className="gess-button"onClick={checkGuess}>Adivinar</button>
                </div>

                <Ranking></Ranking>
            </div>
        </div>
    );
}
