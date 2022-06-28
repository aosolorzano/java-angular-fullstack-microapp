#!/bin/bash

cd ../backend/java-faker-data-generator || {
  echo "Error moving to the Faker Data Generator 'backend' directory."
  exit 1
}

### Check if the target directory does not exist ###
if [ ! -d "target" ]
then
    echo "Building the Faker Data Generator for the first time..."
    mvn clean package
fi

echo ""
echo "FAKER DATA GENERATOR FOR TASK TABLE ON DYNAMODB..."
echo ""
java -jar target/java-faker-data-generator.jar
