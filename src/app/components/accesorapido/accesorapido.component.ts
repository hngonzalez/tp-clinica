import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accesorapido',
  templateUrl: './accesorapido.component.html',
  styleUrls: ['./accesorapido.component.css']
})
export class AccesorapidoComponent implements OnInit {
  clickeado!:boolean;
  @Output() eMostrarAccesoRapido = new EventEmitter();

  constructor() { 
    this.clickeado = false;
  }

  ngOnInit(): void {
  }

  clickeo() {
    if (this.clickeado) {
      this.clickeado = false;
    } else {
      this.clickeado = true;
    }
  }

  logeoAdmin() {
    (<HTMLInputElement>document.getElementById('floatingInput')).value = 'msilva@a.com';
    (<HTMLInputElement>document.getElementById('floatingPassword')).value = '123456';
    (<HTMLInputElement>document.getElementById('loginBtnFastAccess')).hidden = false;

    this.eMostrarAccesoRapido.emit('algo');
  }

  logeoPaciente1() {
    (<HTMLInputElement>document.getElementById('floatingInput')).value = 'a3@a.com';
    (<HTMLInputElement>document.getElementById('floatingPassword')).value = '123456';
    (<HTMLInputElement>document.getElementById('loginBtnFastAccess')).hidden = false;
  }

  logeoPaciente2(){
    (<HTMLInputElement>document.getElementById('floatingInput')).value = 'a2@a.com';
    (<HTMLInputElement>document.getElementById('floatingPassword')).value = '123456';
    (<HTMLInputElement>document.getElementById('loginBtnFastAccess')).hidden = false;
  }

  logeoEspecialista1(){
    (<HTMLInputElement>document.getElementById('floatingInput')).value = 'a13@a.com';
    (<HTMLInputElement>document.getElementById('floatingPassword')).value = '123456';
    (<HTMLInputElement>document.getElementById('loginBtnFastAccess')).hidden = false;
  }

  logeoEspecialista2(){
    (<HTMLInputElement>document.getElementById('floatingInput')).value = 'a9@a.com';
    (<HTMLInputElement>document.getElementById('floatingPassword')).value = '123456';
    (<HTMLInputElement>document.getElementById('loginBtnFastAccess')).hidden = false;
  }
}