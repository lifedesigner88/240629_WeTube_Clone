import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    createAt: Date,
    hashtags: [{type: String}],
    meta: {
        views: {
            type: Number,
            default: 0
        },
        rating: Number,
    },
});

const Video = mongoose.model('Video', videoSchema);
export default Video;