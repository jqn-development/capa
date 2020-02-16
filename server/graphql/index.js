const { SchemaComposer } = require('graphql-compose');
const { photoQuery, photoMutation } = require('../models/Photos');
const { userQuery, userMutation } = require('../models/Users');

const capaSchemaComposer = new SchemaComposer();
capaSchemaComposer.Query.addFields({...userQuery, ...photoQuery});
capaSchemaComposer.Mutation.addFields({...userMutation, ...photoMutation});

const graphqlSchema = capaSchemaComposer.buildSchema();

module.exports =  graphqlSchema;