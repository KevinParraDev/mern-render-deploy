import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, FRONTEND_URL, PORT } from './config.js';

const app = express();
const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

app.use(cors({
    origin: FRONTEND_URL
}));

app.get('/ping', async (req, res) => {

    const result = await pool.query('SELECT NOW()')
    console.log(result)

    res.send({
        pong: result.rows[0].now
    });
});

app.listen(PORT, () => {
    console.log("server started on port 3000");
});