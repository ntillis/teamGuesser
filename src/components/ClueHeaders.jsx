import "../css/Clue.css";

function ClueHeaders ({headers}) {
    return (
        <div className="guess-row">
            {headers.map((item) => (
                <div key={item.field} className="header">
                    {item.header}
                </div>
            ))}
        </div>
    );
}

export default ClueHeaders;