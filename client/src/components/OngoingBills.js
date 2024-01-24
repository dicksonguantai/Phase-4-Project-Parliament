import react from react

function OngoingBills({name, affiliation, desc, votes,status}) {
    return(
        <div className="bills-container">
            <div className="name">
                <h2>{name}</h2>
            </div>
            <div className="affiliation">
                <h2>{affiliation}</h2>
            </div>
            <div className="desc">
                <h3>{desc}</h3>
            </div>
            <div className="votes">
                <h3>{votes}</h3>
            </div>
            <div className="status">
                <h3>{status}</h3>
            </div>

        </div>
    )
}