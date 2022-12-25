import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
const __dirname = path.resolve();
//let { PythonShell } = require('python-shell')
import { PythonShell } from 'python-shell';

const app = express();
const httpServer = http.Server(app);
const io = new Server(httpServer);

let machines=[]

app.use(express.static(__dirname));
io.on('connection', function (socket) {
    console.log('a client connected:' + socket.id);
    socket.on('directive', function (message) {
        console.log(message);
        socket.broadcast.emit('new_user',message);
        // if(!machines.includes(message.machine)){ //不包含
        //     machines.push(message.machine);
        //     console.log("machines : " + machines);
        //     socket.broadcast.emit('new_machine',message);
        // }
        // else{
        // socket.broadcast.emit('new_user', message);
        // }
 });
});





httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});



app.get('/python', (req, res, next) =>{
    let options = {

    }

    PythonShell.run('OCR.py', options, function(err, result){
        if(err) throw err;
        console.log('result: ', result.toString());
        res.send(result.toString());
    })
})

