const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    visited_parks: [{
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        image: {
            type: String,
            // required: true,
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
    }],
    social: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);