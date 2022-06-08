const fetchBook = async () => {
    const container = document.getElementById("book");
    
    const url = new URL(document.location)
    const bookId = url.searchParams.get('bookId')


    const res = await fetch(`http://localhost:8080/books/${bookId}`);
    const book = await res.json();

    const titleElement = document.createElement("h1");
    const ulElement = document.createElement("ul");
    const authorElement = document.createElement("li");
    const yearElement = document.createElement("li");
    const completedElement = document.createElement("li");

    titleElement.textContent = book.title;
    authorElement.textContent = `Author: ${book.author}`
    yearElement.textContent = `Year: ${book.year}`
    completedElement.textContent = `Read already?: ${book.completed ? 'Yes' : 'No'}`

    ulElement.append(authorElement, yearElement, completedElement);
    container.append(titleElement, ulElement)
}   
fetchBook()