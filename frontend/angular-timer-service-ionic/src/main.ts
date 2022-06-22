import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Amplify} from '@aws-amplify/core';
import {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

if (environment.production) {
  enableProdMode();
  Amplify.Logger.LOG_LEVEL = 'INFO';
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
