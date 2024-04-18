import { useState, useContext } from "react";
import Navbar from "./Navbar";
import "./Register.css";
import { UserPasswordContext } from "./App";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
	const [firstName, setFirstName] = useState("");
	const [errorFirstName, setErrorFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [errorLastName, setErrorLastName] = useState("");
	const [email, setEmail] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [username, setUserName] = useState("");
	const [errorUsername, setErrorUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
	const [currentUser, setCurrentUser, currentUserId, setCurrentUserId] = useContext(UserPasswordContext);
	const navigate = useNavigate();

	const checkRegister = async () => {
		if (
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			username === "" ||
			password === "" ||
			confirmPassword === "" ||
			(password !== "" &&
				confirmPassword !== "" &&
				password !== confirmPassword)
		) {
			if (firstName === "") {
				setErrorFirstName("Error! Can not be empty!");
			}
			if (lastName === "") {
				setErrorLastName("Error! Can not be empty!");
			}
			if (email === "") {
				setErrorEmail("Error! Can not be empty!");
			}
			if (username === "") {
				setErrorUsername("Error! Can not be empty!");
			}
			if (password === "") {
				setErrorPassword("Error! Can not be empty!");
			}
			if (confirmPassword === "") {
				setErrorConfirmPassword("Error! Can not be empty!");
			}
			if (
				password !== "" &&
				confirmPassword !== "" &&
				password !== confirmPassword
			) {
				setErrorConfirmPassword("Error! Password is incorrect!");
			}
		} else {
			setCurrentUser(username);
			navigate('/Manager');
			try {
				await axios.post("/api/user", {
					firstName: firstName,
					lastName: lastName,
					email: email,
					username: username,
					password: password,
				});
				const response = await axios.get("/api/user/" + username);
				setCurrentUserId(response.data[0]._id)
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<>
			<Navbar />
			<div className="remainingRegisterPageContainer">
				<div className="registerFormContainer">
					<input
						className="registerFormInputBox"
						placeholder="First Name"
						onChange={(e) => {
							setFirstName(e.target.value);
							setErrorFirstName("");
						}}
					></input>
					<div className="errorMessage">{errorFirstName}</div>
					<input
						className="registerFormInputBox"
						placeholder="Last Name"
						onChange={(e) => {
							setLastName(e.target.value);
							setErrorLastName("");
						}}
					></input>
					<div className="errorMessage">{errorLastName}</div>
					<input
						className="registerFormInputBox"
						placeholder="Email"
						onChange={(e) => {
							setEmail(e.target.value);
							setErrorEmail("");
						}}
					></input>
					<div className="errorMessage">{errorEmail}</div>
					<input
						className="registerFormInputBox"
						placeholder="Username"
						onChange={(e) => {
							setUserName(e.target.value);
							setErrorUsername("");
						}}
					></input>
					<div className="errorMessage">{errorUsername}</div>
					<input
						className="registerFormInputBox"
						placeholder="Password"
						onChange={(e) => {
							setPassword(e.target.value);
							setErrorPassword("");
						}}
					></input>
					<div className="errorMessage">{errorPassword}</div>
					<input
						className="registerFormInputBox"
						placeholder="Confirm Password"
						onChange={(e) => {
							setConfirmPassword(e.target.value);
							setErrorConfirmPassword("");
						}}
					></input>
					<div className="errorMessage">{errorConfirmPassword}</div>
					<button
						className="registerButton"
						onClick={() => {
							checkRegister();
						}}
					>
						Register
					</button>
				</div>
			</div>
		</>
	);
}

export default Register;
