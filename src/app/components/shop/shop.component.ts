import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload'
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';


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
  public isuser = false
  public isadmin

  public catagory
  public modaladmin = false


  // SEND PRODUCT TO SERVER
  public adminForm
  public imageName

  // Simple EDIT MODAL
  public modaledit = false
  public editForm
  public pid

  public fileToUpload: File = null;
  public upload: File = null;

  constructor(public _ps: ProductsService, public _us: UsersService, public _fb: FormBuilder, public http: HttpClient, public dialogEdit: MatDialog) { }

  ngOnInit() {
    this.getUser()
    this.getAllProducts()
    // STATUS
    localStorage.setItem("status", `proccess ${JSON.stringify(new Date())}`)

    this.adminForm = this._fb.group({
      p_name: [''],
      c_id: [''],
      image: [''],
      price: ['']
    })

    this.editForm = this._fb.group({
      pName: [''],
      price: ['']
    })
  }



  // GET USER
  getUser() {
    const token = sessionStorage.getItem('token');
    if (token === null || !token) {
      console.log('token is null')
      this.isuser = false
    } else {
      console.log(token)
      this._us.checkToken(token).subscribe(
        res => {
          this.isuser = true
          this.userid = res['_id']
          this.decoded = res
          this.isadmin = res['isAdmin']
          console.log(this.isadmin)
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
        console.log(res)
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
    console.log(this.decoded);

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

  getCatagories() {
    this._ps.getCatagory().subscribe(
      res => {
        console.log(res);
        this.catagory = res
      },
      err => {
        console.log(err);
      }
    )




    this.modaladmin = !this.modaladmin
  }

  onFileSelected(event) {
    this.imageName = event.target.files[0].name
    // console.log(this.imageName)
    this.upload = <File>event.target.files[0];
  }

  sendNewProductToStoreAndSaveFileInServerStatic(p) {
    this.uploadFileToServer()
    this.adminAddProduct(p.p_name, p.price, this.imageName, p.c_id)
    this.getAllProducts()

    this.modaladmin = !this.modaladmin
  }

  adminAddProduct(pname, price, image, cid) {
    this._ps.addProductByAdmin(pname, price, image, cid).subscribe(
      res => {
        console.log(res)

      },
      err => {
        console.log(err)
      }
    )
  }


  uploadFileToServer() {

    const fd = new FormData()
    fd.append('jpg', this.upload, this.upload.name)
    this.http.post('http://localhost:3001/api/v1/products/upload', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(
        res => {
          console.log('proccing service')
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  }

  openEditModal(event, pid) {
    this.modaledit = !this.modaledit;
    this.pid = pid
  }

  sendEditedProductToServer(event: any) {

    this._ps.editProductByIdFromAdmin(this.pid, this.editForm.value.pName, this.editForm.value.price).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
    this.modaledit = !this.modaledit
  }


}



