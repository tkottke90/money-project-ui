import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

const ErrorMessages = {
  required: 'This fields is required',
  email: 'Invalid Email'
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loadingState = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: [ '', [ Validators.required ] ]
    });
  }

  getErrors(field) {
    const errors = this.loginForm.get(field).errors;
    const errorList = Object.keys(errors);

    if (errorList.length > 0) {
      return ErrorMessages[errorList[0]];
    }
    return '';
  }

  async login() {
    if (this.loginForm.valid) {
      const result = await this.userService.login(this.loginForm.value.email, this.loginForm.value.password);

      if (result) {
        console.log('success!');
        this.router.navigate(['/']);
      } else {
        console.log('failed');
        this.loginForm.markAllAsTouched();
        this.cdr.markForCheck();
      }
    
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
