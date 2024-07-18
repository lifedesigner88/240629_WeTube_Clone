import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    socialOnly: {
        type: Boolean,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    avatarUrl: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }]
})

userSchema.pre('save', async function () {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 5);
})

const User = mongoose.model('User', userSchema);
export default User;