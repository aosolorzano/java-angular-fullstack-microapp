#!/bin/bash

cd ../frontend/angular-timer-service-ionic || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo ""
echo "The following command shows you the API Gateway Endpoint on AWS."
echo "Please, copy the URL and then follow the next instructions."
echo "[Press enter to continue...]"
read -r
aws cloudformation describe-stacks --stack-name timerservice-apigateway --query "Stacks[0].Outputs[1].OutputValue" | tr -d '"'

echo ""
echo "Paste the provided URL in the 'environment.ts' file located in the 'src/environments/' directory."
echo "Also, modify the 'timeZone' value with yours."
echo "[Press enter to continue...]"
read -r

echo "COMPILING AND DEPLOYING THE APP LOCALLY..."
ionic build
ionic serve

