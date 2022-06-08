const tableBody = document.querySelector(`tbody`);
let showUnreadOnly = false;
let orderBy = "title";
let orderDirection = "asc";

const toggleDirection = () => {
    orderDirection = orderDirection === "asc" ? "desc" : "asc"
}

const setOrderBy = (newOrberBy) => {
    orderBy = newOrberBy;
    orderDirection = "asc";
}

const changeOrder = (newOrberBy) => {
    if(orderBy === newOrberBy){
        toggleDirection()
    }else {
        setOrderBy(newOrberBy)
    }

    fetchBooks();
}

const searchBooks = async (searchTerm) => {
    const response = await fetch(`http://localhost:8080/books/search?searchTerm=${searchTerm}`);

    const books = await response.json();

    console.log(books);
}

const fetchBooks = async () => {
    const res = await fetch(`http://localhost:8080/books?showUnread=${showUnreadOnly}&orderBy=${orderBy}&orderDirection=${orderDirection}`);
    const books = await res.json();

    tableBody.innerText = "";
    // console.log(books)
    books.forEach(book => {
        
        const row = document.createElement(`tr`);
        const titleCell = document.createElement(`td`);
        const titleAnchor = document.createElement("a");
        const authorCell = document.createElement(`td`);
        const yearCell = document.createElement(`td`);
        const completedCell = document.createElement(`td`);

        titleAnchor.textContent = book.title;
        titleAnchor.setAttribute("target", "_blank")
        titleAnchor.href = `book.html?bookId=${book._id}`;
        authorCell.textContent = book.author;
        yearCell.textContent = book.year;
        completedCell.textContent = book.completed ? `Yes` : `No`;

        titleCell.append(titleAnchor)
        row.append(titleCell, authorCell, yearCell, completedCell);
        tableBody.append(row)
        
    })
}

document.getElementById("show-unread").addEventListener("change", (event)=> {
    const isChecked = event.target.checked;
    showUnreadOnly = isChecked

    fetchBooks();
});

document.getElementById("sort-title").addEventListener("click", () => {
    // if(orderBy === "title"){
    //     toggleDirection()
    // }else {
    //     setOrderBy("title")
    // }
    changeOrder("title")
    fetchBooks();
});

document.getElementById("sort-author").addEventListener("click", () => {
    // if(orderBy === "author"){
    //     toggleDirection()
    // }else {
    //     setOrderBy("author")
    // }
    changeOrder("author")
    fetchBooks();
})

document.getElementById("sort-year").addEventListener("click", () => {
    // if(orderBy === "year"){
    //     toggleDirection()
    // }else {
    //     setOrderBy("year")
    // }
    changeOrder("year")
    fetchBooks();
})

document.getElementById("search-button").addEventListener("click", () => {
    const searchTerm = document.getElementById("search").value;
    searchBooks(searchTerm)
})

fetchBooks();

