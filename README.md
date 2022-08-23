# Timer Service: A Quartz microservice that run Cron Jobs on AWS Fargate ECS.
- **Author**: Andres Solorzano.
- **Level**: Advanced.
- **Technologies**: Ionic, Angular, Amplify, Quarkus, Java, AWS Copilot and CloudFormation.

## Description
This project uses the Quarkus Framework to perform CRUD operations over Tasks records stored on an AWS DynamoDB table.
This Tasks also realises CRUD operations against Quartz Cron Jobs stored on AWS Aurora Postgres DB to maintain state among Jobs in a clustered environmend.

The following image shows the overall architecture of the application on AWS.
![](utils/images/aws-solution-architecture.png)

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

## BACKEND
## Deploying Timer Service Locally using Docker Compose
Build the Timer Service container image:
```
docker-compose -f utils/docker/docker-compose.yml build 
```
Deploy the local cluster of containers using Docker Compose:
```
docker-compose -f utils/docker/docker-compose.yml up
```

## Deploying Timer Service Locally using Docker
Create a native Linux executable using Maven in the Java project folder:
```
mvn clean package -Pnative -DskipTests
```
Then, create a native container image:
```
docker build -f docker/Dockerfile.native -t aosolorzano/java-timer-service-quarkus:1.1.0 .
```
Finally, deploy a local cluster using Docker Compose:
```
docker run -p 8080:8080 --name timer-service-quarkus aosolorzano/java-timer-service-quarkus:1.1.0
```

## Deploying local changes
If you want to deploy your local changes after the initial setup, you can use the following command:
```
docker-compose -f utils/docker/docker-compose.yml up --build
```

### Timer Service interaction
With your Docker service IP address, you can use the Postman tool to send HTTP requests to your Timer Service application.

## Deploying Timer Service to AWS
Execute the following script located at project's root folder:
```
run-scripts.sh
```
This script will show you an option's menu where you can select various steps to deploy the Timer Service on AWS.

## Quarkus Important Commands
### Running the application in dev mode
You can run your application in dev mode that enables live coding using:
```
mvn clean compile quarkus:dev
```
> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

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
./target/java-timer-service-quarkus-1.1.0-runner
```
If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.

### Other Copilot ECS important commands
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
copilot svc logs --follow
```
Show service status.
```
copilot svc status
```
To delete and clean up all resources.
```
copilot app delete
```

## FRONTEND
### Deploying Timer Service Locally
First, you must configure Amplify into the Ionic project:
```
amplify init
```
Then, you must configure the authentication provider with the following command:
```
amplify add auth
```
The following image shows you some configuration properties that I used to configure Cognito:
![](utils/images/amplify-auth-cognito-options.png)

Then, install Amplify dependencies:
```
npm install aws-amplify @aws-amplify/ui-angular
```
Add the following line at the end of the “src/global.scss“ file:
```
@import '~@aws-amplify/ui-angular/theme.css';
```
When working with underlying aws-js-sdk, the "node" package should be included in the types' compiler option. 
Update the “tsconfig.app.json” file:
```
"compilerOptions": {
    "types" : ["node"]
}
```
If you are using Angular 6 or above, you may need to add the following to the top of the “src/polyfills.ts” file:
```
(window as any).global = window;

(window as any).process = {
  env: { DEBUG: undefined },
};
```
In the “package.json” file, update the “build“ directive to let Amplify build the project in production mode:
```
"build": "ng run app:build:production",
```

### Updating Angular dependencies
Verify the angular versions that can be updated inside the project:
```
ng update
```
Try to update the corresponding packages showed in the last command output. For example:
```
ng update @angular/cli @angular/core --allow-dirty --force
```
And those Angular dependencies will be updated.

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
ionic g page shared/pages/login --spec=false
```
If you want to only visualize the files that will be created, add the dry-run directive:
```
ionic g page shared/pages/login --spec=false --dry-run
```
To create a new angular **service** without the test file, you can execute the following:
```
ionic g service shared/services/storage --skipTests
```

### Ionic Storage
You need to install the storage component:
```
npm install @ionic/storage-angular
```
Then, edit your NgModule declaration in src/app/app.module.ts or in the module for the component you'll use the storage library in, and add IonicStorageModule as an import:
```
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicStorageModule.forRoot({
     name: 'TimerServiceDB',
     driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
  ]
})
export class AppModule { }
```

### Animate CSS
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

## Related Guides
- Amazon DynamoDB ([guide](https://quarkiverse.github.io/quarkiverse-docs/quarkus-amazon-services/dev/amazon-dynamodb.html)): Connect to Amazon DynamoDB datastore.
- Quartz ([guide](https://quarkus.io/guides/quartz)): Schedule clustered tasks with Quartz.

## RESTEasy Reactive
Easily start your Reactive RESTful Web Services
[Related guide section.](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)
