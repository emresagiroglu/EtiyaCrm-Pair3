import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetUserByEmailResponse } from '../../models/auth/getUserByEmailResponse';
import { AuthService } from '../../services/auth-service/auth.service';
import { StorageService } from '../../services/storage-service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  user !: GetUserByEmailResponse | null;

  constructor(
    private authService: AuthService, 
    private change: ChangeDetectorRef, 
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      console.log(user)
      this.change.markForCheck();
    });
  }

  logout(){
    this.storageService.clear();
    //this.router.navigate(['/login']);
    window.location.href = '/login';
  }





}
