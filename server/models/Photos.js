const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photosSchema = new Schema({
	userId: String,
	caption: String,
	lat: String,
	long: String,
	path: String,
	dateCreated: { type: Date, required: true, default: Date.now },
	dateUpdated: { type: Date, required: true, default: Date.now },

});

const Photos = mongoose.model('Photos', photosSchema, 'Photos');

module.exports = Photos;
