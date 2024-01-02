export const fetchBooksData = async(searchTitle)=>{
    const data = await fetch(`http://openlibrary.org/search.json?title=${searchTitle}`);
    const jsondata = await data.json();
    return jsondata.docs;
  }


export const fetchBookById = async (id) =>{
    const data = await fetch(`https://openlibrary.org/works/${id}.json`);
    const jsondata = await data.json();
    // console.log(jsondata)
    return jsondata;
  }

