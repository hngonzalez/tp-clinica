import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!:FormGroup;

  constructor(private fb: FormBuilder,
              private auth:AuthService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  enviarLogin() {
    let email = this.formLogin.get('email')?.value;
    let psw = this.formLogin.get('password')?.value;

    //console.log(psw);
    this.auth.login(email, psw);
  }

  enviarLogin2() {
    let email = 'naikido.gz@hotmail.com';
    let psw = '123456';

    //console.log(psw);
    this.auth.login(email, psw);
  }
}
