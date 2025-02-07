import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GithubAuthProvider, onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css';
export function Login() {

  const [user, setUser] = useState(null);
  const [mail,setMail] = useState('');
  const [password,setPassword] = useState('');
  const [password2,setPassword2] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  },[])

  const navigate = useNavigate();

const googleAuthProvider = new GoogleAuthProvider()

const [register,setRegister] = useState(false);
// const email = ref('')
// const password = ref('')
// const password2 = ref('')
// var errors = ref([]);

// Extraer el nombre de usuario del correo electrónico


function toggleRegister() {
  setRegister(!register);
}

function loginWithGoogle() {
  signInWithPopup(auth, googleAuthProvider)
    .then(() => {
      console.log('Autenticación correcta')
      navigate('/');
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function logout() {
  signOut(auth)
    .then(() => {
      console.log('Cierre de sesión exitoso');
      navigate('/')
    })
    .catch((error) => console.error('Error:', error))
}

function handleFormSubmit() {
  if (register) {
    // Registro
    if (password === password2) {
      createUserWithEmailAndPassword(auth, mail, password)
        .then(() => {
          console.log('Usuario registrado correctamente');
          navigate('/');
        })
        .catch((error) => {
          console.error('Error al registrar:', error.message);
        })
    } else {
      console.error('Las contraseñas no coinciden');
    }
  } else {
    // Inicio de sesión
    signInWithEmailAndPassword(auth, mail, password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        navigate('/');

      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
      })
  }
}


const provider = new GithubAuthProvider();
function loginWithGithub() {
  signInWithPopup(auth, provider).then(() => {
    navigate('/');
  }
  ).catch((error) => {
    console.error('Error en el inicio de sesión con GitHub:', error);
  })




}

  return (
    
    <>

    <div className='Pokemons'>
        <div className='contPoke'>
        <div className="form-container">
        <div className='form-container-inner'>
        <NavLink to={-1} className="secondary-button back-btn">Atras</NavLink>
        {!user ? (
          <>
        <div className='auth-form'>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="ejemplo@algoMas.algo"
          value={mail} 
          onChange={(e) => setMail(e.target.value)} 
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Evita el envío del formulario si es necesario
              handleFormSubmit();
            }
          }}
          required
        />


        {register && (
        <>
            <label htmlFor="password2">Repite la contraseña:</label>
            <input
            name="password2"
            type="password"
            placeholder="Repite la contraseña"
            value={password2} 
            onChange={(e) => setPassword2(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Evita el envío del formulario si es necesario
                handleFormSubmit();
              }
            }}
            required
            />
        </>
        )}


        <button className="primary-button" onClick={handleFormSubmit}>
          { register ? "Registrarme" : "Iniciar sesión" }
        </button>
        <button onClick={toggleRegister} className="primary-button">
          { register ? "Ya tengo cuenta" : "Registrarme" }
        </button>
        </div>
            <div className='actions'>
            <button onClick={loginWithGoogle} className='secondary-button'>Iniciar sesión con Google</button>
            <button onClick={loginWithGithub}className='secondary-button'>Iniciar sesión con Github</button>
            </div>
            </>
          ) : 
          <div className='logout'>
            <p className='h1'>¿Desea cerrar sesion?</p>
          <button onClick={logout} className='primary-button'>Cerrar Sesion</button>
          </div>
          }
          </div>
          </div>
        </div>  
    </div>

    </>

  )

}