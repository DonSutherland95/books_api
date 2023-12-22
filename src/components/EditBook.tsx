import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { Book } from "../types";

const EditBook: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { books, editBook } = useBookContext();
  const [editedBook, setEditedBook] = useState<Book | null>(null);

  // useEffect to set edited book when component mounts or when books array changes
  useEffect(() => {
    const selectedBook = books.find((book) => book.id === id);
    if (selectedBook) {
      setEditedBook(selectedBook);
    }
  }, [books, id]);
  // Function to handle changes in edited book fields
  const handleFieldChange = (field: keyof Book, value: string | number) => {
    setEditedBook((prevBook) => ({
      ...prevBook!,
      [field]: value,
    }));
  };
  // Function that save changes and navigate back to the book list
  const handleSaveChanges = () => {
    if (id && editedBook) {
      editBook(id, editedBook);
      navigate("/"); // Redirect to the book list after saving changes
    } else {
      console.error("Book ID is undefined or editedBook is null.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Redirect to the book list without saving changes
  };

  if (!editedBook) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography variant="h4">Book not found</Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Book
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Id"
                variant="outlined"
                value={editedBook.id}
                onChange={(e) => handleFieldChange("id", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={editedBook.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Published Year"
                variant="outlined"
                type="number"
                value={editedBook.publishedYear}
                onChange={(e) =>
                  handleFieldChange("publishedYear", Number(e.target.value))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                variant="outlined"
                value={editedBook.author}
                onChange={(e) => handleFieldChange("author", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                minRows={4}
                value={editedBook.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="default"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditBook;
