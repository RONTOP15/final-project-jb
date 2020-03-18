import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  // @desc    POST => User Request to REGISTER
  //route     http://localhost:3001/api/v1/users
  public newUser(firstForm, secondForm) {
    return this.http.post('http://localhost:3001/api/v1/users', {
      firstForm, secondForm
    })
  }
  // @desc    POST => User Request to LOGIN 
  //route     http://localhost:3001/api/v1/users/login
  public userLogin(form) {
    return this.http.post('http://localhost:3001/api/v1/users/login', {
      form
    })
  }



  createAuthorizationHeader(headers: Headers) {
    headers.append("Authorization", "Basic" + btoa('username:password'))
  }
  // @desc    GET => Check Token 
  // @route   ''
  public checkToken(token) {

    let headers = new Headers()
    this.createAuthorizationHeader(headers)

    return this.http.get('http://localhost:3001/api/v1/users/authorization', {
      headers: {
        token
      }
    })

  }
}
