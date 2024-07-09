require('dotenv').config()

import mongoose from 'mongoose';
import * as console from "node:console";

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(" ❌  DB Error", err);
})
db.once('open', () => {
    console.log(" ❤️ Database connection established 🚀");
})