import React, { useState } from "react";
import { useBookContext } from "../context/BookContext";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  fetchBookDetails,
  fetchAuthorDetails,
} from "../services/openLibraryApi";

const BookForm: React.FC = () => {
  // Access addBook function from the BookContext
  const { addBook } = useBookContext();
  // manage the Open Library ID, and error message
  const [openLibraryId, setOpenLibraryId] = useState("OL3653624M");
  const [errorMessage, setErrorMessage] = useState<string>("");
  // Handler for changes in Open Library ID input field
  const handleOpenLibraryIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOpenLibraryId(event.target.value);
  };

  const handleAddBook = async () => {
    try {
      // Fetch book details from the Open Library API using the library ID
      const editionDetails = await fetchBookDetails(openLibraryId);

      // fetch author details to handle edge case
      const authorDetails = await fetchAuthorDetails(
        editionDetails.authors[0].key.split("/")[2]
      );
      // Create new book object based on the details
      const newBook = {
        id: editionDetails.key.split("/")[2],
        title: editionDetails.title,
        publishedYear: editionDetails.publish_date,
        // author: editionDetails.authors?.[0]?.name || "Author Unknown",
        author: authorDetails.name || "Author Unknown",
        description:
          editionDetails.description?.value || "No description available",
      };
      addBook(newBook);
    } catch (error) {
      console.error("Error adding book:", error);
      setErrorMessage("Please use a correct ID for the Editions API");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h5">
        Add a book by Open Library ID Number{" "}
      </Typography>
      <TextField
        label="Open Library Edition ID"
        variant="outlined"
        value={openLibraryId}
        onChange={handleOpenLibraryIdChange}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddBook}
      >
        Add Book
      </Button>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </Container>
  );
};

export default BookForm;
