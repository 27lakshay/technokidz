const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    role: {
        type: Number,
        required: true,
        max: 1,
        min: 0
    }
},{timestamps: true});

const User = mongoose.model('teacher', teacherSchema);

module.exports = User;