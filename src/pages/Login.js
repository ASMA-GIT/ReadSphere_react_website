import React,{useState} from 'react';
import './css/login.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import {useFirebase} from '../context/FirebaseContext'




const Login = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [email,setEmail] = useState("");
    const [password, setPassword ] = useState("");

    const signinUser =() =>{
        console.log("hey");
        firebase.LoginUserWithEmailAndPassword(email,password)
        .then((value)=>{
            alert("logged Successfully");
            navigate('/catalog')

            // checkAuthState();
        })
        .catch((e)=>console.log(e))
    }
  return (
    <div className='page'>
    <div className='left-bg'></div>
    <div className='right-bg'></div>
        <div className='login__page'>
        
        <div className='form__container'>
            <h2 className='title'>User Login </h2>
            <div>
                <input type='email' placeholder='Email'  onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div>
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div>
                <button className='btn' onClick={signinUser}>Login</button>
            </div>
            <div className='newAccount'>
                <p>Don't have an account? <span className='highlight' onClick={() => navigate('/signup')} >Create new</span></p>
            </div>
            <div className='separator'><span className='bgColor'>or</span></div>
            <div >
                <span className='googleSignin'><FcGoogle  /> Sign in with Google</span>
            </div>
        </div>
    </div>
  
    </div>
  )
}

export default Login