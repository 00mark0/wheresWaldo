import { useEffect, useState } from "react";
import axios from "../api/axios";
import ImageCard from "../components/ImageCard";

const MenuPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("/images");
      setImages(response.data);
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Select an Image to Play
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
