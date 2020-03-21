import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // Login
  public loginForm
  public token
  public err
  public loginT: boolean

  // Logged
  public firstName
  public numberId
  public status
  public imagine

  constructor(public _fb: FormBuilder, public _us: UsersService) { }

  ngOnInit() {
    this.checkIfUserLoggedIn()
    this.loginT = true
    this.loginForm = this._fb.group({
      email: [''],
      password: ['']
    })


    this.status = localStorage.getItem('status').split(" ")

    if (this.status[0] === 'welcome') {
      this.imagine = 'welcome'
    } else if (this.status[0] === 'proccess') {
      this.imagine = 'proccess'
    } else if (this.status[0] === 'completed') {
      this.imagine = 'completed'
    } else {
      this.imagine = undefined
    }
  }

  checkIfUserLoggedIn(): void {
    const token = sessionStorage.getItem('token');
    if (token === null) {
      console.log('token is null')
    } else {
      this._us.checkToken(token).subscribe(
        res => {
          console.log(res)
          this.loginT = false;
          this.firstName = res['firstName']
          this.numberId = res['numberId']
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  subUserLogin(): void {
    this._us.userLogin(this.loginForm.value).subscribe(
      res => {
        if (res['success']) {
          this.token = res['token']
          sessionStorage.setItem('token', this.token)
          this.loginT = false
          this.checkIfUserLoggedIn()
        } else {
          this.loginT = true
          this.err = res['err']
        }
      },
      err => console.log(err)
    ); // end Subscribe

  }
}
