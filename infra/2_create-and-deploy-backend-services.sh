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
  --deploy                        \
  --env dev

# DEPLOY API GATEWAY
aws cloudformation create-stack \
  --stack-name timerservice-apigateway \
  --template-body file://../backend/java-timer-service-quarkus/cloudformation/ApiGateway.yml \
  --parameters \
    ParameterKey=App,ParameterValue=timerservice  \
    ParameterKey=Env,ParameterValue=dev           \
    ParameterKey=Service,ParameterValue=api       \
    ParameterKey=Name,ParameterValue=ApiGateway   \
  --capabilities CAPABILITY_NAMED_IAM
