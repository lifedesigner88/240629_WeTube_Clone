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

videoSchema.pre('save', async function () {
    console.log("We are about to save: ",this);
})

const Video = mongoose.model('Video', videoSchema);
export default Video;


// https://nomadcoders.co/wetube/lectures/2676