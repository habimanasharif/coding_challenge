const express = require('express')
const path = require('path');

    const app = express()
    const publicPath = path.join(__dirname, 'client');
    app.use(express.static(publicPath));
    const index = path.join(publicPath, 'index.html');
    app.get('/', (req, res) => {
        res.sendFile(index);
      });
    app.get('/ping', (req, res) => {
        res.send('pong 🏓')
    })

    const port = process.env.PORT || 8080

    app.listen(port, (err, res) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err.message)
        } else {
            console.log('[INFO] Server Running on port:', port)
        }
    })