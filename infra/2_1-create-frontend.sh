#!/bin/bash

cd ../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo "INSTALLING DEPENDENCIES..."
npm install

echo "INITIALIZING AMPLIFY..."
amplify init

echo "ADDING AMPLIFY AUTHENTICATION SERVICE..."
amplify add auth

echo "CREATING THE AMPLIFY APP ON AWS..."
amplify push
