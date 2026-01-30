#!/bin/bash

set -euo pipefail    # stop script if any command fails
#defining variables
GIT_URl="xyz"
front_port="3000"
backend_port="4000"
#defining functions
printx() {
    echo "=========== $1 ============="
}

printx "Updating & Upgrading...."
sudo apt update && sudo apt upgrade -y

if ! command -v docker >/dev/null 2>&1;then
    printx "Stating Installation of Docker...."
    sudo apt install docker.io docker-compose -y
    printx "Docker Insatllation Completed...."
    sudo usermod -aG docker $USER
    printx "Please logout/login for docker group to apply"
    printx "....RUN command: newgrp docker...."
else
    printx "Docker Insatllation Completed...."
fi

sudo systemctl enable docker
sudo systemctl start docker
if systemctl is-active --quiet docker;then
    printx "Docker is Running..."
else
    printx "Docker not Running.... and Exiting..."
    exit 1
fi

if ! command -v git >/dev/null 2>&1;then
    printx "Git Installation....."
    sudo apt install git -y
    printx "Git Installed...."
else
    printx "Git Installed...."
fi

#cloning of code from git in fbd folder
if [ -d "fbd" ];then
    printx "Coding already copied... & pulling it again..."
    cd fbd && git pull && cd ..
else
    printx "Git Cloning Code..."
    git clone "$GIT_URl" fbd
fi 

#Building image & containers
printx "Excuting Docker-Compose.yml file..."
docker compose -f fbd/docker-compose.yml down
docker compose -f fbd/docker-compose.yml up -d --build

printx "Deployment Completed..."
printx "Frontend server on: http://<EC2@ip>:$front_port"
printx "Backend server on: http://<EC2@ip>:$backend_port"
printx "...Linux+Bash+AWS+Nginx+Docker+MongoDB..."
