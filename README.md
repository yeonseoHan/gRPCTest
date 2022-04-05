gRPC in 3 minutes (Node.js)
===========================

PREREQUISITES
-------------

- `node`: This requires Node 0.12.x or greater.

INSTALL
-------

   ```sh
   $ # Get the gRPC repository
   $ export REPO_ROOT=grpc # REPO root can be any directory of your choice
   $ git clone -b RELEASE_TAG_HERE https://github.com/grpc/grpc $REPO_ROOT
   $ cd $REPO_ROOT

   $ cd examples/node
   $ npm install
   ```
   
   
   
   
TEST
-------

패키지 다운로드 후

cd dynamic_codegen

터미널 1
node greeter_server.js 실행 후

터미널 2
node greeter_client.js 실행

- greeter_server.js 에서

unaryTest() : 단방향 통신 코드 (1회성)
bidirectTest() : 양방향 통신 코드 (커맨드 라인 입력)

주석 토글로 테스트 가능합니다.

(아래는 참고)


TRY IT!
-------

There are two ways to generate the code needed to work with protocol buffers in Node.js - one approach uses [Protobuf.js](https://github.com/dcodeIO/ProtoBuf.js/) to dynamically generate the code at runtime, the other uses code statically generated using the protocol buffer compiler `protoc`. The examples behave identically, and either server can be used with either client.

 - Run the server

   ```sh
   $ # from this directory
   $ node ./dynamic_codegen/greeter_server.js &
   $ # OR
   $ node ./static_codegen/greeter_server.js &
   ```

 - Run the client

   ```sh
   $ # from this directory
   $ node ./dynamic_codegen/greeter_client.js
   $ # OR
   $ node ./static_codegen/greeter_client.js
   ```

TUTORIAL
--------
You can find a more detailed tutorial in [gRPC Basics: Node.js][]

[Install gRPC Node]:../../src/node
[gRPC Basics: Node.js]:https://grpc.io/docs/languages/node/basics
