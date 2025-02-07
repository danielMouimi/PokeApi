import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



import './App.css'
import './detail.css'

function Detail() {

    const location = useLocation();
    const pokeUrl = location.state?.url;


  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(pokeUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        console.log(data.sprites)
        return fetch(data.species.url);
      })
      .then((response) => response.json())
      .then((speciesData) => {
        const entry = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setDescription(entry ? entry.flavor_text : "No description available.");

       
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching Pokémon data:", error));




  }, []);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="Pokemons">
      <div className='contPoke'>
        <div className='goBack-cont'>
          <NavLink to={-1} className="goBack">Atras</NavLink>
        </div>

      <h1 className="pokemon-title">
  {pokemon.name} #{pokemon.id}
</h1>
<div className='cont-hero'>


<div className='imagenes'>
{Object.entries(pokemon.sprites).map(([key, image]) =>
  image ? ( // Verificamos que la imagen exista
    typeof image === "object" ? (
      Object.entries(image).map(([k, Obj]) => {
        return Object.entries(Obj).map(([subKey, subImage]) => {
          if (subImage && typeof subImage != "object") {
            if (subImage.startsWith("https")) {
          return (
            <img
              key={subKey}
              src={subImage}
              alt={`${pokemon.name} - ${subKey}`}
              className="pokemon-image"
            />
          );
        }
      }
        });
      })
    ) : (
      <img
        key={key}
        src={image}
        alt={`${pokemon.name} - ${key}`}
        className="pokemon-image"
      />
    )
  ) : null
)}

</div>

<div className="stats-container">
  {pokemon.stats.map((stat) => (
    <div key={stat.stat.name} className="stat-item">
      <p className="stat-name">{stat.stat.name}</p>
      <div className="stat-bar-bg">
        <div
          className="stat-bar"
          style={{ width: `${(stat.base_stat / 150) * 100}%` }}
        >{stat.base_stat}</div>
      </div>
    </div>
  ))}
</div>
</div>

<div className='cont-info-hero'>
<div className='cont-info'>
<p className="section-title">Description:</p>
<p className="description">{description}</p>

<p className="section-title">Types:</p>
<div className="types-container">
  {pokemon.types.map((typeInfo) => (
    <span key={typeInfo.type.name} className="type-badge">
      {typeInfo.type.name}
    </span>
  ))}
</div>
</div>



<div className='cont-info'>
<p className="section-title">Abilities:</p>
<ul className="abilities-list">
  {pokemon.abilities.map((ability) => (
    <li key={ability.ability.name} className="ability-item">
      {ability.ability.name}
    </li>
  ))}
</ul>

<p className="section-title">Height:</p>
<p className="info">{pokemon.height / 10} m</p>

<p className="section-title">Weight:</p>
<p className="info">{pokemon.weight / 10} kg</p>

</div>
</div>

      </div>
    </div>
  );
};

export default Detail
