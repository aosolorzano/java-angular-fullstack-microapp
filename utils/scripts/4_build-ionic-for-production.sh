#!/bin/bash

cd ../../frontend/angular-timer-service-ionic || {
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
echo "Paste the provided URL in the 'environment.prod.ts' file located in the 'src/environments/' directory."
echo "Modify the 'timeZone' value with yours."
echo "[Press enter to continue...]"
read -r

echo ""
echo "BUILDING THE APP FOR PRODUCTION READY..."
ionic build --prod

echo ""
echo "If the Ionic Build was successful, please commit the changes in the 'environment.prod.ts' file to your Git repository."
echo "Then, go to the Amplify service on your AWS account and publish this App using the corresponding Git Repository and branch."
echo "This process is manual, and when Amplify deploys the app to Internet, you can access the Timer Service with the generated Amplify URL."
echo "[Press enter to continue...]"
read -r

