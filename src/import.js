const mysql = require('mysql2');
const fs = require('fs');

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dang911915',
    database: 'vegetables_db'
});

connection.connect();

// 读取 JSON 文件
const rawData = fs.readFileSync('assets/items/vegetables.json');
const vegetables = JSON.parse(rawData);

// 清空表数据
connection.query('TRUNCATE TABLE vegetables', (error, results) => {
    if (error) throw error;

    // 插入新数据
    vegetables.forEach(vegetable => {
        const { ref, name, image, description, available } = vegetable;
        connection.query('INSERT INTO vegetables (ref, name, image, description, available) VALUES (?, ?, ?, ?, ?)', 
        [ref, name, image, description, JSON.stringify(available)], (error, results) => {
            if (error) throw error;
        });
    });

    console.log('Data imported successfully');
    connection.end();
});
