#!/bin/bash

cd ../backend/java-timer-service-quarkus/ || {
  echo "Error moving to the Timer Service 'backend' directory."
  exit 1
}

# DEPLOY ECS SERVICE
copilot init --app timerservice   \
  --name api                      \
  --type 'Backend Service'        \
  --dockerfile './Dockerfile'     \
  --port 80                       \
  --deploy                        \
  --env dev

# ADD SECURITY GROUP INGRESS RULE
aws cloudformation create-stack                                     \
  --stack-name timerservice-ecs-sg-ingress                          \
  --template-body file://cloudformation/1_SecurityGroupIngress.yml  \
  --capabilities CAPABILITY_NAMED_IAM

# DEPLOY API GATEWAY
aws cloudformation create-stack                           \
  --stack-name timerservice-apigateway                    \
  --template-body file://cloudformation/2_ApiGateway.yml  \
  --capabilities CAPABILITY_NAMED_IAM
