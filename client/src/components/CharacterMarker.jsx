import PropTypes from "prop-types";

const CharacterMarker = ({ x, y, imageWidth, imageHeight, name }) => {
  // Normalize coordinates based on the actual dimensions of the image
  const normalizedX = (x / imageWidth) * 100;
  const normalizedY = (y / imageHeight) * 100;

  return (
    <div
      className="character-marker bg-yellow-500 border border-black p-1 rounded-full absolute"
      style={{
        left: `${normalizedX}%`,
        top: `${normalizedY}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="text-xs font-bold">{name}</span>
    </div>
  );
};

CharacterMarker.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default CharacterMarker;
