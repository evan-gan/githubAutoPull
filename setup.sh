#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Node.js and npm
install_node_npm() {
    echo "Installing Node.js and npm..."
    
    # Add NodeSource repository for Node.js
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -

    # Install Node.js and npm
    sudo yum install -y nodejs

    echo "Node.js and npm have been installed."
}

# Function to install tmux
install_tmux() {
    echo "Installing tmux..."
    
    # Enable EPEL repository
    sudo yum install -y epel-release
    
    # Install tmux
    sudo yum install -y tmux
    
    echo "tmux has been installed."
}

# Function to prompt for user input and create config.ts
create_config_ts() {
    # Prompt user for REPO_OWNER, REPO_NAME, and port
    read -p "Enter the github username that owns the repo (ex: evan-gan): " repo_owner
    read -p "Enter the name of the repo (ex. evan-gan.github.io): " repo_name
    read -p "Enter port you want the server to run on (ex. 25565): " port

    # Write user input to config.ts
    cat <<EOL > "$(dirname "$0")src/config.ts"
export const REPO_OWNER = '$repo_owner';
export const REPO_NAME = '$repo_name';
export const port = $port;
EOL

    # echo "config.ts has been created with the provided user input."

    # Return the port for further use
    echo "$port"
}

# Function to get the current server's IP address
get_server_ip() {
    ip=$(hostname -I | awk '{print $1}')
    echo "$ip"
}

# Check if Node.js is installed
if command_exists node; then
    echo "Node.js is already installed. Version: $(node -v)"
else
    echo "Node.js is not installed."
    install_node_npm
fi

# Check if npm is installed
if command_exists npm; then
    echo "npm is already installed. Version: $(npm -v)"
else
    echo "npm is not installed."
    install_node_npm
fi

# Check if tmux is installed
if command_exists tmux; then
    echo "tmux is already installed. Version: $(tmux -V)"
else
    echo "tmux is not installed."
    install_tmux
fi

# Make other .sh files executable
chmod +x start_server.sh
chmod +x stop_server.sh

# Change to the Node.js project directory
cd src

# Install project dependencies
echo "Installing project dependencies..."
npm install
echo "Setup is complete."

# Prompt for user input to create config.ts and capture the port
port=$(create_config_ts)

# Get the server IP address
server_ip=$(get_server_ip)

# Construct and display the getting started message
echo -e "\nGreat! Now that you have everything set up on the backend, you are almost there!"
echo -e "There are a few extra things you need to set up on GitHub."
echo -e "\nFirst, navigate to your repository."
echo -e "\nSecond, click 'Settings', then 'Webhooks' on the right-hand menu, then click 'Add webhook'."
echo -e "\nNow paste this URL:"
echo -e "http://$server_ip:$port/webhook"
echo -e "into the 'Payload URL' field and press 'Add webhook'."
echo -e "\nThat's it! You should be all set up now."
echo -e "\nTo start the server, navigate to this directory and run ./start_server.sh."
echo -e "To stop the server, navigate to this directory and run ./stop_server.sh.\n"
