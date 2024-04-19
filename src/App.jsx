import { useState, createContext, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ManagerPage from "./ManagerPage.jsx";
import axios from "axios";

export const UserPasswordContext = createContext();
function App() {
	const [currentUser, setCurrentUser] = useState("");
	const [currentUserId, setCurrentUserId] = useState("");

	const loggedIn = async () => {
		try {
			const response = await axios.get("/api/user");
			if (response.data.length !== 0) {
				setCurrentUser(response.data.username);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loggedIn();
	}, []);

	const router = createBrowserRouter([
		{ path: "/", element: <Home /> },
		{ path: "/Register", element: <Register /> },
		{ path: "/Login", element: <Login /> },
		{ path: "/Manager", element: <ManagerPage /> },
	]);
	return (
		<>
			<UserPasswordContext.Provider
				value={[
					currentUser,
					setCurrentUser,
					currentUserId,
					setCurrentUserId,
				]}
			>
				<RouterProvider router={router}></RouterProvider>
			</UserPasswordContext.Provider>
		</>
	);
}

export default App;
