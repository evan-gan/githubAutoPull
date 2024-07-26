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

# Function to install screen
install_screen() {
    echo "Installing screen..."
    
    # Enable EPEL repository
    sudo yum install -y epel-release
    
    # Install screen
    sudo yum install -y screen
    
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

# Get started message:
echo -e "TODO: Add getting started message, for now just reference the readme"
