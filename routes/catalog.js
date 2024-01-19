const express = require("express");
const router = express.Router();

//require control modules
const book_controller =
require("../controllers/bookController");
const author_controller =
require("../controllers/authorController");
const genre_controller =
require("../controllers/genreController");
const book_instance_controller =
require("../controllers/bookinstanceController");

/// BOOK ROUTES ///

//GET catalog home page
router.get("/", book_controller.index);

//GET REQUEST FOR CREATING A BOOK. MUST COME BEFORE DISPLAY BOOK ROUTE
router.get("/book/create", book_controller.book_create_get);

//POST request for creating book
router.post("/book/create", book_controller.book_create_post);

//GET request to delete a book
router.get("/book/:id/delete", book_controller.book_delete_get);

//POST request to delete a book
router.post("/book/:id/delete", book_controller.book_delete_post);

//GET request to update a book
router.get("/book/:id/update", book_controller.book_update_get);

//POST request to update a book
router.post("/book/:id/update", book_controller.book_update_post);

//GET request for one book
router.get("/book/:id", book_controller.book_detail);

//GET request to list all the books
router.get("/books/", book_controller.book_list);


/// AUTHOR ROUTES ///

//GET request for creating Author. This must come before display author
router.get("/author/create", author_controller.author_create_get);

//POST request for creating Author.
router.post("/author/create", author_controller.author_create_post);

//GET request to delete Author.
router.get("/author/:id/delete", author_controller.author_delete_get);

//POST request to delete Author.
router.post("/author/:id/delete", author_controller.author_delete_post);

//GET request to update author
router.get("/author/:id/update", author_controller.author_update_get);

//POST request to update author
router.post("/author:id/update", author_controller.author_update_post);

//GET request for one author
router.get("/author/:id", author_controller.author_detail);

//GET request to list all authors
router.get("/authors/", author_controller.author_list);


/// GENRE ROUTES ///

//GET request for creating a genre. must come before display of genre
router.get("/genre/create", genre_controller.genre_create_get);

//POST request for creating genre
router.post("/genre/create", genre_controller.genre_create_post);

//GET request to delete genre
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

//POST request to delete genre
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

//GET to update genre
router.get("/genre/:id/update", genre_controller.genre_update_get);

//POST to update genre
router.post("/genre/:id?update", genre_controller.genre_update_post);

//GET to view a single genre
router.get("/genre/:id", genre_controller.genre_detail);

//GET to view all genre
router.get("/genres/", genre_controller.genre_list);


/// BOOK INSTANCES ///

//GET to create bookinstance
router.get("/bookinstance/create", book_instance_controller.bookinstance_create_get);

//POST to create bookinstance
router.post("/bookinstance/create", book_instance_controller.bookinstance_create_post);

//GET to delete a bookinstance
router.get("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_get);

//POST to delete a bookinstance
router.post("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_post);

//GET to upate a bookinstance
router.get("/bookinstance/:id/update", book_instance_controller.bookinstance_update_get);

//POST to update a bookinstance
router.post("/bookinstance/:id/update", book_instance_controller.bookinstance_update_post);

//GET req for one bookinstance
router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);

//GET req for list of all bookinstance
router.get("/bookinstances", book_instance_controller.bookinstance_list);

module.exports = router;