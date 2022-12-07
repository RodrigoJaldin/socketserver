const { emit } = require("nodemon");

class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {  // socket = cliente que se conecto
            console.log('cliente conectado', socket.id);


            socket.on('mensaje-para-servidor', (mensaje, room) => { //on => Escucha
                console.log(mensaje, room);
                
            });

            socket.on('join-room', room => {
                socket.join(room);
                console.log('sala',room);
                this.io.to(room).emit('broadcast')
            });

            socket.on('actualizar',(json,salaid)=>{
                this.io.to(salaid).emit('mandarjsonusuario',json)
                //console.log(json)
            })



        });

    }


}


module.exports = Sockets;