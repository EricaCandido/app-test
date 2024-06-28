import {
  mergeApplicationConfig,
  ApplicationConfig,
  APP_INITIALIZER,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import * as dotenv from 'dotenv';
import { ConfigService } from './core/config';

dotenv.config();

const preServerConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.init(),
      deps: [ConfigService],
      multi: true,
    },
  ],
};

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(
  preServerConfig,
  appConfig,
  serverConfig
);
