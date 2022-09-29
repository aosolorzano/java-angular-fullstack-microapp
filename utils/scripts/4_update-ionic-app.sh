#!/bin/bash

cd ../../frontend/angular-timer-service-ionic/ || {
  echo "Error moving to the Timer Service 'frontend' directory."
  exit 1
}

echo ""
read -r -p 'Please, enter the <AWS profile> account where the API Gateway is deployed: [profile default] ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
  echo "Using default profile: $aws_profile"
fi

read -r -p 'Please, enter the <AWS Region> where the API Gateway is deployed: [us-east-1] ' aws_region
if [ -z "$aws_region" ]
then
  aws_region='us-east-1'
  echo "Using default region: $aws_region"
fi

echo ""
echo "Updating the Ionic/Angular app to use the generated API Gateway URL..."
timer_service_api_id=$(aws cloudformation describe-stacks            \
  --stack-name timerservice-apigateway        \
  --query "Stacks[0].Outputs[0].OutputValue"  \
  --output text                               \
  --profile $aws_profile | tr -d '"')

# REPLACING the API Gateway URL in the environment.aws.ts file
sed -i '' -e "s/timer_service_api_id/$timer_service_api_id/g; s/timer_service_api_region/$aws_region/g" \
  ../../frontend/angular-timer-service-ionic/src/environments/environment.aws.ts
echo "DONE!"

echo ""
echo "Building the Frontend App with the new changes..."
npm run-script build-dev

echo ""
echo "IMPORTANT!!: Please, commit and push to your Git repository the changes realised in the 'environment.dev.ts' file."
