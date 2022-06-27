#!/bin/bash

cd ../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo "INSTALLING NODE DEPENDENCIES..."
npm install

echo "INITIALIZING AMPLIFY..."
amplify init

echo "ADDING AMPLIFY AUTHENTICATION..."
amplify add auth

echo "PUSHING AMPLIFY CHANGES TO AWS..."
amplify push
