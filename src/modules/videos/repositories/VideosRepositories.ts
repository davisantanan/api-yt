import { pool } from '../../../database';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

class VideoRepository {
  create(request: Request, response: Response) {
    const { title, description, user_id, thumbnail } = request.body;

    pool.connect((err, client, done) => {
      if (err) {
        return response.status(500).json(err);
      }

      const query = `
        INSERT INTO videos (video_id, user_id, title, description, thumbnail)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [uuidv4(), user_id, title, description, thumbnail];

      client.query(query, values, (error, result) => {
        done(); 

        if (error) {
          return response.status(400).json({ error });
        }

        response.status(200).json({ message: 'Vídeo criado com sucesso' });
      });
    });
  }
  
  getVideos(request: Request, response: Response) {
    const { user_id } = request.query;

    pool.connect((err, client, done) => {
      if (err) {
        return response.status(500).json(err);
      }

      const query = `
        SELECT * FROM videos WHERE user_id = $1
      `;
      const values = [user_id];

      client.query(query, values, (error, results) => {
        done(); 

        if (error) {
          return response.status(400).json({ error: 'Erro ao buscar os vídeos' });
        }

        return response.status(200).json({ message: 'Vídeo retornado com sucesso', video: results.rows });
      });
    });
  }
  
  searchVideos(request: Request, response: Response) {
    const { search } = request.query;

    pool.connect((err, client, done) => {
      if (err) {
        return response.status(500).json(err);
      }

      const query = `
        SELECT * FROM videos WHERE title ILIKE $1
      `;
      const values = [`%${search}%`];

      client.query(query, values, (error, results) => {
        done();

        if (error) {
          return response.status(400).json({ error: 'Erro ao buscar os vídeos' });
        }

        return response.status(200).json({ message: 'Vídeo retornado com sucesso', video: results.rows });
      });
    });
  }
}
  
export { VideoRepository };