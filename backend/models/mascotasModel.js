const mongoose = require('mongoose');

const mascotasSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'please add text value']
    }

}, {
    timestamps: true,
})

module.exports = mongoose.model('Mascotas', mascotasSchema)