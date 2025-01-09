import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function CreateBook(){

    const[title,setTitle]=useState<string>("");
    const[dateRead,setDateRead]=useState<Date>();
    const[rating,setRating]=useState<number>(0);
    const[description,setDescription]=useState<string>("");
    const[note,setNote]=useState<string>("");
    const[author,setAuthor]=useState<string>("");
    const[isbn,setIsbn]=useState<string>("");
    //const[isEdit,setIsEdit]=useState<boolean>(false);

    function handelTitle(event:any){
        setTitle(event.target.value)
    }

    function handleDateRead(event:any){
        setDateRead(new Date(event.target.value));
    }

    function handleRating(event:any){
        setRating(event.target.value);
    }

    function handleDescription(event:any){
        setDescription(event.target.value);
    }

    function handleNote(event:any){
        setNote(event.target.value)
    }

    function handleIsbn(event: any){
        setIsbn(event.target.value);
    }

    function handleAuthor(event:any){
        setAuthor(event.target.value)
    }

    const navigate = useNavigate();

    async function handleSave() {
        const bookData = {
            title: title,
            author: author,
            dateRead: dateRead,
            rating: rating,
            description: description,
            isbn: isbn
        };
    
       // console.log("date read:", dateRead); // Log for debugging
    
        try {
            const apiResponse = await axios.post("http://localhost:8000/api/book", bookData);
            //console.log("API Response:", apiResponse.data);
    
            const bookNoteData = {
                book: apiResponse.data._id, 
                note: note,
            };
    
        //    console.log("Note Payload Sent:", bookNoteData); // Log for debugging
    
            await axios.post("http://localhost:8000/api/booknote", bookNoteData); 
            navigate("/")
        } catch (error) {
           console.log(error)
        }
    }
    

    return(
        <div className="w-h-screen py-10 px-5 bg-gray-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold text-white mb-6">Add a New Book</h1>

            <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">Book Title</label>
                <input type="text" id="booktitle" className="text-white block mb-3 w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring focus:ring-blue-500 focus:outline-none" value={title} onChange={handelTitle} required />
            </div>

            <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">Author</label>
                <input type="text" id="booktitle" className="text-white block mb-3 w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring focus:ring-blue-500 focus:outline-none" value={author} onChange={handleAuthor} required />
            </div>

            <div className="mb-4">
                 <label className="text-gray-300 text-sm block mb-2">Date Read</label>
                <input type="date" className="text-white block mb-3 w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring focus:ring-blue-500 focus:outline-none" value={dateRead ? dateRead.toISOString().split("T")[0] : ""} // Ensure proper date format
                    onChange={handleDateRead}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">Rating</label>
                <input type="text" id="booktitle" className="text-white block mb-3 w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring focus:ring-blue-500 focus:outline-none" value={rating} onChange={handleRating} required />
            </div>

            <div className="mb-4">
                 <label className="text-gray-300 text-sm block mb-2">Description</label>
                 <textarea rows={5} id="descroption" className="text-white block mb-3 w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring focus:ring-blue-500 focus:outline-none" value={description} onChange={handleDescription} required />
            </div>

            <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">ISBN NO</label>
                <input type="text" id="booktitle" className="text-white block mb-3 w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring focus:ring-blue-500 focus:outline-none" value={isbn} onChange={handleIsbn} required />
            </div>

            <div className="mb-4">
                 <label className="text-gray-300 text-sm block mb-2">My Note</label>
                 <textarea rows={7} id="descroption" className="text-white block mb-3 w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring focus:ring-blue-500 focus:outline-none" value={note} onChange={handleNote} required />
            </div>

            <button className=" w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" onClick={handleSave}>Save</button>
        </div>
    )

}

