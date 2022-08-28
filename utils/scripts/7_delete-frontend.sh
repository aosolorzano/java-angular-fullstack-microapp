#!/bin/bash

cd ../../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo ""
echo "DELETING AMPLIFY APP FROM AWS.."
amplify delete
