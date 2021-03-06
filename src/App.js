// import * as BooksAPI from './BooksAPI'
import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';

//?bookshelf.js and books.js not sure if i want to create 3 different components want to read, read, currently reading

class BooksApp extends React.Component {
  state = {books:[]} 

  componentDidMount() {
    BooksAPI.getAll()
    .then(books=> {
      this.setState({books});
    })
  }

  updateBookshelf = (book,shelf) => {
    BooksAPI.update(book,shelf)
    .then(response=> {
      book.shelf=shelf;
      this.setState(state=>({
        books: state.books.filter(Book=>Book.id !== book.id).concat(book)
      }));
    });
  }

  render() {
   return (
      <div>
        <Route exact path="/" render={() => (
          <MainPage
            books={this.state.books} 
        	updateBookshelf={this.updateBookshelf}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <SearchPage
            books={this.state.books} 
        	updateBookshelf={this.updateBookshelf}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;