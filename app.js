require("dotenv").config();
//  this is for environment variables ....it should always be at the top of the code

//  framework
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
//  initialization
const app = express();

// including database
const database = require("./database/data")

// including MODELS
const BookModels = require("./database/book");
const AuthorModels = require("./database/author")
const PublicationModels = require("./database/publication");

// USing methods
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));



// Establish Database Connection
mongoose.connect(process.env.MONGO_URL, {
        //  here the url was sensitive information so we stored it inside the env variable MONGO_URL and for calling that variable we have to use the method process.env
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => console.log(" Connection Established 😎"))
    //  Here we are connecting our mongoose to the server



// GET METHODS


/* 
Route       /
Desc        to get all books
Access      public
Parameters      none
Method      GET
*/
app.get("/", async(req, res) => {
    const getAllBooks = await BookModels.find();
    res.send({ books: database.books });
})


// THIS CODE ALSO WORKS=>
// app.get("/:isbn", (req, res) => {
// const specificBook = database.books.filter((arr) => { arr.ISBN === req.params.isbn });
// return res.send({ books: database.specificBook })


/* 
Route       /is/:isbn
Desc        to get specific book based on ISBN
Access      public
Parameters      is:/:isbn
Method      GET
*/
app.get("/is/:isbn", async(req, res) => {
    // const isbn = req.params.isbn;

    // const getIsbn = database.books.filter((arr) => { return arr.ISBN === isbn })

    const getIsbn = await BookModels.find({ ISBN: req.params.isbn })

    // if mongodb didn't find any data it returns null

    // if (getIsbn.length === 0) {
    //     res.send(`Sorry the books for ISBN ${isbn} is not available`)
    // } else {
    //     res.send(getIsbn);
    // }
    //  so we know that if the getIsbn will return null the value will become false and so we have to use ! sign with the variable name so that its value becomes true and the if statement would get executed

    if (!getIsbn) {
        res.send(`Sorry the books for ISBN ${req.params.isbn} is not available`)
    } else {
        res.send(getIsbn);
    }


})

/* 
Route       /c/category
// we have taken c for category cause it is small word
Desc        to get specific book based on category
Access      public
Parameters      category
Method      GET
*/
app.get("/c/:category", async(req, res) => {
    // const category = req.params.category;

    // const getCategory = database.books.filter((arr) => { return arr.category.includes(category) })

    const getCategory = await BookModels.find({ category: req.params.category })
        // Here what include is doing is .it is taking the value from the user in req.params and then it is checking that wether the value that user has given includes in arr.category or we can say in the category array

    // if (getCategory.length === 0) {


    if (!getCategory) {
        res.send(`Sorry the book of the ${req.params.category } category is not available `)
    } else {
        res.send(getCategory);
    }
})


// --------------------------------------------------------------------------------------------------------------


/* 
Route       /author
Desc        to get all authors
Access      public
Parameters      NONE
Method      GET
*/
app.get("/author", async(req, res) => {
    const getAllAuthors = await AuthorModels.find();
    // res.send({ Author: database.authors });
    res.send({ Author: getAllAuthors })
})



/* 
Route       /a/author
// we have taken a for author cause it is small word
Desc        to get specific book based on author
Access      public
Parameters      author
Method      GET
*/
app.get("/a/:author", async(req, res) => {
    // const author = req.params.author;

    // const getAuthor = database.books.filter((arr) => {
    //     return arr.authors.includes(author);
    // })

    const getAuthor = await BookModels.find({ authors: req.params.author })


    // if (getAuthor.length === 0) {

    if (!getAuthor) {
        res.send(`The books for Author number ${author} is not available`);
    } else {
        res.send(getAuthor);
    }


})

// THIS CODE ALSO WORKS=>
// if (specificBook.length === 0) {
//     res.send(`No  book found for the ISBN ${req.params.isbn}`);
// } else {
//     res.send({ book: specificBook[0] })
// }
// })




/* 
Route       /author/:id
Desc        to get authors based on ID
Access      public
Parameters     ID
Method      GET
*/
app.get("/author/:id", async(req, res) => {
    // const id = req.params.id;

    const getId = await AuthorModels.find({ id: req.params.id });


    // database.authors.filter((arr) => {
    //     return arr.id.includes(id);

    // })

    // if (getId.length === 0) {
    if (!getId.length) {
        res.send(`The Author for ID number ${req.params.id} is not available`)
    } else {
        res.send(getId);
    }
})


/* 
Route       /author/i/:isbn
Desc        to get authors based on book's ISBN
Access      public
Parameters     ISBN
Method      GET
*/
app.get("/author/i/:isbn", async(req, res) => {
    // const ISBN = req.params.isbn;
    // const getISBN = database.authors.filter((arr) => {
    //     return arr.books.includes(ISBN);
    // })
    const getISBN = await AuthorModels.find({ books: req.params.isbn });
    // if (getISBN.length === 0) {
    if (!getISBN.length) {
        res.send(`The Author For ISBN ${req.params.isbn} are not available`)
    } else {
        res.send(getISBN)
    }
})


// -------------------------------------------------------------------------------------------------------------

/* 
Route       /publications
Desc        to get publications
Access      public
Parameters     NONE
Method      GET
*/
app.get("/publications", async(req, res) => {
    const getAllPublications = await PublicationModels.find()
        // res.send({ publications: database.publications })
    res.send({ publications: getAllPublications });
})

/* 
Route       /publications/:id
Desc        to get publications based on ID
Access      public
Parameters     ID
Method      GET
*/
app.get("/publications/:id", async(req, res) => {
    // const idd = req.params.id;

    // const getidd = database.publications.filter((arr) => {
    //     return arr.id.includes(idd)
    // })
    const getidd = await PublicationModels.find({ id: req.params.id })


    // if (getidd.length === 0) {
    if (!getidd.length) {
        res.send(`The Publication for the ${req.params.id} is not available `)
    } else {
        res.send(getidd);
    }
})


/* 
Route       /publications/i/:isbn
Desc        to get list of publications based on ISBN
Access      public
Parameters     ISBN
Method      GET
*/
app.get("/publications/i/:isbn", async(req, res) => {
    // const isbn = req.params.isbn;

    // const getisbn = database.publications.filter((arr) => { return arr.books.includes(isbn) })


    const getisbn = await PublicationModels.find({ books: req.params.isbn })

    // if (getisbn.length === 0) 
    if (!getisbn.length) { res.send(`The Publication for ISBN ${req.params.isbn} is not available`) } else {
        res.send(getisbn);
    }
})

// ----------------------------------------------------------------------------------------------------------
// POST REQUEST


/* 
Route       /book/new
Desc         to add a new book
Access      public
Parameters     NONE
Method      POST
*/

app.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    // database.books.push(newBook);
    BookModels.create(newBook);
    // MongoDB code 👆

    res.send({ books: database.books, message: "Book was added" });

})


