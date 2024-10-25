import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ImageCard from "../components/ImageCard";

const MenuPage = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("/images");
      setImages(response.data);
    };

    fetchImages();
  }, []);

  const imageNames = [
    "Image 1",
    "Image 2",
    "Image 3",
    "Image 4",
    "Image 5",
    "Image 6",
    "Image 7",
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Select an Image to Play
      </h1>
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-8 p-2 bg-blue-500 text-white rounded"
      >
        View Dashboard
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <ImageCard key={image.id} image={image} name={imageNames[index]} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
