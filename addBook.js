

const addBook = async (book) => {
    await fetch(`http://localhost:8080/books`, {
    method: `POST`,
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify(book)
    })
}
document.querySelector("form").addEventListener(`submit`,event => {
    event.preventDefault();
       
        const elements = event.target.elements

        const book = {
            title: elements.addTitle.value,
            author: elements.addAuthor.value,
            year: Number(elements.addYear.value),
            completed: elements.addCompleted.checked
        }
        console.log(typeof(book.year))

    addBook(book);

    elements.addTitle.value = ``;
    elements.addAuthor.value = ``;
    elements.addYear.value = ``;
    elements.addCompleted.value = ``;
})
