import mongoose from 'mongoose';

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



videoSchema.static('formatHashtags', function (hashtags) {
    return hashtags
        .split(",")
        .map(word => word.startsWith("#") ? word.trim() : `#${word.trim()}`)
})

const Video = mongoose.model('Video', videoSchema);
export default Video;

// Pre MiddleWare 를 활용해도 좋지만,
// save와 update 둘다 만들어 줘야해서 static 함수를 추가하는 형태로 구현

/*

videoSchema.pre('save', async function () {
    this.hashtags = this.hashtags[0]
        .split(",")
        .map(word => word.startsWith("#") ? word.trim() : `#${word.trim()}`)
})

*/
