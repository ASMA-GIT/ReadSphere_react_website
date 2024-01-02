import React, { useState } from 'react';
import { useGlobalContext } from '../context/BookContext';
import Book from '../components/Book';
import './css/CatalogPage.css';
import default_cover from '../assests/default_cover.jpg';
import NavBar from '../components/NavBar2';
import Loader from '../components/Loader';
import { FaSearch } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useAlert } from '../context/AlertContext';

const CatalogPage = () => {

  const { books, loading, searchTerm, setSearchTerm } = useGlobalContext();
  const [searchVal, setSearchVal] = useState("");

  const booksListWithImage = books.map((singleBook) => ({
    ...singleBook,
    id: singleBook.id.replace("/works/", ""),
    cover_img: singleBook.cover_id
      ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
      : `${default_cover}`,
  }));

  function getSearchValue (e){
    setSearchVal(e.target.value);
  }
  const handleInputChange = () => {
    setSearchTerm(searchVal);
  };

  if (loading) return <Loader />;

  return (
    <>
      <NavBar />
    <div className='catalogPage'>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={getSearchValue}
          className='searchInput'
        />
        <button onClick={handleInputChange} className='searchbtn'><FaSearch /></button>
      </div>

      <div className='bookContainer'>
        {booksListWithImage
          .filter(
            (book) =>
              !searchTerm ||
              book.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 55)
          .map((book, index) => (
            <Book key={index} {...book} />
          ))}
      </div>
      <ToastContainer className='toast_bg'
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
    </>
    
  );
};

export default CatalogPage;
