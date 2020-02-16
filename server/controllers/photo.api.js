const express = require('express');
const router = express.Router();
const errors = require('./error');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const photo = require('./photo');
const upload = require('../services/file-upload');
const singleUpload = upload.single('file');


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

router.put('/photos', (req, res) => {
	photo.putPhoto(req.body.id, req.body.body).then(photo => {
		res.send({
			success: photo,
		});
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
				req.file.location,
			)
			.then((photo) => {
				console.log(photo);
				res.send({
					success: true,
					photoPath: photo.path,
					id: photo._id
				});
			})
			.catch(err => {
				return errors.errorHandler(res, err);
			});
	});
});
module.exports = router;
