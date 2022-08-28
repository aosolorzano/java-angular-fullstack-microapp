#!/bin/bash

cd ../aws/copilot || {
  echo "Error moving to the Timer Service 'backend' directory."
  exit 1
}

echo ""
read -r -p 'Please, enter the AWS profile used to remove the resources on AWS: [profile default] ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
fi
export AWS_PROFILE=$aws_profile

read -r -p 'Please, enter the <AWS Region> used to remove the resources on AWS: [us-east-1] ' aws_region
if [ -z "$aws_region" ]
then
  aws_region='us-east-1'
  echo "Using default region: $aws_region"
fi
export AWS_REGION=$aws_region

echo ""
echo "DELETING API GATEWAY FROM AWS.."
aws cloudformation delete-stack           \
    --stack-name timerservice-apigateway  \
    --profile $aws_profile
echo "Please, wait a moment..."
sleep 30

echo ""
echo "DELETING COPILOT APP FROM AWS.."
copilot app delete        \
    --name timerservice   \
    --yes

echo ""
echo "DELETING AMPLIFY APP FROM AWS.."
amplify delete

echo ""
echo "PRUNING DOCKER SYSTEM LOCALLY..."
docker container prune -f
docker volume prune -f
docker system prune -af
