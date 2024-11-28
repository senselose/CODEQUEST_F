import React from "react";
import { FaHeart } from "react-icons/fa";

const Test = ({ image }) => {
  return (
    <div style={styles.card}>
      <img src={image.imageUrl} alt={image.caption} style={styles.image} />
      <div style={styles.info}>
        <p>{image.caption}</p>
        <div>
          <FaHeart style={styles.icon} /> {image.likes}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: { border: "1px solid #ddd", borderRadius: "10px", margin: "10px" },
  image: { width: "100%", borderRadius: "10px 10px 0 0" },
  info: { padding: "10px" },
  icon: { color: "red", marginRight: "5px" }
};

export default Test;
