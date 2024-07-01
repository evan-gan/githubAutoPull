#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Node.js and npm
install_node_npm() {
    echo "Installing Node.js and npm..."
    
    # Use curl to fetch the Node.js setup script and execute it
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

    # Install Node.js and npm
    sudo apt-get install -y nodejs

    echo "Node.js and npm have been installed."
}

# Function to install screen
install_screen() {
    echo "Installing screen..."
    sudo apt-get install -y screen
    echo "screen has been installed."
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

# Check if screen is installed
if command_exists screen; then
    echo "screen is already installed. Version: $(screen -v)"
else
    echo "screen is not installed."
    install_screen
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

#Get started message:
echo -e "TODO: Add geting started message, for now just refrence the readme"