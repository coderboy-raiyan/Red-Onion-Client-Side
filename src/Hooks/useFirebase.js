import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setError, setLoading, setUser } from "../Reducers/userSlice/userSlice";
import initializeAuth from "./../Pages/Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();

initializeAuth();

const useFirebase = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  //   signInWith google
  const googleSignIn = (location, history) => {
    dispatch(setLoading(true));
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const temporaryUser = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        saveDataToDataBase(temporaryUser, "put");
        dispatch(setError(""));
        const redirect_uri = location?.state?.from || "/home";
        history.push(redirect_uri);
        Swal.fire("Good job!", "Logged in successful", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorMessage}`,
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //   create user using email and password
  const signUpUser = (email, password, name, photoURL, location, history) => {
    dispatch(setLoading(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(setError(""));
        const temporaryUser = {
          email: email,
          displayName: name,
          photoURL: photoURL,
        };
        dispatch(setUser(temporaryUser));
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
        saveDataToDataBase(temporaryUser, "post");
        const redirect_uri = location?.state?.from || "/home";
        history.push(redirect_uri);
        Swal.fire("Good job!", "Registered successful", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorMessage}`,
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  // get

  //   Sign In with email, password
  const signInUser = (email, password, location, history) => {
    dispatch(setLoading(true));
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        dispatch(setError(""));
        const redirect_uri = location?.state?.from || "/home";
        history.push(redirect_uri);
        Swal.fire("Good job!", "Logged in successful", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorMessage}`,
        });
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

  // save user data to database
  const saveDataToDataBase = (data, type) => {
    if (type === "post") {
      axios
        .post("http://localhost:5000/users/register", data)
        .then((data) => console.log(data.data));
    } else {
      axios
        .put("http://localhost:5000/users/signIn", data)
        .then((data) => console.log(data.data));
    }
  };

  return {
    signInUser,
    signUpUser,
    logout,
    googleSignIn,
  };
};

export default useFirebase;
