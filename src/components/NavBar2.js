import React from 'react';
import './css/NavBar.css';
import { IoCart } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import {useGlobalContext} from '../context/BookContext';
import { FaHistory } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useAlert } from '../context/AlertContext';


const NavBar = () => {
  const navigate = useNavigate();
  const { cart } = useGlobalContext();
  const {popup } =useAlert();

  return (
    <div className='nav'>
        <div>
            <h4 onClick={() => navigate("/")} style={{cursor:'pointer'}}>ReadSphere</h4>
        </div>
        <div className='cart'>
          <div className='cart_icon_container'>
          <label className='cartVal' onClick={() => navigate('/checkout')}>{cart.length}</label>
          <IoCart className='gotocart'  onClick={() => navigate('/checkout')}/>
          </div>
          <div className='history_page_icon'>
            <FaHistory onClick={() => navigate('/history')}/>
          </div>
          <div className='logout_icon' onClick={()=>popup()}>
            <IoLogOut />
          </div>
        </div>
    </div>
  )
}

export default NavBar;