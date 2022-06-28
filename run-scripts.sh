#!/bin/bash

cd infra/ || {
  echo "Error moving to the 'infra' directory."
  exit 1
}

function createBackend() {
  echo ""
  sh ./1_create-backend.sh
  echo "DONE!"
}

function crateFrontend() {
  echo ""
  sh ./2_1-create-frontend.sh
  sh ./2_2-update-api-with-authorizer.sh
  sh ./2_3-build-frontend-app.sh
  echo "DONE!"
}

function createFakerData() {
  echo ""
  sh ./3_create-faker-data.sh
  echo "DONE!"
}

function deleteFrontend() {
  echo ""
  sh ./4_delete-frontend.sh
  echo "DONE!"
}

function deleteBackend() {
  echo ""
  sh ./5_delete-backend.sh
  echo "DONE!"
}

function createAll() {
  createBackend
  crateFrontend
  echo "DONE!"
}

function deleteAll() {
  deleteFrontend
  deleteBackend
  echo "DONE!"
}

# Main Menu
menu() {
  echo -ne "
  *************************
  ******* Main Menu *******
  *************************
  1) Create the Backend.
  2) Create the Frontend.
  3) Create Faker Data.
  4) Delete the Frontend.
  5) Delete the Backend.
  c) CREATE ALL.
  d) DELETE ALL.
  q) Quit/Exit.
  "
  read -r -p 'Choose an option: ' option
  case $option in
  1)
    createBackend
    menu
    ;;
  2)
    crateFrontend
    menu
    ;;
  3)
    createFakerData
    menu
    ;;
  4)
      deleteFrontend
      menu
      ;;
  5)
    deleteBackend
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
    exit 0 ;;
  *)
    echo -e 'Wrong option.'
    clear
    menu
    ;;
  esac
}

# Call the menu function
menu
