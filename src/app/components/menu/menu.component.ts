import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user:any;
  esAdmin:string = 'N';
  esPaciente:string = 'N';

  /* Para datos del usuario */
  dataUserPhotoProfile!:string;
  
  constructor(private router:Router,
              private auth:AuthService) {
    console.log(localStorage);
    this.esAdmin = String(localStorage.getItem('tipo')) == 'A' ? 'S' : 'N';
    this.esPaciente = String(localStorage.getItem('tipo')) == 'P' ? 'S' : 'N';
    this.dataUserPhotoProfile = String(localStorage.getItem('photoURL'));
  }

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe( user => {
      this.user = user;
      console.log(user);
    })
    
    //console.log( "asdasd" + String(localStorage.getItem('administrador')));
  }

  registro(user:string){
    this.router.navigate(['/register', { user: user }]);
  }

  logout(){
    localStorage.clear();
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
