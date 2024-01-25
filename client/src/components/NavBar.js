import React from "react";
import { Link } from "react-router-dom";

function NavBar () {
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
                    <Link to="/bills/:bill_Id">Bill Details</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar   