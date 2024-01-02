import { initializeApp } from 'firebase/app';
import{getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBdQ4CgxSqn3rsfdCHdLEz_AJlgfxXJI4",
  authDomain: "bookstore-b1c55.firebaseapp.com",
  projectId: "bookstore-b1c55",
  storageBucket: "bookstore-b1c55.appspot.com",
  messagingSenderId: "245514091363",
  appId: "1:245514091363:web:70cab90be69d67ea05b156",
  databaseURL : "https://bookstore-b1c55-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;