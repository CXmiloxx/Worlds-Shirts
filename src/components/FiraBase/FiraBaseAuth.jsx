import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { authGoogle, providerGoogle } from "./FiraBaseConfig";
import { Google } from "@mui/icons-material";

export default function FiraBaseAuth() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(authGoogle, providerGoogle);
      const user = result.user;
      const nameParts = user.displayName ? user.displayName.split(" ") : [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      setUser(user);
      sessionStorage.setItem("email", user.email || "");
      sessionStorage.setItem("urlImagen", user.photoURL || "");
      sessionStorage.setItem("nombres", firstName || "");
      sessionStorage.setItem("apellidos", lastName || "");

      window.location.hash = "/iniciada";
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>Bienvenido, {user.displayName}</div>
      ) : (
        <button onClick={handleGoogleSignIn}>
          <Google style={{ fontSize: "40px" }} /> Iniciar sesión con Google
        </button>
      )}
    </div>
  );
}
  