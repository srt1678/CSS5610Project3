import "./ManagerPage.css";
import Navbar from "./Navbar";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserPasswordContext } from "./App";

function ManagerPage() {
	const [url, setURL] = useState("");
	const [errorURL, setErrorURL] = useState("");
	const [password, setPassword] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [alphabet, setAlphabet] = useState(false);
	const [numerals, setNumerals] = useState(false);
	const [symbols, setSymbols] = useState(false);
	const [length, setLength] = useState(0);
	const [noError, setNoError] = useState(false);
	const [currentUser, setCurrentUser, currentUserId, setCurrentUserId] =
		useContext(UserPasswordContext);
	const [urlList, setUrlList] = useState([{}]);
	const [updateUrl, setUpdateUrl] = useState("");
	const [updatePassword, setUpdatePassword] = useState("");

	const checkSubmit = () => {
		if(url === "" || !alphabet && !numerals && !symbols && password === "" || length == 0 && password === "" || length != 0 && (length < 4 || length > 50) && password === ""){
			if (url === "") {
				setErrorURL("Error, can not be empty!");
				return;
			}
			if (!alphabet && !numerals && !symbols && password === "") {
				setErrorPassword("Error, checkbox unchecked");
				return;
			}
			if (length == 0 && password === "") {
				setErrorPassword("Error, length not provided");
				return;
			}
			if (length != 0 && (length < 4 || length > 50) && password === "") {
				setErrorPassword("Error, length out of range");
				return;
			}
		}else{
			if (password === "") {
				const characterSet = [];
				if (alphabet) {
					characterSet.push(
						"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
					);
				}
				if (numerals) {
					characterSet.push("1234567890");
				}
				if (symbols) {
					characterSet.push("!@#$%^&*_+~?");
				}
				const combineCharacters = characterSet.join("");
				let randomPassword = "";
				for (let i = 0; i < length; i++) {
					const randomIndex = Math.floor(
						Math.random() * combineCharacters.length
					);
					randomPassword += combineCharacters[randomIndex];
				}
				setPassword(randomPassword);
			}
		}
		setNoError(true);
	};

	const submit = async () => {
		setNoError(false);
		document.querySelector(".urlInputBox").value = "";
		document.querySelector(".passwordInputBox").value = "";
		document.querySelector(".lengthInputBox").value = "";
		try {
			const data = {
				username: currentUser,
				url: url,
				urlPassword: password,
			};
			await axios.post("/api/urlPassword", data);
			fetchUrlList();
		} catch (error) {
			console.log(error);
		}
	};

	const fetchUrlList = async () => {
		try {
			const response = await axios.get("/api/urlPassword/" + currentUser);
			setUrlList(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const updateUrlPassword = async (index) => {
		try {
			const id = urlList[index]._id;
			await axios.put("/api/urlPassword/" + id, {
				url: updateUrl,
				urlPassword: updatePassword,
			});
			fetchUrlList();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteUrlPassword = async(index) => {
		try {
			const id = urlList[index]._id;
			await axios.delete("/api/urlPassword/" + id);
			fetchUrlList();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchUrlList();
	}, []);

	return (
		<>
			<Navbar />
			<div className="remainingManagerPageContainer">
				<div className="passwordContainer">
					<div className="rowContainer">
						<input
							className="urlInputBox"
							placeholder="URL"
							onChange={(e) => {
								setURL(e.target.value);
								setErrorURL("");
							}}
						></input>
						<input
							className="passwordInputBox"
							placeholder="Password"
							onChange={(e) => {
								setPassword(e.target.value);
								setErrorPassword("");
							}}
						></input>
					</div>
					<div className="rowContainer">
						<div className="errorURL">{errorURL}</div>
						<div className="errorPassword">{errorPassword}</div>
					</div>
					<div className="rowContainer">
						<div className="checkBoxContainer">
							<input
								type="checkbox"
								className="checkBox"
								onChange={(e) => {
									setAlphabet(e.target.checked);
									setErrorPassword("");
								}}
							></input>
							<div className="checkBoxText">Alphabet</div>
						</div>
						<div className="checkBoxContainer">
							<input
								type="checkbox"
								className="checkBox"
								onChange={(e) => {
									setNumerals(e.target.checked);
									setErrorPassword("");
								}}
							></input>
							<div className="checkBoxText">Numerals</div>
						</div>
						<div className="checkBoxContainer">
							<input
								type="checkbox"
								className="checkBox"
								onChange={(e) => {
									setSymbols(e.target.checked);
									setErrorPassword("");
								}}
							></input>
							<div className="checkBoxText">Symbols</div>
						</div>
						<input
							className="lengthInputBox"
							placeholder="Length (4~50)"
							onChange={(e) => {
								setLength(Number(e.target.value));
								setErrorPassword("");
							}}
						></input>
					</div>
					<div className="rowContainer">
						<button
							className={
								noError ? "disabledButton" : "checkSubmitButton"
							}
							onClick={() => checkSubmit()}
							disabled={noError}
						>
							Check
						</button>
						<button
							className={
								noError ? "checkSubmitButton" : "disabledButton"
							}
							onClick={() => submit()}
							disabled={!noError}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
			<div className="listPageContainer">
				{urlList.map((item, index) => (
					<div className="urlListContainer">
						<div className="urlListRow">
							<div className="urlListText">URL:</div>
							<div className="urlListText">{item.url}</div>
						</div>
						<div className="urlListRow">
							<div className="urlListText">Password:</div>
							<div className="urlListText">
								{item.urlPassword}
							</div>
						</div>
						<div className="urlListRow">
							<input
								className="updateUrlInputBox"
								placeholder="URL"
								onChange={(e) => {
									setUpdateUrl(e.target.value);
								}}
							></input>

							<input
								className="updateUrlInputBox"
								placeholder="Password"
								onChange={(e) => {
									setUpdatePassword(e.target.value);
								}}
							></input>
						</div>
						<div className="urlListRow">
							<button
								className="updateButton"
								onClick={() => updateUrlPassword(index)}
							>
								Update
							</button>
							<button
								className="deleteButton"
								onClick={() => deleteUrlPassword(index)}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default ManagerPage;
