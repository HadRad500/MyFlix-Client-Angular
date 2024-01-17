import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, Movie } from '../types';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})

export class ProfileViewComponent implements OnInit {
  user: User = {
    _id: '',
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  };
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  favoriteMovies: Movie[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * @returns user stored at local storage
   */

  getUser(): void {
    const username = localStorage.getItem('username')

    if (!username) {
      return
    }

    this.fetchApiData.getUsers(username).subscribe((user: User) => {
      this.user = {
        ...user,
        Birthday: formatDate(user.Birthday, 'mm-dd-yyyy', 'en-US'),
      };
      this.userData = {
        Username: user.Username,
        Password: '',
        Email: user.Email,
        Birthday: formatDate(user.Birthday, 'mm-dd-yyyy', 'en-US'),
      };
      this.favoriteMovies = user.FavoriteMovies;
      localStorage.setItem('favs', user.FavoriteMovies.join(','));

    });
  }

  /**
   * updates user info
   */

  editUser(): void {
    const birthdayEpoch = Date.parse(this.userData.Birthday);
    const editedUser = {
      Username: this.userData.Username || this.user.Username,
      Password: this.userData.Password,
      Email: this.userData.Email || this.user.Email,
      Birthday: birthdayEpoch || this.user.Birthday,
    };

    this.fetchApiData.updateUser(editedUser).subscribe((response) => {
      this.getUser();
      this.snackBar.open('User has been updated!', 'OK', {
        duration: 2000,
      });
    });
  }

  isFavorite(movieID: string): boolean {
    return !!this.favoriteMovies.find((movie) => movie._id === movieID);
  }

  /**
   * removes a movie from the list of favorite movies
   * @param favoriteMovies
   */

  deleteFromFavorites(movieID: string): void {
    this.fetchApiData.removeFavoriteMovie(movieID).subscribe({
      complete: () => {
        this.getUser()
        // this.fetchApiData.getUser().subscribe((user: User) => {
        //   this.user = user;
        //   this.favoriteMovies = user.FavoriteMovies;
        this.snackBar.open('Movie has been deleted from favorites', 'OK', {
          duration: 2000,
        });
        // });
      },
      error: () => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000,
        });
      },
    });
  }
  deleteAccount(): void {

    this.fetchApiData.deleteUser().subscribe({
      error: (error) => {
        console.error('Account deletion error:', error);
        this.snackBar.open(
          'Failed to delete account. Please try again.', 'OK', {
          duration: 2000,
        }
        );
      },
      complete: () => {
        this.snackBar.open('Account deleted successfully.', 'OK', {
          duration: 2000,
        });

        localStorage.clear();
        this.router.navigate(['/welcome']);
      },
    });
  }
}
