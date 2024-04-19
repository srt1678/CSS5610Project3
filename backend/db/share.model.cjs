const model = require('mongoose').model;

const ShareSchema = require('./share.schema.cjs');

const ShareModel = model('ShareModel', ShareSchema);

function shareRequest(newShareRequest){
    return ShareModel.create(newShareRequest);
}

function getShareRequest(username){
    return ShareModel.find({username2: username}).exec();
}

function getConnectorUrlList(username, status){
    return ShareModel.find({$and:[{$or: [{username1: username},{username2: username}]},{status: status}]}).exec();
}

function deleteShareRequest(id){
    return ShareModel.deleteOne({_id: id})
}

function updateRequestStatus(id, data){
    return ShareModel.findOneAndUpdate({_id: id}, data);
}

module.exports = {
    shareRequest,
    getShareRequest,
    deleteShareRequest,
    updateRequestStatus,
    getConnectorUrlList
}