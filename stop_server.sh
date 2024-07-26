#!/bin/bash

# Stop the Node.js server by killing the tmux session
tmux kill-session -t my_node_app

echo "Node.js server stopped."
