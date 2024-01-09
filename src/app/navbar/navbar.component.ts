import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User Logged Out', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['/welcome']);
  }
  /* navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
  navigateToAllMovies(): void {
    this.router.navigate(['/movies']);
  } */
}
