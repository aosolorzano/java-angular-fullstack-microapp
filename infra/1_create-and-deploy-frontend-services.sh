#!/bin/bash

cd ../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

amplify init
amplify add auth
aplify add api