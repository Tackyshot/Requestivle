var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/fruit',
    handler: function (request, reply) {

        if(request.method == "get"){

            if(request.payload.fruit_color && !request.payload.fruit_size){

            }


            reply();
        }
        else if(request.method == "post"){

            reply();
        }

    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});