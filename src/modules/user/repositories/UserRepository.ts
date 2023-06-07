import { pool } from '../../../database';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

class UserRepository {
  create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    pool.connect((err, client, done) => {
      if (err) {
        return response.status(500).json(err);
      }

      hash(password, 10, (err, hashedPassword) => {
        if (err) {
          done();
          return response.status(500).json(err);
        }

        const query = `
          INSERT INTO users (user_id, name, email, password)
          VALUES ($1, $2, $3, $4)
        `;
        const values = [uuidv4(), name, email, hashedPassword];

        client.query(query, values, (error, result) => {
          done(); 

          if (error) {
            return response.status(400).json({ error });
          }

          response.status(200).json({ message: 'Usuário criado com sucesso' });
        });
      });
    });
  }
  
  login(request: Request, response: Response) {
    const { email, password } = request.body;

    pool.connect((err, client, done) => {
      if (err) {
        return response.status(500).json(err);
      }

      const query = `
        SELECT * FROM users WHERE email = $1
      `;
      const values = [email];

      client.query(query, values, (error, results) => {
        done();

        if (error) {
          return response.status(400).json({ error: 'Erro na sua autenticação' });
        }

        if (results.rows.length === 0) {
          return response.status(400).json({ error: 'Erro na sua autenticação' });
        }

        const user = results.rows[0];

        compare(password, user.password, (err, result) => {
          if (err || !result) {
            return response.status(400).json({ error: 'Erro na sua autenticação' });
          }

          const token = sign(
            { id: user.user_id, email: user.email },
            process.env.SECRET as string,
            { expiresIn: '1d' }
          );

          return response.status(200).json({ token, message: 'Autenticado com sucesso' });
        });
      });
    });
  }
  
  getUser(request: any, response: any) {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(401).json({ error: 'Token não fornecido' });
    }

    verify(token, process.env.SECRET as string, (err:any, decoded:any) => {
      if (err) {
        return response.status(401).json({ error: 'Token inválido' });
      }

      const email = decoded.email;

      pool.connect((err, client, done) => {
        if (err) {
          return response.status(500).json(err);
        }

        const query = `
          SELECT * FROM users WHERE email = $1
        `;
        const values = [email];

        client.query(query, values, (error, results) => {
          done();

          if (error) {
            return response.status(400).json({ error, response: null });
          }

          if (results.rows.length === 0) {
            return response.status(400).json({ error: 'Usuário não encontrado', response: null });
          }

          const user = results.rows[0];

          return response.status(201).json({
            user: {
              name: user.name,
              email: user.email,
              id: user.user_id,
            },
          });
        });
      });
    });
  }
}
  
export { UserRepository };