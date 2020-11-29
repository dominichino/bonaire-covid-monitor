import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly baseUrl: string = 'https://bonairecovidmonitor.azurewebsites.net/api';
  readonly apiKey: string = 'UraEJZBP/mpKEkib2tTGtgoJz0ByIJwkSuVDb5s96CHwlZ10xnm4FQ==';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const url = `${this.baseUrl}/all?code=${this.apiKey}`;

    // return this.http.get(url,  {
    //   withCredentials: true
    // });
    return this.http.get(url);
  }

  getCurrent(): Observable<any> {
    const url = `${this.baseUrl}/current?code=${this.apiKey}`;

    return this.http.get(url);
  }


  // Date string as DD-MM-YYYY
  getByDate(date: string): Observable<any> {
    const url = `${this.baseUrl}/all?date=${date}&code=${this.apiKey}`;

    return this.http.get(url);
  }

  private handleError(name: string, value: any) {
    return of(null);
  }
}


