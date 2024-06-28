import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private authService = inject(AuthService);

  async init() {
    try {
      await this.authService.init();
    } catch (e) {
      console.error(e);
      this.router.navigate(['/500'], { skipLocationChange: true });
    } finally {
      if (isPlatformBrowser(this.platformId)) {
        this.document.querySelector('#loader')?.remove();
      }
    }
  }
}
