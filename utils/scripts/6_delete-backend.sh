#!/bin/bash

cd ../../backend/java-timer-service-quarkus || {
  echo "Error moving to the Timer Service 'backend' directory."
  exit 1
}

echo ""
read -r -p 'Please, enter the AWS profile used to remove the resources: [default] ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
fi

echo "DELETING API GATEWAY FROM AWS.."
aws cloudformation delete-stack                     \
    --stack-name timerservice-apigateway            \
    --profile $aws_profile

echo "DELETING SECURITY GROUP INGRESS FROM AWS.."
aws cloudformation delete-stack                     \
    --stack-name timerservice-ecs-sg-ingress        \
    --profile $aws_profile

echo "DELETING COPILOT APP FROM AWS.."
copilot app delete        \
    --name timerservice   \
    --yes

echo "PRUNING DOCKER LOCAL SYSTEM..."
docker system prune -af
