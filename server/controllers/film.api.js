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
				"name": "Ilford Delta 100",
				"details": "ISO 100 35mm",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			},
			{
				"id": "test2",
				"name": "Ilford HP5",
				"details": "ISO 100 120",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			},
			{
				"id": "test3",
				"name": "Kodak Ektar",
				"details": "ISO 100 35mm",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			}
		]
	});
});
module.exports = router;	