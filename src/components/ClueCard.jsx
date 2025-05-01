import "../css/Main.css";

function ClueCard({ clue }) {
  const isHexColor = /^#([0-9A-F]{3}){1,2}$/i.test(clue.value);
  return (
    <div className="clue-info">
      <p>
      {isHexColor ? (
          <span>
            <span
              style={{
                display: 'inline-block',
                width: '2em',
                height: '2em',
                backgroundColor: clue.value,
                marginRight: '0.5em',
                border: '1px solid #ccc',
                verticalAlign: 'middle',
              }}
            ></span>
          </span>
        ) : (
          `${clue.value} ${clue.dir}`
        )}
      </p>
    </div>
  );
}

export default ClueCard;
