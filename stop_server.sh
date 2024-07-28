#!/bin/bash

# List all running tmux sessions with consecutive numbers
sessions=$(tmux list-sessions -F "#{session_id}:#{session_name}")
session_count=$(echo "$sessions" | wc -l)
if [ "$session_count" -eq 0 ]; then
    echo "No tmux sessions found."
    exit 1
fi

echo "Running tmux sessions:"
index=1
declare -A session_map
while IFS= read -r session; do
    session_map[$index]=$(echo "$session" | cut -d ':' -f 2)
    echo "$index) ${session_map[$index]}"
    ((index++))
done <<< "$sessions"

# Ask the user to enter a number to kill the session
read -p "Enter the number of the session to kill: " session_number

if ! [[ "$session_number" =~ ^[0-9]+$ ]] || [ "$session_number" -lt 1 ] || [ "$session_number" -gt "$session_count" ]; then
    echo "Invalid session number."
    exit 1
fi

session_to_kill=${session_map[$session_number]}
tmux kill-session -t "$session_to_kill"

echo "tmux session '$session_to_kill' stopped."
