import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import axios from "axios";
import "../style.css"

export default function Profile () {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const {user, dispatch} = useGlobalContext();
  const PF = "http://localhost:3001/images/";
  
  // console.log(updateUser.profilePic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="bg-prof text-white flex flex-col justify-center items-center h-102 bg-cover bg-no-repeat">
        
        <span className="text-xl font-serif">Update Your Account</span>
        
        <form className="mt-5 text-xs font-play" onSubmit={handleSubmit}>
        <div className="text-center">
          <label className="text-lg">Profile Picture</label>
        </div>
          <div className="flex justify-center pt-2 pb-4">
            <img className="h-16 w-16 rounded-lg object-cover" src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
            <label className="pl-2 pt-6" htmlFor="fileInput">
            <span className="cursor-pointer material-icons text-violet-200">
            camera_enhance
           </span>
            </label>
            <input id="fileInput" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <label>Username</label>
          <div className="pt-2">
          <input type="text" className="mb-2 p-2 text-black focus:outline-none focus:bg-gray-100 rounded-md" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}  />
          </div>
          <label>Email</label>
          <div className="pt-2">
          <input type="email" className="mb-2 p-2 text-black focus:outline-none focus:bg-gray-100 rounded-md" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}  />
          </div>
          <label>Password</label>
          <div className="pt-2">
          <input type="password" className="p-2 text-black focus:outline-none focus:bg-gray-100 rounded-md" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="text-center">
          <button className="mt-5 font-serif hover:text-gray-200 border border-white hover:border-blue-600 hover:bg-blue-600 rounded-lg 
          px-3 py-1.5 active:bg-slate-500 active:border-slate-500 active:cursor-not-allowed" type="submit">
            UPDATE
          </button>
          </div>
          <div className="text-center pt-2">
          {success && <span>Profile has been updated</span> }
          </div>
        </form>
      
    </div>
  )
}
