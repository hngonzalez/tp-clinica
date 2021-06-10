import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.css']
})
export class MisTurnosEspecialistaComponent implements OnInit {
  filtroMisTurnos!:any;
  filtro!:any;
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  buscar() {
    
    //this.filtro = (<HTMLInputElement>document.getElementById('search')).value
    //this.filtroMisTurnos = this.filtro;
  }

}
