## What is it?
This project uses the Quarkus Framework to generate CRUD operations over Tasks records stored on AWS DynamoDB.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/.

## Requirements
1. An AWS account.
2. [Git](https://git-scm.com/downloads).
3. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
4. [Amplify CLI](https://docs.amplify.aws/cli/start/install).
5. [AWS Copilot CLI](https://aws.github.io/copilot-cli/).
6. [GraalVM](https://www.graalvm.org/downloads/) with OpenJDK 17. You can use [SDKMAN](https://sdkman.io/install).
7. [Maven](https://maven.apache.org/download.cgi).
8. [Docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://github.com/docker/compose).

## Local Environment configuration
### Running a Postgres instance locally
You need to make sure that you have a Postgres instance running locally. To set up a Postgres database with Docker, execute the following command in a different terminal tab:
```
docker-compose up postgres
```
### Configure the IP address of your local Docker service
You need to know th IP of your Docker service. In the case that you are using Minikube (like me), you can get your internal docker IP with the following command:
```
minikube ip
```
With this IP, you can override the key value located inside the `TIMER_SERVICE_DB_CLUSTER_SECRET` env variable in the docker-compose file.

### Creating a container image of the Timer service
You can create a native container image as follows:
```
docker build -t aosolorzano/java-timer-service-quarkus:1.1.0-SNAPSHOT .
```
> **_IMPORTANT:_**  Before execute the Timer Service container, export your AWS credential to pass them to the "docker run" command:
```
docker-compose up --scale tasks=2 --scale nginx=1
```
This starts 2 instances of the Timer Service application alongside 1 instance of the Nginx load balancer.

### Timer Service interaction
With your Docker service IP, you can use the Postman tool to send HTTP requests to your Timer Service application.

## Deploying ALL resources to AWS
Execute the following script located at project's root folder:
```
./run-scripts
```
This script will show you an option's menu where you can select the steps to deploy the Timer Service on AWS.

## Related Guides
- Amazon DynamoDB ([guide](https://quarkiverse.github.io/quarkiverse-docs/quarkus-amazon-services/dev/amazon-dynamodb.html)): Connect to Amazon DynamoDB datastore.
- Quartz ([guide](https://quarkus.io/guides/quartz)): Schedule clustered tasks with Quartz.

## RESTEasy Reactive
Easily start your Reactive RESTful Web Services
[Related guide section.](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)

## Some Quarkus Important Commands
### Live coding with Quarkus
The Maven Quarkus plugin provides a development mode that supports
live coding. To try this out:
```
mvn clean compile quarkus:dev
```
In this mode you can make changes to the code and have the changes immediately applied, by just refreshing your browser.

### Running the application in dev mode
You can run your application in dev mode that enables live coding using:
```
mvn clean compile quarkus:dev
```
> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

### Packaging and running the application
The application can be packaged using:
```
mvn clean package
```
It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:
```
mvn package -Dquarkus.package.type=uber-jar
```
The application, packaged as an _über-jar_, is now runnable using `java -jar target/*-runner.jar`.

### Creating a native executable
You can create a native executable using:
```
mvn package -Pnative
```
Or, if you don't have GraalVM installed, you can run the native executable build in a container using:
```
mvn package -Pnative -Dquarkus.native.container-build=true
```
You can then execute your native executable with:
```
./target/java-timer-service-quarkus-1.1.0-SNAPSHOT-runner
```
If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.
