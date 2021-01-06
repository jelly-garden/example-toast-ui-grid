import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const API_URL = 'vurix-dms/api/v1/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getHistoryNoneAuth(queryParams: any): Observable<any> {
    let url = `${API_URL}/historyNoneAuth?`;
    if (queryParams.area)		{ url += `area=${queryParams.area}&`; }
    if (queryParams.page)		{ url += `page=${queryParams.page}&`; }
    if (queryParams.count)		{ url += `count=${queryParams.count}&`; }
    if (queryParams.event_code)	{ url += `event_code=${queryParams.event_code}&`; }
    if (queryParams.event_codes)	{ url += `event_codes=${queryParams.event_codes}&`; }
    if (queryParams.start_date)	{ url += `start_date=${queryParams.start_date}&`; }
    if (queryParams.end_date)	{ url += `end_date=${queryParams.end_date}&`; }
    if (queryParams.bjcd)		{ url += `bjcd=${queryParams.bjcd}&`; }

    return this.http.get(url)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return of({
            code: err.status,
            message: err.error
          });
        })
      );
  }
}
