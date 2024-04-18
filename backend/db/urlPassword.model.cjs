const model = require('mongoose').model;

const UrlPasswordSchema = require('./urlPassword.schema.cjs');

const UrlPasswordModel = model('UrlPassword', UrlPasswordSchema);

function insertUrlPassword(urlPassword) {
    return UrlPasswordModel.create(urlPassword);
}

function getAllUrlPassword() {
    return UrlPasswordModel.find().exec();
}

function getUrlPasswordByUsername(username) {
    return UrlPasswordModel.find({username: username}).exec();
}

function deleteUrlPassword(id) {
    return UrlPasswordModel.deleteOne({_id: id})
}

function updateUserUrlPassword(id, data) {
    return UrlPasswordModel.findOneAndUpdate({_id: id}, data)
}

module.exports = {
    insertUrlPassword,
    getAllUrlPassword,
    getUrlPasswordByUsername,
    deleteUrlPassword, 
    updateUserUrlPassword
}