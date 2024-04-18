const model = require('mongoose').model;

const UserSchema = require('./user.schema.cjs');

const UserModel = model('User', UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function getAllUser() {
    return UserModel.find().exec();
}

function getUserByUsername(username) {
    return UserModel.find({username: username}).exec();
}

function deleteUser(id) {
    return UserModel.deleteOne({_id: id})
}

function updateUser(id, user) {
    return UserModel.findOneAndUpdate({_id: id}, user)
}

module.exports = {
    insertUser,
    getAllUser,
    getUserByUsername,
    deleteUser, 
    updateUser
}