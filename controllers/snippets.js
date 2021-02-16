let Snippets = require("../models/snippets");

function index(req, res) {
  Snippets.find({}, function (err, snip) {
    if (err) {
      console.log(err);
    }
    console.log(snip);
    res.send(snip);
  });
}

function languageIndex(req, res) {
  let x = req.params.language;
  let userId = req.user.googleId;
  Snippets.find(
    {
      google: userId,
    },
    function (err, menu) {
      Snippets.find(
        {
          language: req.params.language,
          google: userId,
        },
        function (err, snip) {
          res.render("snippets/index", {
            snip,
            user: req.user,
            name: req.query.name,
            googleId: req.query.googleId,
            menu: menu,
          });
        }
      );
    }
  );
}

function addSnip(req, res) {
  console.log("kdjdjdjd", req.body);
  const snip = new Snippets({
    snippet: req.body.snippet,
    name: req.body.name,
    tags: req.body.tags,
  });
  console.log("snsnsnsnsn", snip);
  snip.save(function (err) {
    if (err) console.log(err);
  });
  res.send(req.body);
}

function deleteSnip(req, res) {
  console.log("dekkkke", req.body.id);
  Snippets.findOne({
    _id: req.body.id,
  });
  Snippets.deleteOne(
    {
      _id: req.body.id,
    },
    (error) => {
      if (error) {
        console.log(err);
      }
    }
  );
}

module.exports = {
  index,
  addSnip,
  deleteSnip,
  languageIndex,
};
