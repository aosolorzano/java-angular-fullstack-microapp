#!/bin/bash

cd ../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo "INSTALLING NODE DEPENDENCIES..."
npm install

echo ""
echo "The following command shows you the API Gateway Endpoint."
echo "Please, copy it and then paste it in the next step."
echo "[Press enter to continue...]"
read -r
aws cloudformation describe-stacks --stack-name timerservice-apigateway --query "Stacks[0].Outputs[1].OutputValue" | tr -d '"'

read -r -p 'Enter API Gateway endpoint: ' apigateway_endpoint
if [ -z "$apigateway_endpoint" ]
then
  echo 'Not API Gateway endpoint entered to register into the Angular/Ionic app.'
else
  sed -i'.bak' -e "s/apigateway_endpoint/$apigateway_endpoint/g" ../frontend/angular-timer-service-ionic/src/environments/environment.prod.ts
fi

echo "BUILDING ANGULAR/IONIC PROJECT..."
ionic build --prod

