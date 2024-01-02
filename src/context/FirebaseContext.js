import {  createContext, useContext } from "react";
import { initializeApp } from 'firebase/app';
import {getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import {getDatabase,set,ref,get} from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyBBdQ4CgxSqn3rsfdCHdLEz_AJlgfxXJI4",
  authDomain: "bookstore-b1c55.firebaseapp.com",
  projectId: "bookstore-b1c55",
  storageBucket: "bookstore-b1c55.appspot.com",
  messagingSenderId: "245514091363",
  appId: "1:245514091363:web:70cab90be69d67ea05b156",
  databaseURL : "https://bookstore-b1c55-default-rtdb.firebaseio.com/",
};

const FirebaseApp = initializeApp(firebaseConfig);
export const Firebaseauth = getAuth(FirebaseApp);

const googleProvider = new GoogleAuthProvider();

const database = getDatabase(FirebaseApp)


export const FirebaseContext = createContext(null);

export const useFirebase = () =>useContext(FirebaseContext);

export const FirebaseProvider = (props)=>{


    const SignUpUserWithEmailAndPassword =(email,password)=>{
       return createUserWithEmailAndPassword(Firebaseauth,email,password)
      }
    
    const signupWithGoogle = () =>{
        return signInWithPopup(Firebaseauth, googleProvider)

    }
    
    const LoginUserWithEmailAndPassword = (email,password)=>{
        return signInWithEmailAndPassword(Firebaseauth,email,password)
    }

    const putData = (key,data)=> set(ref(database,key),data);

    const getData = async (path) => {
        const dataRef = ref(database, path);
    
        try {
          const snapshot = await get(dataRef);
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log('No data available');
            return null;
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
          throw error;
        }
      };

      const handleLogout = async () => {
        try {
          await Firebaseauth.signOut();
          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
      }



   return <FirebaseContext.Provider
   value={{
    Firebaseauth,
    SignUpUserWithEmailAndPassword,
     LoginUserWithEmailAndPassword,
     signupWithGoogle,
     putData,
     getData,
     handleLogout
    }}
   > {props.children}</FirebaseContext.Provider>
}