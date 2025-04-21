import {createContext, useContext, useState, useEffect} from "react";

const GuessContext = createContext();

export const useGuessContext = () => useContext(GuessContext);

export const GuessProvider = ({children}) => {
    const [guessHistory, setGuessHistory] = useState([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem("guessHistory");

        if (storedHistory) {
            setGuessHistory(JSON.parse(storedHistory));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("guessHistory", JSON.stringify(guessHistory));
    }, [guessHistory]);

    const addGuess = (guess) => {
        setGuessHistory((prevHistory) => [...prevHistory, guess]);
    };
    const clearGuesses = () => {
        setGuessHistory([]);
    };

    const value = {
        guessHistory,
        addGuess,
        clearGuesses
    }

    return (
        <GuessContext.Provider value={value}>
            {children}
        </GuessContext.Provider>
    );
}