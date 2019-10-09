const express = require('express');
const router = express.Router();
const errors = require('./error');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');


router.get('/suggestions', (req, res) => {
	return res.send({
		"suggestions": [
			{
				"id": "test1",
				"name": "ILFORD DELTA 100",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			},
			{
				"id": "test2",
				"name": "ILFORD HP5",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			},
			{
				"id": "test3",
				"name": "KODAK EKTAR 100",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			}
		]
	});
});
module.exports = router;	