import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ image, name, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/play/${image.id}`);
    }
  };

  return (
    <div className="image-card cursor-pointer" onClick={handleClick}>
      <img
        src={image.url}
        alt="Game"
        className="w-full h-auto rounded shadow"
      />
      <p className="text-center mt-2 font-semibold">{name}</p>
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ImageCard;
