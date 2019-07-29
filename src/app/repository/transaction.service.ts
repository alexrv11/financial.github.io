import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // Define API
  apiURL = 'http://localhost:1323';
  transactionUri = '/users/1234/transactions';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

    // HttpClient API get() method => Fetch transaction list
    getTransactions(): Observable<Transaction> {
      return this.http.get<Transaction>(this.apiURL + this.transactionUri)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    // HttpClient API post() method => Create employee
  createTransaction(transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiURL + this.transactionUri, JSON.stringify(transaction), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
