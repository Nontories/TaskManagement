import { Platform } from "react-native";

export const isImageUrl = async (url) => {
  try {
    // For local files, simply check the file extension
    if (Platform.OS === "android" || Platform.OS === "ios") {
      const extension = url.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension);
    }

    // For network images, fetch and check response
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    return contentType && contentType.startsWith("image/");
  } catch (error) {
    console.error("Error checking image URL:", error);
    return false;
  }
};

// Function to format as "17:00 10/11/2024"
export const formatDateTime = (dateString) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

// Function to format as "10/11/2024"
export const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
