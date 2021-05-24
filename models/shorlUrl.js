const mongoose = require('mongoose')
const shortid = require('shortid');
var autoIncrement = require('mongoose-auto-increment');

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required : true,
    },
    short: {
        type: String,
        required: true,
        default : shortid.generate
    },
    click: {
        type: Number,
        required: true,
        default: 0
    }

})


autoIncrement.initialize(mongoose.connection);
shortUrlSchema.plugin(autoIncrement.plugin,{
    model: 'shortUrl',
    startAt: 1
});

module.exports = mongoose.model('shortUrl',shortUrlSchema)