import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 20,
    },
    fileUrl: {
        type: String,
        required: true,
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



videoSchema.static('formatHashtags', function (hashtags) {
    return hashtags
        .split(",")
        .map(word => word.startsWith("#") ? word.trim() : `#${word.trim()}`)
})

const Video = mongoose.model('Video', videoSchema);
export default Video;
