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
  public status

  public imagine
  public datestatus

  constructor(public _ps: ProductsService, public _os: OrdersService) { }

  ngOnInit() {
    this.getSumsInfo()

    this.status = localStorage.getItem('status').split(" ")

    if (this.status[0] === 'welcome') {
      this.imagine = 'welcome'
      this.datestatus = JSON.parse(this.status[1])
    } else if (this.status[0] === 'proccess') {
      this.imagine = 'proccess'
      this.datestatus = JSON.parse(this.status[1])
    } else if (this.status[0] === 'completed') {
      this.imagine = 'completed'
      this.datestatus = JSON.parse(this.status[1])
    } else {
      this.imagine = undefined
      this.datestatus = undefined
    }

    console.log(this.datestatus)

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
