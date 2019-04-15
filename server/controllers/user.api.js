const express = require('express');
const router = express.Router();
const errors = require('./error');
const user = require('./user');

router.get('/users', (req, res) => {
	user.fetchUser(req.query.userId).then( user1 => {
		res.send({
			success: true,
			user: user1
		});
	})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});
module.exports = router;	
