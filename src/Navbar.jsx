import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserPasswordContext } from "./App";

function Navbar() {
	const [currentUser, setCurrentUser] = useContext(UserPasswordContext);
	const navigate = useNavigate();

	const logout = () => {
		setCurrentUser("");
		navigate('/');
	}
	return (
		<>
			<div className="navBarContainer">
				<div className="titleContainer">
					<h2 className="titleText">Password Manager</h2>
				</div>
				{currentUser !== "" ? (
					<div className="navbarFunctionContainer">
						<NavLink to="/" className="navLinkButton">
							<button className="navbarButton">
								<h2 className="navbarButtonText">Home</h2>
							</button>
						</NavLink>
						<button className="navbarButton" onClick={() => logout()}>
							<h2 className="navbarButtonText">Logout</h2>
						</button>
						<button className="navbarButton" onClick={() => navigate('/Manager')}>
							<h2 className="navbarButtonText">{currentUser}</h2>
						</button>
					</div>
				) : (
					<div className="navbarFunctionContainer">
						<NavLink to="/" className="navLinkButton">
							<button className="navbarButton">
								<h2 className="navbarButtonText">Home</h2>
							</button>
						</NavLink>
						<NavLink to="/Login" className="navLinkButton">
							<button className="navbarButton">
								<h2 className="navbarButtonText">Login</h2>
							</button>
						</NavLink>
						<NavLink to="/Register" className="navLinkButton">
							<button className="navbarButton">
								<h2 className="navbarButtonText">
									Create Account
								</h2>
							</button>
						</NavLink>
					</div>
				)}
			</div>
		</>
	);
}

export default Navbar;
