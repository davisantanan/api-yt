import express from 'express'
import { userRoutes } from './routes/user.routes';
import { videosRoutes } from './routes/videos.routes';
import { config } from 'dotenv';


config();
const app = express();

const cors = require('cors');

app.use(function(req, res, next) {
    res.header("Acess-Control-Allow-Origin", '*');
    res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Acess-Control-Allow-Methods", 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(cors());


app.use(express.json());
app.use('/user', userRoutes);
app.use('/videos', videosRoutes);


app.listen(4000);