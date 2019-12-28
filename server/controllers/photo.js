const Photos = require('../models/Photos');

let storePhoto = (userId, path) => {
	return new Promise((res, rej) => {
		if (!userId || !path) {
			return rej('You must send userId and path');
		}
		let newPhoto = { userId, path};
		res(Photos.create(newPhoto));
	});
};

let putPhoto = (photoId, body) => {
	return new Promise((res, rej) => {
		let push = JSON.parse(body);
		Photos.findByIdAndUpdate(photoId, push, {new: true, upsert: true}, function(err, result) {
			if(err) {
				return rej(err);
			}
			res(result);
		});
	});
};

module.exports = {
	storePhoto, putPhoto,
}
