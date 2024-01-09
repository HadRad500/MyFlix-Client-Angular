import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Genre',
        name: genre.Name,
        description: genre.Description,
      },
    });
  }

  openDirectorDialog(director: any): void {
    console.log(JSON.stringify(director));
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Director',
        name: director.Name,
        bio: director.Bio,
        birthyear: director.Birth,
      },
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Synopsis',
        description: movie.Description,
      },
    });
  }


  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      console.log('FavoriteMoviesAdded Called');

      this.snackbar.open('Added to Favorites', 'OK', { duration: 2000 });
      console.log('FavoriteMovesAdded called');
    });
  }

  removeFavoriteMovie(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe(() => {
      this.snackbar.open('Removed movie from favorites', 'OK', {
        duration: 2000,
      });
    });
    console.log('Removed Favorite Movie');
  }
}