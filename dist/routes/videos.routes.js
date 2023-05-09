"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const VideosRepositories_1 = require("../modules/videos/repositories/VideosRepositories");
const login_1 = require("../middleware/login");
const videosRoutes = (0, express_1.Router)();
exports.videosRoutes = videosRoutes;
const videoRepository = new VideosRepositories_1.VideoRepository;
videosRoutes.post('/create-video', login_1.login, (request, response) => {
    videoRepository.create(request, response);
});
videosRoutes.get('/get-videos', login_1.login, (request, response) => {
    videoRepository.getVideos(request, response);
});
videosRoutes.get('/search', (request, response) => {
    videoRepository.searchVideos(request, response);
});
