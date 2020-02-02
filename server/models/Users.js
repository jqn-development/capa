const mongoose = require('mongoose');
const { composeWithMongoose } =  require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
	first: String,
	last: String,
	email: String,
	password: String,
	refreshToken: String
});

const Users = mongoose.model('Users', usersSchema, 'Users');


// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const UsersTC = composeWithMongoose(Users, customizationOptions);

// STEP 3: Add needed CRUD User operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  userById: UsersTC.getResolver('findById'),
  userByIds: UsersTC.getResolver('findByIds'),
  userOne: UsersTC.getResolver('findOne'),
  userMany: UsersTC.getResolver('findMany'),
  userCount: UsersTC.getResolver('count'),
  userConnection: UsersTC.getResolver('connection'),
  userPagination: UsersTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UsersTC.getResolver('createOne'),
  userCreateMany: UsersTC.getResolver('createMany'),
  userUpdateById: UsersTC.getResolver('updateById'),
  userUpdateOne: UsersTC.getResolver('updateOne'),
  userUpdateMany: UsersTC.getResolver('updateMany'),
  userRemoveById: UsersTC.getResolver('removeById'),
  userRemoveOne: UsersTC.getResolver('removeOne'),
  userRemoveMany: UsersTC.getResolver('removeMany'),
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = { Users, usersSchema, graphqlSchema}
