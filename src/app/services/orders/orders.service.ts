import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get('http://localhost:3001/api/v1/orders')
  }

}
