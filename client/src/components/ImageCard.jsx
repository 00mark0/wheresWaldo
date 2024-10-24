import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/play/${image.id}`);
  };

  return (
    <div className="image-card cursor-pointer" onClick={handleClick}>
      <img
        src={image.url}
        alt="Game"
        className="w-full h-auto rounded shadow"
      />
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageCard;
