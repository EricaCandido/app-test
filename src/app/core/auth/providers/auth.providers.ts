import { KeycloakService } from 'keycloak-angular';

export function provideAuth() {
  return [KeycloakService];
}
