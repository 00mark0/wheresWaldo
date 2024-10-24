import PropTypes from "prop-types";

const CharacterMarker = ({ x, y, name }) => {
  return (
    <div
      className="character-marker bg-yellow-500 border border-black p-1 rounded-full absolute"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {name}
    </div>
  );
};

CharacterMarker.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default CharacterMarker;
