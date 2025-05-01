import "../css/Main.css";
import ClueHeaders from "./ClueHeaders";
import Search from "./Search";

function NavBar() {

    const displayConfig = [
        { header: 'League', field: 'league' },
        { header: 'Division', field: 'division'},
        { header: '1st Season', field: 'firstSeason'},
        { header: 'Last Champs', field: 'lChamps'},
        { header: '# Champs', field: 'champs'},
        { header: 'Last Playoff App.', field: 'lpa'},
        { header: 'Primary Color', field: 'pColor'},
        { header: 'Secondary Color', field: 'sColor'}    
    ];

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>Big Fourdle</h2>
        </div>
        <div className="navbar-links">
          <h3>Leaderboard</h3>
          <h3>Help</h3>
          <h3>Settings</h3>
        </div>
      </nav>
      <Search />
    <div className="header-container">
      <ClueHeaders headers={displayConfig} />
      </div>
    </div>
  );
}

export default NavBar;
