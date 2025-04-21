import "../css/Clue.css";

function ClueCard({ clue }) {
  return (
    <div className="clue-info">
      <p>
        {clue.value} {clue.dir}
      </p>
    </div>
  );
}

export default ClueCard;
