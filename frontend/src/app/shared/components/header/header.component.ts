import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetUserByEmailResponse } from '../../models/auth/getUserByEmailResponse';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  user !: GetUserByEmailResponse | null;

  constructor(private authService: AuthService, private change: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      console.log(user)
      this.change.markForCheck();
    });
  }





}
