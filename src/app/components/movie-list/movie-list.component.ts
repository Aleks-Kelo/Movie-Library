import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.type';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.movies$.subscribe((movies) => (this.movies = movies));
  }
}
