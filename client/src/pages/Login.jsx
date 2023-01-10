import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import axios from "axios";
import { Input, Button } from '../components/reuseable components';
import "../style.css";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch, isFetching, error } = useGlobalContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post("/auth/login", {
				username: username,
				password: password
			});
			
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE", payload: err });
		}

	};

	return (
		<div className="bg-log h-102 bg-cover text-neutral-700 flex flex-col justify-center items-center ">
			<span className="text-xl font-serif ">LOGIN</span>
			<form className="mt-5 text-xs font-play" onSubmit={handleSubmit}>
				<label>Username</label>
				<div className="pt-2">
					<Input
						type="text"
						bgColor='bg-neutral-800'
						textColor='white'
						placeholder="Enter Your Username..."
						value={username}
						handleChange={(e) => setUsername(e.target.value)} />
						
				</div>
				<label>Password</label>
				<div className="pt-2">
					<Input
						type="password"
						bgColor='bg-neutral-800'
						textColor='white'
						value={password}
						handleChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="text-center">
					<Button
						bg='bg-green-400'
						px='px-8'
						py='2'
						textColor='white'
						hoverColor='hover:bg-sky-500'
						fontStyle='font-serif' 		activeCursor='not-allowed'
						my="my-5"
						disabled={isFetching}>LOGIN</Button>
						<div className="pt-2">
						{error && <span className="bg-red-600 px-4 py-2 text-white">User Not Found!</span>}
					</div>
				</div>
			</form>
		</div>
	);
}
