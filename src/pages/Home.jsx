import ClueGrid from "../components/ClueGrid";
import "../css/Home.css";
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

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [search, setSearch] = useState("");
  const { addGuess } = useGuessContext();

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const randomId = Math.floor(Math.random() * 30) + 1;
        const docSnap = await getDoc(doc(db, "teams", String(randomId)));
        if (docSnap.exists()) {
          setAnswer(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoading(false);
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
        name:search.trim(),
        results: results
      }
      addGuess(guess);
      if (guess.name == answer.name) {
        alert("You guessed the team!");
      }
      setSearch("");
    } catch (err) {
      console.error(err);
    } 
  };

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter team name"
        />
        <button type="submit" className="search-button">Submit</button>
      </form>
      <ClueGrid />
    </div>
  );
}

export default Home;
