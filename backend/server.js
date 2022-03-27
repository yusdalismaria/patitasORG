const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
const colors = require('colors');
const connectDB = require('./config/db')

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/mascotas', require('./routes/mascotasRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Serve started on sever port: ${port}`))