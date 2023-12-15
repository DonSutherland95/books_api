import React, { useState } from "react";
import { useBookContext } from "../context/BookContext";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate } from "react-router-dom";

const BookList: React.FC = () => {
  // Access books and editBook function from BookContext
  const { books, editBook } = useBookContext();
  // State for sorting order and field
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<"in" | "title">("in");
  const navigate = useNavigate();

  // handles toggling the sorting order
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Create sorted copy of the books array based on sortField and sortOrder
  const sortedBooks = [...books].sort((a, b) => {
    if (sortField === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      return sortOrder === "asc"
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    }
  });

  const handleEditBook = (id: string) => {
    navigate(`/edit/${id}`); // Navigate to the EditBook component
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h5">Sort Order</Typography>
      <Button variant="outlined" color="primary" onClick={handleSort}>
        Sort {sortField} {sortOrder}
      </Button>
      <List>
        {sortedBooks.map((book) => (
          <ListItem key={book.id}>
            <ListItemText
              primary={
                <>
                  <strong>{book.title}</strong> - {book.publishedYear},{" "}
                  {book.author}
                </>
              }
              secondary={book.description}
            />
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditBook(book.id)}
            >
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BookList;
