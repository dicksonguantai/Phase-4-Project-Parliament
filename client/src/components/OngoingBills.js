import React, { useState } from 'react';

function OngoingBills({name, affiliation, description, status, upvotes, downvotes}) {
    return(
        <div className="ongoing-bills">
            <h2>{name}</h2>
            <p>Affiliation{affiliation}</p>
            <p>Description{description}</p>
            <p>Status{status}</p>
            <div>
                Upvotes: {upvotes} | Downvotes: {downvotes}
            </div>
        </div>
        
    );
};

export default OngoingBills;