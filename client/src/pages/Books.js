import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import {ResultList,ResultListItem} from "../components/ResultList"
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
      console.log(apiResponse)
    }

    // API.saveBook({
    //   title: formObject.title,
    //   author: formObject.author,
    //   synopsis: formObject.synopsis
    // })
    //   .then(res => loadBooks())
    //   .catch(err => console.log(err));
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
          <br/><br/>
          {apiResponse[0] ? (
            <ResultList>
              {apiResponse.map(book => (
                <ResultListItem key={book.id} values={book}>
                  
                  {/* <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link> */}
                  {/* <DeleteBtn onClick={() => deleteBook(book._id)} /> */}
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
// {
//   "kind": "books#volume",
//   "id": "UULaCAAAQBAJ",
//   "etag": "GONiNZl6WwU",
//   "selfLink": "https://www.googleapis.com/books/v1/volumes/UULaCAAAQBAJ",
//   "volumeInfo": {
//     "title": "The Two Towers (LOTR #2)",
//     "subtitle": "Being The Second Part Of The Lord Of The Rings",
//     "authors": [
//       "John Ronald Reuel Tolkien"
//     ],
//     "publisher": "DISCOZUU",
//     "publishedDate": "1982",
//     "readingModes": {
//       "text": true,
//       "image": false
//     },
//     "pageCount": 447,
//     "printType": "BOOK",
//     "categories": [
//       "Fairy tales"
//     ],
//     "averageRating": 4,
//     "ratingsCount": 1297,
//     "maturityRating": "NOT_MATURE",
//     "allowAnonLogging": false,
//     "contentVersion": "1.1.1.0.preview.2",
//     "imageLinks": {
//       "smallThumbnail": "http://books.google.com/books/content?id=UULaCAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//       "thumbnail": "http://books.google.com/books/content?id=UULaCAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
//     },
//     "language": "en",
//     "previewLink": "http://books.google.com/books?id=UULaCAAAQBAJ&dq=intitle:lotr&hl=&cd=1&source=gbs_api",
//     "infoLink": "http://books.google.com/books?id=UULaCAAAQBAJ&dq=intitle:lotr&hl=&source=gbs_api",
//     "canonicalVolumeLink": "https://books.google.com/books/about/The_Two_Towers_LOTR_2.html?hl=&id=UULaCAAAQBAJ"
//   },
//   "saleInfo": {
//     "country": "US",
//     "saleability": "NOT_FOR_SALE",
//     "isEbook": false
//   },
//   "accessInfo": {
//     "country": "US",
//     "viewability": "NO_PAGES",
//     "embeddable": false,
//     "publicDomain": false,
//     "textToSpeechPermission": "ALLOWED",
//     "epub": {
//       "isAvailable": true
//     },
//     "pdf": {
//       "isAvailable": true
//     },
//     "webReaderLink": "http://play.google.com/books/reader?id=UULaCAAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
//     "accessViewStatus": "NONE",
//     "quoteSharingAllowed": false
//   }
// }