import { useState } from "react";
import axios from "axios";
import {Input, Button} from '../components/reuseable components';
import "../style.css";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		try {
			const res = await axios.post("/auth/register", {
				username,
				email,
				password,
			});
			res.data && window.location.replace("/login");
		} catch (err) {
			console.log(err)
			setError(true);
		}
	}

	return (
		<div className="bg-reg h-102 bg-cover text-white flex flex-col justify-center items-center ">
			<span className="text-xl font-serif ">REGISTER</span>
			<form className="mt-5 text-xs font-play" onSubmit={handleSubmit}>
				<label className="">Username</label>
				<div className="pt-2">
					<Input type='text' focusColor='neutral-200'
					textColor='black' 
					placeholder='Enter Your Username'
					value={username}	
					handleChange={e => setUsername(e.target.value)} />
				</div>
				<label className="">Email</label>
				<div className="pt-2">
					<Input
						type="email"
						focusColor='neutral-200'
					      textColor='black' 
						placeholder='Enter Your Email'
						value={email}
						handleChange={e => setEmail(e.target.value)} />
				</div>
				<label>Password</label>
				<div className="pt-2">
					<Input
						type="password"
						focusColor='neutral-200'
						textColor='black'
						minLength="6"
						value={password}
						handleChange={e => setPassword(e.target.value)} />
				</div>
				<div className="text-center pt-8">
					<Button
					px='px-8'
					py='2'
					tracking='tracking-wider'
					bg='bg-sky-400'
					hoverColor='hover:bg-violet-600'
					activeCursor='not-allowed'
					>REGISTER</Button>
					<div className="pt-5">
						{error && <span className="bg-neutral-700 ">Something Went Wrong!</span>}
					</div>
				</div>
			</form>
		</div>
	);
}



