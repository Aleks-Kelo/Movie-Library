import { Component, EventEmitter, Output } from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchTerm$ = new Subject<string>();

  constructor(private movieService: MovieService) {
    this.setupSearchSubscription();
  }

  private setupSearchSubscription(): void {
    this.searchTerm$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        if (term.length > 2) {
          this.movieService.searchMovies(term);
        }
      });
  }

  onSearch(event: any): void {
    this.searchTerm$.next(event.target.value);
  }
}
