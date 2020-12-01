import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { sortCovidStatsByDate } from '../utils/sort-by-date';
import { CovidStats } from '../modals/covid-stats';
import { API_LAST_UPDATED_DATE_FORMAT } from '../utils/globals';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly baseUrl = 'https://bonairecovidmonitor.azurewebsites.net';
  readonly apiUrl: string = '/api';
  readonly apiKey: string =
    'UraEJZBP/mpKEkib2tTGtgoJz0ByIJwkSuVDb5s96CHwlZ10xnm4FQ==';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    const url = this.createUrl(`/all?code=${this.apiKey}`);

    // return this.http.get(url,  {
    //   withCredentials: true
    // });
    return this.http.get(url).pipe(
      map((data: CovidStats[]) => {
        return sortCovidStatsByDate(
          data,
          API_LAST_UPDATED_DATE_FORMAT,
          'lastUpdated'
        );
      }),
      map((data) => {
        let seen = new Set();
        const newData = data.filter((item) => {
          return seen.has(item.date) ? false : seen.add(item.date);
        });

        return newData;
      })
    );
  }

  getCurrent(): Observable<any> {
    const url = this.createUrl(`/current?code=${this.apiKey}`);
    return this.http.get(url);
  }

  // Date string as DD-MM-YYYY
  getByDate(date: string): Observable<any> {
    const url = this.createUrl(`/all?date=${date}&code=${this.apiKey}`);
    return this.http.get(url);
  }

  private createUrl(path: string) {
    let url = `${this.apiUrl}${path}`;

    if (environment.production) {
      url = `${this.baseUrl}${url}`;
    }

    return url;
  }

  // private handleError(name: string, value: any) {
  //   return of(null);
  // }
}
