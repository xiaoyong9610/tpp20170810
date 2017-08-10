var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});
router.get('/:action/:fn', function(req, res, next) {
	var action=req.params.action;
	var fn=req.params.fn;
	var ac=require("./controller/"+action+".js");
	ac[fn](req,res);
});
router.post('/:action/:fn', function(req, res, next) {
	var action=req.params.action;
	var fn=req.params.fn;
	var ac=require("./controller/"+action+".js");
	ac[fn](req,res);
});
module.exports = router;