#!/bin/bash

cd ../../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo "INSTALLING NODEJS DEPENDENCIES..."
npm install

echo "INIT AMPLIFY ON AWS..."
amplify init

echo "ADDING AMPLIFY AUTHENTICATION SERVICE..."
amplify add auth

echo "CREATING THE AMPLIFY APP ON AWS..."
amplify push
