#!/bin/bash

echo ""
read -r -p 'Please, enter the AWS profile used to provision the resources: [default] ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
fi

echo ""
read -r -p 'Please, enter the Cognito User Pool ID: ' user_pool_id
if [ -z "$user_pool_id" ]
then
  echo 'Not value entered.'
  exit 0;
fi

read -r -p 'Please, enter the Cognito App Client ID: ' app_client_id_web
if [ -z "$app_client_id_web" ]
then
  echo 'Not value entered.'
  exit 0;
fi

read -r -p 'Please, enter the generated Amplify URL for the Timer Service App: ' amplify_app_url
if [ -z "$amplify_app_url" ]
then
  echo 'Not value entered.'
  exit 0;
fi

echo ""
echo "CREATING API GATEWAY ON AWS..."
aws cloudformation create-stack                                         \
  --stack-name timerservice-apigateway                                  \
  --template-body file://../aws/cloudformation/ApiGatewayWithAuth.yml   \
  --parameters                                                          \
    ParameterKey=App,ParameterValue=timerservice                        \
    ParameterKey=Env,ParameterValue=dev                                 \
    ParameterKey=Name,ParameterValue=ApiGateway                         \
    ParameterKey=AppClientID,ParameterValue="$app_client_id_web"        \
    ParameterKey=UserPoolID,ParameterValue="$user_pool_id"              \
    ParameterKey=AmplifyAppUrl,ParameterValue="$amplify_app_url"        \
  --capabilities CAPABILITY_NAMED_IAM                                   \
  --profile $aws_profile
