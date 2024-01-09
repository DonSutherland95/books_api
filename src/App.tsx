import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import EditBook from "./components/EditBook";
import { Container, CssBaseline, Paper, Typography } from "@material-ui/core";
// add testing imports

const App: React.FC = () => {
  return (
    <BookProvider>
      <Router>
        <CssBaseline />
        <Container maxWidth="md">
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <Typography variant="h3" align="center" gutterBottom>
              Book Manager
            </Typography>
            <Routes>
              <Route
                path="/"
                element={
                  <Fragment>
                    <BookForm />
                    <BookList />
                  </Fragment>
                }
              />
              <Route path="/edit/:id" element={<EditBook />} />
            </Routes>
          </Paper>
        </Container>
      </Router>
    </BookProvider>
  );
};

export default App;
