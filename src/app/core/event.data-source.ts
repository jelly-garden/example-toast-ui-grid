import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EventService } from './event.service';

export class QueryResultsModel {
  // fields
  results: any[];
  totalCount: number;
  errorMessage: string;

  constructor(_results: any[] = [], _totalCount: number = 0, _errorMessage: string = '') {
    this.results = _results;
    this.totalCount = _totalCount;
    this.errorMessage = _errorMessage;
  }
}

export class EventDataSource {
  // Public properties
  entitySubject = new BehaviorSubject<any[]>([]);
  entity$: Observable<any>;
  hasItems = false; // Need to show message: 'No records found

  // Loading | Progress bar
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean>;

  // Paginator | Paginators count
  paginatorTotalSubject = new BehaviorSubject<number>(0);
  paginatorTotal$: Observable<number>;

  constructor(
    private eventService: EventService
  ) {
    this.entity$ = this.entitySubject.asObservable();
    this.loading$ = this.loadingSubject.asObservable();
    this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
    this.paginatorTotal$.subscribe(res => this.hasItems = res > 0);
  }

  connect(collectionViewer: any): Observable<any[]> {
    // Connecting data source
    return this.entitySubject.asObservable();
  }

  disconnect(collectionViewer: any): void {
    // Disconnecting data source
    this.entitySubject.complete();
    this.loadingSubject.complete();
    this.paginatorTotalSubject.complete();
  }

  loadItems(queryParams: any) {
    this.loadingSubject.next(true);
    this.eventService.getHistoryNoneAuth(queryParams).pipe(
      tap(res => {
        console.log('res', res);
        if (res.code === 200) {
          const queryResults = new QueryResultsModel(res.response.results, res.response.total_count);
          this.entitySubject.next(queryResults.results);
          this.paginatorTotalSubject.next(queryResults.totalCount);
        } else {
          const queryResults = new QueryResultsModel([], 0, res.message);
          this.entitySubject.next(queryResults.results);
          this.paginatorTotalSubject.next(queryResults.totalCount);
        }
      }),
      catchError(err => {
        console.log('err', err);
        const queryResults = new QueryResultsModel([], 0, err.error);
        this.entitySubject.next(queryResults.results);
        this.paginatorTotalSubject.next(queryResults.totalCount);
        return of(new QueryResultsModel([], 0));
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe();
  }
}
