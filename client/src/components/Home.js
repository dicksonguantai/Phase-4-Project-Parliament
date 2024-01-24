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
                <Link to="/Login">
                    <button>Sign In</button>
                </Link>
            </div>
            <div className="content-text">
                <p>Legislative bodies often face challenges in efficiently monitoring bills, sponsors, votes, and outcomes. Existing systems may lack simplicity or be cumbersome to manage, necessitating a streamlined and accessible tool.</p>
                <h2>About</h2>
                <p>The "Parliamentary Bill Tracker" is a user-friendly system developed using Flask and React, designed to monitor bills submitted to parliament. It maintains comprehensive records of sponsoring MPs, vote tallies, and legislative outcomes, providing a clear overview within a manageable platform.</p>
            </div>
            <div className="signup-button">
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;