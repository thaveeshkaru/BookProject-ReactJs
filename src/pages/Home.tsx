import { useEffect, useState } from "react";
import BookType from "../types/BookType";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";


function Home(){
    const[topRatedbooks,setTopRatedBooks]=useState<BookType[]>([]);
    const[newestBooks,setNewestBooks]=useState<BookType[]>([]);
    const[isShowNewestBooks, setIsShowNewestBooks]=useState<Boolean>(false);

    async function loadBooks() {
        const apiResponce = await axios.get("http://localhost:8000/api/book");
        let books = apiResponce.data;

        const sortedByRating=[...books];
        for (let i = 0; i < sortedByRating.length; i++) {
          for (let j = 0; j < sortedByRating.length - i - 1; j++) {
            if (sortedByRating[j].rating < sortedByRating[j + 1].rating) {
              const temp = sortedByRating[j];
              sortedByRating[j] = sortedByRating[j + 1];
              sortedByRating[j + 1] = temp;
            }
          }
        }
        setTopRatedBooks(sortedByRating);
        console.log(books)

        const sortedByNewestBook=[...books];
        for(let i=0;i< sortedByNewestBook.length;i++){
          for(let j=0; j<sortedByNewestBook.length-i-1; j++){
            if(new Date(sortedByNewestBook[j].dateRead) < new Date(sortedByNewestBook[j+1].dateRead)){
              const temp = sortedByNewestBook[j];
              sortedByNewestBook[j] = sortedByNewestBook[j+1];
              sortedByNewestBook[j+1]= temp;
            }
          }
        }
        setNewestBooks(sortedByNewestBook);
    }


    const navigate = useNavigate()

    async function handleNavigate(book:any) {
        try {
            console.log(book._id)
            localStorage.setItem("bookid",JSON.stringify(book._id));
            navigate("/booknote");
        } catch (error) {
            console.log(error)
        }
        
    }

    async function handelCreatBook() {
        navigate("/creatbook")
    }

    useEffect(function(){
        loadBooks();
        // loadBookNotes();
        
          
    },[]);

    return (
    
        <div className="min-h-screen py-10 px-10 bg-black text-white">
          <div>
            <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg p-6 shadow-lg mb-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-5xl font-extrabold text-white">Welcome to My Reading Journal</h1>
                <button className="bg-gray-200 text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-300" onClick={handelCreatBook}>Creat</button>
              </div>
              <p className="mt-4 text-lg text-gray-300">Dive into my personal collection of books, with detailed notes and recommendations. Explore and get inspired!</p>
              <p className="text-md text-gray-300">Use the ISBN number to find it from your local library or anywhere else.</p>

            </div>
            <p className="text-lg text-gray-400 mb-6">Sorted with my top recommendations up top. Sort by 
                <span className="text-blue-400 cursor-pointer hover:underline" onClick={()=>{setIsShowNewestBooks(true)}}> newest
                </span> and
                <span className="text-blue-400 cursor-pointer hover:underline" onClick={()=>{setIsShowNewestBooks(false)}}> best</span>.
                </p>
            <hr className="border-gray-600 mb-6"/>

            {isShowNewestBooks ?
            newestBooks.map(function(newestBooks){
                return(
                  <div className="flex items-start mb-8 border-b border-gray-700 pb-6 p-4">
                    <div className="mr-6 flex-shrink-0 hover:scale-105">
                       <img src={`https://covers.openlibrary.org/b/isbn/${newestBooks.isbn}-M.jpg`} alt="book cover" className="w-40 h-auto shadow-lg rounded" />
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-blue-400 hover:underline">{newestBooks.title} - {newestBooks.author}</p>
                    <p className="text-sm text-gray-400 mt-2">Date Read: {moment(newestBooks.dateRead).format("YYYY-MM-DD")} | How strongly i recommend it: {newestBooks.rating}</p>
                    <p className="text-lg text-gray-300 mt-4 ">{newestBooks.description}</p>
                    <p className="mt-4 text-sm">
                        <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => handleNavigate(newestBooks)}>
                            Read my notes
                        </span>, or visit the {" "}
                    <a href={`https://www.amazon.com/s?k=${newestBooks.isbn}`} target="_blank"  rel="noopener noreferrer" className="text-blue-400 hover:underline"
                    >Amozon Page</a>{" "} 
                    for details and reviews.</p>
                   </div>
                   </div>
                )
            })
            : topRatedbooks.map(function(book){
                
              return(
                  <div className="flex items-start mb-8 border-b border-gray-700 pb-6 p-4">
                  <div className="mr-6 flex-shrink-0 hover:scale-105">
                     <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} alt="book cover" className="w-40 h-auto shadow-lg rounded" />
                  </div>
                  <div>
                  <p className="text-2xl font-bold text-blue-400 hover:underline">{book.title} - {book.author}</p>
                  <p className="text-sm text-gray-400 mt-2">Date Read: {moment(book.dateRead).format("YYYY-MM-DD")} | How strongly I recommend it: {book.rating}</p>
                  <p className="text-lg text-gray-300 mt-4 ">{book.description}</p>
                  <p className="mt-4 text-sm">
                      <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => handleNavigate(book)}>
                          Read my notes
                      </span>, or visit the {" "}
                  <a href={`https://www.amazon.com/s?k=${book.isbn}`} target="_blank"  rel="noopener noreferrer" className="text-blue-400 hover:underline"
                  >Amozon Page</a>{" "} 
                  for details and reviews.</p>
                 </div>
                 </div>

              )
          }) 
          }
            
          </div>
        </div>
      )
}

export default Home;

