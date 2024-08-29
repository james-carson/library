const myLibrary = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, read: 'Not yet read' },
    { title: '1984', author: 'George Orwell', pages: 328, read: 'Read' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 281, read: 'Read' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: 180, read: 'Not yet read' },
    { title: 'Moby Dick', author: 'Herman Melville', pages: 635, read: 'Not yet read' }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

// TODO: Update this function so that it actually adds the new book. EITHER make a new function (or modify) that adds it individually, or clear all books here and then add all again.

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        const books = myLibrary[i];

        const card = document.createElement('div');
        card.classList.add('card');
        document.getElementById('card_container').appendChild(card);

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = `Title: ${books.title}`;
        card.appendChild(titleDiv);

        const authorDiv = document.createElement('div');
        authorDiv.classList.add('author');
        authorDiv.textContent = `Author: ${books.author}`;
        card.appendChild(authorDiv);

        const pagesDiv = document.createElement('div');
        pagesDiv.classList.add('pages');
        pagesDiv.textContent = `Pages: ${books.pages}`;
        card.appendChild(pagesDiv);

        const readDiv = document.createElement('div');
        readDiv.classList.add('read');
        readDiv.textContent = `Read? ${books.read}`;
        card.appendChild(readDiv);

    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    displayBooks();
});

function validateInput() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readInput = document.getElementById('read');

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.value;

    console.log('Title:', title);
    console.log('Author:', author);
    console.log('Pages:', pages);
    console.log('Read:', read);

    addBookToLibrary(title, author, parseInt(pages), read);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').value = 'Read';
}

document.getElementById('add_book').addEventListener("click", validateInput);
