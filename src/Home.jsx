import "./Home.css";
import Navbar from "./Navbar";

function Home() {
	return (
		<>
			<Navbar />
			<div className="remainingHomePageContainer">
				<div className="introContainer">
					<p className="introParagraph">
						A website that can help users track and create
						passwords, as well as share passwords with people they
						trust. Once the user logs in, they would be able to see
						all the passwords that are associated with their
						account. They would also be able to create a new
						password for a website. If the user includes a password
						with the request, then that password should be chosen:
						otherwise, a randomly generate password for that user
						based on certain parameters. Finally, users would be
						able to share their passwords with another user.
					</p>
					<div className="introParagraph">Creator: Steve Chen</div>
				</div>
			</div>
		</>
	);
}

export default Home;
