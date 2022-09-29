# Timer Service: A Quartz microservice that run Cron Jobs on AWS Fargate ECS.
- **Author**: [Andres Solorzano](https://www.linkedin.com/in/aosolorzano/).
- **Level**: Advanced.
- **Technologies**: Ionic, Angular, NgRx, Java, GraalVM, Quarkus, Quartz, Docker, Amazon Cognito, AuroraDB (PostgreSQL), Amplify, DynamoDB, API Gateway, ECS, Bash Scripting and CloudFormation.

## Description
This project uses the Quarkus Framework to perform CRUD operations over Tasks records stored on an AWS DynamoDB table.
This Tasks also realises CRUD operations against Quartz Cron Jobs stored on AWS Aurora Postgres DB to maintain state among Jobs in a clustered environmend.

The following image shows the overall architecture of the application on AWS.
![](utils/docs/images/aws-solution-architecture-v2.png)

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/.

### Project details on Medium.com
You can follow the last details of the Timer Service FullStack application on my [Medium blog](https://aosolorzano.medium.com/using-angular-ngrx-for-a-reactive-programming-cef032ad1e7d).

## Requirements
1. An AWS account.
2. [Git](https://git-scm.com/downloads).
3. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
4. [Amplify CLI](https://docs.amplify.aws/cli/start/install).
5. [AWS Copilot CLI](https://aws.github.io/copilot-cli/).
6. [GraalVM](https://www.graalvm.org/downloads/) with OpenJDK 17. You can use [SDKMAN](https://sdkman.io/install).
7. [Maven](https://maven.apache.org/download.cgi).
8. [Docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://github.com/docker/compose).

## Deploying to AWS
Execute the following script located at project's root folder:
```
run-scripts.sh
```
This script will show you an option's menu where you can select various steps to deploy the Timer Service on AWS.

## BACKEND
### Running the Timer Service Locally
Build the Timer Service container image:
```
docker-compose -f utils/docker/docker-compose.yml build
```
Deploy the local cluster of containers using Docker Compose:
```
docker-compose -f utils/docker/docker-compose.yml up
```

### Getting local DynamoDB Task's data
Execute the following command in a new terminal window:
```
aws dynamodb scan --table-name Tasks --endpoint-url http://localhost:8000
```

### Publishing Timer Service changes Locally
If you want to deploy your local changes after the initial setup, you can use the following command:
```
docker-compose -f utils/docker/docker-compose.yml up --build
```
To restart a container, open a new terminal window and execute the following command at the project's root folder:
```
docker-compose -f utils/docker/docker-compose.yml restart nginx
```

### Publishing Timer Service changes to AWS
Navigate to 'utils/aws' folder and then execute the following command:
```
copilot deploy --app timerservice --env dev --name tasks
```

### Running Timer Service using Docker
First you need to build the Timer Service container image:
```
docker build -f Dockerfile.multistage-arm64 -t aosolorzano/java-timer-service-quarkus:1.2.0-arm64 .
```
Then, you can run the Timer Service container in standalone mode:
```
docker run -p 8080:8080 -d aosolorzano/java-timer-service-quarkus:1.2.0-arm64 --env-file ../../utils/docker/dev.env
```

## FRONTEND
### Deploying required AWS services
First, you must configure Amplify into the Ionic project:
```
amplify init
```
Then, you must configure the authentication provider with the following command:
```
amplify add auth
```
The following image shows you some configuration properties that I used to configure Cognito:
![](utils/docs/images/amplify-auth-cognito-options.png)

Then, install Amplify dependencies:
```
npm install aws-amplify @aws-amplify/ui-angular
```
### Deploying the Ionic application
To deploy the Ionic application, you must execute the following command:
```
ionic build
ionic serve
```

## General Configuration
### Updating Angular dependencies
Verify the angular versions that can be updated inside the project:
```
ng update
```
Try to edit the corresponding packages showed in the last command output. For example:
```
ng update @angular/cli @angular/core --allow-dirty --force
```
And those Angular dependencies will be updated.

### Adding Angular Reactive (NgRx) dependencies
For NgRx, we need to install the following dependencies:
```
ng add @ngrx/data
ng add @ngrx/store
ng add @ngrx/effects
ng add @ngrx/router-store
ng add @ngrx/store-devtools
```
These commands edit the "app.module.ts" file with the required imports and initial configurations. See the blog article fo more details.

### Other Ionic important commands
To create a new ionic project using a blank template;
```
ionic start <project-name> blank --type=angular
```
To create a new angular **module** with a routing file;
```
ionic g module shared/components --routing
```
To create a new **component** (not include a module and routing file):
```
ionic g component shared/components/header --spec=false
```
To create a new **page** component without the spec file:
```
ionic g page shared/pages/home --spec=false
```
If you want to only visualize the files that will be created, add the dry-run directive:
```
ionic g page shared/pages/home --spec=false --dry-run
```
To create a new angular **service** without the test file, you can execute the following:
```
ionic g service shared/services/storage --skipTests
```

### Adding the Animate CSS
[Animate.css](https://animate.style/) is a library of ready-to-use, cross-browser animations for use in your web projects.
```
npm install animate.css --save
```
Modify the "global.scss" file to add the following code:
```
@import "~animate.css/animate.min.css";
```

### Ionic DateTime
For this component, we must install the "date-fns" and "date-fn-tz" dependency for datetime validation and manipulation:
```
npm install date-fns --save
npm install date-fns-tz --save
```

### Running Quarkus application in dev mode
You can run your application in dev mode that enables live coding using:
```
mvn clean compile quarkus:dev
```
> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

### Creating Quarkus native executable
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
./target/java-timer-service-quarkus-1.2.0-runner
```
If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.

### Other Copilot ECS Important Commands
List all of your AWS Copilot applications.
```
copilot app ls
```
Show information about the environments and services in your application.
```
copilot app show
```
Show information about your environments.
```
copilot env ls
```
Show information about the service, including endpoints, capacity and related resources.
```
copilot svc show
```
List of all the services in an application.
```
copilot svc ls
```
Show logs of a deployed service.
```
copilot svc logs --app timerservice --name tasks --env dev --since 1h --follow
```
Show service status.
```
copilot svc status
```
To delete and clean up all created resources.
```
copilot app delete --name timerservice --yes
```

## Related Quarkus Guides
- Amazon DynamoDB ([guide](https://quarkiverse.github.io/quarkiverse-docs/quarkus-amazon-services/dev/amazon-dynamodb.html)): Connect to Amazon DynamoDB datastore.
- Quartz ([guide](https://quarkus.io/guides/quartz)): Schedule clustered tasks with Quartz.

### RESTEasy Reactive
Easily start your Reactive RESTful Web Services
[Related guide section.](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)
