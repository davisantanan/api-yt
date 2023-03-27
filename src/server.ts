import express from 'express'
import { userRoutes } from './routes/user.routes';
import { VideosRoutes } from './routes/videos.routes';
import { config } from 'dotenv';


config();
const app = express();

console.log(process.env.SECRET);

app.use(express.json());
app.use('/user', userRoutes);
app.use('/videos', VideosRoutes);


app.listen(4000);