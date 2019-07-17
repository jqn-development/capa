const Photos = require('../models/Photos');

let storePhoto = (userId, caption, lat, long, path) => {
	return new Promise((res, rej) => {
		if (!userId || !path) {
			return rej('You must send userId and path');
		}
		let newPhoto = { userId, caption, lat, long, path};
		res(Photos.create(newPhoto));
	});
};

module.exports = {
	storePhoto
}
