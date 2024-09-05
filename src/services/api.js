const baseUrl = "https://apod.ellanan.com/api";

export async function fetchRandomImage() {
  try {
    const response = await fetch(`${baseUrl}?count=1`);
    if (!response.ok) {
      throw new Error("Failed to fetch random image");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching random image:", error);
    throw error;
  }
}

export async function fetchImageByDate(date) {
  try {
    const response = await fetch(`${baseUrl}?date=${date}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch image for date: ${date}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching image for date (${date}):`, error);
    throw error;
  }
}
