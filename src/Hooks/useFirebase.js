import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../Reducers/userSlice/userSlice";
import initializeAuth from "./../Pages/Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();

initializeAuth();

const useFirebase = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  //   signInWith google
  const googleSignIn = () => {
    dispatch(setLoading(true));
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        dispatch(setError(""));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //   create user using email and password
  const signUpUser = (email, password) => {
    dispatch(setLoading(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(setError(""));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //   Sign In with email, password
  const signInUser = (email, password) => {
    dispatch(setLoading(true));
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(setError(""));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const logout = () => {
    dispatch(setLoading(true));
    signOut(auth)
      .then(() => {
        dispatch(setUser({}));
      })
      .catch((error) => {
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return {
    signInUser,
    signUpUser,
    logout,
    googleSignIn,
  };
};

export default useFirebase;