import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import CharacterMarker from "../components/CharacterMarker";
import "../App.css";

const PlayPage = () => {
  const { imageId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [characters, setCharacters] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [clickCoordinates, setClickCoordinates] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [name, setName] = useState("");
  const [markers, setMarkers] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);

  const fetchImageDetails = useCallback(async () => {
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
      setLoading(false);
    };
  }, [imageId]);

  useEffect(() => {
    fetchImageDetails();
  }, [imageId, fetchImageDetails]);

  const handleClick = async (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates
    const normalizedX = (x / rect.width) * image.width;
    const normalizedY = (y / rect.height) * image.height;

    setClickCoordinates({ x: normalizedX, y: normalizedY });

    const response = await axios.post("/validate/validate-click", {
      imageId: parseInt(imageId),
      x: normalizedX,
      y: normalizedY,
    });

    if (response.data.success) {
      setFeedback(`You found ${response.data.character}!`);
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          x: normalizedX,
          y: normalizedY,
          name: response.data.character,
        },
      ]);
      setFoundCharacters((prevFound) => [
        ...prevFound,
        response.data.character,
      ]);

      if (foundCharacters.length + 1 === characters.length) {
        setEndTime(Date.now());
      }
    } else {
      setFeedback("Try again!");
    }
  };

  const handleNameSubmit = async () => {
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const userResponse = await axios.post("/users", {
      name,
      sessionId: "unique-session-id", // Example session ID
    });
    const userId = userResponse.data.id;

    await axios.post("/scores", {
      userId,
      imageId: parseInt(imageId),
      timeTaken,
    });

    setFeedback("Score saved!");
    setScoreSubmitted(true);

    // Reset the game state
    setTimeout(() => {
      setScoreSubmitted(false);
      setClickCoordinates(null);
      setFeedback("");
      setStartTime(null);
      setEndTime(null);
      setName("");
      setMarkers([]);
      setFoundCharacters([]);
      fetchImageDetails();
    }, 2000); // Adjust the delay as needed
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 7));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleResetGame = () => {
    setScoreSubmitted(false);
    setClickCoordinates(null);
    setFeedback("");
    setStartTime(null);
    setEndTime(null);
    setName("");
    setMarkers([]);
    setFoundCharacters([]);
    fetchImageDetails();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-8">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Back to Menu
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 bg-blue-500 text-white rounded"
        >
          View Dashboard
        </button>
      </div>
      <div className="flex justify-between mb-8">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-gray-500 text-white rounded"
          disabled={zoomLevel <= 1}
        >
          Zoom Out
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Zoom In
        </button>
        <button
          onClick={handleResetZoom}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Reset Zoom
        </button>
        <button
          onClick={handleResetGame}
          className="p-2 bg-red-500 text-white rounded"
        >
          Reset Game
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">
        Where&apos;s Waldo
      </h1>
      <p className="text-center mb-2">
        Hint: When looking for Woof the Dog, look for his striped tail. Usually
        only his tail is visible in the images.
      </p>
      {feedback && (
        <p className="text-center mt-4 text-lg font-semibold">{feedback}</p>
      )}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <>
          {foundCharacters.length === characters.length && !scoreSubmitted && (
            <div className="text-center mt-4">
              <p>
                Your time: {Math.floor((endTime - startTime) / 1000)} seconds
              </p>
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
          {image && (
            <div
              className="relative"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "top left",
              }}
            >
              <img
                ref={imageRef}
                src={image.url}
                alt="Game"
                onClick={handleClick}
                className="w-full h-auto"
                style={{ cursor: "crosshair" }}
              />
              {markers.map((marker, index) => (
                <CharacterMarker
                  key={index}
                  x={marker.x}
                  y={marker.y}
                  imageWidth={image.width}
                  imageHeight={image.height}
                  name={marker.name}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlayPage;
