#!/bin/bash

screen -dmS web_server_session npx ts-node src/server.ts
echo "Server started in screen session 'my_server_session'."
