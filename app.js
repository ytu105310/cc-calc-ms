const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const dbPath = path.resolve(__dirname, 'database/notes.db');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the notes database.');
});

db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
)`);

app.post('/api/notes', (req, res) => {
    const content = req.body.content;
    db.run(`INSERT INTO notes (content) VALUES (?)`, [content], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.status(201).json({ id: this.lastID });
    });
});

app.get('/api/notes', (req, res) => {
    db.all(`SELECT * FROM notes`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
