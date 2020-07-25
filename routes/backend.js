var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getData', function(req, res, next) {
	 
	db.getData(function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		var data={
               "items":result
		}
		return res.json({ "status": "success", "message": "Form submitted!", "code": 200,"data":data});
	});
});


router.post('/changeStatus', function(req, res, next) {

	var id = req.body.id;
	var status = req.body.status;

	if(!id||!status){
		return res.json({ "status": "failed", "message": "Please fill all the required details!", "code": 412 });
	}

	 
	db.changeStatus(id, status, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		return res.json({ "status": "success", "message": "Form submitted!", "code": 200});
	});
});


router.post('/getPendingData', function(req, res, next) {

	//var id = req.body.id;
	var status = req.body.status;

	if(!status){
		return res.json({ "status": "failed", "message": "Please fill all the required details!", "code": 412 });
	}

	 
	db.getPendingData(status, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		var data={
               "items":result
		}
		return res.json({ "status": "success", "message": "Form submitted!", "code": 200,"data":data});
	});
});

router.post('/editDataInList', function(req, res, next) {

	var id = req.body.id;
	var description = req.body.description;

	if(!id||!description){
		return res.json({ "status": "failed", "message": "Please fill all the required details!", "code": 412 });
	}

	 
	db.editDataInList(id, description, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		return res.json({ "status": "success", "message": "Form submitted!", "code": 200});
	});
});


router.post('/addThisInList', function(req, res, next) {

	var description = req.body.description;
	var status = req.body.status;

	if(!status||!description){
		return res.json({ "status": "failed", "message": "Please fill all the required details!", "code": 412 });
	}

	 
	db.addThisInList(description, status, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		return res.json({ "status": "success", "message": "Form submitted!", "code": 200});
	});
});

router.post('/getDescription', function(req, res, next) {

	var id = req.body.id;
	 

	if(!id){
		return res.json({ "status": "failed", "message": "Please fill all the required details!", "code": 412 });
	}

	 
	db.getDescription(id, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		var data={
               "items":result
		}
		return res.json({ "status": "success", "message": "Form submitted!", "code": 200,"data":data});
	});
});





router.post('/submitForm', function(req, res, next) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;

	if (!firstname || !lastname || !email) {
      return res.json({ "status": "failed", "message": "Please fill all the required details!", "code": 412 });
    }

	db.submitApplyForm(firstname, lastname, email, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		return res.json({ "status": "success", "message": "Form submitted!", "code": 200 });
	});
});

module.exports = router;
