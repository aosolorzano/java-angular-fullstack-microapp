#!/bin/bash

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

read -r -p 'Please, enter the <Cognito User Pool Client Web> identifier: ' app_client_id_web
if [ -z "$app_client_id_web" ]
then
  echo 'Not value entered.'
  exit 0;
fi

read -r -p 'Please, enter the <Amplify ID> for the generated Timer Service App URL: ' amplify_app_id
if [ -z "$amplify_app_id" ]
then
  echo 'Not value entered.'
  exit 0;
else
  sed -i'.bak' -e "s/timer-service-amplify-id/$amplify_app_id/g" ../aws/cloudformation/ApiGatewayWithAuth.yml
  sed -i'.bak' -e "s/timer-service-amplify-id/$amplify_app_id/g" ../../frontend/angular-timer-service-ionic/src/environments/environment.prod.ts
fi
