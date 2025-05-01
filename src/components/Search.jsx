import "../css/Main.css";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { gradeGuess } from "../utils/gameLogic";
import { useGuessContext } from "../contexts/GuessContext";

function Search() {

  const teams = [
    "New York Yankees",
    "Boston Red Sox",
    "Toronto Blue Jays",
    "Baltimore Orioles",
    "Tampa Bay Rays",
    "Chicago White Sox",
    "Cleveland Guardians",
    "Detroit Tigers",
    "Minnesota Twins",
    "Kansas City Royals",
    "Houston Astros",
    "Los Angeles Angels",
    "Seattle Mariners",
    "Texas Rangers",
    "Athletics",
    "Atlanta Braves",
    "Miami Marlins",
    "New York Mets",
    "Philadelphia Phillies",
    "Washington Nationals",
    "Chicago Cubs",
    "Cincinnati Reds",
    "Milwaukee Brewers",
    "Pittsburgh Pirates",
    "St. Louis Cardinals",
    "Arizona Diamondbacks",
    "Colorado Rockies",
    "Los Angeles Dodgers",
    "San Diego Padres",
    "San Francisco Giants"
  ]

  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [search, setSearch] = useState("");
  const { addGuess } = useGuessContext();

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const randomId = Math.floor(Math.random() * 34) + 1;
        const docSnap = await getDoc(doc(db, "teams", String(randomId)));
        if (docSnap.exists()) {
          setAnswer(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      }
    };
    fetchAnswer();
  }, []);

  const makeGuess = async (guess) => {
    const teamsRef = collection(db, "teams");
    const q = query(teamsRef, where("name", "==", guess));
    try {
      const guessSnap = await getDocs(q);

      if (!guessSnap.empty) {
        const guessedTeam = guessSnap.docs[0].data();
        const results = gradeGuess(guessedTeam, answer);

        return results;
      } else {
        console.error("No such team found!");
        setSearch("");
      }
    } catch (err) {
      setError("Failed to load data.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() === "") return;

    try {
      const results = await makeGuess(search.trim());
      const guess = {
        name: search.trim(),
        results: results,
      };
      addGuess(guess);
      if (guess.name == answer.name) {
        alert("You guessed the team!");
      }
      setSearch("");
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter team name"
          className="search-input"
        />
      </form>
    </div>
  );
}

export default Search;
