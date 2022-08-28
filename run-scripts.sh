#!/bin/bash

cd utils/scripts/ || {
  echo "Error moving to the 'utils/scripts' directory."
  exit 1
}

function createFrontend() {
  echo ""
  sh ./1_create-amplify-frontend.sh
  echo "DONE!"
}

function createBackend() {
  echo ""
  sh ./2_create-copilot-backend.sh
  echo "DONE!"
}

function createApiGateway() {
  echo ""
  sh ./3_create-aws-api-gateway.sh
  echo "DONE!"
}

function updateIonicApp() {
  echo ""
  sh ./4_update-ionic-app.sh
  echo "DONE!"
}

function createFakerData() {
  echo ""
  sh ./5_create-dynamodb-faker-data.sh
  echo "DONE!"
}

function deleteBackend() {
  echo ""
  sh ./6_delete-backend.sh
  echo "DONE!"
}

function deleteFrontend() {
  echo ""
  sh ./7_delete-frontend.sh
  echo "DONE!"
}

function createAll() {
  echo ""
  sh ./8_create-all.sh
  echo "DONE!"
}

function deleteAll() {
  echo ""
  sh ./9_delete-all.sh
  echo "DONE!"
}

# Main Menu
menu() {
  clear
  echo "
  ***********************************
  ************ Main Menu ************
  ***********************************
  1) Create Frontend.
  2) Create Backend.
  3) Create API Gateway.
  4) Update Ionic/Angular API Client.
  5) Create DynamoDB Faker Data.
  6) Delete Backend.
  7) Delete Frontend.
  c) CREATE all.
  d) DELETE all.
  q) Quit/Exit.
  "
  read -r -p 'Choose an option: ' option
  case $option in
  1)
    createFrontend
    menu
    ;;
  2)
    createBackend
    menu
    ;;
  3)
    createApiGateway
    menu
    ;;
  4)
    updateIonicApp
    menu
    ;;
  5)
    createFakerData
    menu
    ;;
  6)
    deleteBackend
    menu
    ;;
  7)
    deleteFrontend
    menu
    ;;
  c)
    createAll
    menu
    ;;
  d)
    deleteAll
    menu
    ;;
  q)
    clear
    exit 0
    ;;
  *)
    echo -e 'Wrong option.'
    clear
    menu
    ;;
  esac
}

# Call the menu function
menu
