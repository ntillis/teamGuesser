import '../css/NavBar.css';

function NavBar () {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2>Team Guesser</h2>
            </div>
            <div className="navbar-links">
                <h3>Help</h3>
                <h3>Settings</h3>
            </div>
        </nav>
    )
}

export default NavBar;

