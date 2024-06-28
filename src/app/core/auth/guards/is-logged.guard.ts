import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const isLoggedGuard = () => {
  return isPlatformBrowser(inject(PLATFORM_ID)) && inject(AuthService).isLoggedIn();
};
