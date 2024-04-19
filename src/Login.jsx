import "./Login.css";
import Navbar from "./Navbar";
import { useState, useContext } from "react";
import axios from "axios";
import { UserPasswordContext } from "./App";
import { useNavigate } from "react-router-dom";

function Login() {
	const [loginUsername, setLoginUsername] = useState("");
	const [errorLoginUsername, setErrorLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [errorLoginPassword, setErrorLoginPassword] = useState("");
	const [currentUser, setCurrentUser, currentUserId, setCurrentUserId] =
		useContext(UserPasswordContext);
	const navigate = useNavigate();

	const checkLogin = async () => {
		if (loginUsername === "" || loginPassword === "") {
			if (loginPassword === "") {
				setErrorLoginPassword("Error! Can not be empty!");
			} else {
				setErrorLoginUsername("Error! Can not be empty!");
			}
		} else {
			try {
				const response = await axios.post("/api/user/login", {username: loginUsername, password: loginPassword});
				if (response === 'No user found') {
					setErrorLoginUsername("Error! No user found");
				} else if (response === 'Wrong password') {
					setErrorLoginPassword("Error! Incorrect Password!");
				} else {
					setCurrentUser(loginUsername);
					setCurrentUserId(response.data[0]._id);
					navigate("/Manager");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			<Navbar />
			<div className="remainingLoginPageContainer">
				<div className="loginFormContainer">
					<input
						className="loginFormInputBox"
						placeholder="Username"
						onChange={(e) => {
							setLoginUsername(e.target.value);
							setErrorLoginUsername("");
						}}
					></input>
					<div className="errorMessage">{errorLoginUsername}</div>
					<input
						className="loginFormInputBox"
						placeholder="Password"
						onChange={(e) => {
							setLoginPassword(e.target.value);
							setErrorLoginPassword("");
						}}
					></input>
					<div className="errorMessage">{errorLoginPassword}</div>
					<button
						className="loginButton"
						onClick={() => {
							checkLogin();
						}}
					>
						Login
					</button>
				</div>
			</div>
		</>
	);
}

export default Login;
