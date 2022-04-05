/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../helloworld.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var argv = parseArgs(process.argv.slice(2), {
  string: 'target'
});
var target;
if (argv.target) {
  target = argv.target;
} else {
  target = '127.0.0.1:50051';
}
var client = new hello_proto.HelloService(target,
                                     grpc.credentials.createInsecure());
var user;
if (argv._.length > 0) {
  user = argv._[0];
} else {
  user = 'world';
}
var metadata = new grpc.Metadata();
metadata.add('username', user);

// unary RPCs
const unaryTest = () => {

  client.hello({name: user, age: 3}, function(err, response) {
    console.log('received message: ', response.message);
  });

}
// bidirectional streaming RPCs
const bidirectTest = () => {

  var call = client.helloBiStream(/*{name: user},*/ metadata)

  call.on('data', (response) => {
    console.log(response.message)
    console.log('Enter the messages below:');
  });

  call.on('end', () => {
    console.log('server streaming ended')
  });

  call.on('error', (e) => {
    console.log(e);
  });

  rl.on("line", function(line) {
    if (line === "quit") {
      call.end();
      rl.close();
    } else {
      call.write({
        name : line
      });
    }
  });

  console.log('Enter the messages below:');
}

// unaryTest()
bidirectTest()
