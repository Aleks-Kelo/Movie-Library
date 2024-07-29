import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie, MovieSearchResponse } from '../interfaces/movie.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private omdbApiKey = environment.omdbApiKey;
  private apiUrl = 'http://www.omdbapi.com/';

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  public movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {}

  searchMovies(title: string): void {
    const url = `${this.apiUrl}?apikey=${this.omdbApiKey}&s=${title}`;
    this.http
      .get<MovieSearchResponse>(url)
      .pipe(
        map((response) => this.handleResponse(response)),
        catchError((error) => this.handleError(error))
      )
      .subscribe();
  }

  private handleResponse(response: MovieSearchResponse): Movie[] {
    if (response.Response === 'True') {
      const topMovies = response.Search.slice(0, 3); // Get top 3 matches
      this.moviesSubject.next(topMovies); // Update the subject with new movies
    } else {
      this.moviesSubject.next([]); // Clear movies if no results
    }
    return response.Search;
  }

  private handleError(error: any): Observable<Movie[]> {
    console.error('Error fetching movies:', error); // Clear movies on error
    this.moviesSubject.next([]);
    return of([]);
  }
}