/* 
Route       /author/new
Desc         to add a new author
Access      public
Parameters     NONE
Method      POST
*/

app.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    // database.authors.push(newAuthor);
    AuthorModels.create(newAuthor);
    res.send({ authors: database.authors, message: "Author has been added" });
})

/* 
Route       /publication/new
Desc         to add a new publication
Access      public
Parameters     NONE
Method      POST
*/


app.post("/publication/new", (req, res) => {
    const { newPublication } = req.body;

    // database.publications.push(newPublication);
    PublicationModels.create(newPublication);

    res.send({ publications: database.publications, message: "Publication has been added" });
})

// -------------------------------------------------------------------------------------------------------------------

// Put Request

/* 
Route       /book/update/:isbn
Desc         to update book
Access      public
Parameters    /:isbn
Method      PUT
*/


app.put("/book/update/:isbn", async(req, res) => {
    // here we are going with forEach instead of map because forEach directly modifies the array
    const updatedBook = await BookModels.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        title: req.body.newTitle
    }, {
        new: true
    })

    // database.books.forEach((arr) => {
    //     if (arr.ISBN === req.params.isbn) {
    //         arr.title = req.body.newTitle;
    //         return;
    //     }
    // })

    res.send({ books: updatedBook, message: "The Title has been modified" });
})




/* 
Route       /book/author/update/:isbn
Desc         to update/add book author
Access      public
Parameters    /:isbn
Method      PUT
*/

// app.put("/book/author/update/:isbn", (req, res) => {
//     database.books.forEach((arr) => {
//         if (arr.ISBN === req.params.isbn) {
//             arr.authors = req.body.newAuthor;
//             return;
//         }
//     })

//     database.authors.forEach((arr) => {
//         if (arr.books.includes(req.params.isbn)) {
//             arr.name = req.body.newName;
//             arr.id = req.body.newAuthor; 
//             return;
//         }
//     })
//     res.send({ books: database.books, authors: database.authors });
// })

// the above code can be used to replace a existing author and reflect the changes in the author database too but here we want to not replace but to add with an existing author and also that new author will be added to author database so the below code will do this :

app.put("/book/author/update/:isbn", async(req, res) => {

    const UpdatedBook = await BookModels.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        author: req.body.newAuthorId
    }, {
        new: true
    })


    // database.books.forEach((arr) => {
    //     if (arr.ISBN === req.params.isbn) {
    //         arr.authors.push(req.body.newAuthorId)
    //         return;
    //     }
    // })
    const UpdateAuthor = await AuthorModels.findOneAndUpdate({
        id: req.body.newAuthorId
    }, {
        books: req.params.isbn
    }, {
        new: true
    })


    // database.authors.forEach((arr) => {
    //     if (arr.id === req.body.newAuthorId) {
    //         arr.books.push(req.params.isbn);
    //         return;
    //     }
    // })

    res.send({ books: UpdatedBook, authors: UpdateAuthor });


    // here first we have to create a new book and a new author with empty book array then we need to provide newAuthorId in json and we will get the result as the author is added in new book and the new author books array will be updated with the isbn of new book
})


