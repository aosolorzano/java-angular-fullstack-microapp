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

function buildIonicApp() {
  echo ""
  sh ./4_build-ionic-for-production.sh
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
  createFrontend
  createBackend
  createApiGateway
  buildIonicApp
  createFakerData
  echo "DONE!"
}

function deleteAll() {
  deleteBackend
  deleteFrontend
  echo "DONE!"
}

# Main Menu
menu() {
  echo "
  ***********************************
  ************ Main Menu ************
  ***********************************
  1) Create Frontend.
  2) Create Backend.
  3) Create API Gateway.
  4) Build App for Production.
  5) Create DynamoDB Faker Data.
  6) Delete Backend.
  7) Delete Frontend.
  c) CREATE ALL.
  d) DELETE ALL.
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
    buildIonicApp
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
