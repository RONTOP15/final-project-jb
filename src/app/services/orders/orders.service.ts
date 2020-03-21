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



  newOrder(formG, total, cartid, userid): Observable<any> {
    return this.http.post('http://localhost:3001/api/v1/orders', {
      cityForShipping: formG.city,     //String,
      streetForShipping: formG.street,   //String,
      toDate: formG.toDate,             //Date,
      totalPrice: total,         //Number,
      creditCard: formG.creditCard,         //String,
      cart_id: cartid,            //{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
      user_id: userid           //{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    })
  }

  resetCartAndInfoAndCreateNewCartToThisUser(u, c): Observable<any> {
    return this.http.post('http://localhost:3001/api/v1/orders/reset', {
      user: u,
      cart: c
    })
  }

  // getInvoice(): Observable<any> {  /// localhost:3001/api/v1/orders/invoice
  //   return this.http.get('http://localhost:3001/api/v1/orders/invoice')
  // }
}
