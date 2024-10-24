const myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    read: "Not yet read",
  },
  { title: "1984", author: "George Orwell", pages: 328, read: "Read" },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    read: "Read",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    read: "Not yet read",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    pages: 635,
    read: "Not yet read",
  },
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function clearBooks() {
  const container = document.getElementById("card_container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function displayBooks() {
  clearBooks();

  for (let i = 0; i < myLibrary.length; i++) {
    const books = myLibrary[i];

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", i);
    document.getElementById("card_container").appendChild(card);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = `Title: ${books.title}`;
    card.appendChild(titleDiv);

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = `Author: ${books.author}`;
    card.appendChild(authorDiv);

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pages");
    pagesDiv.textContent = `Pages: ${books.pages}`;
    card.appendChild(pagesDiv);

    const readDiv = document.createElement("div");
    readDiv.classList.add("read");
    readDiv.textContent = `Read? ${books.read}`;
    card.appendChild(readDiv);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");
    card.appendChild(buttonDiv);

    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-index", i);
    buttonDiv.appendChild(removeButton);

    const toggleRead = document.createElement("button");
    toggleRead.classList.add("toggleRead");
    toggleRead.textContent = "Read / Not Read";
    removeButton.setAttribute("data-index", i);
    buttonDiv.appendChild(toggleRead);
  }

  attachEventListeners();
}

function attachEventListeners() {
  const removeButtons = document.getElementsByClassName("removeButton");
  const toggleButtons = document.getElementsByClassName("toggleRead");

  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].setAttribute("data-index", i);
    removeButtons[i].addEventListener("click", function (event) {
      const index = event.target.getAttribute("data-index");
      myLibrary.splice(index, 1);
      console.log("Book removed at index:", index);
      clearBooks();
      displayBooks();
    });
  }

  for (let i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].setAttribute("data-index", i);
    toggleButtons[i].addEventListener("click", function (event) {
      const index = event.target.getAttribute("data-index");
      const book = myLibrary[index];
      const currentStatus = book.read;

      if (currentStatus === "Read") {
        book.read = "Not yet read";
      } else if (currentStatus === "Not yet read") {
        book.read = "Read";
      } else {
        alert("Error in Read status");
      }

      clearBooks();
      displayBooks();
    });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  displayBooks();
});

function addNewBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = parseInt(pagesInput.value.trim(), 10);
  const read = readInput.value;

  // Add book to library
  addBookToLibrary(title, author, pages, read);
  displayBooks();

  // Reset the form after adding the book
  form.reset();
  titleInput.focus();
}

// Declaring the specific elements needed for validity checking:

const form = document.getElementById("add_form");
const titleInput = document.getElementById("title");
const titleError = document.getElementById("title_error");
const authorInput = document.getElementById("author");
const authorError = document.getElementById("author_error");
const pagesInput = document.getElementById("pages");
const pagesError = document.getElementById("pages_error");
const readInput = document.getElementById("read");

// Function for testing validity of inputs and providing custom feedback:

(function addValidityCheckers() {
  titleInput.addEventListener("input", (event) => {
    if (titleInput.validity.valid) {
      titleError.textContent = "";
      titleError.className = "error";
    } else {
      showError(titleInput)
    }
  });

  authorInput.addEventListener("input", (event) => {
    if (authorInput.validity.valid) {
      authorError.textContent = "";
      authorError.className = "error";
    } else {
      showError(authorInput);
    }
  });

  pagesInput.addEventListener("input", (event) => {
    if (pagesInput.validity.valid) {
      pagesError.textContent = "";
      pagesError.className = "error";
    } else {
      showError(pagesInput);
    }
  });
})();

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Always prevent the default form submission.

  let isValid = true;

  if (!titleInput.validity.valid) {
    showError(titleInput);
    isValid = false;
  }
  if (!authorInput.validity.valid) {
    showError(authorInput);
    isValid = false;
  }
  if (!pagesInput.validity.valid) {
    showError(pagesInput);
    isValid = false;
  }

  if (isValid) {
    addNewBook(); // Call this only if the form is valid.
  }
});

function showError(inputSource) {
  const errorElement = document.getElementById(`${inputSource.id}_error`);
  if (inputSource.validity.valueMissing) {
    errorElement.textContent = "Please enter a value";
  } else if (inputSource.validity.typeMismatch) {
    errorElement.textContent = "Please enter the correct type of value";
  } else if (inputSource.validity.tooShort) {
    errorElement.textContent = `You have not entered enough characters. Please enter ${inputSource.minLength} characters.`;
  } else if (inputSource.validity.rangeUnderflow)  {
    errorElement.textContent = `You have not entered a high enough number. Please enter at least ${inputSource.min}`;
  }
    errorElement.classList.add("active");
}