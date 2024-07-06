import mongoose from 'mongoose';
import * as console from "node:console";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 20,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 140,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    hashtags: [{
        type: String
    }],
    meta: {
        views: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
    },
});

// videoSchema.pre('save', async function () {
//     this.hashtags = this.hashtags[0]
//         .split(",")
//         .map(word => word.startsWith("#") ? word.trim() : `#${word.trim()}`)
// })

videoSchema.static('formatHashtags', function (hashtags) {
    return hashtags
        .split(",")
        .map(word => word.startsWith("#") ? word.trim() : `#${word.trim()}`)
})

const Video = mongoose.model('Video', videoSchema);
export default Video;


// https://nomadcoders.co/wetube/lectures/2676