const Photos = require('../models/Photos');
const { Users }  = require('../models/Users');

let storePhoto = (userId, path) => {
	return new Promise((res, rej) => {
		if (!userId || !path) {
			return rej('You must send userId and path');
		}
		let newPhoto = { userId, path, userRef: userId };
		let Photo = new Photos(newPhoto);

		let User = Users.findById(userId, function(err, User) {
			Photo.user.push(User);
			Photo.save();
		} );

		res(Photo);
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