export default CreateBook

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function CreateBook() {
//   const [title, setTitle] = useState<string>("");
//   const [dateRead, setDateRead] = useState<Date>();
//   const [rating, setRating] = useState<number>(0);
//   const [description, setDescription] = useState<string>("");
//   const [note, setNote] = useState<string>("");
//   const [author, setAuthor] = useState<string>("");
//   const [isbn, setIsbn] = useState<string>("");

//   const navigate = useNavigate();

//   function handleInputChange(setter: Function) {
//     return (event: any) => {
//       setter(event.target.value);
//     };
//   }

//   async function handleSave() {
//     const bookData = {
//       title,
//       author,
//       dateRead,
//       rating,
//       description,
//       isbn,
//     };

//     try {
//       const apiResponse = await axios.post("http://localhost:8000/api/book", bookData);
//       const bookNoteData = {
//         book: apiResponse.data._id,
//         note,
//       };
//       await axios.post("http://localhost:8000/api/booknote", bookNoteData);
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="container mx-auto py-10 px-5 md:px-10 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Add a New Book</h1>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Book Title</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
//           value={title}
//           onChange={handleInputChange(setTitle)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Author</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
//           value={author}
//           onChange={handleInputChange(setAuthor)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Date Read</label>
//         <input
//           type="date"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
//           value={dateRead ? dateRead.toISOString().split("T")[0] : ""}
//           onChange={(e) => setDateRead(new Date(e.target.value))}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Rating</label>
//         <input
//           type="number"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
//           value={rating}
//           onChange={handleInputChange(setRating)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
//         <textarea
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
//           value={description}
//           onChange={handleInputChange(setDescription)}
//           required
//         ></textarea>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">ISBN NO</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
//           value={isbn}
//           onChange={handleInputChange(setIsbn)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">My Note</label>
//         <textarea
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
//           value={note}
//           onChange={handleInputChange(setNote)}
//           required
//         ></textarea>
//       </div>

//       <button
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:ring focus:ring-blue-300"
//         onClick={handleSave}
//       >
//         Save
//       </button>
//     </div>
//   );
// }

// export default CreateBook;

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function CreateBook() {
//   const [title, setTitle] = useState<string>("");
//   const [dateRead, setDateRead] = useState<Date>();
//   const [rating, setRating] = useState<number>(0);
//   const [description, setDescription] = useState<string>("");
//   const [note, setNote] = useState<string>("");
//   const [author, setAuthor] = useState<string>("");
//   const [isbn, setIsbn] = useState<string>("");

//   const navigate = useNavigate();

//   function handleInputChange(setter: Function) {
//     return (event: any) => {
//       setter(event.target.value);
//     };
//   }

//   async function handleSave() {
//     const bookData = {
//       title,
//       author,
//       dateRead,
//       rating,
//       description,
//       isbn,
//     };

//     try {
//       const apiResponse = await axios.post("http://localhost:8000/api/book", bookData);
//       const bookNoteData = {
//         book: apiResponse.data._id,
//         note,
//       };
//       await axios.post("http://localhost:8000/api/booknote", bookNoteData);
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="container mx-auto py-10 px-5 md:px-10 bg-gray-900 rounded-lg shadow-lg text-white">
//       <h1 className="text-2xl font-bold text-white mb-6">Add a New Book</h1>

//       <div className="mb-4">
//         <label className="block text-gray-300 text-sm font-medium mb-2">Book Title</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500 focus:outline-none"
//           value={title}
//           onChange={handleInputChange(setTitle)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-300 text-sm font-medium mb-2">Author</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500 focus:outline-none"
//           value={author}
//           onChange={handleInputChange(setAuthor)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-300 text-sm font-medium mb-2">Date Read</label>
//         <input
//           type="date"
//           className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500 focus:outline-none"
//           value={dateRead ? dateRead.toISOString().split("T")[0] : ""}
//           onChange={(e) => setDateRead(new Date(e.target.value))}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-300 text-sm font-medium mb-2">Rating</label>
//         <input
//           type="number"
//           className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500 focus:outline-none"
//           value={rating}
//           onChange={handleInputChange(setRating)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
//         <textarea
//           className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500 focus:outline-none"
//           value={description}
//           onChange={handleInputChange(setDescription)}
//           required
//         ></textarea>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-300 text-sm font-medium mb-2">ISBN NO</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500 focus:outline-none"
//           value={isbn}
//           onChange={handleInputChange(setIsbn)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-300 text-sm font-medium mb-2">My Note</label>
//         <textarea
//           className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500 focus:outline-none"
//           value={note}
//           onChange={handleInputChange(setNote)}
//           required
//         ></textarea>
//       </div>

//       <button
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:ring focus:ring-blue-300"
//         onClick={handleSave}
//       >
//         Save
//       </button>
//     </div>
//   );
// }

// export default CreateBook;

















