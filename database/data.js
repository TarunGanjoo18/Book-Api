let books = [{
    ISBN: "198",
    title: " MERN stack",
    authors: ["1"],
    // here we are using the author id that will further be described in the authors array
    language: "en",
    pubDate: "2020-12-18",
    numOfPage: 200,
    category: ["Fiction", "Programming"],
    publication: "2"

}, {
    ISBN: "191",
    title: "Race",
    authors: ["1", "2", "3"],
    // here we are using the author id that will further be described in the authors array
    language: "en",
    pubDate: "2022-10-1",
    numOfPage: 543,
    category: ["Fiction", "Fun", "bad"],
    publication: "1"

}];


let publications = [{
    id: "1",
    name: "ASUS",
    books: ["191"]

}, {
    id: "2",
    name: "MSI",
    books: ["198"]
}];


let authors = [{
    id: "1",
    name: "Tarun",
    books: ["198"]
}, {
    id: "2",
    name: "Mohit",
    books: ["191"],

}];


module.exports = { books, authors, publications };