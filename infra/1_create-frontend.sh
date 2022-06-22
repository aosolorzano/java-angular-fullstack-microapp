#!/bin/bash

cd ../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

# CREATE AMPLIFY APP ON AWS
npm install
amplify init
amplify add auth
amplify push
