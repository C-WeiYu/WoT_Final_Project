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

let options={};
let start = false;
let users = 0;
let last_time = 90;

app.use(express.static(__dirname));
io.on('connection', function (socket) {
    console.log('a client connected:' + socket.id);
    socket.on('directive', function (message) {
        console.log(message);
        users+=1
        socket.broadcast.emit('new_user',message);
        if(start == false){
            start = true;
            let interval = setInterval(function(){
                PythonShell.run('OCR.py', options, function(err, result){
                    if(err) throw err;
                    let time_all = result.toString();
                    let time = time_all.substring(2,time_all.length-2);
                    if(time > last_time){ //表示切到下一個使用者
                        users -= 1;
                        console.log("users : ",users);
                    }
                    if  (users == 1 && time == 0) {
                        users -=1;
                    }
                    last_time = time;

                    if(users <= 0 && time == 0){
                        start = false ;
                        users=0;
                        last_time=90;
                        clearInterval(interval);
                    }
                    console.log('time : ',time);
                    socket.broadcast.emit('time1',time);
                })
            },20000);
        }
 });
});



httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});



// app.get('/python', (req, res, next) =>{
//     let options = {

//     }

//     PythonShell.run('OCR.py', options, function(err, result){
//         if(err) throw err;
//         console.log('result: ', result.toString());
//         res.send(result.toString());
//     })
// })

