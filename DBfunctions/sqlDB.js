var db = require('../db.js');
var config = require('../config');


var funcs = {};

funcs.submitForm = function(firstname, lastname, email, callback) {
	var qry = 'INSERT INTO applications (firstname, lastname, email) VALUES (?, ?, ?)';


	db.get().query(qry, [firstname, lastname, email], function (err, result) {
		return callback(err, result);
	});

	return true;
}


funcs.selectForm = function(formid, callback) {
	var qry = 'SELECT * FROM forms WHERE formid = (?)';


	db.get().query(qry, [formid], function (err, result) {
		return callback(err, result);
	});

	return true;
}


module.exports = funcs;

funcs.getData = function(callback) {
	var qry = 'SELECT * FROM items';


	db.get().query(qry, function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.changeStatus = function(id, status, callback) {
	var qry = 'UPDATE items SET status = ? WHERE id = ?';


	db.get().query(qry,[status,id], function (err, result) {
		return callback(err, result);
	});

	return true;
}


funcs.editDataInList = function(id, description, callback) {
	var qry = 'UPDATE items SET description = ? WHERE id = ?';


	db.get().query(qry,[description,id], function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.getPendingData = function(status, callback) {
	var qry = 'SELECT * FROM items WHERE status = ?';


	db.get().query(qry,[status], function (err, result) {
		return callback(err, result);
	});

	return true;
}


funcs.addThisInList = function(description, status, callback) {

	var qry = 'INSERT INTO items (description,status) VALUES(?,?)';


	db.get().query(qry,[description, status], function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.getDescription = function(id, callback) {
	var qry = 'SELECT * FROM items WHERE id = ?';


	db.get().query(qry,[id], function (err, result) {
		return callback(err, result);
	});

	return true;
}