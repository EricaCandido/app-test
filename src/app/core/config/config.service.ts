import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, TransferState, inject } from '@angular/core';
import { envStateKey } from './config.const';

declare let process: {
  env: Record<string, string>;
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private platformId = inject(PLATFORM_ID);
  private readonly transferState = inject(TransferState);

  init() {
    // Execute initialization only on server side
    if (isPlatformBrowser(this.platformId)) {
      return;
    }

    console.info('Initializing ConfigService...');
    this.set();
    console.info('ConfigService initialized successfully');
  }

  get() {
    return this.transferState.get<any>(envStateKey, {});
  }

  set() {
    // Server side only
    // N.B.: remember to add the env variables that are used inside .env.example.
    // This env file is the only one that will be pushed to the git repository.
    // The local .env file will exist locally.
    // It's a good practice to define a default variable that will be used if no env variable is found.
    this.transferState.set<any>(envStateKey, {
      keycloak: {
        url:
          process.env['KEYCLOAK__URL'] ||
          'https://notartelkc-notartelkc.apps.cluster.openshift-tst.local', //<----------- modificare
        realm: process.env['KEYCLOAK__REALM'] || 'notartelRealm',
        clientId: process.env['KEYCLOAK__CLIENT_ID'] || 'test-client',
      },
      apiUrl: process.env['API_URL'] || 'http://localhost:8080',
    });
  }
}
