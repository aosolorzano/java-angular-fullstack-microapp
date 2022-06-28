#!/bin/bash

cd ../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo ""
echo "The following commands will ask you for AppClientIDWeb and UserPoolID values from AWS."
echo "Please go to CloudFormation Console, and select the stack created by Amplify for the Auth Service. In the OUTPUTS tab, you will find the AppClientIDWeb and UserPoolID values."
echo "[Press enter to continue...]"
read -r

read -r -p 'Enter the User Pool App Client ID: ' app_client_id_web
if [ -z "$app_client_id_web" ]
then
  echo 'Not value entered.'
  exit 0;
fi

read -r -p 'Enter the User Pool ID: ' user_pool_id
if [ -z "$user_pool_id" ]
then
  echo 'Not value entered.'
  exit 0;
fi

aws cloudformation update-stack                                     \
  --stack-name timerservice-apigateway                              \
  --template-body file://cloudformation/1_ApiGatewayAuthorizer.yml  \
  --parameters                                                      \
    ParameterKey=App,ParameterValue=timerservice                    \
    ParameterKey=Env,ParameterValue=dev                             \
    ParameterKey=Name,ParameterValue=ApiGateway                     \
    ParameterKey=AppClientID,ParameterValue="$app_client_id_web"        \
    ParameterKey=UserPoolID,ParameterValue="$user_pool_id"          \
  --capabilities CAPABILITY_NAMED_IAM
