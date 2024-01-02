
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./css/BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import default_cover from '../assests/default_cover.jpg'
import { fetchBookById } from '../apis/fetch';
import NavBar from '../components/NavBar2';
import Loader from '../components/Loader';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const data = await fetchBookById(id);
        console.log(data);

        if (data) {
          const { description, title, covers, subject_places, subject_times, subjects } = data;
          const newBook = {
            description: typeof description === 'object' ? description.value : description,
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : `${default_cover}`,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times: subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.slice(0,3) : "No subjects found"
          };
          console.log(newBook);
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loader/>;

  return (
    <section className='book-details'>
      <NavBar />
      <div className='container'>
        <button type='button' className='back-btn' onClick={() => navigate("/catalog")}>
          <FaArrowLeft size={22} />
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <div className='book-details-img-container'>
            <img src={book?.cover_img} alt="cover img" />
            </div>
          </div>
          <div className='book-details-info'>
            <div className='book-details-item '>
              <h1 className='bookTitle'>Title : {book?.title}</h1>
            </div>
            <div className='book-details-item'>
              <span className='subjectTag green'>{book?.subjects[0]}</span>
              <span className='subjectTag purple'>{book?.subjects[1]}</span>
              <span className='subjectTag blue'>{book?.subjects[2]}</span>
            </div>
            
            <div className='book-details-item description'>
              <p className={showFullDescription?'fullview':'description'} >Description : {book?.description}</p>
              <span onClick={toggleDescription} className='view-more-button'>
              {showFullDescription?"view less":"view more"}
            </span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetailsPage
