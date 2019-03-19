import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import AddBtn from "../components/AddBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
import { Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import BookCard from "../components/BookCard";

class Search extends Component {
  state = {
    books: [],
    index: "",
    title: "",
    author: "",
    synopsis: "",
    thumbnail: "",
    selfLink: ""
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  addBook = index => {
    console.log("Add this book!", this.state.books);
    console.log("index is:", index);

    API.saveBook(this.state.books[index]).then(
      res =>
        //redirect to Books page
        (window.location.href = "/")
      // this.context.router.push("/")
      // console.log("hello");
    );

    // API.deleteBook(id)
    //   .then(res => this.loadBooks())
    //   .catch(err => console.log(err));
  };

  handleBookSearch = event => {
    event.preventDefault();
    if (this.state.title) {
      console.log("search google for the book");
      API.searchGoogle(this.state.title)
        .then(res => {
          console.log("response is:", res);
          this.setState({
            books: res,
            index: "",
            title: "",
            author: "",
            synopsis: "",
            thumbnail: "",
            selfLink: ""
          });
          // console.log("res.data.items is:", res.data.items);

          // console.log({
          //   foo: res.data.items.volumeInfo,
          //   authors: "",
          //   description: "",
          //   imageLinks: "",
          //   title: ""
          // });
          // this.setState({ books: res.data, title: "", author: "", synopsis: "" });
        })
        .catch(err => console.log(err));
    }
  };
  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({
  //         books: res.data,
  //         title: "",
  //         author: "",
  //         synopsis: "",
  //         thumbnail: ""
  //       })
  //     )
  //     .catch(err => console.log(err));
  // };
  render() {
    return (
      <Container fluid>
        {/* <Row> */}
        {/* <Col size="md-6"> */}
        <Jumbotron>
          <h1>Search Google Books</h1>
        </Jumbotron>
        <form>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Title (required)"
          />
          <FormBtn
            // disabled={!(this.state.author && this.state.title)}
            disabled={!this.state.title}
            onClick={this.handleBookSearch}
          >
            Search
          </FormBtn>
        </form>

        <Jumbotron>
          <h4>Results</h4>
        </Jumbotron>

        {this.state.books.map(book => (
          <BookCard
            key={book.index}
            index={book.index}
            title={book.title}
            author={book.author}
            synopsis={book.synopsis}
            thumbnail={book.thumbnail}
            addBook={this.addBook}
          />
        ))}
      </Container>
    );
  }
}

export default Search;
