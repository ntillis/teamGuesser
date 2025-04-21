import ClueCard from './ClueCard';
import ClueHeaders from './ClueHeaders';
import { useGuessContext } from '../contexts/GuessContext';
import "../css/Clue.css";

function ClueGrid() {

    const {guessHistory} = useGuessContext();


    const displayConfig = [
        { header: 'League', field: 'league' },
        { header: '1st Season', field: 'firstSeason'},
        { header: 'Last Champs', field: 'lChamps'},
        { header: '# Champs', field: 'champs'},
        { header: 'Last Championship App.', field: 'lcga'},
        { header: 'Div. Champs Since 1990', field: 'confChamps90'},
        { header: 'Last Playoff App.', field: 'lpa'}
    ];

    return (
        <div className="clue-grid">
            <ClueHeaders headers={displayConfig} />
            <div>
                {guessHistory.map((guess, index) => (
                    <div key={index} className="guesses">
                        <h5>{guess.name}</h5>
                        <div className="guess-row">
                            {Object.entries(guess.results).map(([field, data]) => (
                                <div key={field} className="guess-values" style={{ backgroundColor: data.color }}>
                                    <ClueCard clue={data} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClueGrid;