const express = require('express');
const router = express.Router();

router.get('/suggestions', (req, res) => {
	return res.send({
		"suggestions": [
			{
				"id": "test",
				"name": "Hasselblad 500 CM",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			},
			{
				"id": "test2",
				"name": "Canon F1",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			},
			{
				"id": "test3",
				"name": "Leica",
				"avatar": "http://i.imgur.com/9Ttuw8c.jpg"
			}
		]
	});
});
module.exports = router;	