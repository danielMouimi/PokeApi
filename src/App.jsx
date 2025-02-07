import { useState } from 'react';
import { useEffect } from 'react';
import ShowPokemon from './showPokemon';
import { Error404 } from './Error404';
import Detail from './Detail';
import { Login } from './login';
import { Game } from './Game';
import { WinOrLose } from './WinOrLose';

import { RutasPrivadas } from './RutasPrivadas';
import Landing from './Landing';
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './index.css';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  },[])


  return (
    <>
    
      <BrowserRouter>

      <div className='nav'>
        <Link to='/'>inicio</Link>
        <Link to='/showPokemon'>Mostrar Pokemons</Link>
        <Link to='/pkGame'>Jugar</Link>


        {user ? (
          <>
            <p>Bienvenido, {user.displayName ? user.displayName:user.email.split('@')[0]}</p>
            <Link to='/login'>Cerrar Sesión</Link>
          </>
        ) : 
        <Link to='/login'>Login</Link>
        }

      </div>

        <Routes>

          <Route path='/' element={<Landing/>}></Route>
          <Route path='/login' element={<Login></Login>}/>
          
          <Route element={<RutasPrivadas></RutasPrivadas>}>
              <Route path='/showPokemon' element={<ShowPokemon/>}></Route>
          </Route>

          <Route element={<RutasPrivadas></RutasPrivadas>}>
              <Route path='/pkGame' element={<Game/>}></Route>
          </Route>

          <Route path='/detail' element={<Detail/>}/>
          <Route path='/checkwin' element={<WinOrLose/>}/>

          <Route path='*' element={<Error404/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
