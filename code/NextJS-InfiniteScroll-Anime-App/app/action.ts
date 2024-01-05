"use server"; // Whatever written in this code will be executed as a server action

export const fetchAnime = async () => {
  // Fetch the Data from URL
  const response = await fetch("https://shikimori.one/api/animes");

  // Set Response Data into Variable
  const data = await response.json();

  console.log("Response: ", data);

  // Return Data after Response has been Fetched
  return data;
};
