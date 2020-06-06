const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = process.env.DATA || path.resolve(__dirname, '../data');

console.log(`Opening DB at ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
    if(!err) {
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            msg text,
            topic_id INTEGER,
            user_id INTEGER,
            date INTEGER
        )`)
    } else {
        console.error("Failed to initialize DB", err);
        process.exit();
    }
})

router.post('/callback', (req, res, next) => {

    if(!req.body.type) {
        res.status(400)
        res.json({message: "Invalid request"})
    }

    if(process.env.SECURITY_CODE && process.env.SECURITY_CODE !== req.body.secret) {
        res.status(403)
        res.json({message: 'Invalid security code'})
    }

    switch (req.body.type) {

        case 'confirmation':
            res.status(200);
            res.set('Content-Type', 'text/plain');
            res.send(process.env.CONFIRM_CODE);
            return;

        case 'message_new':
            const {group_id: gid, object: {message: {text, from_id: userId}}} = req.body;
            db.run('INSERT INTO messages (msg, topic_id, user_id, date) VALUES (?, ?, ?, ?)', text, gid, userId, Date.now());
            break;

    }

    res.status(200);
    res.send('ok');

});


module.exports = router;