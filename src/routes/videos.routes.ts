import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideosRepositories";
import { login } from '../middleware/login'


const VideosRoutes = Router();
const videoRepository = new VideoRepository; 


VideosRoutes.post('/create-video', login, (request, response) => {
    videoRepository.create(request, response);
})

VideosRoutes.get('/get-videos', login, (request, response) => {
    videoRepository.getVideos(request, response);
})

VideosRoutes.get('/search', (request, response) => {
    videoRepository.searchVideos(request, response);
})


export { VideosRoutes };