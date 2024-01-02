import React,{useState} from 'react';
import './css/signup.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import {useFirebase} from '../context/FirebaseContext';


const SignUp = () => {

    const navigate = useNavigate();
    const firebase = useFirebase();
    const [fullName, setFullName] = useState('');
    const [email,setEmail] = useState("");
    const [password, setPassword ] = useState("");

    const SignUpUser =()=>{
        firebase.SignUpUserWithEmailAndPassword(email,password)
        .then((value) => {
            const user = value.user;
            console.log(user)
            alert('Account creation Successful. Login to your account');
            navigate('/login');
        })
        .catch((e)=>alert(e));
        firebase.putData(`users/${fullName}`,{email,password})
      }

      const signupUserWithGoogle = () => {
        firebase.signupWithGoogle().then(() => {
          navigate('/login'); 
        });
      };

  return (
    <div className='page'>
        <div className='left-bg'></div>
        <div className='right-bg'></div>
        <div className='signup__page'>
        <div className='form__container'>
            <h2 className='title'>SignUp User</h2>
            <div>
                <input type='text' placeholder='Full Name'  onChange={(e)=>setFullName(e.target.value)}/>
            </div>
            <div>
                <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div>
                <input type='password' placeholder='Enter Password' />
            </div>
            <div>
                <input type='password' placeholder='Confirm Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div>
                <button className='btn' onClick={SignUpUser}>SignUp</button>
            </div>
            <div className='newAccount'>
                <p>Already have an account? <span className='highlight' onClick={() => navigate('/login')} >Log In</span></p>
            </div>
            <div className='separator'><span className='bgColor'>or</span></div>
            <div onClick={() => signupUserWithGoogle()} style={{cursor:'pointer'}}>
                <span className='googleSignin'> <FcGoogle/> Sign up with Google</span>
            </div>
        </div>
    </div>
    </div>  
  )
}

export default SignUp