import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder } from '@angular/forms';
import { EventEmitter } from 'events';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { MatCalendarCellCssClasses } from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class OrderComponent implements OnInit {

  public firstName: String
  public cartId: any
  public bfOrder: any
  public myCart: []
  public total;

  public formG

  public searchTerm

  public city
  public street

  public orders
  public picker

  constructor(public _ps: ProductsService, public _us: UsersService, public _fb: FormBuilder, public _os: OrdersService) { }

  ngOnInit() {
    this.userDetails()

    this.formG = this._fb.group({
      city: [''],
      street: [''],
      toDate: [''],
      creditCard: ['']
    })

    this._os.getOrders().subscribe(
      res => {
        this.orders = res
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )

  }

  userDetails() {
    const token = localStorage.getItem('token')
    this._us.checkToken(token).subscribe(
      res => {
        this.firstName = res['firstName']
        this.cartId = res['cart_id']
        this.city = res['city']
        this.street = res['street']
        this.start()
      },
      err => {
        console.log(err)
      }
    )
  }

  start() {
    this._ps.getCartInfoByCartId(this.cartId).subscribe(
      res => {
        this.myCart = res
        this.total = res.map(i => i.sum).reduce((acc, curr) => acc + curr, 0)
      },
      err => {
        console.log(err)
      }
    )
  }


  searchAndMarkIt(search) {
    this.searchTerm = search
    console.log(this.searchTerm)
  }


  dblClickCity(e) {
    e.srcElement.value = this.city
  }

  dblClickStreet(e) {
    e.srcElement.value = this.street
  }

  // dateClass = (d: Date): MatCalendarCellCssClasses => {
  //   const date = d.getDate()
  //   // let som = this.orders.map(d => d.toDate.split("T")[0])
  //   // console.log('sommee')
  //   return (date < 1 || date === 20) ? 'example-custom-date-class' : ''
  // }





}
