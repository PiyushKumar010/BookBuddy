
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './config/passport.js';
import { connectDB } from './config/db.js';
import bookRoutes from './routes/book.route.js';
import userRoutes from './routes/user.route.js';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["https://bookbuddy-iota.vercel.app"," http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port:' + PORT);
});



