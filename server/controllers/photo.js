const Photos = require('../models/Photos');

let storePhoto = (userId, caption, lat, long, path) => {
	return new Promise((res, rej) => {
		if (!userId || !caption || !lat || !long || !path) {
			return rej('You must send all details.');
		}
		let newPhoto = { userId, caption, lat, long, path};
		res(Photos.create(newPhoto));
	});
};

module.exports = {
	storePhoto
}
