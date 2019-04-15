const express = require('express');
const router = express.Router();
const errors = require('./error');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const photo = require('./photo');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

router.use((req, res, next) => {
	var token = req.headers['authorization'];
	token = token.replace('Bearer ', '');
	return jwt.verify(token, config.secret, jwtErr => {
		if (jwtErr) {
			return errors.errorHandler(
				res,
				'Your access token is invalid.',
				'invalidToken'
			);
		} else {
			next();
		}
	});
});

router.post('/photos', (req, res) => {
	singleUpload(req, res, function(err) {
		if (err) {
			return errors.errorHandler(res, err);
		}
		photo
			.storePhoto(
				req.body.userId,
				req.body.caption,
				req.body.lat,
				req.body.long,
				req.file.location
			)
			.then((photo) => {
				res.send({
					success: true,
					photoPath: photo.path
				});
			})
			.catch(err => {
				return errors.errorHandler(res, err);
			});
	});
});
module.exports = router;
