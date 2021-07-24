import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import 'rxjs/Rx';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MammaService {

  apiURL: string = 'http://localhost:59786/api';
  token = localStorage.getItem('token');
  // private headers = new Headers({
  //   'Content-Type': 'application/json',
  //   'charset': 'UTF-8',
  //   'Authorization': 'Bearer ' + this.token
  // });

  headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("charset", "UTF-8");

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "charset": "UTF-8"
    })
  };
  //private options = new RequestOptions({ headers: this.headers });
  private actionUrl: string;
  constructor(private httpClient: HttpClient) { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // getAllPatientCharts(username: string, sqldateformat: number): Observable<any> {
  //   return this.http.get('/api/MyCharts/GetAllPatientCharts?username=' + username + '&sqldateformat=' + sqldateformat,
  //     this.options).timeoutWith(2000, Observable.throw(new Error('Error!')))
  //     .map((res: Response) => res.json()
  //     );
  // }

  firstget(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/values`);
  }


  registerUser(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + "/account/register", data, this.httpOptions);
  }

  registerFacebookUser(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + "/account/register", data, this.httpOptions);
  }

  registerGoogleUser(base): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + "/Account/ExternalLogins?returnUrl=" + base + "&generateState=true");
  }


}
