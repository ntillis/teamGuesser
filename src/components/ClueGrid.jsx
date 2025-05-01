import ClueCard from './ClueCard';
import { useGuessContext } from '../contexts/GuessContext';
import "../css/Main.css";

function ClueGrid() {

    const {guessHistory} = useGuessContext();

    return (
        <div className="clue-grid">
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