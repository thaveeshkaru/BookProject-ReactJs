import { useEffect, useState } from "react";
import BookNoteType from "../types/BookNoteType";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";


function BookNote(){

    const[book,setBook]=useState<any>("");
    const[bookNotes,setBookNotes]=useState<BookNoteType[]>([]);
    const[bookid,setBookId]=useState<string>("");
    const[bookNoteId,setBookNoteId]=useState<string>("");
    const navigate =useNavigate()

    async function loadBookById(id:string | number) {
        const apiResponce = await axios.get(`http://localhost:8000/api/book/${id}`);
        setBook(apiResponce.data);
    }

    async function loadBookNote() {
        const apiResponce = await axios.get("http://localhost:8000/api/booknote");
        apiResponce.data.map(function(booknote:any){
            if(String(booknote.book)==bookid){
                setBookNoteId(booknote._id);
            }
        });
        setBookNotes(apiResponce.data);
        console.log(bookNotes);
        console.log(bookNoteId);
    }
    

    function handleUpdate(){
        navigate("/updatebook")
    }

    async function handleDelete() {
        console.log(bookNoteId);

        await axios.delete(`http://localhost:8000/api/book/${bookid}`);
        await axios.delete(`http://localhost:8000/api/booknote/${bookNoteId}`);
        navigate("/");
       // console.log(bookNoteId);

    };

    useEffect(function(){
        const bookid = localStorage.getItem("bookid") || "";
        if(bookid){
            const parsedBookId = JSON.parse(bookid);
            setBookId(JSON.parse(bookid));
            loadBookById(parsedBookId);
            //loadBookNote();
        }
        loadBookNote();

    },[bookid]);


    return(
        <div className="min-h-screen bg-black text-gray-100 py-10 px-8">
          <div className="container mx-suto">
            <header className="mb-6 text-center">
              <h1 className="text-4xl font-semibold text-green-400">{book.title}</h1>
              <h3 className="text-lg text-gray-400 italic">By: {book.author}</h3>
            </header>
            <div className="text-center mb-6">
            <img
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                alt={book.title || "Book Cover"}
                className="mx-auto rounded-lg shadow-md"
              />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 mb-6">
              <h3 className="text-sm text-gray-300 mb-2">Date Read: {moment(book.dateRead).format("YYYY-MM-DD")}</h3>
              <h3 className="text-sm text-gray-300 mb-2">How strongly I recommend it: {book.rating}/10</h3>
              <h3 className="text-sm text-gray-300 text-left mb-2">ISBN: {book.isbn}</h3>
              <p className="text-lg text-gray-300 text-left mb-4"  style={{ whiteSpace: "pre-wrap" }}>{book.description}</p>
            </div>
      
          
            <h2 className="text-3xl font-bold text-green-500 mb-4">My Notes</h2>
            <div className="space-y-4 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 ">
              {bookNotes.map(function(booknote){
                  if(String(booknote.book)==bookid){
                      return(
                          <p className="text-lg text-gray-300 "  style={{ whiteSpace: "pre-wrap" }}>{booknote.note}</p>
                      )
                  }  
              })}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-600" onClick={handleUpdate} >Update</button>
              <button className="bg-red-500 text-black font-semibold py-2 px-4 rounded hover:bg-red-600" onClick={handleDelete}>Delete</button>
            </div>
          </div>
       </div>
    )
}

export default BookNote;

