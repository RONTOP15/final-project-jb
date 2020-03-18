import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient) { }

  // @desc    GET => Products
  // @route   /api/v1/products
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3001/api/v1/products')
  }

  getProductsByCatagory(catagory): Observable<any> {
    return this.http.get('http://localhost:3001/api/v1/catagory/' + catagory)
  }

  getCartOfSpesificUser(userid): Observable<any> {
    return this.http.get<any>('http://localhost:3001/api/v1/cart/' + userid)
  }

  getCartInfoByCartId(cartid): Observable<any> {
    return this.http.get<any>('http://localhost:3001/api/v1/cart/info/' + cartid)
  }

  delCartInfoByCartId(cartid): Observable<any> {
    return this.http.delete('http://localhost:3001/api/v1/cart/info/' + cartid)
  }

  addProductToCart(
    quantity,
    price,
    sum,
    cart_id,
    prodcut_id
  ): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/v1/cart/', {
      quantity,
      price,
      sum,
      cart_id,
      prodcut_id
    })
  }

  searchProducts(value): Observable<any> {
    return this.http.get('http://localhost:3001/api/v1/products/search/' + value)
  }
}
