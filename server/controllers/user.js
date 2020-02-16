const { Users } = require('../models/Users');
const { Photos } = require('../models/Photos');
var ObjectId = require('mongoose').Types.ObjectId;

let fetchUser = (userId) => {
	return new Promise((res1, rej1) => {
		return Users.findOne({ '_id': new ObjectId(userId) })
			.then(user => {
				if (!user) return rej1('No matching user.');
				res1(user)
			})
			.catch(err => {
				rej1(err);
			});
	})
};

let getPhotos = (userId) => {
	console.log(userId);
	return new Promise((res, rej) => {
		return Photos.find({ 'userId': new ObjectId(userId) })
			.populate('userRef')
			.then(photos => {
				if (!photos) return rej1('No matching photos.');
				res(photos)
			})
			.catch(err => {
				rej(err);
			});
	})
};

module.exports = {
	fetchUser, getPhotos
}
