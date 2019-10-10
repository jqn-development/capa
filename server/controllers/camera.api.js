const express = require('express');
const router = express.Router();

router.get('/suggestions', (req, res) => {
	return res.send({
		"suggestions": [
			{
				"id": "test",
				"name": "Leica Leicaflex SL2",
				"details": "35mm Rangefinder",
				"avatar": "http://i.imgur.com/vZflZsg.png"
			},
			{
				"id": "test2",
				"name": "Leica M3 SS",
				"details": "35mm Rangefinder",
				"avatar": "http://i.imgur.com/vZflZsg.png"
			},
			{
				"id": "test3",
				"name": "Leica R4",
				"details": "35mm Rangefinder",
				"avatar": "http://i.imgur.com/vZflZsg.png"
			},
			{
				"id": "test4",
				"name": "Leica IIIA",
				"details": "35mm Rangefinder",
				"avatar": "http://i.imgur.com/vZflZsg.png"
			},
			{
				"id": "test5",
				"name": "Leica M5",
				"details": "35mm Rangefinder",
				"avatar": "http://i.imgur.com/vZflZsg.png"
			},
			{
				"id": "test6",
				"name": "Leica M2",
				"details": "35mm Rangefinder",
				"avatar": "http://i.imgur.com/vZflZsg.png"
			}
		]
	});
});
module.exports = router;	