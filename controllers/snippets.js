let Snippets = require('../models/snippets')

function index(req, res) {
 
console.log(req)
        Snippets.find({
            
        }, function (err, snip) {
            if (err) {
                res.redirect("index")
            }
           console.log(snip)
           res.send(snip)
            })
        }
    

function languageIndex(req, res) {
    let x = req.params.language
    let userId = req.user.googleId
    Snippets.find({
        google: userId
    }, function (err, menu) {
        Snippets.find({
            language: req.params.language,
            google: userId
        }, function (err, snip) {
            res.render('snippets/index', {
                snip,
                user: req.user,
                name: req.query.name,
                googleId: req.query.googleId,
                menu: menu
            })
        })
    })
}

function addSnip(req, res) {
console.log(req.body)
    const snip = new Snippets({
        snippet: req.body.snippet
     
    })
 
    snip.save(function (err) {
        if (err) console.log(err)
    })
    res.send(req.body)
}

function deleteSnip(req, res) {
    if (language = null) return res.redirect('/snippets/')
    Snippets.findOne({
        _id: req.params.id
    }, function (err, lan) {
        res.redirect('/snippets/')
    })
    Snippets.deleteOne({
        _id: req.params.id
    }, (error) => {
        if (error) {
            res.redirect('/snippets/')
        }
    })
}

module.exports = {
    index,
    addSnip,
    deleteSnip,
    languageIndex
}