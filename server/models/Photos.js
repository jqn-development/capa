const mongoose = require('mongoose');
const { usersSchema } = require('./Users');
const { composeWithMongoose } =  require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const Schema = mongoose.Schema;

const photosSchema = new Schema({
	userId: String,
	user: [usersSchema],
	userRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
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

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const PhotosTC = composeWithMongoose(Photos, customizationOptions);

// STEP 3: Add needed CRUD User operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  photoById: PhotosTC.getResolver('findById'),
  photoByIds: PhotosTC.getResolver('findByIds'),
  photoOne: PhotosTC.getResolver('findOne'),
  photoMany: PhotosTC.getResolver('findMany'),
  photoCount: PhotosTC.getResolver('count'),
  photoConnection: PhotosTC.getResolver('connection'),
  photoPagination: PhotosTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  photoCreateOne: PhotosTC.getResolver('createOne'),
  photoCreateMany: PhotosTC.getResolver('createMany'),
  photoUpdateById: PhotosTC.getResolver('updateById'),
  photoUpdateOne: PhotosTC.getResolver('updateOne'),
  photoUpdateMany: PhotosTC.getResolver('updateMany'),
  photoRemoveById: PhotosTC.getResolver('removeById'),
  photoRemoveOne: PhotosTC.getResolver('removeOne'),
  photoRemoveMany: PhotosTC.getResolver('removeMany'),
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = { Photos, graphqlSchema};
