import mongoose from 'mongoose';
import * as console from "node:console";

mongoose.connect('mongodb://localhost:27017/wetube');

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(" ❌  DB Error", err);
})
db.once('open', () => {
    console.log(" ❤️ Database connection established 🚀");
})