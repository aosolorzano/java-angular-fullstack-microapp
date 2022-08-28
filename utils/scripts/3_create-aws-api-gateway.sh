#!/bin/bash

echo ""
read -r -p 'Please, enter the <AWS profile> to deploy the API on AWS: [profile default] ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
fi

read -r -p 'Please, enter the <Cognito User Pool ID>: ' user_pool_id
if [ -z "$user_pool_id" ]
then
  echo 'Not value entered.'
  exit 0;
fi

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
