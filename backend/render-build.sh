#!/bin/bash
apt-get update && apt-get install -y libgirepository1.0-dev
pipenv install -r requirements.txt
