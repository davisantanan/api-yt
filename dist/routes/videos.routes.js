"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosRoutes = void 0;
const express_1 = require("express");
const VideosRepositories_1 = require("../modules/videos/repositories/VideosRepositories");
const login_1 = require("../middleware/login");
const VideosRoutes = (0, express_1.Router)();
exports.VideosRoutes = VideosRoutes;
const videoRepository = new VideosRepositories_1.VideoRepository;
VideosRoutes.post('/create-video', login_1.login, (request, response) => {
    videoRepository.create(request, response);
});
VideosRoutes.get('/get-videos', login_1.login, (request, response) => {
    videoRepository.getVideos(request, response);
});
VideosRoutes.get('/search', (request, response) => {
    videoRepository.searchVideos(request, response);
});
