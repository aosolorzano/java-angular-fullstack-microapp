#!/bin/bash

echo ""
read -r -p 'Please, enter the AWS profile used to remove the resources: [default]  ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
  echo "Using default profile: $aws_profile"
else
  export AWS_PROFILE=$aws_profile
fi

read -r -p 'Please, enter the AWS Region used to remove the resources: [us-east-1] ' aws_region
if [ -z "$aws_region" ]
then
  aws_region='us-east-1'
  echo "Using default region: $aws_region"
else
  export AWS_REGION=$aws_region
fi

echo ""
echo "DELETING API GATEWAY FROM AWS.."
aws cloudformation delete-stack           \
    --stack-name timerservice-apigateway  \
    --profile $aws_profile
echo "Please, wait a moment..."
sleep 30

echo ""
echo "DELETING THE COPILOT APP FROM AWS.."
copilot app delete        \
    --name timerservice   \
    --yes

echo ""
echo "DELETING THE AMPLIFY APP FROM AWS.."
amplify delete
