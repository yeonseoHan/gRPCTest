
var PROTO_PATH = __dirname + '/../helloworld.proto';

/**
 * proto file 로드
 * */
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
       keepCase: true,
       longs: String,
       enums: String,
       defaults: true,
       oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * hello RPC method implements.
 */
function hello(call, callback) {
  console.log('type: ', call.call.handler.type)

  // callback(null, (call) => {
  //   return { message: call.request.name }
  // })

  callback(null, { message: call.request.name } )
}

function helloServerStream(call, callback) {
  callback(null, {message: 'helloBiStream ' + call.request.name});
}

async function helloBiStream(call) {

  call.on('data', (msg) => {

      call.write({ message: 'responseMessage:: ' + msg.name })
  })

  call.on('end', () => {
    call.write({ message: 'last message before finish call' })

    call.end()
  })

}

function helloClientStream(call, callback) {
  callback(null, {message: 'helloClientStream ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();

  server.addService(hello_proto.HelloService.service, {
    // service name : handle function
    hello: hello,
    helloServerStream: helloServerStream,
    helloClientStream: helloClientStream,
    helloBiStream: helloBiStream

  });
  server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
