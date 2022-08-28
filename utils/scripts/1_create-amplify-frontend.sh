#!/bin/bash

cd ../../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo ""
echo "INSTALLING NODEJS DEPENDENCIES..."
npm install

echo ""
echo "INIT AMPLIFY ON AWS..."
amplify init

echo ""
echo "ADDING AMPLIFY AUTHENTICATION SERVICE TO THE PROJECT..."
amplify add auth

echo ""
echo "DEPLOYING THE AMPLIFY AUTH TO AWS..."
amplify push
