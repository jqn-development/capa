const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photosSchema = new Schema({
	userId: String,
	film: {
		avatar: String,
		details: String,
		id: String,
		name: String,
	},
	camera: {
		avatar: String,
		details: String,
		id: String,
		name: String,
	},
	location: {
		coord: {
			lat: Number,
			lng: Number,
		},
		name: String,
		placeId: String,
	},
	caption: String,
	path: String,
	dateCreated: { type: Date, required: true, default: Date.now },
	dateUpdated: { type: Date, required: true, default: Date.now },
});

const Photos = mongoose.model('Photos', photosSchema, 'Photos');

module.exports = Photos;
