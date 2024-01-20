const Author = require("../models/author");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book")
const {body, validationResult} = require("express-validator");

//display list of all authors
exports.author_list = asyncHandler(async(req, res, next) => {
    const allAuthors = await Author.find().sort({ family_name: 1}).exec();
   res.render("author_list", {
    title: "Author List",
    author_list: allAuthors,
   });
});

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const [author, allBooksByAuthor] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec(),
    ]);
  
    if (author === null) {
      // No results.
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("author_detail", {
      title: "Author Detail",
      author: author,
      author_books: allBooksByAuthor,
    });
  });


//display author create form on GET
exports.author_create_get = (req, res, next) => {
  res.render("author_form", {title: "Create Author"});   
};

//handle author create on POST
exports.author_create_post = [
  body("first_name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("Fist name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Family name must be specified")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "iInvalid date of birth")
    .optional({values: "falsy"})
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({values: "falsy"})
    .isISO8601()
    .toDate(),
  
  //process req after validation and sanitization
  asyncHandler(async (req,res,next) => {
    //extract validation error
    const errors = validationResult(req);

    //create author obj with escaped and trimmed data
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()){
      //errors present. render for again
      res.render("author_form",{
        title: "Create Author",
        author: author,
        errors: errors.array(),
      });
      return;
    } else{
      //data form is valid
      //save author
      await author.save();
      //redirect to new author record
      res.redirect(author.url);
    }
  }),
];

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    // No results.
    res.redirect("/catalog/authors");
  }

  res.render("author_delete", {
    title: "Delete Author",
    author: author,
    author_books: allBooksByAuthor,
  });
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (allBooksByAuthor.length > 0) {
    // Author has books. Render in same way as for GET route.
    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_books: allBooksByAuthor,
    });
    return;
  } else {
    // Author has no books. Delete object and redirect to the list of authors.
    await Author.findByIdAndDelete(req.body.authorid);
    res.redirect("/catalog/authors");
  }
});


//display author update form on GET
exports.author_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTEd: Author update GET");
});

//handle author update form POST
exports.author_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update POST");
});