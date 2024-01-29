import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar () {

    useEffect(() => {
        fetch('/check_session')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error fetching user role');
            }
        })
    }, []);

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = '/';
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