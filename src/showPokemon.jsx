import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function ShowPokemon() {

  const [counts,setcount] = useState([]);
  const [url,seturl] = useState('https://pokeapi.co/api/v2/pokemon?limit=8');

  const navigate = useNavigate();

  function toDescription(url) {
    navigate(`/detail`,
      {
        state:{
          url
        }});
}


  useEffect(()=>cargapoke(),[]);

  function cargapoke() {  
    fetch(url)
    .then((response) => response.json())
    .then((datosAPI) => {
      const promises = datosAPI.results.map((pokemones) =>
        fetch(pokemones.url)
          .then((response) => response.json())
          .then((pokemon) => {
            pokemones.image = pokemon.sprites.front_default;
            pokemones.habilidad = pokemon.abilities;
            pokemones.Ps = pokemon.stats[0].base_stat;
            pokemones.type = pokemon.types[0].type.name;
          })
      );
  
      Promise.all(promises).then(() => {
        setcount((counts) => counts.concat(datosAPI.results));
        seturl(datosAPI.next);
      });
    });

  }

  function cargarmas() {
    cargapoke();
  }


  function getTypeClass(type) {
    const typeClasses = {
      grass: 'grass-type',
      fire: 'fire-type',
      water: 'water-type',
      electric: 'electric-type',
      psychic: 'psychic-type',
      fighting: 'fighting-type',
      dark: 'dark-type',
      dragon: 'dragon-type',
      steel: 'steel-type',
      normal: 'normal-type',
    };
    return typeClasses[type] || 'default-type';
  }


  return (
    <>
      <div className='Pokemons'>
        <div className='row contPoke'>
    {
      counts.map( (pokemon)=> (       


        <div className={`card pokeCard ${getTypeClass(pokemon.type)}`} key={pokemon.name}>
            <div className='card-header'>
              <p className='card-title'>{pokemon.name}</p>
              <p className='card-hp'>HP: {pokemon.Ps}</p>
            </div>

            <div className='card-image-container'>
              <img src={pokemon.image} className='card-img-top' alt={pokemon.name} />
            </div>

          <ul className="list-group list-group-flush">
            <li className='list-group-item'><b>Habilidades</b></li>
          {
            pokemon.habilidad.map((abilities) => (
              <li key={abilities.ability.name} className='list-group-item'>
                {abilities.ability.name}
              </li>
            ))
          }
          </ul>
          <div className="card-body">
            <button className="card-link " onClick={()=>toDescription(pokemon.url)} >Saber mas</button>
          </div>
        </div>

      ))
    }
    <button onClick={cargarmas} className='chargeMore'>Cargar mas</button>

      </div>
      </div>

    

      </>
  )
}


export default ShowPokemon
