/* eslint-disable max-classes-per-file */
const bookShelf = document.getElementById('bookshelf');
const addBtn = document.getElementById('add');
const title = document.getElementById('newName');
const author = document.getElementById('newAuthor');
class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}
class Bookshelf {
  constructor() {
    this.books = [];
  //  this.books = this.books.bind(this);
  }

  savedata() {
    localStorage.setItem('booksdata', JSON.stringify(this.books));
  }

  retrievedata() {
    if (localStorage.getItem('booksdata') != null) {
      this.books = JSON.parse(localStorage.getItem('booksdata'));
    }
    for (let i = 0; i < this.books.length; i += 1) {
      const container = document.createElement('div');
      bookShelf.appendChild(container);
      if (i%2=== 0) {
        container.className = 'class0';
      } else {
        container.className = 'class1';
      }
      const bookNameByAuthor = document.createElement('h4');
      bookNameByAuthor.innerHTML = this.books[i].name + ' by '+ this.books[i].author;
      container.appendChild(bookNameByAuthor);
      
      const removeButton = document.createElement('button');
      container.appendChild(removeButton);
      removeButton.innerHTML = 'Remove';
      removeButton.className = 'remove';
      removeButton.id = `${i}`;
      // eslint-disable-next-line no-use-before-define
      removeButton.addEventListener('click', this.removeBook.bind(this));
      const separator = document.createElement('hr');
      bookShelf.appendChild(separator);
    }
  }

  removeBook(event) {
    this.books.splice(event.target.id, 1);
    this.savedata();
    bookShelf.innerHTML = '';
    this.retrievedata();
  }

  addNewBook() {
    if (title.value !== '' && author.value !== '') {
      const book = new Book(title.value, author.value);
      this.books.push(book);
      this.savedata();
      bookShelf.innerHTML = '';
      this.retrievedata();
    }
  }
}

const mybookshelf = new Bookshelf();

addBtn.addEventListener('click', mybookshelf.addNewBook.bind(mybookshelf));

window.addEventListener('load', mybookshelf.retrievedata.bind(mybookshelf));