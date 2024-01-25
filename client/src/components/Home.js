import react from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

function Home () {
    return(
        <div className = "landing-page">
            <header>
                <h1>VOTING SYSTEM</h1>
            </header>
            <div className="signIn-Button">
                <span className="user-text">Existing User?</span>
                <Link to="/Login">
                    <button>Sign In</button>
                </Link>
            </div>
            <div className="content-text">
                <p>Welcome to the Parliamentary Bill Tracker, a dedicated platform designed for Members of Parliament (MPs) to cast votes on crucial legislative matters. Whether you're an elected representative shaping policy or an engaged citizen keeping a pulse on governance, our platform ensures transparency and accessibility in the legislative decision-making process.</p>
                <h2>About Parliamentary Bill Tracker</h2>
                <p>The Parliamentary Bill Tracker is a specialized voting system tailored for Members of Parliament. It serves as a centralized hub for legislative voting, enabling MPs to cast their votes efficiently and providing citizens with real-time access to parliamentary decisions. Our platform bridges the gap between elected representatives and the public, fostering a more informed and engaged democracy.</p>
            </div>
            <div className="signup-button">
                <span className="user-text">New User?</span>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;