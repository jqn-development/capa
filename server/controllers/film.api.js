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
				"avatar": "https://i.imgur.com/e26ZabW.png"
			},
			{
				"id": "test2",
				"name": "Ilford HP5",
				"details": "ISO 100 Medium Format 120",
				"avatar": "https://i.imgur.com/e26ZabW.png"
			},
			{
				"id": "test3",
				"name": "Kodak Ektar 100",
				"details": "ISO 100 35mm",
				"avatar": "https://i.imgur.com/fttnEBk.jpg"
			},
			{
				"id": "test4",
				"name": "Kodak Kodak Plus",
				"details": "ISO 100 Medium Format 120",
				"avatar": "https://i.imgur.com/fttnEBk.jpg"
			},
			{
				"id": "test5",
				"name": "Kodak Portra 400",
				"details": "ISO 100 35mm",
				"avatar": "https://i.imgur.com/fttnEBk.jpg"
			},
			{
				"id": "test6",
				"name": "Kodak Portra 100",
				"details": "ISO 100 Medium Format 120",
				"avatar": "https://i.imgur.com/fttnEBk.jpg"
			}
		]
	});
});
module.exports = router;	