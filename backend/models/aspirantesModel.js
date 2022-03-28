const mongoose = require('mongoose');

const aspirantesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'please add text value']
    }

}, {
    timestamps: true,
})

module.exports = mongoose.model('Aspirantes', aspirantesSchema)