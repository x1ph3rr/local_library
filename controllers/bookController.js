const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance")
const asyncHandler = require("express-async-handler");
const bookinstance = require("../models/bookinstance");
const {body, validationResult} = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  //get details of books, book instances, authors and genre counts (in parellel)
  const[
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({status: "Available"}).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });

});

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({title: 1})
    .populate("author")
    .exec()

  res.render("book_list", {title: "Book List", book_list: allBooks});
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  //Get details of books, book instances for a specific book
  const [book, bookInstances] = await Promise.all([

    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({ book: req.params.id}).exec(),
  ]);

  if (book===null) {
    //no result
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("book_detail", {
    title: book.title,
    book: book,
    book_instances: bookInstances,
  });

});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
  //get all authors and genres which we can use for adding to book
  const [allAuthors, allGenres] = await Promise.all([
    Author.find().sort({family_name:1}).exec(),
    Genre.find().sort({name:1}).exec(),
  ]);

  res.render("book_form",{
    title: "Create Book",
    authors: allAuthors,
    genres: allGenres,
  });
});

// Handle book create on POST.
exports.book_create_post = [
  //convert genre to array 
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)){
      req.body.genre = 
      typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  //validate and sanitize fields
  body("title", "Title must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("author", "Author must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({min:1}).escape(),
  body("genre.").escape(),
  //process req after validation and sanitization

  asyncHandler(async(req,res,next) => {
    //extract errors
    const errors = validationResult(req);
    //create a book obj with escaped and trimmed data
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if(!errors.isEmpty()){
      //errors found. render form again
      const [allAuthors, allGenres] = await Promise.all([
        Author.find().sort({family_name:1}).exec(),
        Genre.find().sort({name:1}).exec(),
      ]);

      //mark selected genres as checked.
      for(const genre of allGenres){
        if(book.genre.includes(genre._id)){
          genre.checked = "true";
        }
      }
      res.render("book_form", {
        title: "Create Book",
        authors: allAuthors,
        genres: allGenres,
        book: book,
        errors: errors.array(),
      });
    } else{
      //data from form is valid. save book.
      await book.save();
      res.redirect(book.url);
    }
  }),
];

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
