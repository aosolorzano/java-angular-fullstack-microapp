#!/bin/bash

cd ../backend/java-timer-service-quarkus || {
  echo "Error moving to the Timer Service 'backend' directory."
  exit 1
}

echo ""
echo "DEPLOYING THE COPILOT INITIAL APPLICATION ON AWS..."
copilot init                    \
  --app timerservice            \
  --name api                    \
  --type 'Backend Service'      \
  --dockerfile './Dockerfile'   \
  --port 8080

echo ""
echo "DEPLOYING THE COPILOT ENVIRONMENT ON AWS..."
copilot env init        \
  --app timerservice    \
  --name dev            \
  --profile default     \
  --default-config

echo ""
echo "DEPLOYING THE COPILOT ENVIRONMENT ON AWS..."
copilot deploy          \
  --app timerservice    \
  --name api            \
  --env dev             \
  --resource-tags app=timerservice,stage=dev,region=us-east-1,project=timerservice,service=api,version=1.1.0

echo ""
echo "ADDING SECURITY GROUP INGRESS TO ACCESS ECS CLUSTER ON AWS..."
aws cloudformation create-stack                                     \
  --stack-name timerservice-ecs-sg-ingress                          \
  --template-body file://cloudformation/1_SecurityGroupIngress.yml  \
  --capabilities CAPABILITY_NAMED_IAM
echo "PLEASE WAIT..."

echo ""
echo "CREATING FIRST VERSION OF API GATEWAY ON AWS..."
aws cloudformation create-stack                           \
  --stack-name timerservice-apigateway                    \
  --template-body file://cloudformation/2_ApiGateway.yml  \
  --capabilities CAPABILITY_NAMED_IAM
