#!/bin/bash

cd infra/ || {
  echo "Error moving to the 'infra' directory."
  exit 1
}

function crateFrontend() {
  echo ""
  sh ./1_create-frontend.sh
  echo "DONE!"
}

function createBackend() {
  echo ""
  sh ./2_create-backend.sh
  echo "DONE!"
}

function deleteFrontend() {
  echo ""
  sh ./3_delete-frontend.sh
  echo "DONE!"
}

function deleteBackend() {
  echo ""
  sh ./4_delete-backend.sh
  echo "DONE!"
}

function createAll() {
  echo ""
  echo "DONE!"
}

function deleteAll() {
  echo ""
  echo "DONE!"
}

# Main Menu
menu() {
  echo -ne "
  *********************
  ***** Main Menu *****
  *********************
  1) Create the Frontend.
  2) Create the Backend.
  3) Delete the Frontend.
  4) Delete the Backend.
  a) Deploy ALL.
  d) DELETE all.
  q) Quit/Exit.
  "
  read -r -p 'Choose an option: ' option
  case $option in
  1)
    crateFrontend
    clear
    menu
    ;;
  2)
    createBackend
    clear
    menu
    ;;
  3)
    deleteFrontend
    clear
    menu
    ;;
  4)
    deleteBackend
    clear
    menu
    ;;
  a)
    createAll
    clear
    menu
    ;;
  d)
    deleteAll
    clear
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
