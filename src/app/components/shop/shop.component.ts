import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { UsersService } from 'src/app/services/users/users.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  public drawer: boolean = true
  public products: []
  public decoded = {}
  public userid: string
  public price
  public userCart: []
  public userCartInfo: []
  public userCartTotal

  public searchValue = 'Macbook';

  public dialog = 'none'
  public openDialog = 'block'


  constructor(public _ps: ProductsService, public _us: UsersService) { }

  ngOnInit() {
    this.getUser()
    this.getAllProducts()
  }


  // GET USER
  getUser() {
    const token = localStorage.getItem('token');
    if (token === null) {
      console.log('token is null')
    } else {
      this._us.checkToken(token).subscribe(
        res => {
          this.userid = res['_id']
          this.decoded = res
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  // GET ALL PRODUCTS
  getAllProducts() {
    this._ps.getProducts().subscribe(
      res => {
        this.products = res
      },
      err => {
        console.log(err)
      }
    )
  }

  // GET PRODUCTS BY CATAGORY
  getByCatagory(event) {
    this._ps.getProductsByCatagory(event.target.innerText).subscribe(
      res => {
        this.products = res[0].products
      },
      err => {
        console.log(err)
      }
    )
  }

  // POST PRODUCT TO CART
  addProduct(event, q: number, p) {
    const productid = event.currentTarget.id;
    const cartid = this.decoded['cart_id'];
    const quantity = q;
    const price = event.currentTarget.dataset.target;
    const sum = price * quantity;

    console.log(p)

    this._ps.addProductToCart(quantity, price, sum, cartid, productid).subscribe(
      res => {
        console.log('Added product to cart')
        this.subGetCartInfoById()
      },
      err => {
        console.log(err)
      }
    )


  }

  // GET USER CARTINFO BY USER ID  (products list of user)
  subGetCartInfoById() {
    this._ps.getCartInfoByCartId(this.decoded['cart_id']).subscribe(
      res => {
        this.userCartInfo = res
        this.userCartTotal = res.map(i => i.sum).reduce((acc, curr) => acc + curr, 0)
        console.log('Get Cart Info...')
      },
      err => {
        console.log(err)
      }
    );

  }


  // DELETE PRODUCT FROM CART
  deleteProductFromCart(event) {
    this._ps.delCartInfoByCartId(event.currentTarget.id).subscribe(
      res => {
        console.log('Product Deleted from cart')
        this.subGetCartInfoById()
      },
      err => {
        console.log(err)
      }
    )
  }

  getProductsBySearchValue() {
    this._ps.searchProducts(this.searchValue).subscribe(
      res => {
        this.products = res
      },
      err => {
        console.log(err)
      }
    )
  }

  changeDialog(event) {
    if (event.currentTarget.nextElementSibling.style.display === 'none') {
      event.currentTarget.nextElementSibling.style.display = this.openDialog
    } else {
      event.currentTarget.nextElementSibling.style.display = this.dialog
    }
  }
}
