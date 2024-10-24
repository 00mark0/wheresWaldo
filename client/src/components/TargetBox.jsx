import PropTypes from "prop-types";

const TargetBox = ({ x, y, characters }) => {
  return (
    <div
      className="target-box absolute border-2 border-red-500 bg-white p-2"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <select className="border p-1 rounded">
        {characters.map((character) => (
          <option key={character.id} value={character.name}>
            {character.name}
          </option>
        ))}
      </select>
    </div>
  );
};

TargetBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TargetBox;
