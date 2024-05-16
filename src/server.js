const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// 使用 CORS 中间件
app.use(cors());

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dang911915',
    database: 'vegetables_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

// 记录访问量的路由
app.get('/visit/:id', (req, res) => {
    const id = req.params.id;
    connection.query('UPDATE vegetables SET visits = visits + 1 WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error updating visits:', error.stack);
            res.status(500).send('Error recording visit');
            return;
        }
        res.send('Visit recorded');
    });
});

// 获取蔬菜热度排行的路由
app.get('/ranking', (req, res) => {
    connection.query('SELECT * FROM vegetables ORDER BY visits DESC', (error, results) => {
        if (error) {
            console.error('Error fetching ranking:', error.stack);
            res.status(500).send('Error fetching ranking');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});