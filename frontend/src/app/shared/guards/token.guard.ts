import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const tokenGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const token = storageService.get('token');




  if (!token) {
    router.navigate(['/login']);
    return false;
  }
    
  console.log(token)
  return true;

};
