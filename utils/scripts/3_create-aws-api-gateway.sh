#!/bin/bash

read -r -p 'Please, enter the <AWS profile> used to provision the resources: [default] ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
fi

read -r -p 'Please, enter the <Cognito User Pool> identifier: ' user_pool_id
if [ -z "$user_pool_id" ]
then
  echo 'Not value entered.'
  exit 0;
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
  --capabilities CAPABILITY_NAMED_IAM                                   \
  --profile $aws_profile
