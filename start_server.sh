#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$0")

# Navigate to the project directory
cd "$SCRIPT_DIR/src"

# Prompt the user to enter a custom name for the tmux session
read -p "Enter a name for the tmux session: " session_name

# Define the command to start the Node.js server
start_command='npm start'

# Start the Node.js server using tmux with the custom session name
tmux new-session -d -s "$session_name" "$start_command"

echo "Node.js server started in tmux session '$session_name' with command: $start_command."
