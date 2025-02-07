import { useState, useEffect } from "react";
import { Ranking } from "./Ranking";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";


export function WinOrLose() {
    const location = useLocation();
    const win = location.state?.winOrLose;
    const poke = location.state?.name;

    const [user, setUser] = useState(null);
    const [victorias,setVictorias] = useState(0);


    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        }

      });
    }, []);

    useEffect(() => {
        if (user) {
            checkAndCreateUserRanking();
        }
    }, [user]);
  
    function checkAndCreateUserRanking() {
        if (!user || !user.uid) return;
      const userRankingRef = doc(db, "Ranking", user.uid);
  
   
        getDoc(userRankingRef)
        .then((docSnap) =>{

            if (docSnap.exists()) {
                if (win) {
                    updateDoc(userRankingRef,{ victorias : (docSnap.data().victorias+1)}); 
                    setVictorias(docSnap.data().victorias+1);
                }else {
                    setVictorias(docSnap.data().victorias);
                }
            } else {
                console.log(user.displayName)
                let nombre = user.displayName ? user.displayName:user.email.split('@')[0];
              setDoc(userRankingRef, { usuario: nombre, victorias: 0 });
            }
        })
        .catch((error) => console.error("Error al obtener/crear ranking:", error));  

    }
  


    return (
        <>
        <div className='Pokemons'>
            <div className='contPoke'>
                <div className="winPage">
            {
                win ?
                (
                    <>
                    <h1>Correcto Has ganado.</h1>
                    <p>numero de victorias{victorias}</p>
                    </>
                )
                :
                (
                    <>
                    <h1>Has perdido, el pokemon era: {poke}</h1>
                    <p>numero de victorias {victorias}</p>
                    </>
                )
            }
            <NavLink to={-1} className="goBack">Volver a jugar</NavLink>
            <Ranking></Ranking>
            </div>
            </div>
        </div>
        </>
    )

}