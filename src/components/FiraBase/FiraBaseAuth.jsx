import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { authGoogle, providerGoogle } from "./FiraBaseConfig";
import { Google } from "@mui/icons-material";
import { dataContext } from '../context/DataContext'; // Importa el contexto

export default function FiraBaseAuth() {
  const { login } = useContext(dataContext); // Obtén la función login del contexto

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(authGoogle, providerGoogle);
      const user = result.user;
      const nameParts = user.displayName ? user.displayName.split(" ") : [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      // Guarda en sessionStorage
      sessionStorage.setItem("email", user.email || "");
      sessionStorage.setItem("urlImagen", user.photoURL || "");
      sessionStorage.setItem("nombres", firstName || "");
      sessionStorage.setItem("apellidos", lastName || "");

      // Actualiza el estado global de autenticación
      login({
        email: user.email,
        nombres: firstName,
        apellidos: lastName,
        urlImagen: user.photoURL,
        rol: 'usuario' // O el rol que quieras asignar por defecto
      });

      // Redirige a la página correspondiente
      window.location.hash = "/iniciada";
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>
        <Google style={{ fontSize: "40px" }} /> Iniciar sesión con Google
      </button>
    </div>
  );
}
