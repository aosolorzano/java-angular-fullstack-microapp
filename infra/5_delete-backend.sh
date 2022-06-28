#!/bin/bash

cd ../backend/java-timer-service-quarkus/ || {
  echo "Error moving to the Timer Service 'backend' directory."
  exit 1
}

echo "DELETING API GATEWAY FROM AWS.."
aws cloudformation delete-stack \
    --stack-name timerservice-api-gateway

echo "DELETING SECURITY GROUP INGRESS FROM AWS.."
aws cloudformation delete-stack \
    --stack-name timerservice-ecs-sg-ingress

echo "DELETING COPILOT SERVICE FROM AWS.."
copilot svc delete      \
  --app timerservice    \
  --env dev             \
  --name api            \
  --yes

echo "DELETING COPILOT ENVIRONMENT FROM AWS.."
copilot env delete      \
  --app timerservice    \
  --name dev            \
  --yes

echo "DELETING COPILOT APP FROM AWS.."
copilot app delete      \
  --name timerservice   \
  --yes

echo "PRUNING DOCKER LOCAL SYSTEM..."
docker system prune -af
