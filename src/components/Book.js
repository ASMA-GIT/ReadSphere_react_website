import React,{useCallback} from 'react';
import { Link } from 'react-router-dom';
import './css/Book.css';
import '../assests/default_cover.jpg'
import { useGlobalContext } from '../context/BookContext';
import { BsCartPlusFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Book = (book ) => {
  const { cart, setCart } = useGlobalContext();

  const addToCart = useCallback(()=>{
    if (!cart.some(item => item.id === book.id)) {
      setCart([...cart, { id: book.id, title: book.title, image: book.cover_img, price: 100,quantity:1 }]);
        toast('🛒 Added to cart', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
           }
    else{
      const updatedCart = cart.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      toast('🦄 Item already exists!!. Quantity incremented +1', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

    }
      // eslint-disable-next-line 
  },[cart])

  return (

    <div className='card'>
      <div key={book.id}>
       <div className='coverImage'>
          <img src={book.cover_img} alt={book.title} />
       </div>
      <div>
        <div>
          <h3 className='bookTitle'>{book.title}</h3>
        </div>
      </div>
        <p className='bookAuthor'>- {book.author}</p>
        <div className='addtoCart'>
        <button onClick={() => addToCart()} className='addtocartbtn'><BsCartPlusFill /></button>
        <Link to={`/catalog/${book.id}`} className='details'>Details</Link>
        </div>
      </div>
    </div>
  )
}

export default Book;
