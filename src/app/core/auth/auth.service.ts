import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ConfigService } from '../config';
import { KeycloakLoginOptions, KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private configService = inject(ConfigService);
  private keycloakService = inject(KeycloakService);

  public user: KeycloakProfile | undefined;
  public roles: string[] | undefined;

  async init() {
    // Execute initialization only on client side
    if (isPlatformServer(this.platformId)) {
      return;
    }

    console.info('Initializing AuthService...');

    const config = this.configService.get();

    await this.keycloakService.init({
      config: {
        url: config.keycloak.url,
        realm: config.keycloak.realm,
        clientId: config.keycloak.clientId
      },
      initOptions: {
        onLoad: 'login-required',
        flow: 'standard'
      }
    });

    if (this.keycloakService.isLoggedIn()) {
      this.user = await this.loadUser();
      this.roles = this.getUserRoles();
    }

    console.info('AuthService initialized successfully');
  }

  getToken() {
    return this.keycloakService.getToken();
  }

  isLoggedIn() {
    return this.keycloakService.isLoggedIn();
  }

  login(options?: KeycloakLoginOptions | undefined): Promise<void> {
    return this.keycloakService.login(options);
  }

  logout(redirectUri?: string | undefined): Promise<void> {
    return this.keycloakService.logout(redirectUri);
  }

  isUserInRole(role: string, resource?: string): boolean {
    return this.keycloakService.isUserInRole(role, resource);
  }

  getUserRoles(realmRoles?: boolean, resource?: string): string[] {
    return this.keycloakService.getUserRoles(realmRoles, resource);
  }

  async loadUser(forceReload?: boolean) {
    return await this.keycloakService.loadUserProfile(forceReload);
  }
}
