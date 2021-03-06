import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { ResultList, ResultListItem } from "../components/ResultList"
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})
  const [apiResponse, setResponse] = useState([]);
  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  function loadGoogleBooks() {
    API.googlebooksget(formObject).then(res => {
      setResponse(res.data.items);
    })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      loadGoogleBooks();
    }


  }

  const googleBookAdd = (e) => {
    const index = e.target.getAttribute("index")
    API.saveBook({
      title: apiResponse[index].volumeInfo.title,
      author: apiResponse[index].volumeInfo.authors.join(", "),
      synopsis: apiResponse[index].volumeInfo.description,
      image: apiResponse[index].volumeInfo.thumbnail, 
      link: apiResponse[index].volumeInfo.canonicalVolumeLink
    })
      .then(res => loadBooks())
      .catch(err => console.log(err));
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Look for books in Google Books</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              onChange={handleInputChange}
              name="author"
              placeholder="Author"
            />
            {/* <TextArea
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
            <FormBtn
              disabled={!(formObject.title)}
              onClick={handleFormSubmit}
            >
              Search
              </FormBtn>
          </form>
          <br /><br />
          {apiResponse[0] ? (
            <ResultList>
              {apiResponse.map((book,index) => (
                <ResultListItem key={book.id} index = {index} values={book} googleBookAdd={googleBookAdd}>
                </ResultListItem>
              ))}
            </ResultList>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Books On My List</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map(book => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
      </Row>
    </Container>
  );
}


export default Books;