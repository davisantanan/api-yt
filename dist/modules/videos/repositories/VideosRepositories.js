"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const mySql_1 = require("../../../mySql");
const uuid_1 = require("uuid");
class VideoRepository {
    create(request, response) {
        const { title, description, user_id } = request.body;
        mySql_1.pool.getConnection((err, connection) => {
            connection.query('INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), user_id, title, description], (error, result, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json(error);
                }
                response.status(200).json({ message: 'Vídeo criado com sucesso' });
            });
        });
    }
    getVideos(request, response) {
        const { user_id } = request.query;
        mySql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM videos WHERE user_id = ?', [user_id], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro ao buscar os vídeos" });
                }
                return response.status(200).json({ message: 'Vídeo retornado com sucesso', video: results });
            });
        });
    }
    searchVideos(request, response) {
        const { search } = request.query;
        mySql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM videos WHERE title LIKE ?', [`%${search}%`], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro ao buscar os vídeos" });
                }
                return response.status(200).json({ message: 'Vídeo retornado com sucesso', video: results });
            });
        });
    }
}
exports.VideoRepository = VideoRepository;
