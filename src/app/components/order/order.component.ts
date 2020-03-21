import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TmplAstRecursiveVisitor } from '@angular/compiler';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})


export class OrderComponent implements OnInit {



  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;


  public userid: String
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

  public dateErr

  public thank: boolean

  public isuser = false
  public isadmin

  constructor(public _ps: ProductsService, public _us: UsersService, public _fb: FormBuilder, public _os: OrdersService, public http: HttpClient) { }

  ngOnInit() {
    this.thankYou(false)
    this.userDetails()

    this.formG = this._fb.group({
      city: [''],
      street: [''],
      toDate: ['', Validators.required],
      creditCard: ['', Validators.required]
    })
    this.subGetOrders()

  }

  subGetOrders() {
    this._os.getOrders().subscribe(
      res => {
        this.orders = res
      },
      err => {
        console.log(err)
      }
    )
  }

  userDetails() {
    const token = sessionStorage.getItem('token')

    this._us.checkToken(token).subscribe(
      res => {
        this.firstName = res['firstName']
        this.cartId = res['cart_id']
        this.city = res['city']
        this.street = res['street']
        this.userid = res['_id']
        this.isuser = true
        this.isadmin = res['isAdmin']
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
  }


  // Why the input is not updated after change the 
  dblClickCity(e) {
    e.srcElement.value = this.city
    this.formG.controls.city.value = this.city

  }

  dblClickStreet(e) {
    e.srcElement.value = this.street
    this.formG.controls.street.value = this.street
  }


  checkLessThenThreeOrdersPerThisDay(e) {
    this.subGetOrders()
    // console.log(e.value.getTime())
    // console.log(new Date(this.orders[7].toDate).getTime())
    let newArr = this.orders.filter(f => new Date(f.toDate).getTime() == e.value.getTime())

    if (newArr.length >= 3) {
      this.dateErr = 'Please pick another date..'
    } else {
      this.dateErr = ''
    }
  }

  sendOrder() {
    this._os.newOrder(this.formG.value, this.total, this.cartId, this.userid).subscribe(
      res => {
        console.log('Done Thank you!')
        this.thankYou(true)
        this.userCompleteGoResetCart()
        // STATUS
        localStorage.setItem("status", `completed ${JSON.stringify(new Date())}`)
      },
      err => {
        console.log(err)
      }
    )


  }

  thankYou(ta) {
    this.thank = ta
  }

  userCompleteGoResetCart() {
    this._os.resetCartAndInfoAndCreateNewCartToThisUser(this.userid, this.cartId).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }






}
