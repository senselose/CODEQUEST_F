import React, { useEffect, useState } from "react";
import { fetchImages } from "./fetchImages";
import ImageCard from "./Test";

const Feed = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const data = await fetchImages();
      setImages(data);
    };
    loadImages();
  }, []);

  return (
    <div style={styles.feed}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

const styles = {
  feed: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
    padding: "20px"
  }
};

export default Feed;
