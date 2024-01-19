const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");

//display list of all BookInstances
exports.bookinstance_list = asyncHandler(async(req,res,next) => {
    const allBookInstances = await BookInstance.find().populate("book").exec();

        res.render("bookinstance_list", {
            title: "Book Instance List",
            bookinstance_list: allBookInstances,
        });
});

//display detail page for a specific bookinstance
exports.bookinstance_detail = asyncHandler(async(req,res,next) => {
    const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

    if (bookInstance===null){
        // no result
        const err = new Error("book copy not found");
        err.status = 404;
        return next(err);
    }

    res.render("bookinstance_detail", {
        title: "Book",
        bookinstance: bookInstance, 
    });
});

//display bookinstance create form on GET
exports.bookinstance_create_get = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: Book Instance GET");
});

//handle bookinstance create on POST
exports.bookinstance_create_post = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: Book instance POST");
});

//display bookinstance delete form on GET
exports.bookinstance_delete_get = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: Book instance delete GET");
});

//handle bookinstance delete on POST
exports.bookinstance_delete_post = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: book instance delete POST");
});

//display bookinstance update form on GET
exports.bookinstance_update_get = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: book instance update GET");
});

//handle bookinstance update on POST
exports.bookinstance_update_post = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: book instance update POST");
});