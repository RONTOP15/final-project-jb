import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm
  public firstFormGroup
  public secondFormGroup
  public emailExistError: string

  public matchPassword = ''

  constructor(public _us: UsersService, public _fb: FormBuilder, public router: Router) { }



  ngOnInit() {

    this.firstFormGroup = this._fb.group({
      numberId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6),]]
    });

    this.secondFormGroup = this._fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })

  }


  subNewUser() {
    this._us.newUser(this.firstFormGroup.value, this.secondFormGroup.value)
      .subscribe(
        rrr => {
          console.log(rrr)
          this.emailExistError = 'The registration was successful'

          this.router.navigate([''])
        }, eee => {
          console.log(eee)
          this.emailExistError = 'A user with that email has already registered. Please use a different email..'
        })
  }

  checkPasswords() {
    if (this.firstFormGroup.controls.password.value !== this.firstFormGroup.controls.confirm.value) {
      this.matchPassword = '*The passwords do not match'
    }
  }
}

