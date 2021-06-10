import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, style, transition, animate, state } from '@angular/animations'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(300,style({
          transform:'translatex(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  formLogin!:FormGroup;
  inCaptcha!:any;
  error!:boolean;
  esperando!:boolean;

  constructor(private fb: FormBuilder,
              private auth:AuthService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.error = false;
    this.inCaptcha = String(Math.round(Math.random()*10000));   
    this.esperando = false; 
  }

  enviarLogin() {
    this.esperando = true;
    this.spinner();
    let email = this.formLogin.get('email')?.value;
    let psw = this.formLogin.get('password')?.value;
    let inCaptchaIngresado = (<HTMLInputElement>document.getElementById('captchaIngresado'));
    console.log(inCaptchaIngresado.value);
    console.log(this.inCaptcha);
    
    if (this.inCaptcha != inCaptchaIngresado.value) {
      this.error = true;
      return;
    }    
    
    this.error = false;
    //console.log(psw);
    this.auth.login(email, psw);
  }

  enviarLogin2() {
    this.esperando = true;
    this.spinner();
    let email = (<HTMLInputElement>document.getElementById('floatingInput')).value;
    let psw = (<HTMLInputElement>document.getElementById('floatingPassword')).value;

    //console.log(psw);
    this.auth.login(email, psw);
  }

  spinner(){
    let a = this.esperando
    setTimeout(() => {
      a = false;
    }, 15000);

    this.esperando = a
  }
}
