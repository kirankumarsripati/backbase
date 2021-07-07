import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Transaction } from '../api-interfaces';;

@Injectable({
  providedIn: 'root'
})
export class BankService {
  model = 'transactions';

  constructor(private http: HttpClient) {}

  getTransactions() {
    return this.http.get<Transaction[]>(this.getUrl());
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }
}
