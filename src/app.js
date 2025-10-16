import express from 'express';
import cors from 'cors';
import { notfoundHandler, errorHandler } from './utilites/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();


app.use(express.json({
    limit: '16kb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(express.static('public'));

// enable CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));




// 404 not found handler
app.use(notfoundHandler);

// error handler
app.use(errorHandler);

const port = process.env.PORT || 3444;
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
