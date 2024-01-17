import axios from "axios";

const OPEN_LIBRARY_API_BASE_URL = "https://openlibrary.org/books";

export const fetchBookDetails = async (openLibraryId: string) => {
  try {
    const response = await axios.get(
      `${OPEN_LIBRARY_API_BASE_URL}/${openLibraryId}.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw new Error("Unable to fetch book details");
  }
};

const OPEN_LIBRARY_API_AUTHOR_BASE_URL = "https://openlibrary.org/authors";

export const fetchAuthorDetails = async (authorId: string) => {
  try {
    const response = await axios.get(
      `${OPEN_LIBRARY_API_AUTHOR_BASE_URL}/${authorId}.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching author details:", error);
    throw new Error("Unable to fetch author details");
  }
};

// add another function to convert different date types
