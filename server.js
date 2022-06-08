const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb")
require("dotenv").config();


const app = express();
const port = process.env.PORT;
const client = new MongoClient(process.env.MONGO_DB_URI)


app.use(cors());
app.use(express.json());

// const books = [
//     {
//     id: 1,
//    title: "Haris Poteris",
//    author: "J.K Rowling",
//    year: 2002,
//    completed: true
// },
// {
//   id: 2,
//  title: "Haris Poteris 2 dalis",
//  author: "J.K Rowling",
//  year: 2006,
//  completed: false
// }
// ];

app.get('/books', async (req, res) => {
  // console.log(req.query.showUnread)
  // console.log(books)  
  try {
    let books
  const con = await client.connect();
  const orderBy = req.query.orderBy;
  const orderDirection = req.query.orderDirection  === "asc" ? -1 : 1;
  const booksCollection = con.db("library").collection("books")
    if(req.query.showUnread === "true") {
      books = await booksCollection.find({completed: false}).sort({[orderBy]: orderDirection}).toArray();
    } else {
      books = await booksCollection.find().sort({[orderBy]: orderDirection}).toArray();
    }
    con.close();
    res.send(JSON.stringify(books));
  } catch (error) {
    res.status(500).send(error);
  }
  });

  app.get("/books/search", async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm;
      const con = await client.connect();
      const books = await con.db('library').collection('books').find({title: searchTerm}).toArray();

      con.close();

      res.send(books);
  } catch (error) {
      res.status(500).send(error);
  }
})

app.get('/books/:bookId', async (req,res) => {
    try {
    const bookId = req.params.bookId;

    const con = await client.connect();

    const books = await con.db("library").collection("books").find(ObjectId(bookId)).toArray();
    
    res.send(JSON.stringify(books[0]))
    } catch (error) {
      res.status(500).send(error)
    }
});

app.post('/books', async (req, res)=>{
  try {
  const con = await client.connect();
  const dbResponse = await con.db("library").collection("books").insertOne(req.body);

    con.close();

    // console.log(req.body)
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send(error);
  }
});





  app.listen(port, () => console.log(`port: ${port}`));