import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  irPaciente() {
    this.router.navigate(['/register/paciente']);
  }

  irEspecialista() {
    this.router.navigate(['/register/especialista']);
  }
}
