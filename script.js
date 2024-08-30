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

function clearBooks() {
    const container = document.getElementById('card_container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function displayBooks() {

    clearBooks();

    for (let i = 0; i < myLibrary.length; i++) {
        const books = myLibrary[i];

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', i);
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

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');
        card.appendChild(buttonDiv);

        const removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-index', i);
        buttonDiv.appendChild(removeButton);

        const toggleRead = document.createElement('button');
        toggleRead.classList.add('toggleRead');
        toggleRead.textContent = 'Read / Not Read';
        removeButton.setAttribute('data-index', i);
        buttonDiv.appendChild(toggleRead);
    }

    attachEventListeners();

}

// End of display books function!!!

// Need a create event listeners functions

function attachEventListeners() {

    const removeButtons = document.getElementsByClassName('removeButton');
    const toggleButtons = document.getElementsByClassName('toggleRead');

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].setAttribute('data-index', i);
        removeButtons[i].addEventListener("click", function (event) {
            const index = event.target.getAttribute('data-index');
            myLibrary.splice(index, 1);
            console.log('Book removed at index:', index);
            clearBooks();
            displayBooks();
        });
    }

    for (let i = 0; i < toggleButtons.length; i++) {
        toggleButtons[i].setAttribute('data-index', i);
        toggleButtons[i].addEventListener("click", function (event) {
            const index = event.target.getAttribute('data-index');
            const book = myLibrary[index];
            const currentStatus = book.read;

            if (currentStatus === 'Read') {
                book.read = "Not yet read";
            } else if (currentStatus === 'Not yet read') {
                book.read = "Read";
            } else {
                alert("Error in Read status")
            }

            clearBooks();
            displayBooks();
        })
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    displayBooks();
});

function addNewBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readInput = document.getElementById('read');

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = parseInt(pagesInput.value.trim(), 10);
    const read = readInput.value;

    if (title.length < 3) {
        alert('The title must be at least 3 characters long.');
        return;
    }

    if (author.length < 3) {
        alert('The author\'\s name must be at least 3 characters long.');
        return;
    }

    if (isNaN(pages) || pages < 3) {
        alert('Please enter a number greater than or equal to 3.');
        return;
    }

    if (!read) {
        alert('Please select if you have already read the book or not.');
        return;
    }

    console.log('Title:', title);
    console.log('Author:', author);
    console.log('Pages:', pages);
    console.log('Read:', read);

    clearBooks();
    addBookToLibrary(title, author, parseInt(pages), read);
    displayBooks();

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').value = 'Read';
}

document.getElementById('add_book').addEventListener("click", addNewBook);