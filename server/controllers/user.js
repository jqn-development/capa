const Users = require('../models/Users');
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

module.exports = {
	fetchUser
}
