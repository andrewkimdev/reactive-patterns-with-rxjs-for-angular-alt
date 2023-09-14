const fs = require('fs')

// Http
const jsonServer = require('json-server')
const server = jsonServer.create()

server.use(jsonServer.defaults());
const alert = JSON.parse(fs.readFileSync('./db-json/recipes.json', 'UTF-8'));

// WebSocket
const WebSocket = require('ws');
const was = new WebSocket.Server({port: 8081});
let timerId = null;

server.get('/api/recipes', (req, res) => {
    res.status(200).json(alert)
})

server.post('/api/recipes/save', (req, res) => {
    res.status(200).json(req.body)
})

server.listen(3001, () => {
    console.log('Run Auth API Server')
})

// Web Socket Handling
was.on('connection', ws => {
    onConnection(ws);

    ws.on('message', message => {
        onMessage(message, ws);
    });

    ws.on('close', ws => {
        onClose();
    });

    ws.on('error', error => {
        onError(error);
    });
})

function onConnection(ws) {
    console.log(`Connection Established. Listening on ${ws.options.port}`);
    ws.send(JSON.stringify({key: "key", message: "messageFromTheSocket"}));

    if (!timerId) {
        startTimer(ws);
    }
}

function onMessage(message, ws) {
    console.log(`Received message => ${message}`);
}

function onClose() {
    timerId = null;
    console.log('Connection closed');
}

function onError(error) {
    console.log(`Error => ${error[code]}`);
}

function startTimer(ws) {
    timerId = setInterval(() => {
        ws.send(JSON.stringify({key: "key", message: "messageFromTheSocket"}));
    }, 1000);
}
