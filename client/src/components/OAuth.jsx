import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const resultwithGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultwithGoogle.user.displayName,
          email: resultwithGoogle.user.email,
          photoURL: resultwithGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signinSuccess(data.data.user));
        navigate("/");
      } else {
        console.error("Server error:", data.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <Button
      className="w-full mt-2"
      type="button"
      gradientDuoTone='pinkToOrange'
      outline
      onClick={handleGoogleClick} 
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      Sign In with Google
    </Button>
  );
}

export default OAuth;
