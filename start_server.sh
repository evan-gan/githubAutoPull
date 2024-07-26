#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$0")

# Navigate to the project directory
cd "$SCRIPT_DIR/src"

# Start the Node.js server using tmux
tmux new-session -d -s my_node_app 'npm start'

echo "Node.js server started in tmux session 'my_node_app'."
