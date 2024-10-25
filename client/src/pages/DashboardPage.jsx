import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const DashboardPage = () => {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  const imageNames = [
    { id: 1, name: "Image 1" },
    { id: 2, name: "Image 2" },
    { id: 3, name: "Image 3" },
    { id: 4, name: "Image 4" },
    { id: 5, name: "Image 5" },
    { id: 6, name: "Image 6" },
    { id: 7, name: "Image 7" },
  ];

  const handleImageClick = async (imageId) => {
    setSelectedImageId(imageId);
    const response = await axios.get(`/scores/image/${imageId}`);
    setScores(response.data);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-start mb-8">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Back to Menu
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
      <div className="text-center mb-8">
        {imageNames.map((image) => (
          <button
            key={image.id}
            onClick={() => handleImageClick(image.id)}
            className="mx-2 p-2 bg-blue-500 text-white rounded"
          >
            {image.name}
          </button>
        ))}
      </div>
      {selectedImageId && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Scores for{" "}
            {imageNames.find((img) => img.id === selectedImageId).name}
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Rank</th>
                <th className="py-2">Username</th>
                <th className="py-2">Time Taken (seconds)</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={score.id}>
                  <td className="py-2 text-center">{index + 1}</td>
                  <td className="py-2 text-center">
                    {score.user?.name || "Anonymous"}
                  </td>
                  <td className="py-2 text-center">{score.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
