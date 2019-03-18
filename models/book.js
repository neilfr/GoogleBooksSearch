const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//todo update schema to:
/*title
authors
description
image ... thumbnail
link... info
*/

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  thumbnail: String,
  selfLink: String,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
