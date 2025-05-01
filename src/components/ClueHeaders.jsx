import "../css/Main.css";

function ClueHeaders ({headers}) {
    return (
        <div className="headers-row">
            {headers.map((item) => (
                <div key={item.field} className="header">
                    {item.header}
                </div>
            ))}
        </div>
    );
}

export default ClueHeaders;