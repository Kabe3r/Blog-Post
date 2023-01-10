import { useLocation } from "react-router";
import {  useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style.css";

export default function SinglePost() {
     const location = useLocation();
     const path = (location.pathname.split("/")[2]);
     const [post, setPost] = useState({});
     const PF = "http://localhost:3000/images/";
     const { user } = useGlobalContext();
     const [ title, setTitle ] = useState("");
     const [ content, setContent ] = useState("");
     const [ updateMode, setUpdateMode ] = useState(false);

     useEffect(() => {
      const fetchPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);   
      setContent(res.data.content);   
     };
     fetchPost();
      },[path]);

      const handleDelete = async () => {
            try {
              await axios.delete(`/posts/${post._id}` , {
                data: {username: user.username},
              });
              window.location.replace("/");
            } catch (err) {}
          };

          const handleUpdate = async () => {
            try {
              await axios.put(`/posts/${post._id}` , {
                username: user.username,
                title,
                content
              });
              setUpdateMode(false);
            } catch (err) {}
            
          }    

      return (
           <div>
           {post.photo && (
                 <img className="p-5 mx-auto h-98 md:h-100 object-cover" src={PF + post.photo} alt="" />
           )}
           {updateMode ? (
                 <input type="text" value={title} className="p-5 w-screen font-lora focus:outline-none text-3xl tablet:text-xl text-gray-500 text-center"
                 onChange={(e) => setTitle(e.target.value)} />
                 
           ) : (

                 <h1 className="pt-5 text-center"><span className="text-4xl font-lora tablet:text-2xl tracking-wide break-words opacity-70">{title}</span>

                 {post.username === user?.username && (
                 <div className="float-right ">
                 <span className="pr-5 text-2xl tablet:text-xl text-blue-500 cursor-pointer hover:opacity-70 material-icons" onClick={() => setUpdateMode(true)}>
                  edit_note
                  </span>
                  <span className="pr-3 text-2xl tablet:text-xl text-red-500 cursor-pointer hover:opacity-70 material-icons" onClick={handleDelete}>
                  delete_forever
                  </span>
                 </div>
                 )}
                 </h1>
           )}

           {updateMode ? (
                 <textarea className="md:mt-20 mt-5 p-5 w-screen h-52 font-serif focus:outline-none md:text-2xl sm:text-lg text-gray-500" value={content} onChange={(e) => setContent(e.target.value)} />
           ) : (
     
                 <p className="md:mt-20 mx-auto mt-10 p-5 sm:w-96 md:w-99 first-line:uppercase first-line:tracking-wider first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left font-serif tracking-widest opacity-85 break-words tablet:first-letter:text-3xl md:text-2xl sm:text-lg ">
                 {content}
                 </p>
           )}
           {updateMode && (
                 <div className="pt-10 text-center">
                 <button className="text-teal-400 hover:text-white border border-teal-400 hover:bg-teal-400 font-serif rounded-lg text-xs px-3 py-1.5" onClick={handleUpdate}>UPDATE</button>
                 </div>
           )}
                       <div className="pt-5">
                       <span className="float-right text-center p-5 cursor-pointer font-corm hover:underline hover:underline-offset-4 hover:text-neutral-500 ">
                             <Link className="" to={`/?user=${post.username}`}>By<br/> {post.username}</Link>
                       </span>
                       <span className="p-5 float-left font-play">{new Date(post.createdAt).toLocaleDateString()}</span>                 
                       </div>
           </div> 
      )
}