/* 
Route       /author/update/:id
Desc         to update author name 
Access      public
Parameters    /:id
Method      PUT
*/

app.put("/author/update/:id", (req, res) => {
    database.authors.forEach((arr) => {
        if (arr.id === req.params.id) {
            arr.name = req.body.newName;
            return;
        }
    })
    res.send({ authors: database.authors })
})


/* 
Route       /publication/update/:id
Desc         to update publication name 
Access      public
Parameters    /:id
Method      PUT
*/

app.put("/publication/update/:id", (req, res) => {
    database.publications.forEach((arr) => {
        if (arr.id === req.params.id) {
            return arr.name = req.body.newName;
        }
    })
    res.send({ publications: database.publications });
})

/* 
Route       /publication/book/update/:isbn
Desc         to update/add publication name 
Access      public
Parameters    /:isbn
Method      PUT
*/


app.put("/publication/book/update/:isbn", (req, res) => {
    // update the book database
    database.books.forEach((arr) => {
            if (arr.ISBN === req.params.isbn) {
                arr.publication = req.body.newPublication;
            }

            return;
        })
        // update the publications database
    database.publications.forEach((arr) => {
        if (arr.id === req.body.newPublication) {
            arr.books.push(req.params.isbn);
            return;
        }
    })
    res.send({ books: database.books, publications: database.publications })
})


// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// DELETE REQUEST


/* 
Route       /book/delete/:isbn
Desc         delete a book
Access      public
Parameters    /:isbn
Method      Delete
*/

app.delete("/book/delete/:isbn", (req, res) => {
    //  here we can delete a book using pop but pop will only help us in deleting from last entry but it is not able to delete from any  data from the middle so for that we will use filter here


    const updatedBookDatabase = database.books.filter((arr) => {
        return arr.ISBN !== req.params.isbn;

    })

    // this means that all the values except for the isbn will get saved inside the updatedBookDatabase and the isbn will be left out or we can say that the isbn is automatically deleted cause it is not included in updatedBookDatabase

    database.books = updatedBookDatabase;

    res.send({ books: database.books });
});



/* 
Route       /book/delete/author/:isbn/:authorId
Desc         delete author from the book and update the change in author database too
Access      public
Parameters    /:isbn/:authorId
Method      Delete
*/

app.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
        // updating the book database

        database.books.forEach((arr) => {
                if (arr.ISBN === req.params.isbn) {
                    const updated = arr.authors.filter((arr1) => arr1 !== req.params.authorId);
                    return arr.authors = updated;
                }
            })
            // updating the author database

        database.authors.forEach((arr) => {
            if (arr.id === req.params.authorId) {
                const updatedAuthor = arr.books.filter((arr1) => arr1 !== req.params.isbn);
                return arr.books = updatedAuthor;
            }
        })

        res.send({ books: database.books, Authors: database.authors })
    })
    // here we we are doing is first we are searching the value with forEach and then filtering out that value by filter 



/* 
Route       /author/delete/:id
Desc        delete an author
Access      public
Parameters    /:id
Method      Delete
*/

app.delete("/author/delete/:id", (req, res) => {
    const updatedAuthor = database.authors.filter((arr) => {
        return arr.id !== req.params.id;
    })
    database.authors = updatedAuthor;
    res.send({ Authors: database.authors })
})



/* 
Route      /publication/delete/:id
Desc        delete an publication
Access      public
Parameters    /:id
Method      Delete
*/

app.delete("/publication/delete/:id", (req, res) => {
    const updatedPublication = database.publications.filter((arr) => {
        return arr.id !== req.params.id;
    })

    database.publications = updatedPublication;
    res.send({ publications: database.publications });
})



/* 
Route      publication/delete/:id/:isbn
Desc        delete a book from a publication
Access      public
Parameters    /:id/:isbn
Method      Delete
*/
app.delete("/publication/delete/:id/:isbn", (req, res) => {

    // Firstly removing the books from the publication database
    database.publications.forEach((arr) => {
        if (arr.id === req.params.id) {
            const updated = arr.books.filter((arr1) => {
                arr1 !== req.params.isbn;
            });
            return arr.books = updated
        }

    })

    // now setting the value of publication to 0 for the publications that are being removed from the book

    database.books.forEach((arr) => {
        if (arr.ISBN === req.params.isbn) {
            arr.publication = "0";
            // Here we are assuming that 0 means that the publication has been removed or the book doesn't have a publication
        }
    })

    res.send({ books: database.books, publications: database.publications })


})


// server starting
app.listen(80, () => {
    console.log("The Server is started at port 80🚀")
})


// Talk to database in which mongodb understands and talk to our app too and this is done by MONGOOSE

// Mongoose helps you with validation, relationship with other data
// or in other words we can say that mongoose somewhat creates a schema for mongoDB 


// Mongoose Model
//  model -> document model of mongoDB
//  in mongoDB collections are known as database and the object inside the collections are known as documents

// mongoose Schema -> Model -> use them