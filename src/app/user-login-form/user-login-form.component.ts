import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginRequest } from '../types';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData: UserLoginRequest = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserLoginFormComponent>
  ) { }

  ngOnInit(): void { }

  /**
   * This is the function responsible for sending the form inputs to the backend
   */

  loginUser(): void {
    console.log('Logging in with user data:', this.userData);
    this.fetchApiData.loginUser(this.userData).subscribe(
      (response) => {
        console.log('Login response:', response);
        localStorage.setItem('username', response.user.Username);
        localStorage.setItem('favs', response.user.FavoriteMovies.join(','));
        localStorage.setItem('token', response.token);
        this.router.navigate(['movies']);

        this.snackBar.open('User login successful!', 'OK', {
          duration: 2000,
        });
        this.dialogRef.close();
      },

      (error) => {
        console.error('Login Error:', error);
        this.snackBar.open(
          'User login failed. Please check login credentials.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
