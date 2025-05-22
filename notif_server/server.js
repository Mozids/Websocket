const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express()
const port = 3001
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const hostName = '127.0.0.1'
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
}


app.use(cors(corsOptions))
app.use(bodyParser.json())
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('Received:', message)
    })

    ws.on('close', () => console.log('web socket disconnected'))
})

app.post('/send-message', (req, res) => {
    const { name, message } = req.body

    if (!name || !message) {
        return res.status(422).json({ 
            message: 'Name and message are required' 
        })
    }

    try {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.open) {
                client.send(JSON.stringify({ name, message }))
            }
        })
        res.json({
            success: true,
            message: 'Message sent successfully',
            contentMessage: message,
            name: name

        })
    }catch (error) {
        console.log(`Error sedding message: ${error}`)
        res.status(500).json({
            message: 'ERR',
            error: error
        })
    }
})

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}`)
})