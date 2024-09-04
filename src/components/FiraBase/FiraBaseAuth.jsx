import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { authGoogle, providerGoogle} from "./FiraBaseConfig";
import { Google} from "@mui/icons-material";

export default function FiraBaseAuth() {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(authGoogle, providerGoogle);
      setUser(result.user);
      cookies.set("email", result.user.email, {
        secure: true,
        sameSite: "None",
        path: "/",
      });
      cookies.set("imageUrl", result.user.photoURL, {
        secure: true,
        sameSite: "None",
        path: "/",
      });
      cookies.set("nombres", result.user.displayName, {
        secure: true,
        sameSite: "None", 
        path: "/",
      });
      window.location.hash = "/iniciada";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <> {} </>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>
            <Google style={{ fontSize: "40px" }} /> Iniciar sesión con Google
          </button>
        </>
      )}
    </div>
  );
}
