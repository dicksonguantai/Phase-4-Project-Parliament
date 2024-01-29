import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar () {
    const navigate = useNavigate();

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
                navigate('/');
                alert('Logged out successfully');
            } else {
                throw new Error('Error logging out');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return(
        <nav>
            <ul>
                <li>
                    <Link to="/bill-proposal-form">Bill Proposal</Link>
                </li>
                <li>
                    <Link to="/ongoing-bills">Ongoing Bills</Link>
                </li>
                <li>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar   