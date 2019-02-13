const mongo = require('mongodb').MongoClient;
const io = require('socket.io').listen(4000).sockets;
require('dotenv').load();

// Connect to mongo
mongo.connect('mongodb://'+process.env.DB_HOST+'/mongochat', function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');

    // Connect to Socket.io
    io.on('connection', function(socket){

        let chat = db.collection('chats');

        // Create function to send status
        sendStatus = function(s, room){
            //socket.emit('status', s);
            io.to(room).emit('status',s);
        }

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
            //io.to('some room').emit('output',res);
        });

        // Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;
            let room = data.room;
            //Connect room
            socket.join(room);
            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insert({room :room, name: name, message: message, date: Date.now()}, function(){
                    //io.emit('output', [data]);
                    io.to(room).emit('output',[data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });

    });
});