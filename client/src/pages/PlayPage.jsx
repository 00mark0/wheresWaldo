import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import TargetBox from "../components/TargetBox";
import CharacterMarker from "../components/CharacterMarker";

const PlayPage = () => {
  const { imageId } = useParams();
  const [image, setImage] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [clickCoordinates, setClickCoordinates] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime] = useState(null);
  const [name, setName] = useState("");
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchImageDetails = async () => {
      const response = await axios.get(`/images/${imageId}`);
      const img = new Image();
      img.src = response.data.url;
      img.onload = () => {
        setImage({
          url: response.data.url,
          width: img.width,
          height: img.height,
        });
        setCharacters(response.data.characters);
        setStartTime(Date.now());
      };
    };

    fetchImageDetails();
  }, [imageId]);

  const handleClick = async (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates
    const normalizedX = (x / rect.width) * image.width;
    const normalizedY = (y / rect.height) * image.height;

    setClickCoordinates({ x: normalizedX, y: normalizedY });

    console.log(`Click Coordinates: x=${normalizedX}, y=${normalizedY}`);

    const response = await axios.post("/validate/validate-click", {
      imageId: parseInt(imageId),
      x: normalizedX,
      y: normalizedY,
    });

    if (response.data.success) {
      setFeedback(`You found ${response.data.character}!`);
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        { x: normalizedX, y: normalizedY, name: response.data.character },
      ]);
    } else {
      setFeedback("Try again!");
    }
  };

  const handleNameSubmit = async () => {
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    await axios.post("/scores", {
      userId: 1, // Example user ID
      imageId: parseInt(imageId),
      timeTaken,
    });
    await axios.post("/users", {
      name,
      sessionId: "unique-session-id", // Example session ID
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Where&apos;s Waldo
      </h1>
      {image && (
        <div className="relative">
          <img
            src={image.url}
            alt="Game"
            onClick={handleClick}
            className="w-full h-auto"
            style={{ cursor: "crosshair" }}
          />
          {clickCoordinates && (
            <TargetBox
              x={clickCoordinates.x}
              y={clickCoordinates.y}
              characters={characters}
            />
          )}
          {markers.map((marker, index) => (
            <CharacterMarker
              key={index}
              x={marker.x}
              y={marker.y}
              name={marker.name}
            />
          ))}
        </div>
      )}
      {feedback && <p className="text-center mt-4">{feedback}</p>}
      {endTime && (
        <div className="text-center mt-4">
          <p>Your time: {Math.floor((endTime - startTime) / 1000)} seconds</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border p-2 rounded"
          />
          <button
            onClick={handleNameSubmit}
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
