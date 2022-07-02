#!/bin/bash

cd ../backend/java-timer-service-quarkus || {
  echo "Error moving to the Timer Service 'backend' directory."
  exit 1
}

echo "DELETING API GATEWAY FROM AWS.."
aws cloudformation delete-stack \
    --stack-name timerservice-apigateway

echo "DELETING SECURITY GROUP INGRESS FROM AWS.."
aws cloudformation delete-stack \
    --stack-name timerservice-ecs-sg-ingress

echo "DELETING COPILOT APP FROM AWS.."
copilot app delete --yes

echo "PRUNING DOCKER LOCAL SYSTEM..."
docker system prune -af
