const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    msg: String,
    sender: String,/* username */
    receiver: String,/* username */
})

module.exports = mongoose.model('message', messageSchema)