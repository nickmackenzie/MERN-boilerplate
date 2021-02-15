var express = require('express');
var router = express.Router();
var snipCntrl = require('../../controllers/snippets')
const Snippet = require('../../models/snippets')

router.post("/add", snipCntrl.addSnip);
router.get('/index', snipCntrl.index);
router.post('/del', snipCntrl.deleteSnip)
router.get('/:language', snipCntrl.languageIndex)

module.exports = router;