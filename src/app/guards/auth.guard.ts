// File: src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('adminToken');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
