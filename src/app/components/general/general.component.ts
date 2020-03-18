import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  public products_sum
  public orders_sum


  constructor(public _ps: ProductsService, public _os: OrdersService) { }

  ngOnInit() {
    this.getSumsInfo()
  }

  getSumsInfo() {

    // GET PRODUCTS SUM
    this._ps.getProducts().subscribe(
      res => {
        this.products_sum = res.length
      },
      err => {
        console.log(err)
      }
    )

    // GET ORDERS SUM
    this._os.getOrders().subscribe(
      res => {
        this.orders_sum = res.length
      },
      err => {
        console.log(err)
      }
    )




  }

}     
