const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  snippet: String,
  syntax: {
    type: String,
    enum: [
      "css",
      "ejs",
      "html",
      "ini",
      "java",
      "javascript",
      "json",
      "lua",
      "markdown",
      "php",
      "python",
      "scss",
      "sql",
      "swift",
      "svg",
      "text",
      "typescript",
      "nodejs",
      "ruby",
    ],
  },
  name: String,
  tags: [],
  favorite: Boolean,
  database: String,
  explanation: String,
  examples: String,
});

module.exports = mongoose.model("snippets", snippetSchema);
