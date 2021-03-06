var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var InviteSchema = new Schema({
    id: ObjectId,
    channel: {type: ObjectId, ref: 'Channel'},
    experiment: {type: Boolean, default: false},
}, { timestamps: { createdAt: 'created_at' } });

exports.Invite = mongoose.model('Invite', InviteSchema);

