const express = require('express');
const router = express.Router();
const errors = require('./error');
const user = require('./user');

router.get('/users', (req, res) => {
	user.fetchUser(req.query.userId).then( userData => {
		res.send({
			success: true,
			user: userData
		});
	})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});
router.get('/:id/photos', (req, res) => {
	console.log('get route');
	user.getPhotos(req.params.id).then( userData => {
		res.send({
			success: true,
			user: userData
		});
	})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});
module.exports = router;	
