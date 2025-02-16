#!/bin/bash

# Install system dependencies
apt-get update -y
apt-get install -y libgirepository1.0-dev

# Install Python dependencies using pipenv
pipenv install -r requirements.txt