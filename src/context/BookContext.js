import { createContext, useState, useCallback, useEffect, useContext } from "react";
import { fetchBooksData } from "../apis/fetch";

const BookContext = createContext();

const BookProvider =({children}) => {
    const [cart,setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('the lost world');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

    const fetchBooks = useCallback(async()=>{
        setLoading(true);
        try{
            const docs = await fetchBooksData(searchTerm);
            if(docs){
                const displayableBooks = docs.map((singleBook)=>{
                    const {key, author_name, cover_i, edition_count, first_publish_year, title,ratings_average,ratings_count,subject} = singleBook;

                    return {
                        id:key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title,
                        avg_rating:ratings_average? ratings_average:0,
                        total_ratings:ratings_count?ratings_count:0,
                        categories:subject?subject:'General'
                    }
                })
                setBooks(displayableBooks);

                if(displayableBooks.length > 1){
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Search Result Found!")
                }

            }
            else{
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
            setLoading(false);
        }
        catch(e){
            console.log(e);
            setLoading(false)
        }

    },[searchTerm])

    useEffect(()=>{
        fetchBooks();
        // eslint-disable-next-line 
        
    },[searchTerm,fetchBooks]);

    return (
        <BookContext.Provider value={{loading, books, setSearchTerm, resultTitle, setResultTitle,fetchBooks,cart, setCart, setBooks }}>
            {children}
        </BookContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(BookContext);
}

export {BookContext, BookProvider}



