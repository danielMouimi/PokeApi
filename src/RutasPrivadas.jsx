import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function RutasPrivadas() {
    let [usuario, setUsuario] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("cambio en ususario");
                setUsuario(<Outlet/>);
            } else {
                console.log("El usuario no esta registrado, no entra");
                setUsuario(<Navigate to="/login" />);
            }
        })
    }, []);

    return (
        usuario
    )
}