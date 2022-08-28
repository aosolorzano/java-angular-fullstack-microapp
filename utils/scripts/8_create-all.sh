#!/bin/bash

cd ../aws/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo ""
read -r -p 'Please, enter the <AWS profile> used to deploy the resources: [profile default]  ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
  echo "Using default profile: $aws_profile"
fi
export AWS_PROFILE=$aws_profile

read -r -p 'Please, enter the <AWS Region> used to deploy the resources: [us-east-1] ' aws_region
if [ -z "$aws_region" ]
then
  aws_region='us-east-1'
  echo "Using default region: $aws_region"
fi
export AWS_REGION=$aws_region

echo ""
echo "INSTALLING NODEJS DEPENDENCIES..."
npm install

echo ""
echo "INIT AMPLIFY ON AWS..."
amplify init

echo ""
echo "ADDING AMPLIFY AUTHENTICATION SERVICE TO THE PROJECT..."
amplify add auth

echo ""
echo "DEPLOYING THE AMPLIFY AUTH TO AWS..."
amplify push

echo ""
read -r -p 'Please, enter the generated <Cognito User Pool ID>: ' user_pool_id
if [ -z "$user_pool_id" ]
then
  echo 'Not value entered.'
  exit 0;
fi

# APPLYING THE INPUTS TO THE COPILOT MANIFEST FILE
sed -i '' -e "s/aws_region/$aws_region/g; s/cognito_user_pool_id/$user_pool_id/g" copilot/tasks/manifest.yml

echo ""
echo "COPILOT STACK INIT ON AWS..."
copilot init                \
  --app timerservice        \
  --name tasks              \
  --type 'Backend Service'

echo ""
echo "COPILOT ENVIRONMENT INIT ON AWS..."
copilot env init            \
  --app timerservice        \
  --name dev                \
  --profile $aws_profile    \
  --region $aws_region      \
  --default-config

echo ""
echo "COPILOT ENVIRONMENT DEPLOYMENT ON AWS..."
copilot env deploy          \
  --app timerservice        \
  --name dev

echo ""
echo "COPILOT ECS DEPLOYMENT ON AWS..."
copilot deploy          \
  --app timerservice    \
  --name tasks          \
  --env dev             \
  --resource-tags app=timerservice,stage=dev,region=$aws_region,project=timerservice,service=tasks,version=1.1.0

echo ""
read -r -p 'Please, enter the <Cognito App Client ID Web>: ' app_client_id_web
if [ -z "$app_client_id_web" ]
then
  echo 'Not value entered.'
  exit 0;
fi

read -r -p 'Please, enter the <Amplify ID> for the Timer Service App: ' amplify_app_id
if [ -z "$amplify_app_id" ]
then
  echo 'Not value entered.'
  exit 0;
fi

read -r -p 'Please, enter the <Git Branch> used in Amplify for Hosting the App: [master] ' app_branch_name
if [ -z "$app_branch_name" ]
then
  app_branch_name='master'
fi
amplify_app_host_id=$app_branch_name.$amplify_app_id
sed -i '' -e "s/amplify_app_host_id/$amplify_app_host_id/g" ../aws/cloudformation/2_ApiGatewayWithAuth.yml

echo ""
echo "CREATING API GATEWAY ON AWS..."
aws cloudformation create-stack                                         \
  --stack-name timerservice-apigateway                                  \
  --template-body file://../aws/cloudformation/2_ApiGatewayWithAuth.yml   \
  --parameters                                                          \
    ParameterKey=AppClientID,ParameterValue="$app_client_id_web"        \
    ParameterKey=UserPoolID,ParameterValue="$user_pool_id"              \
  --capabilities CAPABILITY_NAMED_IAM                                   \
  --profile $aws_profile
