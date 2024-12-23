// Base Person Class
class Person {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

// Member Class extending Person
class Member extends Person {
  constructor(name, id, membershipType) {
    super(name, id);
    this.membershipType = membershipType;
  }
}

// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true; 
  }
}


class Loan {
  #fine; // Private field for fines

  constructor(book, member, dueDate) {
    this.book = book;
    this.member = member;
    this.dueDate = dueDate;
    this.#fine = 0; // Initial fine is 0
  }

  setFine(amount) {
    this.#fine = amount;
  }

  getFine() {
    return this.#fine;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.members = [];
    this.loans = [];
  }

  addBook(book) {
    this.books.push(book);
    console.log(`Book "${book.title}" added to the library.`);
  }

  registerMember(member) {
    this.members.push(member);
    console.log(`Member "${member.name}" registered.`);
  }

  issueBook(bookTitle, memberId) {
    const book = this.books.find(b => b.title === bookTitle && b.isAvailable);
    if (!book) {
      console.log(`Book "${bookTitle}" is not available.`);
      return;
    }

    const member = this.members.find(m => m.id === memberId);
    if (!member) {
      console.log(`Member with ID "${memberId}" not found.`);
      return;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); 
    const loan = new Loan(book, member, dueDate);

    book.isAvailable = false;
    this.loans.push(loan);
    console.log(`Book "${book.title}" issued to "${member.name}". Due date: ${dueDate.toDateString()}`);
  }

  displayBooks() {
    console.log("Books in the library:");
    this.books.forEach(book => {
      console.log(`${book.title} by ${book.author} (Available: ${book.isAvailable})`);
    });
  }
}

const library = new Library();

// Adding Books
const book1 = new Book("Harry Potter", "J.K. Rowling", "12345");
const book2 = new Book("The Merchant of Venice", "William Shakespeare", "67890");
library.addBook(book1);
library.addBook(book2);

// Registering Members
const member1 = new Member("Vedanshi", 1, "Gold");
const member2 = new Member("Harsh", 2, "Silver");
library.registerMember(member1);
library.registerMember(member2);

// Issuing Books
library.issueBook("Harry Potter", 1);
library.issueBook("The Merchant of Venice", 2);

// Displaying Books
library.displayBooks();
