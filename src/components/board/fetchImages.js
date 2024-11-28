import axios from "axios";

export const fetchImages = async () => {
  try {
    const response = await axios.get("/mockData.json");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return [];
  }
};
