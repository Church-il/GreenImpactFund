#!/bin/bash

# Update package list and install libgirepository1.0-dev
apt-get update && apt-get install -y libgirepository1.0-dev

# Install Python dependencies using pipenv
pipenv install -r requirements.txt
