import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
export default function Landing() {

  const navigate = useNavigate();

  function game() {
    navigate(`/pkGame`);
  }
  function pokemons() {
    navigate(`/showPokemon`);
  }
  return (
    <div>
      {/* Sección Hero con Carrusel */}
      <section className="hero">
        <div id="pokemonCarousel" className="carousel slide carr" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="../images/fondo1.jpg" alt="Pokemon 1" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="../images/fondo2.jpg" alt="Pokemon 2" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="../images/fondo3.jpg" alt="Pokemon 3" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="../images/fondo4.jpg" alt="Pokemon 4" />
            </div>

            </div>
            
            <div className="hero-overlay">
                <h1>Explora el mundo Pokémon</h1>
                <div className="container mt-5 text-center text-buttons">
                <div className="row">
                <div className="col-md-6 mb-4">
                    <h2>Explora Pokémon</h2>
                    <p>Descubre información sobre todos los Pokémon en nuestra base de datos.</p>
                    <button className="btn btn-primary" onClick={pokemons}>Explorar</button>
                </div>
                <div className="col-md-6 mb-4">
                    <h2>Juega a nuestro juego</h2>
                    <p>Disfruta de una increíble aventura Pokémon en nuestro juego exclusivo.</p>
                    <button className="btn btn-success"onClick={game}>Jugar Ahora</button>
                </div>
                </div>
            </div>
            </div>
    

        </div>
    </section>
       
    </div>
  );
}
