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
  
  constructor(private router:Router,
              private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe( user => {
      this.user = user;
      //console.log(user);
    })

    //this.curUser = Boolean(localStorage.getItem('online'));
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
