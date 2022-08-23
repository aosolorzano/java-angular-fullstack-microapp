#!/bin/bash

cd ../aws/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo ""
read -r -p 'Please, enter the AWS profile used to deploy the resources: [default]  ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
  echo "Using default profile: $aws_profile"
else
  export AWS_PROFILE=$aws_profile
  echo "Using profile: <$AWS_PROFILE>"
fi

read -r -p 'Please, enter the AWS Region used to deploy the resources: [us-east-1] ' aws_region
if [ -z "$aws_region" ]
then
  aws_region='us-east-1'
  echo "Using default region: $aws_region"
else
  export AWS_REGION=$aws_region
  echo "Using region: <$AWS_REGION>"
fi

echo ""
read -r -p 'Please, enter the Cognito User Pool ID: ' user_pool_id
if [ -z "$user_pool_id" ]
then
  echo 'Not value entered.'
  exit 0;
else
  sed -i'.bak' -e "s/cognito_user_pool_id/$user_pool_id/g" copilot/tasks/manifest.yml
fi

echo ""
echo "CREATE INITIAL IAM ROLES AND ECR ON AWS..."
copilot init                \
  --app timerservice        \
  --name tasks              \
  --type 'Backend Service'

echo ""
echo "CREATE THE COPILOT ENVIRONMENT ON AWS..."
copilot env init            \
  --app timerservice        \
  --name dev                \
  --profile $aws_profile    \
  --region $aws_region      \
  --default-config

echo ""
echo "CREATE THE COPILOT ENVIRONMENT ON AWS..."
copilot env deploy          \
  --app timerservice        \
  --name dev

echo ""
echo "CREATE THE COPILOT ENVIRONMENT ON AWS..."
copilot deploy          \
  --app timerservice    \
  --name tasks          \
  --env dev             \
  --resource-tags app=timerservice,stage=dev,region=$aws_region,project=timerservice,service=tasks,version=1.1.0


