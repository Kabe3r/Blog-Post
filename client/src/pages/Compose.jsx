import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import axios from "axios";
import "../style.css";


export default function Compose() {
      const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
      const [file, setFile] = useState(null);
	const {user} = useGlobalContext();
      
      const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			content
		};
		// Conditions for uploading image by form and date
            if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			newPost.photo = filename;
			try {
				await axios.post("/upload", data);
			} catch (err) {}
		}
		try {
		    const res = await axios.post("/posts", newPost);
                console.log(res)
		    window.location.replace("/post/" + res.data._id);
		} catch (err) {}
	};
     

      return (

           <div className="pt-20 flex flex-col items-center">
           {file && (
            <img className="md:w-99 h-98 rounded-xl object-cover mobile:h-80" src={URL.createObjectURL(file)} alt="" />
           )}
            <form action="" className="mt-10" onSubmit={handleSubmit} >
            <label htmlFor="fileInput" className="">
            <span className="material-icons cursor-pointer text-red-500 hover:text-red-400 text-xl">
            add_a_photo
            </span>
            </label>
            <input id="fileInput" type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
            <div className="pt-14 text-gray-500 text-xl">
            <input type="text" className="md:w-99 font-serif focus:outline-none" placeholder="Post Your Title..."
            autoFocus={true} onChange={(e) => setTitle(e.target.value)} />          
            </div>
            <div className="pt-16 text-sm tablet:text-xs text-gray-500">
            <textarea type="text" className="md:w-99 md:h-32 h-16 w-56 font-serif focus:outline-none" placeholder="Post Your Content..."
            autoFocus={true} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="text-center pt-12 pb-4">
            <button className=" text-green-700 hover:text-white border border-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg text-xs px-4 py-2" type="submit">POST</button>
            </div>
                  
            </form>          
            </div>
                  
          
            

            
      );
}



