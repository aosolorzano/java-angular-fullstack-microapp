#!/bin/bash

cd ../backend/java-timer-service-quarkus/ || {
  echo "Error moving to the Timer Service 'backend' directory."
  exit 1
}

copilot app delete