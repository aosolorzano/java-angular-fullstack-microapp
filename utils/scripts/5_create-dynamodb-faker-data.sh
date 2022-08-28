#!/bin/bash

cd ../java-faker-data-generator || {
  echo "Error moving to the Faker Data Generator 'utils' directory."
  exit 1
}

echo ""
read -r -p 'Please, enter the <AWS profile>: [profile default] ' aws_profile
if [ -z "$aws_profile" ]
then
  aws_profile='default'
  echo "Using default profile: $aws_profile"
fi

read -r -p 'Please, enter the <Number of Data> to generate: [25 max.] ' number_of_data
if [ -z "$number_of_data" ]
then
  number_of_data='25'
  echo "Using default amount of data: $number_of_data"
fi

### Check if the target directory does not exist ###
if [ ! -d "target" ]
then
    echo "Building the Faker Data Generator for the first time..."
    mvn clean package
fi

echo ""
echo "RUNNING FAKER DATA GENERATOR FOR THE TIMER SERVICE APP ON AWS..."
echo ""
java -jar target/java-faker-data-generator.jar $aws_profile $number_of_data
